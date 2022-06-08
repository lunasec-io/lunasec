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
import { Button } from 'react-bootstrap';
import { CopyBlock, dracula } from 'react-code-blocks';

import api from '../../../api';
import { ProjectInfo } from '../types';

export const ProjectCloneForAdmin: React.FC<{ project: ProjectInfo }> = ({ project }) => {
  const [triggerGenerateProjectCloneUrl, projectCloneUrlResult] = api.useLazyGetProjectCloneUrlQuery();

  const generateProjectCloneUrl = async () => {
    await triggerGenerateProjectCloneUrl({
      project_id: project.id,
    });
  };

  const { data } = projectCloneUrlResult;
  if (!data) {
    return <Button onClick={generateProjectCloneUrl}>Clone Url</Button>;
  }

  const cloneUrl = projectCloneUrlResult.data?.projects_by_pk?.github_repository?.authenticated_clone_url?.url;
  if (!cloneUrl) {
    return <p>Unable to get clone url.</p>;
  }

  const formattedCloneUrl = cloneUrl.replace('git://', 'https://');
  return (
    <div className="p-3">
      <p>Clone repo using: </p>
      <CopyBlock
        text={`mkdir -p ~/lunatrace_client_repos && cd ~/lunatrace_client_repos && git clone ${formattedCloneUrl}`}
        language="bash"
        showLineNumbers={false}
        startingLineNumber={false}
        theme={dracula}
        codeBlock
      />
    </div>
  );
};
