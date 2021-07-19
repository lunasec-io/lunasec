import { isToken } from '@lunasec/tokenizer-sdk';
import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { Request } from 'express';
import {
  defaultFieldResolver,
  GraphQLField,
  // GraphQLInputField,
  // GraphQLNonNull,
  // isNonNullType,
  // isScalarType,
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

async function grantToken(name: string, req: Request, token: string) {
  if (typeof token !== 'string' || !isToken(token)) {
    throw new Error(
      `Field ${name} did not resolve to a token or array of tokens but had a LunaSec @token directive in the graphql schema`
    );
  }
  if (!grantService) {
    throw new Error('Grant Service was not configured for the graphql token directive.');
  }
  await grantService.createWithAutomaticSessionId(req, token);
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
      if (Array.isArray(result)) {
        const grantPromises: Promise<void>[] = [];
        result.forEach((t) => {
          grantPromises.push(grantToken(field.name, req, t));
          console.log(t);
        });
        await Promise.all(grantPromises);
      } else {
        await grantToken(field.name, req, result);
      }
      return result;
    };
  }

  // wrapType(field: GraphQLInputField) {
  //   if (isNonNullType(field.type) && isScalarType(field.type.ofType)) {
  //     field.type = new GraphQLNonNull(new TokenType(field.type.ofType));
  //   } else if (isScalarType(field.type)) {
  //     field.type = new TokenType(field.type);
  //   } else {
  //     throw new Error(`Not a scalar type: ${field.type.toString()}`);
  //   }
  // }
  //
  // // a lot of useful info in this thread on how to work around this issue: https://github.com/ardatan/graphql-tools/issues/858
  // // TODO: can be used in conjunction with the plugin when we get that working
  // visitInputFieldDefinition(field: GraphQLInputField, _details: any) {
  //   this.wrapType(field);
  //
  //   // field.extensions = { hi: 'there' }; // I was hoping we would be able to read these from the plugin to know that the directive was set but it doesn't show up
  //   // if (field.astNode) {
  //   //   //@ts-ignore
  //   //   field.astNode.description = 'LUNASEC_TOKEN';
  //   // }
  //   // console.log(
  //   //   "'VISITED INPUT FIELD!!!!!!!!!!!!!!:",
  //   //   util.inspect(field, {
  //   //     showHidden: false,
  //   //     depth: null,
  //   //   })
  //   // );
  // }
  // _mutations: GraphQLField<any,any>[] | null = null
  //
  // getMutations(predicate:({args: GraphQLArgs}) => boolean) {
  //   if (!this._mutations) {
  //     const mutationType = this.schema.getMutationType()
  //     if (mutationType) {
  //       this._mutations = Object.values(
  //         mutationType.getFields()
  //       );
  //     }
  //   }
  //
  //   return this._mutations || [];
  //
  //
  // }

  // visitInputFieldDefinition(field: GraphQLInputField, {objectType:any}) {
  //   const {name, defaultValue} = field;
  //   const mutationsForInput = this.getMutations(({args = []}) => {
  //     return args.find(arg => arg && arg.type && arg.type.ofType === objectType;
  //   });
  //   mutationsForInput.forEach(mutation => {
  //     const {resolve = defaultFieldResolver} = mutation;
  //     mutation.resolve = function staffResolve(...args) {
  //       const params = args[1];
  //       // some lookup...
  //       const subKey = Object.values(params).find(el => el && el[name]);
  //       if (
  //         params[name] !== defaultValue ||
  //         (subKey && subKey[name] !== defaultValue)
  //       ) {
  //         const context = args[2];
  //         //  throws an error if no auth
  //         ensureIsAuth(context, this.args.roles);
  //       }
  //       return resolve.apply(this, args);
  //     };
  //   });
  // }

  // TODO: These were just tests to see what objects could be accessed
  // visitObject(object: GraphQLObjectType) {
  //   console.log('VISITED MUTATION OBJECT!!!!!!!!!!!!!!:', object);
  // }
  //
  // visitInputObject(object: GraphQLInputObjectType) {
  //   console.log(
  //     'VISITED INPUT OBJECT!!!!!!!!!!!!!!!!',
  //     typeof object,
  //     util.inspect(object, { showHidden: true, depth: null })
  //   );
  // }
}
