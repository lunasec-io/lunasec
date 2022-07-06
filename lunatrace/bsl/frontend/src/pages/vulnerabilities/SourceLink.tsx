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
import { ExternalLink } from 'react-feather';

import { formatAdvisoryUrlForSource } from '../../utils/advisory';

interface SourceLinkProps {
  source: string;
  sourceId: string;
}

export const SourceLink: React.FunctionComponent<SourceLinkProps> = ({ source, sourceId }) => {
  const vulnSourceHref = formatAdvisoryUrlForSource(source, sourceId);

  if (!vulnSourceHref) {
    return <>{source}</>;
  }

  return (
    <a target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} href={vulnSourceHref}>
      <ExternalLink size="1em" className="mb-1 me-1" />
      {source}
    </a>
  );
};
