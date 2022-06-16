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
import { IconType } from 'react-icons';
import { FiFilePlus, FiGithub, FiGitMerge, FiTerminal } from 'react-icons/fi';

import { BuildDetailInfo } from './types';

type SourceType = BuildDetailInfo['source_type'];

export const SourceIcon: React.FC<{ source_type: SourceType } & React.ComponentProps<IconType>> = (props) => {
  const { source_type, ...remainingProps } = props;
  if (source_type === 'pr') {
    return <FiGithub {...remainingProps} />;
  }
  if (source_type === 'gui') {
    return <FiFilePlus {...remainingProps} />;
  }
  if (source_type === 'cli') {
    return <FiTerminal {...remainingProps} />;
  }
  if (source_type === 'default_branch') {
    return <FiGitMerge {...remainingProps} />;
  }
  return null;
};
