export interface CamelCaseOptions {
    pascalCase: boolean;
    preserveConsecutiveUppercase: boolean;
    locale?: string;
}
export declare function preserveCamelCase(str: string, locale?: string): string;
export declare function preserveConsecutiveUppercase(input: string): string;
export declare function postProcess(input: string, options: CamelCaseOptions): string;
export declare function toCamelCase(input: string, options?: CamelCaseOptions): string;
export declare function camelCaseObject<T>(obj: Record<string, T>): Record<string, T>;
//# sourceMappingURL=to-camel-case.d.ts.map