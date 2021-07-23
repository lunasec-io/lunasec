import { ExpressContext, SchemaDirectiveVisitor } from 'apollo-server-express';
import {
  defaultFieldResolver,
  GraphQLField,
  GraphQLInputField,
  // GraphQLNonNull,
  // isNonNullType,
  // isScalarType,
  GraphQLSchema,
  GraphQLInputObjectType,
  GraphQLArgument,
} from 'graphql';

import { LunaSecGrantService } from '../grant-service';

// import { TokenType } from './token-scalar-type';

// TODO: go get a real grant
// Note we can just throw on any issues, apollo seems to return it all cleanly back to the client
// function fakeLunaSecGranter(token: string) {
//   console.log('Made a fake grant for token: ', token);
//   return Promise.resolve(true);
// }

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

  // // a lot of useful info in this thread on how to work around this issue: https://github.com/ardatan/graphql-tools/issues/858
  // // TODO: can be used in conjunction with the plugin when we get that working
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
