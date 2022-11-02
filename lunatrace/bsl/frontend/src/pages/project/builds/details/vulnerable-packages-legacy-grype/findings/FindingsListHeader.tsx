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
import { severityOrder } from '@lunatrace/lunatrace-common/build/main';
import React from 'react';
import { Accordion } from 'react-bootstrap';

import { pluralizeIfMultiple } from '../../../../../../utils/string-utils';

interface FindingsListHeaderProps {
  filteredFindingsCount: number;
  shouldFilterFindings: boolean;
  severityFilter: number;
}

export const FindingsListHeader: React.FunctionComponent<FindingsListHeaderProps> = ({
  filteredFindingsCount,
  shouldFilterFindings,
  severityFilter,
}) => {
  const getSeverityDescription = () => {
    const appliedSecurityFilter = shouldFilterFindings && severityOrder[severityFilter] !== 'unknown';
    if (appliedSecurityFilter) {
      const extraSeverityInfo = severityFilter < severityOrder.indexOf('critical') ? ' (or higher) ' : ' ';
      return severityOrder[severityFilter] + extraSeverityInfo;
    }
    return '';
  };

  const severityDescription = getSeverityDescription();

  const headerTitle = severityDescription + 'finding';
  const formattedHeaderTitle = pluralizeIfMultiple(filteredFindingsCount, headerTitle, true);

  return <Accordion.Header>{formattedHeaderTitle}</Accordion.Header>;
};
