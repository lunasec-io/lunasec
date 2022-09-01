import { hasura } from '../../hasura-api';
import { Github_Repositories_Set_Input } from '../../hasura-api/generated';
import { UpdatedRawRepository } from '../../types/github';
import { log } from '../../utils/log';

export async function updateExistingRepository(rawRepository: UpdatedRawRepository): Promise<void> {
  const repoBody: Github_Repositories_Set_Input = {
    default_branch: rawRepository.default_branch,
    git_url: rawRepository.git_url,
    github_node_id: rawRepository.node_id,
    traits: rawRepository,
  };

  log.info('Starting repo update process', { repoBody });

  const updateRepoResponse = await hasura.UpdateRepoIfExists({ github_id: rawRepository.id, repo_body: repoBody });
  log.info('Update response ', { updateRepoResponse });
  if (!updateRepoResponse.update_github_repositories) {
    log.error('Failed to update repository in database', { updateRepoResponse });
    return;
  }
  if (updateRepoResponse.update_github_repositories.affected_rows !== 1) {
    log.info('Repo wasnt imported, no-op');
    // we weren't tracking this repo because it wasn't in our database (nothing was updated), so nothing happened and we are done
    return;
  }
  // Check if we need to change the project name too, since that's on the main project table, not the repo table
  const project = updateRepoResponse.update_github_repositories.returning[0].project;
  if (project.name === rawRepository.name) {
    log.info('Project name is still correct, so no update is necessary and update is complete');
    // names are the same, we are done
    return;
  }

  const updateProjectResponse = await hasura.UpdateProjectName({ id: project.id, name: rawRepository.name });
  log.info('update project name response ', { updateProjectResponse });
  if (!updateRepoResponse.update_github_repositories) {
    log.error('Failure updating project', { updateProjectResponse });
  }
}
