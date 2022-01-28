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
