import { StyleSnapshot, SupportedElement, SupportedElementTagName, SupportedElementTagNameMap } from './types';
import { ELEMENT_ATTRIBUTE_WHITELIST, PARENT_ELEMENT_STYLE_ATTRIBUTES, SKIPPED_PROPERTIES } from './constants';

export function isTagName<T extends SupportedElementTagName>(
  el: SupportedElement,
  tagNames: T[]
): el is SupportedElementTagNameMap[T] {
  return (tagNames as string[]).indexOf(el.tagName.toLowerCase()) !== -1;
}

export function createStyleElement(doc: Document, css: string): HTMLStyleElement {
  const style = doc.createElement('style');
  style.appendChild(doc.createTextNode(css));

  return style;
}

export function getStyleSnapshot(style: CSSStyleDeclaration): StyleSnapshot {
  const snapshot = Object.create({});
  for (let i = 0; i < style.length; i++) {
    const prop = style[i];
    snapshot[prop] = style.getPropertyValue(prop);
  }

  return snapshot;
}

export function filterStyleWith(style: StyleSnapshot, filterFn: (key: string) => boolean): StyleSnapshot {
  return Object.keys(style).reduce((outputStyle, key) => {
    const shouldSkip = SKIPPED_PROPERTIES.some((skipped) => key.startsWith(skipped));
    if (shouldSkip) {
      return outputStyle;
    }

    if (filterFn(key)) {
      outputStyle[key] = style[key];
    }

    return outputStyle;
  }, {} as StyleSnapshot);
}

export function getChildStyle(style: StyleSnapshot) {
  function filterChildAttributes(key: string) {
    return ELEMENT_ATTRIBUTE_WHITELIST.some((property) => property === key.toLowerCase());
  }

  return filterStyleWith(style, filterChildAttributes);
}

export function getParentStyle(style: StyleSnapshot) {
  function filterChildAttributes(key: string) {
    return PARENT_ELEMENT_STYLE_ATTRIBUTES.some((property) => property === key.toLowerCase());
  }

  return filterStyleWith(style, filterChildAttributes);
}

export function generateCssText(style: StyleSnapshot): string {
  const declarations = [];

  for (const key in style) {
    if (!style.hasOwnProperty(key)) {
      continue;
    }
    declarations.push(`${key}:${style[key]};`);
  }

  return declarations.join('');
}

export function generatePseudoElementCSS(target: SupportedElement, selector: string, cssText: string): string {
  if (!cssText) {
    return '';
  }

  // TODO: Is this a security issue?
  return `#${target.id}${selector}{${cssText}}`;
}
