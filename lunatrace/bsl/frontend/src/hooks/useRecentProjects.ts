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
import useLocalStorage from './useLocalStorage';

interface RecentProject {
  id: string;
  name: string;
}

export function useRecentProjects(
  defaultProjects: RecentProject[] = []
): [RecentProject[], (pushedProject: RecentProject) => void] {
  const [recentProjects, setRecentProjects] = useLocalStorage<RecentProject[]>('recentProjects', defaultProjects);

  // Callback that gets called when someone visits a project
  function pushProject(pushed: RecentProject) {
    // Delete the project from the old list if present so we can bump it to the top
    const existingIndex = recentProjects.findIndex((r) => r.id === pushed.id);
    if (existingIndex > -1) {
      recentProjects.splice(existingIndex, 1);
    }
    const pushedRecentProject = { id: pushed.id, name: pushed.name };
    setRecentProjects([pushedRecentProject, ...recentProjects]);
  }

  return [recentProjects, pushProject];
}
