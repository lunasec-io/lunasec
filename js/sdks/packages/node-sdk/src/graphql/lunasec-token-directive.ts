import { isToken } from '@lunasec/tokenizer-sdk';
import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver, GraphQLField } from 'graphql';

// TODO: go get a real grant
// Note we can just throw on any issues, apollo seems to return it all cleanly back to the client
function fakeLunaSecGranter(token: string) {
  console.log('Made a fake grant for token: ', token);
  return Promise.resolve(true);
}

export class TokenDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, string>) {
    const resolve = field.resolve || defaultFieldResolver;
    field.resolve = async function (...args) {
      const result = await resolve.apply(this, args);
      if (typeof result !== 'string' || !isToken(result)) {
        throw new Error(
          `Field ${field.name} did not resolve to a token but had a LunaSec @token directive in the graphql schema`
        );
      }
      await fakeLunaSecGranter(result);
      return result;
    };
  }
}
