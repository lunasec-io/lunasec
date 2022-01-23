/*
 * Copyright 2022 by LunaSec (owned by Refinery Labs, Inc)
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
import { useEffect } from 'react';

import { THEME } from '../constants';

import useLocalStorage from './useLocalStorage';

export type ThemeChoice = typeof THEME[keyof typeof THEME];

function useSettingsState(key: string, initialValue: ThemeChoice): [string, (themeChoice: ThemeChoice) => void] {
  const [value, setValue] = useLocalStorage<ThemeChoice>(key, initialValue);

  useEffect(() => {
    // Set data attribute on body element
    document.body.dataset[key] = value;

    // Replace style sheet if dark theme gets toggled
    if (key === 'theme') {
      const theme = value === 'dark' ? 'dark' : 'light';
      const stylesheet = document.querySelector('.js-stylesheet');
      if (!stylesheet) throw new Error('missing theme stylesheet');
      stylesheet.setAttribute('href', `/css/${theme}.css`);
    }
  }, [value, key]);

  return [value, setValue];
}

export default useSettingsState;
