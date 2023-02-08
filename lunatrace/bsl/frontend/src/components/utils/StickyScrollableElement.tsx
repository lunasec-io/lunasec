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
import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { FCWithChildren } from '../../types/common-prop-types';

interface StickyScrollableElementProps {
  enabled?: boolean;
}

export const StickyScrollableElement: FCWithChildren<StickyScrollableElementProps> = ({ enabled = true, children }) => {
  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <div className="h-100">
      <div className="pt-4" style={{ position: 'sticky', top: 0, height: '100vh' }}>
        <PerfectScrollbar>{children}</PerfectScrollbar>
      </div>
    </div>
  );
};
