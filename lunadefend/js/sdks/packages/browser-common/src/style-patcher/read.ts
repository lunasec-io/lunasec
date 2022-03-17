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
    const { width } = source.getBoundingClientRect();
    const height = getTotalHeight(source);
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

function getTotalHeight(el: SupportedElement) {
  const { height } = el.getBoundingClientRect();
  // const computedStyle = window.getComputedStyle(el);
  // const marginHeight = parseInt(computedStyle.marginTop) + parseInt(computedStyle.marginBottom);
  // Note: Disabling because this seems to be unnecessary now.
  return height; // + marginHeight;
}
