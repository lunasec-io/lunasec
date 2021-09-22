/*
 * Copyright 2021 by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { ExpressContext, SchemaDirectiveVisitor } from 'apollo-server-express';
import {
  defaultFieldResolver,
  GraphQLArgument,
  GraphQLField,
  GraphQLInputField,
  GraphQLInputObjectType,
  GraphQLSchema,
} from 'graphql';

import { LunaSecGrantService } from '../grant-service';

let grantService: LunaSecGrantService | undefined;

// This dirty stateful hack was necessary because creating a function (to inject this dependency) that exports a private class(the TokenDirective)
// that has protected properties is not supported in typescript, even with @ts-ignore
// https://github.com/microsoft/TypeScript/issues/30355
// If you see a solution please implement it

export function setGrantServiceForDirective(service: LunaSecGrantService) {
  grantService = service;
}

export class TokenDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, string>) {
    const resolve = field.resolve || defaultFieldResolver;
    field.resolve = async function (...args) {
      //@ts-ignore
      const req = args[2].req;
      // Fire the user's resolver and get the resulting token
      const result = await resolve.apply(this, args);
      if (!result) {
        // handles case where token is an empty string or a null
        return result;
      }
      if (!grantService) {
        throw new Error(
          'LunaSec Token Directive attempted to use the grantService but it was not initialized, have you configured LunaSec properly?'
        );
      }
      await grantService.createWithAutomaticSessionId(req, result);
      return result;
    };
  }

  // The below solution was adapted from a github issue, towards the bottom of this thread: https://github.com/ardatan/graphql-tools/issues/858
  // In order to wrap a mutation resolver from a directive we have to look through ALL the schema and find the resolvers that use the input argument that we decorated
  visitInputFieldDefinition(field: GraphQLInputField, details: any) {
    const { name, defaultValue } = field;
    // @ts-ignore
    const schema: GraphQLSchema = this.schema;
    // @ts-ignore
    const objectType: GraphQLInputObjectType = details.objectType;
    const mutationType = schema.getMutationType();
    if (!mutationType) {
      return;
    }

    const mutationsForInput = Object.values(mutationType.getFields()).filter(({ args = [] }): { args: any[] } => {
      // @ts-ignore
      return args.find((arg) => arg && arg.type === objectType);
    });

    mutationsForInput.forEach((mutation) => {
      const originalResolver = mutation.resolve;
      if (!originalResolver) {
        throw new Error('Cant wrap resolver with token directive without resolver');
      }
      mutation.resolve = async function wrappedResolver(...resolverArguments: any[]) {
        // @ts-ignore
        const args: GraphQLArgument[] = resolverArguments[1];
        if (!args) {
          throw new Error('Cannot wrap function without args');
        }

        // @ts-ignore
        const argument = Object.values(args).find((el) => el && el[name]);
        if (argument) {
          // @ts-ignore
          const value = argument[name];
          if (!grantService) {
            throw new Error('LunaSec Grant Service was not configured for the graphql token directive.');
          }
          const context: ExpressContext = resolverArguments[2];
          if (value && value !== defaultValue) {
            await grantService.verifyWithAutomaticSessionId(context.req, value, 'store_token'); // throws an error if no auth, can also handle arrays of tokens
          }
        }

        // @ts-ignore
        return originalResolver.apply(this, resolverArguments);
      };
    });
  }
}
