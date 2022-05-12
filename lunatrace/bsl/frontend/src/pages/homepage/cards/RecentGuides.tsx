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
import { Card, Modal } from 'react-bootstrap';
import { BsChatSquareText } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';

import api from '../../../api';

export const RecentGuidesCard: React.FC = () => {
  const { data } = api.useGetAllGuidesQuery();
  // Get some filler projects so we have something to show brand new users
  // will be replaced with real data once they start clicking projects

  const renderGuidesList = () => {
    if (!data || !data.guides) {
      return null;
    }
    return data.guides.slice(0, 4).map((g) => {
      return (
        <h4 key={g.id}>
          <NavLink to={`/guides/${g.id}`}>{g.title}</NavLink>
        </h4>
      );
    });
  };
  return (
    <Card>
      <Modal.Header>
        <h4 className="mb-n2">
          <BsChatSquareText size="1.6rem" className="me-2 mb-1" /> Latest LunaTrace Guides
        </h4>
      </Modal.Header>
      <Modal.Body>{renderGuidesList()}</Modal.Body>
    </Card>
  );
};
