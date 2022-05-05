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

import { Topic } from './types';

export const TopicBlurb: React.FC<{ topic: Topic }> = ({ topic }) => {
  return (
    <>
      <h2 className={'d-md-inline-block'}>{topic.title}</h2>
      <p className={'ms-md-1'}>
        {topic.summary} <NavLink to={`/topics/${topic.id}`}>Read more...</NavLink>
      </p>
    </>
  );
};
