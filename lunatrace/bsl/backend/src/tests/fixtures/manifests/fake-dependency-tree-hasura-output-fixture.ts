import { Manifest } from '../../../models/vulnerability-dependency-tree/types';

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
export const fakeDependencyTreeHasuraOutputFixture: Array<Manifest> = [
  {
    path: 'package-lock.json',
    manifest_dependency_node: {
      id: '00000000-0000-0000-0000-000000000000',
    },
    child_edges_recursive: [
      {
        id: 'e1',
        child_id: '1',
        parent_id: '00000000-0000-0000-0000-000000000000',
        analysis_results: [],
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
        id: 'e2',
        child_id: '2',
        parent_id: '1',
        analysis_results: [],
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
        id: 'e3',
        child_id: '3',
        parent_id: '2',
        analysis_results: [],
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
        id: 'e4',
        child_id: '4',
        parent_id: '3',
        analysis_results: [],
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
                    guide_vulnerabilities: [
                      {
                        guide: {
                          title: 'fake guide title',
                          id: 'g1',
                          summary: 'a fake guide',
                        },
                      },
                    ],
                    cwes: [],
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
        id: 'e5',
        child_id: '4',
        parent_id: '1',
        analysis_results: [],
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
                    guide_vulnerabilities: [
                      {
                        guide: {
                          title: 'fake guide title',
                          id: 'g1',
                          summary: 'a fake guide',
                        },
                      },
                    ],
                    cwes: [],
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
