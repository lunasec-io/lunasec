/*
 * Copyright by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Business Source License v1.1
 * (the "License"); you may not use this file except in compliance with the
 * License. You may obtain a copy of the License at
 *
 * https://github.com/lunasec-io/lunasec/blob/master/licenses/BSL-LunaTrace.txt
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import debounce from 'debounce';
import { useEffect, useState } from 'react';

export const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

type Breakpoint = typeof breakpoints[number];

const resolveSize = (): Breakpoint => {
  const width = window.innerWidth;
  if (width < 576) {
    return 'xs';
  } else if (width >= 576 && width < 768) {
    return 'sm';
  } else if (width >= 768 && width < 992) {
    return 'md';
  } else if (width >= 992 && width < 1200) {
    return 'lg';
  } else if (width >= 1200 && width < 1440) {
    return 'xl';
  } else if (width >= 1440) {
    return 'xxl';
  }
  return 'xxl';
};

const isLargerThanCutoff = (cutoff: Breakpoint): boolean => {
  // Get the current breakpoint as a number
  const currentSizeIndex = breakpoints.indexOf(resolveSize());
  // Get the chosen breakpoint cutoff as a number
  const cutoffIndex = breakpoints.indexOf(cutoff);
  return currentSizeIndex >= cutoffIndex;
};

export const useBreakpoint = (cutoff: Breakpoint) => {
  if (!breakpoints.includes(cutoff)) {
    throw new Error(`Bad breakpoint size specified, use one of ${breakpoints}`);
  }

  const [passesCutoff, setPassesCutoff] = useState(() => isLargerThanCutoff(cutoff));

  useEffect(() => {
    const calcInnerWidth = debounce(function () {
      setPassesCutoff(isLargerThanCutoff(cutoff));
    }, 200);
    window.addEventListener('resize', calcInnerWidth);
    return () => window.removeEventListener('resize', calcInnerWidth);
  }, []);

  return passesCutoff;
};

export default useBreakpoint;
