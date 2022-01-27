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
import React from 'react';

import { THEME } from '../constants';
import useSettingsState from '../hooks/useSettingsState';

// const initialState = {
//   theme: THEME.DEFAULT,
// };

interface ThemeContextInterface {
  theme: typeof THEME[keyof typeof THEME];
  setTheme: (themeChoice: typeof THEME[keyof typeof THEME]) => void;
}

// This default never gets used, just an annoying react pattern to make the types happy
const ThemeContext = React.createContext<ThemeContextInterface>({
  theme: THEME.DEFAULT,
  setTheme: (_themeChoice) => {
    return;
  },
});

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useSettingsState('theme', THEME.DEFAULT);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeProvider, ThemeContext };
