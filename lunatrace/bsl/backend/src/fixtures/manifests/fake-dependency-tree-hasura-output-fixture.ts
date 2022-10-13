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
import { RawManifest } from '../../models/dependency-tree/types';

export const fakeDependencyTreeHasuraOutputFixture: Array<RawManifest> = [
  {
    path: 'package-lock.json',
    child_edges_recursive: [
      {
        id: '1',
        child_id: '1',
        parent_id: '00000000-0000-0000-0000-000000000000',
        child: {
          id: '1',
          range: '1.0.0',
          release_id: '1',
          release: {
            id: '1',
            version: '1.0.0',
            package: {
              affected_by_vulnerability: [],
              name: 'foo',
              package_manager: 'npm',
            },
          },
        },
      },
      {
        id: '2',

        child_id: '2',
        parent_id: '1',
        child: {
          id: '2',
          range: '1.0.0',
          release_id: '2',
          release: {
            id: '2',
            version: '1.0.0',
            package: {
              affected_by_vulnerability: [],
              name: 'bar',
              package_manager: 'npm',
            },
          },
        },
      },
      {
        id: '3',

        child_id: '3',
        parent_id: '2',
        child: {
          id: '3',
          range: '1.0.0',
          release_id: '3',
          release: {
            id: '3',
            version: '1.0.0',
            package: {
              affected_by_vulnerability: [],
              name: 'baz',
              package_manager: 'npm',
            },
          },
        },
      },
      {
        id: '4',

        child_id: '4',
        parent_id: '3',
        child: {
          id: '4',
          range: '^1.0.0',
          release_id: '4',
          release: {
            version: '1.0.2',
            id: '4',
            package: {
              affected_by_vulnerability: [
                {
                  vulnerability: {
                    severity_name: 'Medium',
                    cvss_score: 7.2,
                    source: 'github',
                    source_id: 'GHSA123ABC',
                    id: 'a',
                  },
                  ranges: [
                    {
                      fixed: '1.0.3',
                      introduced: '1.0.0',
                    },
                  ],
                },
              ],
              name: 'qux',
              package_manager: 'npm',
            },
          },
        },
      },
      // This is to make sure duplicate nodes still work when they are at different places in the tree, and dont overwrite one another
      {
        id: '5',
        child_id: '4',
        parent_id: '1',
        child: {
          id: '4',
          range: '^1.0.0',
          release_id: '4',
          release: {
            version: '1.0.2',
            id: '4',
            package: {
              affected_by_vulnerability: [
                {
                  vulnerability: {
                    severity_name: 'Medium',
                    cvss_score: 7.2,
                    source: 'github',
                    source_id: 'GHSA123ABC',
                    id: 'a',
                  },
                  ranges: [
                    {
                      fixed: '1.0.3',
                      introduced: '1.0.0',
                    },
                  ],
                },
              ],
              name: 'qux',
              package_manager: 'npm',
            },
          },
        },
      },
    ],
  },
];
