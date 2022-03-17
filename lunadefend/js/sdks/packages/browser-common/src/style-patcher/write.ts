/*
 * Copyright 2021 by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { generateCssText } from './dom-utils';
import { StyleInfo, SupportedElement } from './types';

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
   *
   */
  // This is brittle but checking for display: inline was not working.
  // Remember to add any inline elements we need here
  // Another option is to use HTML5 content categories "phrasing content" but worried about browser support
  if (target.nodeName !== 'SPAN') {
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
