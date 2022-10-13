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
import { NavLink } from 'react-router-dom';

import { Guide } from '../types';

export const GuideBlurb: React.FC<{ guide: Guide }> = ({ guide }) => {
  return (
    <>
      <h2 className={'d-md-inline-block'}>{guide.title}</h2>
      <p className={'ms-md-1'}>
        {guide.summary} <NavLink to={`/guides/${guide.id}`}>Read more...</NavLink>
      </p>
    </>
  );
};
