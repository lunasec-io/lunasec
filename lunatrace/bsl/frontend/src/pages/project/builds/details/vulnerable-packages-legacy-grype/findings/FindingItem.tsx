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
import { checkIfFindingIgnored } from '@lunatrace/lunatrace-common/build/main';
import { getCvssVectorFromSeverities } from '@lunatrace/lunatrace-common/build/main/cvss';
import classNames from 'classnames';
import React, { useState } from 'react';
import { FloatingLabel, Form, FormControl, OverlayTrigger, Spinner, Tooltip } from 'react-bootstrap';
import { XSquare } from 'react-feather';
import { useParams } from 'react-router-dom';
import semver from 'semver';

import api from '../../../../../../api';
import { ConfirmationDailog } from '../../../../../../components/ConfirmationDialog';
import { toTitleCase } from '../../../../../../utils/string-utils';
import { CweBadge } from '../../../../../vulnerabilities/detail/CweBadge';
import { vulnerabilityOpenInQuickView, vulnerabilityQuickViewState } from '../../../state';
import { QuickViewProps } from '../../../types';
import { Finding } from '../types';

interface VulnerabilityTableItemProps {
  finding: Finding;
  quickView: QuickViewProps;
  patchable: string | undefined;
}

export const FindingItem: React.FC<VulnerabilityTableItemProps> = ({ finding, quickView, patchable }) => {
  const [insertVulnIgnore, insertVulnIgnoreState] = api.useInsertIgnoredVulnerabilitiesMutation();
  const { project_id } = useParams();

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [ignoreNote, setIgnoreNote] = useState('');

  const findingIsIgnored = checkIfFindingIgnored(finding);

  const renderIgnoreNote = () => {
    if (!findingIsIgnored) {
      return null;
    }

    const rawNote = finding.vulnerability.ignored_vulnerabilities[0].note;
    const ignoredNotePretty = rawNote
      ? `Ignored with note: ${rawNote}`
      : 'Vulnerability has been ignored without a reason.';
    return <span>{ignoredNotePretty}</span>;
  };
  const ignoreVuln = async () => {
    await insertVulnIgnore({
      objects: [
        {
          project_id: project_id,
          vulnerability_id: finding.vulnerability_id,
          note: ignoreNote,
          locations: finding.locations,
        },
      ],
    });
    setIgnoreNote('');
  };

  const getIgnoreColumn = () => {
    if (findingIsIgnored) {
      return null;
    }
    if (insertVulnIgnoreState.isLoading) {
      return <Spinner size="sm" animation="border" />;
    }
    return (
      <XSquare
        className="ignore-vuln-button"
        onClick={(e) => {
          e.stopPropagation();
          setShowConfirmation(true);
        }}
      />
    );
  };

  const severity = getCvssVectorFromSeverities(finding.vulnerability.severities);

  const rowClassNames = classNames('vuln-table-item', {
    open: vulnerabilityOpenInQuickView(quickView.quickViewState, finding.vulnerability_id),
    ignored: findingIsIgnored,
  });

  // TODO (cthompson) this should be moved into common
  // TODO: (forrest) All this logic should get moved into the backend if possible eventually, frontend should be thin
  const fixVersions = finding.vulnerability.affected
    // only get affected packages from vulnerability that match finding package
    .filter(
      (affected) => finding.type === affected.package?.package_manager && finding.package_name === affected.package.name
    )
    // get fix events from vulnerability
    // TODO: switch to using the better range table
    .reduce((fixedEvents, affected) => {
      const affectedRangeFixedEvents = affected.affected_range_events
        .filter((range) => range.event === 'fixed')
        .map((range) => range.version);
      return [...fixedEvents, ...affectedRangeFixedEvents];
    }, [] as string[])
    // sort versions ascending
    .sort((a, b) => (semver.gt(a, b) ? 1 : -1));

  const rowValues = [
    finding.vulnerability.source,
    finding.vulnerability.source_id,
    <div key={finding.vulnerability.id}>
      {finding.vulnerability.cwes.map((c) => (
        <CweBadge
          key={c.id}
          id={c.cwe.id}
          name={c.cwe.name}
          common_name={c.cwe.common_name || undefined}
          quickView={quickView}
          tooltipDescription={true}
        />
      ))}
    </div>,
    severity ? toTitleCase(severity.cvss3OverallSeverityText) : 'unknown',
    severity ? severity.overallScore : 'unknown',
    fixVersions.length > 0 ? fixVersions.join(', ') : 'none',
    getIgnoreColumn(),
  ];

  return (
    <>
      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip className="wide-tooltip">{finding.vulnerability.summary}</Tooltip>}
        key={finding.id}
      >
        <tr
          style={{ cursor: 'pointer' }}
          onClick={(e) => {
            quickView.setVulnQuickViewState(vulnerabilityQuickViewState(finding.vulnerability_id as string));
          }}
          className={rowClassNames}
          key={finding.id}
        >
          {rowValues.map((value, idx) => {
            const classNames = findingIsIgnored ? 'text-decoration-line-through' : '';
            return (
              <td key={idx} className={classNames}>
                {value}
              </td>
            );
          })}
        </tr>
      </OverlayTrigger>
      {renderIgnoreNote()}

      <ConfirmationDailog
        title={`Ignore Finding`}
        body={(
          <>
            <p>
              Whenever this vulnerability is found in this project, it will be ignored. If it is found at a different
              location the project (ex. a different manifest file) it will appear again. The ability to undo this choice
              is coming in a future update.
            </p>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                setShowConfirmation(false);
                void ignoreVuln();
              }}
            >
              <FloatingLabel controlId="floatingInput" label="Reason (optional)" className="mb-3">
                <FormControl
                  value={ignoreNote}
                  onChange={(e) => setIgnoreNote(e.target.value)}
                  required={false}
                  placeholder="Enter reason"
                />
              </FloatingLabel>
            </Form>
          </>
        )}
        onClose={(success) => {
          setShowConfirmation(false);
          if (success) {
            void ignoreVuln();
          }
        }}
        show={showConfirmation}
      />
    </>
  );
};
