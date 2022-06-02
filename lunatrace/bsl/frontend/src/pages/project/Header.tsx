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
import { Col, Row } from 'react-bootstrap';
import { AiFillGithub } from 'react-icons/ai';
import { BiLinkExternal, BiUnlink } from 'react-icons/bi';
import { BsChatSquareText } from 'react-icons/bs';

import { LinkInNewTab } from '../../components/utils/LinkInNewTab';
import { truncateString } from '../../utils/string-utils';

export interface ProjectHeaderProps {
  projectName: string;
  organizationName?: string;
  githubLink?: string;
  description?: string;
}
export const ProjectHeader: React.FunctionComponent<ProjectHeaderProps> = ({
  projectName,
  organizationName,
  githubLink,
  description,
}) => {
  const renderGithubInfo = () => {
    if (!githubLink) {
      return (
        <p>
          <BiUnlink size="1rem" className="me-1 mb-1" />
          Not linked to a GitHub Repository
        </p>
      );
    }

    return (
      <LinkInNewTab href={githubLink}>
        <p>
          <AiFillGithub size="1rem" className="me-1 mb-1" />
          GitHub
          <BiLinkExternal size=".8em" className="mb-1 ms-1" />
        </p>
      </LinkInNewTab>
    ); // const github_traits: GithubTraits = project.github_repository.traits;
    // return (
    //
    // );
  };

  return (
    <Row className="justify-content-center">
      <Col xs="12" md="auto" className={description ? 'text-center text-md-start' : 'text-center'}>
        <h1 className="">{projectName} </h1>
        {organizationName && <h5 className="darker">{organizationName}</h5>}
        {renderGithubInfo()}
      </Col>

      {description && (
        <Col xs="4" className="d-none d-md-block">
          <p className="pt-2 ps-2" style={{ fontSize: '.9rem' }}>
            <BsChatSquareText className="me-2" size={18} />
            {truncateString(description, 150)}
          </p>
        </Col>
      )}
    </Row>
  );
};
