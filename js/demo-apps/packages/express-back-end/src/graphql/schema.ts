import { gql, SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver,GraphQLField } from 'graphql'
import {isToken} from "@lunasec/tokenizer-sdk";
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

// Add the graphql plugin to your IDE to get syntax highlighting.  For intellij that is js-graphql

export const typeDefs = gql`

  type FormData {
    email: String
    insecure_field: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. 
  
  type Query {
    getFormData: FormData
  }
  
  directive @token on FIELD_DEFINITION
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
export const resolvers = {
    Query: {
        getFormData: () => db.formData,
    },
};


const db = {
    formData: {
        email: 'Some_Token',
        insecure_field: 'Insecure_Text'
    }
}

function fakeLunaSecGranter(token: string) {
    console.log('Made a grant for token: ', token)
    return Promise.resolve(true)
}

// DIRECTIVE
class Token extends SchemaDirectiveVisitor {
    visitFieldDefinition(field:GraphQLField<any,string>, _details: any) {
        const resolve = field.resolve || defaultFieldResolver;
        field.resolve = async function(...args) {
            const result = await resolve.apply(this, args);
            if (!(typeof result === 'string' || !isToken(result))){
                throw new Error(`Field ${field.name} did not resolve to a token but had a LunaSec @token directive in the graphql schema`)
            }
            await fakeLunaSecGranter(result);
            return result;
        };
    }
}

export const schemaDirectives = {
    token: Token
}