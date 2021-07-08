import { isToken } from '@lunasec/tokenizer-sdk';
import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver, GraphQLField, GraphQLInputField } from 'graphql';

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
      // Fire the user's resolver and get the resulting token
      const result = await resolve.apply(this, args);
      if (typeof result !== 'string' || !isToken(result)) {
        throw new Error(
          `Field ${field.name} did not resolve to a token but had a LunaSec @token directive in the graphql schema`
        );
      }
      await fakeLunaSecGranter(result); // this should throw on error
      return result;
    };
  }
  visitInputFieldDefinition(field: GraphQLInputField) {
    console.log("'VISITED INPUT FIELD!!!!!!!!!!!!!!:", field);
    field.extensions = { hi: 'there' }; // I was hoping we would be able to read these from the plugin to know that the directive was set but it doesn't show up
  }
  // visitInputObject(object: GraphQLInputObjectType) {
  //   console.log('VISITED INPUT OBJECT!!!!!!!!!!!!!!:', object);
  // }
}
