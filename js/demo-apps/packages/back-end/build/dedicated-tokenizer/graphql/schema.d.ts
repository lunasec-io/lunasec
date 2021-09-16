export declare const typeDefs: import("graphql").DocumentNode;
declare const db: {
    formData: {
        text_area: string;
        email: string;
        insecure_field: string;
        files: never[];
    };
};
export declare const resolvers: {
    Query: {
        getFormData: () => {
            text_area: string;
            email: string;
            insecure_field: string;
            files: never[];
        };
    };
    Mutation: {
        setFormData: (_parent: never, args: {
            formData: typeof db['formData'];
        }, _context: {
            sessionId: string;
        }, _info: any) => Promise<{
            text_area: string;
            email: string;
            insecure_field: string;
            files: never[];
        }>;
    };
};
export declare const schemaDirectives: {
    token: typeof import("@lunasec/node-sdk").TokenDirective;
};
export {};
//# sourceMappingURL=schema.d.ts.map