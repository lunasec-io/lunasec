import { gql } from 'apollo-server-express';
import { TokenDirective } from "@lunasec/node-sdk";

// README - This demo shows how to use the lunasec @token directive in your apollo server
// Import the directive from the node-sdk and attach it to your schemaDirectives(bottom of this file) which are passed into apollo
// and declare the directive directly in your schema with the `directive` keyword.


export const typeDefs = gql`

  type FormData {
    email: String @token 
    insecure_field: String
  }
  
  type Query {
    getFormData: FormData
  }
    
  type Mutation {
      setFormData(formData: FormDataInput): FormData
  }
  
  input FormDataInput  {
      email: String @token     #  I put the token directive all over the place to see if it could get picked up in the plugin, but ultimately it will just be here ( and on email above)
      insecure_field: String
  }
  
  directive @token on FIELD_DEFINITION | INPUT_FIELD_DEFINITION 
`;

// This is a fake little database so we have some data to serve
const db = {
    formData: {
        email: 'lunasec-FAKE-TOKEN',
        insecure_field: 'Insecure_Text'
    }
}

export const resolvers = {
    Query: {
        getFormData: () => db.formData,
    },
    Mutation: {
        setFormData: (_: never, args: {formData: typeof db['formData']}) => {
            db.formData = args.formData;
            return db.formData
        }
    }
};



export const schemaDirectives = {
    token: TokenDirective
}