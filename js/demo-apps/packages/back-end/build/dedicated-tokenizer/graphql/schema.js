"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaDirectives = exports.resolvers = exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const configure_lunasec_1 = require("../../configure-lunasec");
// README - This demo shows how to use the lunasec @token directive in your apollo server
// Import the directive from the node-sdk and attach it to your schemaDirectives(bottom of this file) which are passed into apollo
// and declare the directive directly in your schema with the `directive` keyword.
exports.typeDefs = apollo_server_express_1.gql `
  type Query {
    getFormData: FormData
  }

  type FormData {
    text_area: String @token
    email: String @token
    insecure_field: String
    files: [String] @token # @token directive also works on arrays of tokens
  }

  type Mutation {
    setFormData(formData: FormDataInput): FormData
  }

  input FormDataInput {
    email: String @token
    insecure_field: String
    text_area: String @token
    files: [String] @token
  }

  directive @token on FIELD_DEFINITION | INPUT_FIELD_DEFINITION ### Enable input field annotation once plugin working
`;
// This is a fake little database so we have some data to serve
const db = {
    formData: {
        text_area: '',
        email: '',
        insecure_field: 'Some Insecure Data Coexisting',
        files: [],
    },
};
exports.resolvers = {
    Query: {
        getFormData: () => db.formData, // Once this resolver fires and tokens are retrieved, anything annotated with @token in FormData in the schema will be granted read permission for this session for 15 minutes
    },
    Mutation: {
        setFormData: (_parent, args, _context, _info) => __awaiter(void 0, void 0, void 0, function* () {
            // If the tokens annotated with @token in FormDataInput in the schema are not granted permission to be written to the database for this sessionID
            // they will throw and we would not reach this resolver
            db.formData = args.formData;
            console.debug('setting test data to ', args.formData);
            return db.formData;
        }),
    },
};
exports.schemaDirectives = {
    token: configure_lunasec_1.lunaSec.tokenDirective,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2RlZGljYXRlZC10b2tlbml6ZXIvZ3JhcGhxbC9zY2hlbWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsaUVBQTRDO0FBRTVDLCtEQUFrRDtBQUNsRCx5RkFBeUY7QUFDekYsa0lBQWtJO0FBQ2xJLGtGQUFrRjtBQUVyRSxRQUFBLFFBQVEsR0FBRywyQkFBRyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0F3QjFCLENBQUM7QUFFRiwrREFBK0Q7QUFDL0QsTUFBTSxFQUFFLEdBQUc7SUFDVCxRQUFRLEVBQUU7UUFDUixTQUFTLEVBQUUsRUFBRTtRQUNiLEtBQUssRUFBRSxFQUFFO1FBQ1QsY0FBYyxFQUFFLCtCQUErQjtRQUMvQyxLQUFLLEVBQUUsRUFBRTtLQUNWO0NBQ0YsQ0FBQztBQUVXLFFBQUEsU0FBUyxHQUFHO0lBQ3ZCLEtBQUssRUFBRTtRQUNMLFdBQVcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLDhLQUE4SztLQUMvTTtJQUNELFFBQVEsRUFBRTtRQUNSLFdBQVcsRUFBRSxDQUNYLE9BQWMsRUFDZCxJQUF5QyxFQUN6QyxRQUErQixFQUMvQixLQUFVLEVBQ1YsRUFBRTtZQUNGLGlKQUFpSjtZQUNqSix1REFBdUQ7WUFDdkQsRUFBRSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQzVCLE9BQU8sQ0FBQyxLQUFLLENBQUMsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3RELE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQztRQUNyQixDQUFDLENBQUE7S0FDRjtDQUNGLENBQUM7QUFFVyxRQUFBLGdCQUFnQixHQUFHO0lBQzlCLEtBQUssRUFBRSwyQkFBTyxDQUFDLGNBQWM7Q0FDOUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdxbCB9IGZyb20gJ2Fwb2xsby1zZXJ2ZXItZXhwcmVzcyc7XG5cbmltcG9ydCB7IGx1bmFTZWMgfSBmcm9tICcuLi8uLi9jb25maWd1cmUtbHVuYXNlYyc7XG4vLyBSRUFETUUgLSBUaGlzIGRlbW8gc2hvd3MgaG93IHRvIHVzZSB0aGUgbHVuYXNlYyBAdG9rZW4gZGlyZWN0aXZlIGluIHlvdXIgYXBvbGxvIHNlcnZlclxuLy8gSW1wb3J0IHRoZSBkaXJlY3RpdmUgZnJvbSB0aGUgbm9kZS1zZGsgYW5kIGF0dGFjaCBpdCB0byB5b3VyIHNjaGVtYURpcmVjdGl2ZXMoYm90dG9tIG9mIHRoaXMgZmlsZSkgd2hpY2ggYXJlIHBhc3NlZCBpbnRvIGFwb2xsb1xuLy8gYW5kIGRlY2xhcmUgdGhlIGRpcmVjdGl2ZSBkaXJlY3RseSBpbiB5b3VyIHNjaGVtYSB3aXRoIHRoZSBgZGlyZWN0aXZlYCBrZXl3b3JkLlxuXG5leHBvcnQgY29uc3QgdHlwZURlZnMgPSBncWxgXG4gIHR5cGUgUXVlcnkge1xuICAgIGdldEZvcm1EYXRhOiBGb3JtRGF0YVxuICB9XG5cbiAgdHlwZSBGb3JtRGF0YSB7XG4gICAgdGV4dF9hcmVhOiBTdHJpbmcgQHRva2VuXG4gICAgZW1haWw6IFN0cmluZyBAdG9rZW5cbiAgICBpbnNlY3VyZV9maWVsZDogU3RyaW5nXG4gICAgZmlsZXM6IFtTdHJpbmddIEB0b2tlbiAjIEB0b2tlbiBkaXJlY3RpdmUgYWxzbyB3b3JrcyBvbiBhcnJheXMgb2YgdG9rZW5zXG4gIH1cblxuICB0eXBlIE11dGF0aW9uIHtcbiAgICBzZXRGb3JtRGF0YShmb3JtRGF0YTogRm9ybURhdGFJbnB1dCk6IEZvcm1EYXRhXG4gIH1cblxuICBpbnB1dCBGb3JtRGF0YUlucHV0IHtcbiAgICBlbWFpbDogU3RyaW5nIEB0b2tlblxuICAgIGluc2VjdXJlX2ZpZWxkOiBTdHJpbmdcbiAgICB0ZXh0X2FyZWE6IFN0cmluZyBAdG9rZW5cbiAgICBmaWxlczogW1N0cmluZ10gQHRva2VuXG4gIH1cblxuICBkaXJlY3RpdmUgQHRva2VuIG9uIEZJRUxEX0RFRklOSVRJT04gfCBJTlBVVF9GSUVMRF9ERUZJTklUSU9OICMjIyBFbmFibGUgaW5wdXQgZmllbGQgYW5ub3RhdGlvbiBvbmNlIHBsdWdpbiB3b3JraW5nXG5gO1xuXG4vLyBUaGlzIGlzIGEgZmFrZSBsaXR0bGUgZGF0YWJhc2Ugc28gd2UgaGF2ZSBzb21lIGRhdGEgdG8gc2VydmVcbmNvbnN0IGRiID0ge1xuICBmb3JtRGF0YToge1xuICAgIHRleHRfYXJlYTogJycsXG4gICAgZW1haWw6ICcnLFxuICAgIGluc2VjdXJlX2ZpZWxkOiAnU29tZSBJbnNlY3VyZSBEYXRhIENvZXhpc3RpbmcnLFxuICAgIGZpbGVzOiBbXSxcbiAgfSxcbn07XG5cbmV4cG9ydCBjb25zdCByZXNvbHZlcnMgPSB7XG4gIFF1ZXJ5OiB7XG4gICAgZ2V0Rm9ybURhdGE6ICgpID0+IGRiLmZvcm1EYXRhLCAvLyBPbmNlIHRoaXMgcmVzb2x2ZXIgZmlyZXMgYW5kIHRva2VucyBhcmUgcmV0cmlldmVkLCBhbnl0aGluZyBhbm5vdGF0ZWQgd2l0aCBAdG9rZW4gaW4gRm9ybURhdGEgaW4gdGhlIHNjaGVtYSB3aWxsIGJlIGdyYW50ZWQgcmVhZCBwZXJtaXNzaW9uIGZvciB0aGlzIHNlc3Npb24gZm9yIDE1IG1pbnV0ZXNcbiAgfSxcbiAgTXV0YXRpb246IHtcbiAgICBzZXRGb3JtRGF0YTogYXN5bmMgKFxuICAgICAgX3BhcmVudDogbmV2ZXIsXG4gICAgICBhcmdzOiB7IGZvcm1EYXRhOiB0eXBlb2YgZGJbJ2Zvcm1EYXRhJ10gfSxcbiAgICAgIF9jb250ZXh0OiB7IHNlc3Npb25JZDogc3RyaW5nIH0sXG4gICAgICBfaW5mbzogYW55XG4gICAgKSA9PiB7XG4gICAgICAvLyBJZiB0aGUgdG9rZW5zIGFubm90YXRlZCB3aXRoIEB0b2tlbiBpbiBGb3JtRGF0YUlucHV0IGluIHRoZSBzY2hlbWEgYXJlIG5vdCBncmFudGVkIHBlcm1pc3Npb24gdG8gYmUgd3JpdHRlbiB0byB0aGUgZGF0YWJhc2UgZm9yIHRoaXMgc2Vzc2lvbklEXG4gICAgICAvLyB0aGV5IHdpbGwgdGhyb3cgYW5kIHdlIHdvdWxkIG5vdCByZWFjaCB0aGlzIHJlc29sdmVyXG4gICAgICBkYi5mb3JtRGF0YSA9IGFyZ3MuZm9ybURhdGE7XG4gICAgICBjb25zb2xlLmRlYnVnKCdzZXR0aW5nIHRlc3QgZGF0YSB0byAnLCBhcmdzLmZvcm1EYXRhKTtcbiAgICAgIHJldHVybiBkYi5mb3JtRGF0YTtcbiAgICB9LFxuICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IHNjaGVtYURpcmVjdGl2ZXMgPSB7XG4gIHRva2VuOiBsdW5hU2VjLnRva2VuRGlyZWN0aXZlLFxufTtcbiJdfQ==