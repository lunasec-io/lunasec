export declare type SupportedElement = HTMLElement | SVGElement;
export declare type SupportedElementTagNameMap = HTMLElementTagNameMap & SVGElementTagNameMap;
export declare type SupportedElementTagName = keyof SupportedElementTagNameMap;
export declare type StyleSnapshot = Record<string, string>;
export declare type PesudoStyleInfoMap = {
    [pseudo: string]: PseudoElementStyleInfo;
};
export interface ElementStyleInfo {
    style: StyleSnapshot;
    pseudo: PesudoStyleInfoMap;
}
export interface PseudoElementStyleInfo {
    style: StyleSnapshot;
}
export declare type StyleInfo = ElementStyleInfo | null;
export interface ReadElementStyle {
    parentStyle: StyleSnapshot;
    width: string;
    height: string;
    childStyle: ElementStyleInfo;
}
//# sourceMappingURL=types.d.ts.map