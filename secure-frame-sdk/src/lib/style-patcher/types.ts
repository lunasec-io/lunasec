
export type SupportedElement = HTMLElement | SVGElement;

export type SupportedElementTagNameMap = HTMLElementTagNameMap &
  SVGElementTagNameMap;

export type SupportedElementTagName = keyof SupportedElementTagNameMap;

export type StyleSnapshot = Record<string, string>;

export type PesudoStyleInfoMap = {
  [pseudo: string]: PseudoElementStyleInfo;
};

export interface ElementStyleInfo {
  style: StyleSnapshot;
  width: string;
  height: string;
  pseudo: PesudoStyleInfoMap;
}

export interface PseudoElementStyleInfo {
  style: StyleSnapshot;
}

export type StyleInfo = ElementStyleInfo | PseudoElementStyleInfo | null;
