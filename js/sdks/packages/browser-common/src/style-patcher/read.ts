import { getChildStyle, getParentStyle, getStyleSnapshot } from './dom-utils';
import { PesudoStyleInfoMap, ReadElementStyle, SupportedElement } from './types';
// import {
//   NO_GENERATE_CONTENT_ELEMENTS,
//   PLACEHOLDER_ELEMENTS,
//   // SUPPORTED_PSEUDO_SELECTORS
// } from './constants';

export function getStyleInfo(source: SupportedElement, pseudoSelector?: string): ReadElementStyle | null {
  const computed = window.getComputedStyle(source, pseudoSelector);
  const allStyleInfo = getStyleSnapshot(computed);
  const framedInputStyle = getChildStyle(allStyleInfo);
  const parentStyle = getParentStyle(allStyleInfo);
  const { display, content } = framedInputStyle;

  if (display === 'none' || (pseudoSelector && content === 'none')) {
    console.debug("Can't generate style from hidden element ", source);
    return null;
  }

  if (!pseudoSelector) {
    const { width, height } = source.getBoundingClientRect();

    const allPseudoStyleInfo: PesudoStyleInfoMap = Object.create(null);

    // TODO: Figure out implementing pseudo selectors for cloned element
    // for (const selector of SUPPORTED_PSEUDO_SELECTORS) {
    //   const pseudoStyleInfo = getStyleInfo(source, selector);
    //
    //   if (pseudoStyleInfo) {
    //     allPseudoStyleInfo[selector] = pseudoStyleInfo;
    //   }
    // }

    return {
      parentStyle: parentStyle,
      width: `${width}px`,
      height: `${height}px`,
      childStyle: {
        style: framedInputStyle,
        pseudo: allPseudoStyleInfo,
      },
    };
  }

  throw new Error('Pseudo selector support is broken. Fix it if you want it');

  // pseudo elements
  // if (
  //   content === "none" ||
  //   (pseudoSelector === "::marker" && display !== "list-item") ||
  //   ((pseudoSelector === "::before" || pseudoSelector === "::after") &&
  //     isTagName(source as SupportedElement, NO_GENERATE_CONTENT_ELEMENTS)) ||
  //   (pseudoSelector === "::placeholder" &&
  //     !isTagName(source as SupportedElement, PLACEHOLDER_ELEMENTS))
  // ) {
  //   return null;
  // }
  //
  // return {
  //   style,
  // };
}
