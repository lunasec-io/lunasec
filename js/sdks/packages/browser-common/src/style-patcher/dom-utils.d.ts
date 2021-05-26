import { StyleSnapshot, SupportedElement, SupportedElementTagName, SupportedElementTagNameMap } from './types';
export declare function isTagName<T extends SupportedElementTagName>(el: SupportedElement, tagNames: T[]): el is SupportedElementTagNameMap[T];
export declare function createStyleElement(doc: Document, css: string): HTMLStyleElement;
export declare function getStyleSnapshot(style: CSSStyleDeclaration): StyleSnapshot;
export declare function filterStyleWith(style: StyleSnapshot, filterFn: (key: string) => boolean): StyleSnapshot;
export declare function getChildStyle(style: StyleSnapshot): StyleSnapshot;
export declare function getParentStyle(style: StyleSnapshot): StyleSnapshot;
export declare function generateCssText(style: StyleSnapshot): string;
export declare function generatePseudoElementCSS(target: SupportedElement, selector: string, cssText: string): string;
//# sourceMappingURL=dom-utils.d.ts.map