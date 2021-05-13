import { StyleInfo, SupportedElement } from './types';
import { generateCssText } from './dom-utils';

// TODO: Figure out if this is a security concern before re-enabling
export function patchStyle(target: SupportedElement, styleInfo: StyleInfo): void {
  if (!styleInfo) {
    return;
  }

  const { style } = styleInfo;
  // also possible to concat target.style.cssText onto this, but for now we don't have any, so forget it
  target.style.cssText = generateCssText(style);

  /**
   * Patch size
   *
   * TODO: how to deal with inline elements?
   */
  if (style.display !== 'inline') {
    target.style.boxSizing = 'border-box';
    target.style.width = '100%';
    target.style.height = '100%';
    target.style.maxWidth = 'none';
    target.style.minWidth = 'auto';
  }

  // TODO: Pseudo element support is disabled.
  // const pseudoCssTextList = [];
  //
  //
  // for (const selector in pseudo) {
  //
  //   const pseudoStyleInfo = pseudo[selector];
  //   const pseudoDefaultStyleInfo = pseudoDefault[selector];
  //
  //   if (!pseudoDefaultStyleInfo) {
  //     continue;
  //   }
  //
  //   const pseudoStyle = pseudoStyleInfo && pseudoStyleInfo.style;
  //   const pseudoDefaultStyle = pseudoDefaultStyleInfo && pseudoDefaultStyleInfo.style;
  //   const cssText = generateCssText(
  //     getStyleDiff(pseudoStyle, pseudoDefaultStyle)
  //   );
  //
  //   const css = generatePseudoElementCSS(target, selector, cssText);
  //
  //   if (css) {
  //     pseudoCssTextList.push(css);
  //   }
  // }
  //
  // if (pseudoCssTextList.length) {
  //   const style = createStyleElement(doc, pseudoCssTextList.join("\n"));
  //
  //   target.appendChild(style);
  // }
}
