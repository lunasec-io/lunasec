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
import classNames from 'classnames';
import React, { useState } from 'react';
import { Badge, FloatingLabel, Form, FormControl, OverlayTrigger, Spinner, Tooltip } from 'react-bootstrap';
import { XSquare } from 'react-feather';
import { useParams } from 'react-router-dom';

import api from '../../../../../../../api';
import { ConfirmationDailog } from '../../../../../../../components/ConfirmationDialog';
import { CweBadge } from '../../../../../../vulnerabilities/detail/CweBadge';
import { vulnerabilityOpenInQuickView, vulnerabilityQuickViewState } from '../../../../state';
import { QuickViewProps } from '../../../../types';
import { VulnMeta } from '../../types';

interface VulnerabilityTableItemProps {
  vulnMeta: VulnMeta;
  quickView: QuickViewProps;
}

export const VulnInfoTableRow: React.FC<VulnerabilityTableItemProps> = ({ vulnMeta, quickView }) => {
  const [insertVulnIgnore, insertVulnIgnoreState] = api.useInsertIgnoredVulnerabilitiesMutation();
  const { project_id } = useParams();

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [ignoreNote, setIgnoreNote] = useState('');

  const renderIgnoreNote = () => {
    if (!vulnMeta.ignored_vulnerability) {
      return null;
    }

    const rawNote = vulnMeta.ignored_vulnerability.note;
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
          vulnerability_id: vulnMeta.vulnerability.id,
          note: ignoreNote,
          locations: [vulnMeta.path],
        },
      ],
    });
    setIgnoreNote('');
  };

  const getIgnoreButton = () => {
    if (vulnMeta.ignored) {
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

  const rowClassNames = classNames('vuln-table-item', {
    open: vulnerabilityOpenInQuickView(quickView.quickViewState, vulnMeta.vulnerability.id),
    ignored: vulnMeta.ignored,
  });

  const fixVersions = vulnMeta.fix_versions;

  const rowValues = [
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip className="wide-tooltip">{vulnMeta.vulnerability.summary}</Tooltip>}
      key={vulnMeta.vulnerability.id}
    >
      <Badge
        bg={'light'}
        style={{ cursor: 'pointer' }}
        onClick={(e) => {
          quickView.setVulnQuickViewState(vulnerabilityQuickViewState(vulnMeta.vulnerability.id));
        }}
      >
        {vulnMeta.vulnerability.source_id}
      </Badge>
    </OverlayTrigger>,
    <div key={vulnMeta.vulnerability.id}>
      {vulnMeta.vulnerability.cwes.map((c) => (
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
    vulnMeta.vulnerability.severity_name,
    vulnMeta.vulnerability.cvss_score ? vulnMeta.vulnerability.cvss_score : 'Unknown',
    fixVersions.length > 0 ? fixVersions.join(', ') : 'None',
    getIgnoreButton(),
  ];

  return (
    <>
      <tr className={rowClassNames} key={vulnMeta.vulnerability.id}>
        {rowValues.map((value, idx) => {
          const classNames = vulnMeta.ignored ? 'text-decoration-line-through' : '';
          return (
            <td key={idx} className={classNames}>
              {value}
            </td>
          );
        })}
      </tr>
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
