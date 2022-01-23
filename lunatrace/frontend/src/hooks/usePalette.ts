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
import { useEffect, useState } from 'react';

import { THEME, THEME_PALETTE_DARK, THEME_PALETTE_LIGHT } from '../constants';

import useTheme from './useTheme';

const usePalette = () => {
  const { theme } = useTheme();

  const [palette, setPalette] = useState(THEME_PALETTE_LIGHT);

  useEffect(() => {
    if (theme === THEME.DARK) {
      setPalette(THEME_PALETTE_DARK);
    } else {
      setPalette(THEME_PALETTE_LIGHT);
    }
  }, [theme]);

  return palette;
};

export default usePalette;
