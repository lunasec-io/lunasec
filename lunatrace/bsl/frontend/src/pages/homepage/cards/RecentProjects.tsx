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
import { AiFillFolderOpen } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';

import api from '../../../api';
import { useRecentProjects } from '../../../hooks/useRecentProjects';

export const RecentProjectsCard: React.FC = () => {
  const { data } = api.useGetSidebarInfoQuery();
  // Get some filler projects so we have something to show brand new users
  // will be replaced with real data once they start clicking projects
  const fillerProjects = data?.projects.slice(0, 4) || [];
  const [recentProjects] = useRecentProjects(fillerProjects);

  return (
    <Card>
      <Modal.Header>
        <h4 className="mb-n2">
          <AiFillFolderOpen size="2rem" className="me-1 mb-1" /> Your Recent Projects
        </h4>
      </Modal.Header>
      <Modal.Body>
        {recentProjects.slice(0, 4).map((recentProject) => {
          return (
            <h4 key={recentProject.id}>
              <NavLink to={`/project/${recentProject.id}`}>{recentProject.name}</NavLink>
            </h4>
          );
        })}
      </Modal.Body>
    </Card>
  );
};
