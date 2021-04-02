
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
  pseudo: PesudoStyleInfoMap;
}

export interface PseudoElementStyleInfo {
  style: StyleSnapshot;
}

export type StyleInfo = ElementStyleInfo | null;

export interface ReadElementStyle {
  parentStyle: StyleSnapshot,
  width: string;
  height: string;
  childStyle: ElementStyleInfo
}
