import {
  StyleSnapshot,
  SupportedElement,
  SupportedElementTagName,
  SupportedElementTagNameMap
} from './types';
import {SKIPPED_PROPERTIES} from './constants';

export function isTagName<T extends SupportedElementTagName>(
  el: SupportedElement,
  tagNames: T[]
): el is SupportedElementTagNameMap[T] {
  return (tagNames as string[]).indexOf(el.tagName.toLowerCase()) !== -1;
}

export function createStyleElement(doc: Document, css: string): HTMLStyleElement {
  const style = doc.createElement("style");
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

export function getStyleDiff(
  currentStyle: StyleSnapshot,
  defaultStyle: StyleSnapshot
): StyleSnapshot {
  const diff = Object.create({});

  for (const key in currentStyle) {
    // Note: I'm not 100% certain if this is required or not.
    if (!currentStyle.hasOwnProperty(key)) {
      continue;
    }

    // If the keys match, don't add to the diff.
    if (currentStyle[key] === defaultStyle[key]) {
      continue;
    }

    const shouldSkip = SKIPPED_PROPERTIES.some(skipped => key.startsWith(skipped));
    if (shouldSkip) {
      continue;
    }

    diff[key] = currentStyle[key];
  }

  return diff;
}

export function generateCssText(style: StyleSnapshot): string {
  const declarations = [];

  for (const key in style) {
    if (!style.hasOwnProperty(key)) {
      continue;
    }
    declarations.push(`${key}:${style[key]};`);
  }

  return declarations.join("");
}

export function generatePseudoElementCSS(
  target: SupportedElement,
  selector: string,
  cssText: string
): string {
  if (!cssText) {
    return "";
  }

  // TODO: Is this a security issue?
  return `#${target.id}${selector}{${cssText}}`;
}

