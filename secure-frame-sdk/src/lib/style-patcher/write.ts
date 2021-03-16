import {
  ElementStyleInfo,
  StyleInfo,
  StyleSnapshot,
  SupportedElement
} from './types';
import {
  createStyleElement,
  generateCssText,
  generatePseudoElementCSS,
  getStyleDiff
} from './dom-utils';

// TODO: Figure out if this is a security concern before re-enabling
export function patchStyle(
  doc: Document,
  target: SupportedElement,
  styleInfo: StyleInfo,
  defaultStyleInfo?: StyleInfo
): void {
  if (!styleInfo) {
    return;
  }

  const { style, width, height, pseudo } = styleInfo as ElementStyleInfo;
  const defaultStyle = defaultStyleInfo?.style || {} as StyleSnapshot;
  const pseudoDefault = (defaultStyleInfo as ElementStyleInfo)?.pseudo || {};

  const cssText = generateCssText(
    getStyleDiff(style, defaultStyle)
  );
  target.style.cssText = cssText + target.style.cssText;

  /**
   * Patch size
   *
   * TODO: how to deal with inline elements?
   */
  if (style.display !== "inline") {
    target.style.boxSizing = "border-box";
    target.style.width = width;
    target.style.height = height;
    target.style.maxWidth = "none";
    target.style.minWidth = "auto";
  }

  const pseudoCssTextList = [];


  for (const selector in pseudo) {

    const pseudoStyleInfo = pseudo[selector];
    const pseudoDefaultStyleInfo = pseudoDefault[selector];

    if (!pseudoDefaultStyleInfo) {
      continue;
    }

    const pseudoStyle = pseudoStyleInfo && pseudoStyleInfo.style;
    const pseudoDefaultStyle = pseudoDefaultStyleInfo && pseudoDefaultStyleInfo.style;
    const cssText = generateCssText(
      getStyleDiff(pseudoStyle, pseudoDefaultStyle)
    );

    const css = generatePseudoElementCSS(target, selector, cssText);

    if (css) {
      pseudoCssTextList.push(css);
    }
  }

  if (pseudoCssTextList.length) {
    const style = createStyleElement(doc, pseudoCssTextList.join("\n"));

    target.appendChild(style);
  }
}
