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
import { useEffect } from 'react';

import { THEME } from '../constants';

import darkStyles from '../scss/main/dark.css-style-sheet.scss';
import lightStyles from '../scss/main/light.css-style-sheet.scss';

import useLocalStorage from './useLocalStorage';

export type ThemeChoice = typeof THEME[keyof typeof THEME];

function useSettingsState(key: string, initialValue: string): [string, (setTo: string) => void] {
  const [value, setValue] = useLocalStorage<ThemeChoice>(key, initialValue);

  useEffect(() => {
    // Set data attribute on body element
    document.body.dataset[key] = value;

    // Replace style sheet if dark theme gets toggled
    if (key === 'theme') {
      if (value === THEME.DARK) {
        // @ts-ignore
        document.adoptedStyleSheets = [darkStyles]
      } else {
        // @ts-ignore
        document.adoptedStyleSheets = [lightStyles]
      }
    }
  }, [value, key]);

  return [value, setValue];
}

export default useSettingsState;
