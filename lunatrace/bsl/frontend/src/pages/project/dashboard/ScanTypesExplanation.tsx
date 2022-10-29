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
import { Card, Row } from 'react-bootstrap';
import { AiFillGithub } from 'react-icons/ai';

import { ConditionallyRender } from '../../../components/utils/ConditionallyRender';
import { GithubAppUrl } from '../../../constants';
import { ProjectInfo, SetActiveTab } from '../types';

export const ScanTypesExplanation: React.FC<{ setActiveTab: SetActiveTab; project: ProjectInfo }> = ({
  setActiveTab,
  project,
}) => {
  return (
    <>
      <Row className="justify-content-center mb-3">
        <h4 className="text-center mt-3">Ways to take a snapshot</h4>

        {/*<Card className="">*/}
        {/*  <Card.Body className="">*/}
        <ConditionallyRender if={project.github_repository}>
          <Card.Title>
            <AiFillGithub className="m-3" size="40px" />
            GitHub PR Scan
          </Card.Title>
          <Card.Subtitle className="darker homepage-subtitle">
            Projects imported from GitHub will automatically take a snapshot of pull-requests, and notify of any
            critical vulnerabilities in a comment on the PR.
          </Card.Subtitle>
          <Card.Title>
            <AiFillGithub className="m-3" size="40px" />
            Commits to default branch
          </Card.Title>
          <Card.Subtitle className="darker homepage-subtitle">
            Commits made to the default branch of the repository will have their snapshot taken.
          </Card.Subtitle>
        </ConditionallyRender>
        {/*<Card.Title>*/}
        {/*  {' '}*/}
        {/*  <AiFillCode size="40px" className="m-3" />*/}
        {/*  LunaTrace CLI*/}
        {/*</Card.Title>*/}
        {/*<Card.Subtitle className={`darker homepage-subtitle active`}>*/}
        {/*  Use the{' '}*/}
        {/*  <a href={process.env.REACT_APP_GITHUB_CLI_DOWNLOAD_LINK || ''} target="_blank" rel="noopener noreferrer">*/}
        {/*    LunaTrace CLI*/}
        {/*  </a>{' '}*/}
        {/*  with a{' '}*/}
        {/*  <a onClick={() => setActiveTab('secrets')} className="btn-link">*/}
        {/*    secret key*/}
        {/*  </a>{' '}*/}
        {/*  to upload snapshots from the command line. This is particularly useful for built artifacts such as .jar files,*/}
        {/*  docker containers, and anything you want to scan that isn&apos;t committed to the repository. Often done from*/}
        {/*  a CI job.*/}
        {/*</Card.Subtitle>*/}
        {/*<Card.Title>*/}
        {/*  {' '}*/}
        {/*  <AiFillDiff className="m-3" size="40px" />*/}
        {/*  Drag and Drop*/}
        {/*</Card.Title>*/}
        {/*<Card.Subtitle className={`darker homepage-subtitle`}>*/}
        {/*  Use the drag and drop box to do a one-off snapshot of an artifact. Works on many file types such as built*/}
        {/*  artifacts (like .jar files), manifest files (like package-lock.json), tarred docker images, or an archive of*/}
        {/*  your entire repo.*/}
        {/*</Card.Subtitle>*/}
        <ConditionallyRender if={!project.github_repository}>
          <Card.Title className="darker">
            <AiFillGithub className="m-3" size="40px" />
            GitHub PR Scan
          </Card.Title>
          <Card.Subtitle className="darker homepage-subtitle">
            This project is not linked to GitHub. To import a project from GitHub and begin automatic scanning,{' '}
            <a href={GithubAppUrl}>click here</a>.
          </Card.Subtitle>
        </ConditionallyRender>
        {/*  </Card.Body>*/}
        {/*</Card>*/}

        {/*<Col md="4">*/}
        {/*  <Card style={{ height: '100%' }}>*/}
        {/*    <Card.Body>*/}
        {/*      <Card.Title className="text-center">*/}
        {/*        <AiFillCode size="40px" className="m-3" />*/}

        {/*        <h3>LunaTrace CLI Scan</h3>*/}
        {/*      </Card.Title>*/}
        {/*      <span>*/}
        {/*        Use the LunaTrace CLI LINK with a{' '}*/}
        {/*        <a onClick={() => setActiveTab('secrets')} className="btn-link">*/}
        {/*          secret key*/}
        {/*        </a>{' '}*/}
        {/*        to upload snapshots from the command line. This is particularly useful for built artifacts such as .jar*/}
        {/*        files, docker containers, and anything you want to scan that isn&apos;t committed to the repository.*/}
        {/*      </span>*/}
        {/*    </Card.Body>*/}
        {/*  </Card>*/}
        {/*</Col>*/}
        {/*<Col md="4">*/}
        {/*  <Card style={{ height: '100%' }}>*/}
        {/*    <Card.Body>*/}
        {/*      <Card.Title className="text-center">*/}
        {/*        <AiFillDiff className="m-3" size="40px" />*/}
        {/*        <h3>Drag and Drop Scan</h3>*/}
        {/*      </Card.Title>*/}

        {/*      <span>*/}
        {/*        Use the drag and drop box to do a one-off snapshot of an artifact. Works on everything from manifest*/}
        {/*        files (such as package-lock.json) to built artifacts (like .jars) to zip files of your entire repo.*/}
        {/*      </span>*/}
        {/*    </Card.Body>*/}
        {/*  </Card>*/}
        {/*</Col>*/}
        {/*<Col md="4">*/}
        {/*  <Card style={{ height: '100%' }}>*/}
        {/*    <Card.Body>*/}
        {/*      <Card.Title className="text-center">*/}
        {/*        <AiFillGithub className="m-3" size="40px" />*/}

        {/*        <h3>GitHub Automatic Scan</h3>*/}
        {/*      </Card.Title>*/}
        {/*      <span>*/}
        {/*        If this project was imported from github, PRs will automatically be scanned. Configure or disable this*/}
        {/*        in settings.*/}
        {/*      </span>*/}
        {/*    </Card.Body>*/}
        {/*  </Card>*/}
        {/*</Col>*/}
      </Row>
    </>
  );
};
