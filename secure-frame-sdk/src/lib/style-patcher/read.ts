// Code originally spliced from: https://github.com/Justineo/clone-element

import {
  PesudoStyleInfoMap,
  StyleInfo,
  SupportedElement
} from './types';
import {
  NO_GENERATE_CONTENT_ELEMENTS,
  PLACEHOLDER_ELEMENTS,
  SUPPORTED_PSEUDO_SELECTORS
} from './constants';
import {getStyleSnapshot, isTagName} from './dom-utils';

export function getStyleInfo(
  source: SupportedElement,
  pseudoSelector?: string
): StyleInfo {
  const computed = window.getComputedStyle(source, pseudoSelector);
  const style = getStyleSnapshot(computed);
  const { display, content } = style;

  if (display === "none" || (pseudoSelector && content === "none")) {
    return null;
  }

  if (!pseudoSelector) {
    const { width, height } = source.getBoundingClientRect();

    if (width * height === 0) {
      return null;
    }

    const allPseudoStyleInfo: PesudoStyleInfoMap = Object.create(null);

    for (const selector of SUPPORTED_PSEUDO_SELECTORS) {
      const pseudoStyleInfo = getStyleInfo(source, selector);

      if (pseudoStyleInfo) {
        allPseudoStyleInfo[selector] = pseudoStyleInfo;
      }
    }

    return {
      style,
      width: `${width}px`,
      height: `${height}px`,
      pseudo: allPseudoStyleInfo,
    };
  }

  // pseudo elements
  if (
    content === "none" ||
    (pseudoSelector === "::marker" && display !== "list-item") ||
    ((pseudoSelector === "::before" || pseudoSelector === "::after") &&
      isTagName(source as SupportedElement, NO_GENERATE_CONTENT_ELEMENTS)) ||
    (pseudoSelector === "::placeholder" &&
      !isTagName(source as SupportedElement, PLACEHOLDER_ELEMENTS))
  ) {
    return null;
  }

  return {
    style,
  };
}
