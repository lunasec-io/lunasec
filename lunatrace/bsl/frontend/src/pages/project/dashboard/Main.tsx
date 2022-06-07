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
import React, { useContext } from 'react';
import { Accordion, Button } from 'react-bootstrap';
import { CopyBlock, dracula } from 'react-code-blocks';
import { AiFillGithub, AiOutlineInfoCircle } from 'react-icons/ai';
import { BiUnlink } from 'react-icons/bi';

import api from '../../../api';
import { UserContext } from '../../../contexts/UserContext';
import { ProjectInfo, SetActiveTab } from '../types';

import { ManifestDrop } from './ManifestDrop';
import { ScanTypesExplanation } from './ScanTypesExplanation';

interface ProjectDashboardMainProps {
  project: ProjectInfo;
  setActiveTab: SetActiveTab;
}

export const ProjectDashboardMain: React.FunctionComponent<ProjectDashboardMainProps> = ({ project, setActiveTab }) => {
  const { isAdmin } = useContext(UserContext);

  const [triggerGenerateProjectCloneUrl, projectCloneUrlResult] = api.useLazyGetProjectCloneUrlQuery();

  const generateProjectCloneUrl = async () => {
    await triggerGenerateProjectCloneUrl({
      project_id: project.id,
    });
  };

  const renderGithubInfo = () => {
    if (!project.github_repository) {
      return (
        <p className="text-center">
          <BiUnlink size="1rem" className="me-1 mb-1" />
          Not linked to a GitHub Repository
        </p>
      );
    }
    const githubRepo = project.github_repository;

    const getProjectUrl = () => {
      const projectUrlStr = githubRepo.traits.gitUrl;
      if (!projectUrlStr) {
        return '#';
      }
      const projectUrl = new URL(projectUrlStr);
      projectUrl.protocol = 'https:';
      return projectUrl.toString();
    };

    return (
      <a href={getProjectUrl()}>
        <p className="text-center">
          <AiFillGithub size="1rem" className="me-1 mb-1" />
          Imported from GitHub
        </p>
      </a>
    ); // const github_traits: GithubTraits = project.github_repository.traits;
    // return (
    //
    // );
  };
  const cloneProjectDetails = () => {
    const { data } = projectCloneUrlResult;
    if (!data) {
      return null;
    }

    const cloneUrl = data.projects_by_pk?.github_repository?.authenticated_clone_url?.url;

    if (!cloneUrl) {
      return null;
    }

    const formattedCloneUrl = cloneUrl.replace('git://', 'https://');
    return (
      <>
        <CopyBlock
          text={`mkdir -p ~/lunatrace_client_repos && cd ~/lunatrace_client_repos && git clone ${formattedCloneUrl}`}
          language="bash"
          showLineNumbers={false}
          startingLineNumber={false}
          theme={dracula}
          codeBlock
        />
      </>
    );
  };
  return (
    <>
      {renderGithubInfo()}
      {/*Github URL Github Name short github description blurb most recent several builds, master first probably*/}
      <Accordion flush={false} defaultActiveKey={project.builds.length > 0 ? '' : '0'}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            {' '}
            <AiOutlineInfoCircle className="me-2" size="1rem" />{' '}
            {project.builds.length > 0
              ? 'How to take more snapshots'
              : 'How to take your first snapshot and start seeing vulnerabilities'}
          </Accordion.Header>
          <Accordion.Body>
            <ScanTypesExplanation project={project} setActiveTab={setActiveTab} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <hr />
      <ManifestDrop project_id={project.id} />
      {isAdmin && (
        <>
          <Button onClick={generateProjectCloneUrl}>Clone Url</Button>
          {cloneProjectDetails()}
        </>
      )}
    </>
  );
};
