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
import { Manifest } from "../../../models/vulnerability-dependency-tree/types";

export const realDependencyTreeHasuraOutputFixture: Array<Manifest> = [
        {
          "path": "/package-lock.json",
          "child_edges_recursive": [
            {
              "id": "00000000-0000-0000-0000-000000000000",
              "parent_id": "00000000-0000-0000-0000-000000000000",
              "child_id": "09eff93b-14d2-d6c4-5522-bebdc308509f",
              "analysis_results": [],
              "child": {
                "id": "09eff93b-14d2-d6c4-5522-bebdc308509f",
                "range": "^11.25.1",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "b584f0d6-e0aa-4198-befa-d859a8db8ce3",
                "release": {
                  "id": "b584f0d6-e0aa-4198-befa-d859a8db8ce3",
                  "version": "11.25.1",
                  "package": {
                    "name": "auth0-lock",
                    "package_manager": "npm",
                    "affected_by_vulnerability": [
                      {
                        "vulnerability": {
severities: [],
                          cwes: [],
                          "id": "7c97b2e2-b2c9-46bf-a449-ab9538ce1dc8",
                          "source_id": "GHSA-w2pf-g6r8-pg22",
                          "source": "ghsa",
                          "severity_name": "Medium",
                          "cvss_score": 6.1,
                          "summary": "Placeholder property does not indicate HTML capable, could lead to inadvertent abuse",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.0.0",
                            "fixed": "11.21.0"
                          }
                        ]
                      },
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "7dd5fb04-d85a-42d3-b795-5d04c3856400",
                          "source_id": "GHSA-6gg3-pmm7-97xc",
                          "source": "ghsa",
                          "severity_name": "Low",
                          "cvss_score": 6.4,
                          "summary": "DOM-based XSS in auth0-lock",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.0.0",
                            "fixed": "11.26.3"
                          }
                        ]
                      },
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "c81c4985-7c31-4e40-8ea3-48399f37b40d",
                          "source_id": "GHSA-jr3j-whm4-9wwm",
                          "source": "ghsa",
                          "severity_name": "High",
                          "cvss_score": 8.1,
                          "summary": "Reflected XSS when using flashMessages or languageDictionary",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.0.0",
                            "fixed": "11.30.1"
                          }
                        ]
                      },
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "781b2234-74d4-4139-b6cf-78692d2a53c6",
                          "source_id": "GHSA-7ww6-75fj-jcj7",
                          "source": "ghsa",
                          "severity_name": "Medium",
                          "cvss_score": 6.1,
                          "summary": "Cross-site Scripting in Auth0 Lock",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.0.0",
                            "fixed": "11.33.0"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            {
              "id": "00000000-0000-0000-0000-000000000000",
              "parent_id": "00000000-0000-0000-0000-000000000000",
              "child_id": "f3bbba40-db42-6bfe-b46d-e19b717d29ae",
              "analysis_results": [],
              "child": {
                "id": "f3bbba40-db42-6bfe-b46d-e19b717d29ae",
                "range": "^4.7.6",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "6865b738-a733-403c-95cf-6890d6d28bdc",
                "release": {
                  "id": "6865b738-a733-403c-95cf-6890d6d28bdc",
                  "version": "4.7.6",
                  "package": {
                    "name": "handlebars",
                    "package_manager": "npm",
                    "affected_by_vulnerability": [
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "3263985d-f762-461a-844e-6fc25c3f545b",
                          "source_id": "GHSA-fmr4-7g9q-7hc7",
                          "source": "ghsa",
                          "severity_name": "Medium",
                          "cvss_score": null,
                          "summary": "Moderate severity vulnerability that affects handlebars",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.0.0",
                            "fixed": "4.0.0"
                          }
                        ]
                      },
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "d8bde5ca-9686-4cd0-8ac8-d1cefa720fa0",
                          "source_id": "GHSA-9prh-257w-9277",
                          "source": "ghsa",
                          "severity_name": "Medium",
                          "cvss_score": 6.1,
                          "summary": "Cross-Site Scripting in handlebars",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.0.0",
                            "fixed": "4.0.0"
                          }
                        ]
                      },
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "2c154d63-4498-46c7-91db-2e6039e7db65",
                          "source_id": "GHSA-q42p-pg8m-cqh6",
                          "source": "ghsa",
                          "severity_name": "High",
                          "cvss_score": 7.3,
                          "summary": "Prototype Pollution in handlebars",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "4.1.0",
                            "fixed": "4.1.2"
                          },
                          {
                            "introduced": "4.0.0",
                            "fixed": "4.0.14"
                          },
                          {
                            "introduced": "0.0.0",
                            "fixed": "3.0.7"
                          }
                        ]
                      },
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "ea36420a-e638-42ad-aee3-0ea14e75ba7d",
                          "source_id": "GHSA-6r5x-hmgg-7h53",
                          "source": "ghsa",
                          "severity_name": "Medium",
                          "cvss_score": null,
                          "summary": "Remote code execution in Handlebars.js",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.0.0",
                            "fixed": "4.1.0"
                          }
                        ]
                      },
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "b9d2d796-bccd-4d84-bd3f-79ce6e26fc78",
                          "source_id": "GHSA-w457-6q6x-cgp9",
                          "source": "ghsa",
                          "severity_name": "Critical",
                          "cvss_score": 9.8,
                          "summary": "Prototype Pollution in handlebars",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.0.0",
                            "fixed": "4.3.0"
                          }
                        ]
                      },
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "7825b69d-522c-4028-8a88-f91f2a65484c",
                          "source_id": "GHSA-2cf5-4w76-r9qv",
                          "source": "ghsa",
                          "severity_name": "High",
                          "cvss_score": null,
                          "summary": "Arbitrary Code Execution in handlebars",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.0.0",
                            "fixed": "3.0.8"
                          },
                          {
                            "introduced": "4.0.0",
                            "fixed": "4.5.2"
                          }
                        ]
                      },
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "8918f8d0-2e7b-4cb2-857b-ce6a893279a3",
                          "source_id": "GHSA-f52g-6jhx-586p",
                          "source": "ghsa",
                          "severity_name": "Medium",
                          "cvss_score": null,
                          "summary": "Denial of Service in handlebars",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "4.0.0",
                            "fixed": "4.4.5"
                          }
                        ]
                      },
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "cee7a439-4074-4bd5-8cc4-b6b2ebe14c02",
                          "source_id": "GHSA-g9r4-xpmj-mj65",
                          "source": "ghsa",
                          "severity_name": "High",
                          "cvss_score": null,
                          "summary": "Prototype Pollution in handlebars",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.0.0",
                            "fixed": "3.0.8"
                          },
                          {
                            "introduced": "4.0.0",
                            "fixed": "4.5.3"
                          }
                        ]
                      },
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "30954bb0-6717-4130-8991-af796b49cb82",
                          "source_id": "GHSA-q2c6-c6pm-g3gh",
                          "source": "ghsa",
                          "severity_name": "High",
                          "cvss_score": null,
                          "summary": "Arbitrary Code Execution in handlebars",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.0.0",
                            "fixed": "3.0.8"
                          },
                          {
                            "introduced": "4.0.0",
                            "fixed": "4.5.3"
                          }
                        ]
                      },
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "e42e422a-9f5a-4d6f-a23d-552d85770870",
                          "source_id": "GHSA-f2jv-r9rf-7988",
                          "source": "ghsa",
                          "severity_name": "Critical",
                          "cvss_score": 9.8,
                          "summary": "Remote code execution in handlebars when compiling templates",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.0.0",
                            "fixed": "4.7.7"
                          }
                        ]
                      },
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "f0c7a174-7c32-49d3-af3b-51bf7805f656",
                          "source_id": "GHSA-3cqr-58rm-57f8",
                          "source": "ghsa",
                          "severity_name": "High",
                          "cvss_score": 8.1,
                          "summary": "Arbitrary Code Execution in Handlebars",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.0.0",
                            "fixed": "3.0.8"
                          },
                          {
                            "introduced": "4.0.0",
                            "fixed": "4.5.3"
                          }
                        ]
                      },
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "1c9d1442-f307-4c13-998f-79a472a1141d",
                          "source_id": "GHSA-62gr-4qp9-h98f",
                          "source": "ghsa",
                          "severity_name": "High",
                          "cvss_score": 7.5,
                          "summary": "Regular Expression Denial of Service in Handlebars",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "4.0.0",
                            "fixed": "4.4.5"
                          }
                        ]
                      },
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "996bb934-c2b1-4bdb-8d29-8ac8cb7b7ed8",
                          "source_id": "GHSA-765h-qjxv-5f44",
                          "source": "ghsa",
                          "severity_name": "Critical",
                          "cvss_score": 9.8,
                          "summary": "Prototype Pollution in handlebars",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.0.0",
                            "fixed": "4.7.7"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            {
              "id": "00000000-0000-0000-0000-000000000000",
              "parent_id": "00000000-0000-0000-0000-000000000000",
              "child_id": "3668ce8c-0912-9ce1-eaae-20aa6607cad7",
              "analysis_results": [],
              "child": {
                "id": "3668ce8c-0912-9ce1-eaae-20aa6607cad7",
                "range": "^10.1.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "e1dc7be1-ee40-4f00-81ae-4a0dc5610b0e",
                "release": {
                  "id": "e1dc7be1-ee40-4f00-81ae-4a0dc5610b0e",
                  "version": "10.1.0",
                  "package": {
                    "name": "node-ipc",
                    "package_manager": "npm",
                    "affected_by_vulnerability": [
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "c45ddb47-3642-44e4-bc61-6a23399cff95",
                          "source_id": "GHSA-3mpp-xfvh-qh37",
                          "source": "ghsa",
                          "severity_name": "Low",
                          "cvss_score": null,
                          "summary": "node-ipc behavior change",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "11.0.0",
                            "fixed": null
                          }
                        ]
                      },
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "6cc66295-9d17-47ff-a476-e36995c16ed2",
                          "source_id": "GHSA-8gr3-2gjw-jj7g",
                          "source": "ghsa",
                          "severity_name": "Low",
                          "cvss_score": null,
                          "summary": "Hidden functionality in node-ipc",
                          "guide_vulnerabilities": []
                        },
                        "ranges": []
                      },
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "f28b4074-b559-493a-aad4-4890b30ae768",
                          "source_id": "GHSA-97m3-w2cp-4xx6",
                          "source": "ghsa",
                          "severity_name": "Critical",
                          "cvss_score": 9.8,
                          "summary": "Embedded Malicious Code in node-ipc",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "10.1.1",
                            "fixed": "10.1.3"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            {
              "id": "00000000-0000-0000-0000-000000000000",
              "parent_id": "00000000-0000-0000-0000-000000000000",
              "child_id": "40f0b897-4569-83df-b23e-72ae8896433e",
              "analysis_results": [],
              "child": {
                "id": "40f0b897-4569-83df-b23e-72ae8896433e",
                "range": "^3.9.3",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "b5ff4e9d-e8a6-4f8a-b1e4-50ca31d19700",
                "release": {
                  "id": "b5ff4e9d-e8a6-4f8a-b1e4-50ca31d19700",
                  "version": "3.9.3",
                  "package": {
                    "name": "vm2",
                    "package_manager": "npm",
                    "affected_by_vulnerability": [
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "7923db78-7e3d-4cda-aa26-eaafb909907a",
                          "source_id": "GHSA-rjf2-j2r6-q8gr",
                          "source": "ghsa",
                          "severity_name": "Critical",
                          "cvss_score": 9.8,
                          "summary": "Prototype Pollution in vm2",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.0.0",
                            "fixed": "3.9.4"
                          }
                        ]
                      },
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "c937b741-e3af-45ce-87db-9d9f696b1e2e",
                          "source_id": "GHSA-6pw2-5hjv-9pf7",
                          "source": "ghsa",
                          "severity_name": "Critical",
                          "cvss_score": 9.8,
                          "summary": "Sandbox bypass in vm2",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.0.0",
                            "fixed": "3.9.6"
                          }
                        ]
                      },
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "d9ba1fa1-888c-4870-9f3c-fceeb2f9b548",
                          "source_id": "GHSA-wf5x-cr3r-xr77",
                          "source": "ghsa",
                          "severity_name": "High",
                          "cvss_score": 8.3,
                          "summary": "vm2 before 3.6.11 vulnerable to sandbox escape",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.0.0",
                            "fixed": "3.6.11"
                          }
                        ]
                      },
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "c27df7ad-1ac7-40be-886a-d34dd075e019",
                          "source_id": "GHSA-mrgp-mrhc-5jrq",
                          "source": "ghsa",
                          "severity_name": "Critical",
                          "cvss_score": 10,
                          "summary": "vm2 vulnerable to Sandbox Escape resulting in Remote Code Execution on host",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.0.0",
                            "fixed": "3.9.11"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            {
              "id": "cb93724e-341b-46e3-8b2f-b1e828f738df",
              "parent_id": "09eff93b-14d2-d6c4-5522-bebdc308509f",
              "child_id": "1ec72a06-5fff-779d-c9b5-e1fce3fca1da",
              "analysis_results": [
              ],
              "child": {
                "id": "1ec72a06-5fff-779d-c9b5-e1fce3fca1da",
                "range": "^15.6.2",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "94df9a2d-a239-4dcb-aa45-37b1761e7997",
                "release": {
                  "id": "94df9a2d-a239-4dcb-aa45-37b1761e7997",
                  "version": "15.7.0",
                  "package": {
                    "name": "react",
                    "package_manager": "npm",
                    "affected_by_vulnerability": [
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "c4d8ef1d-ad3c-4133-ae32-e3ac264c8734",
                          "source_id": "GHSA-g53w-52xc-2j85",
                          "source": "ghsa",
                          "severity_name": "Medium",
                          "cvss_score": 6.5,
                          "summary": "Cross-Site Scripting in react",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.4.0",
                            "fixed": "0.4.2"
                          },
                          {
                            "introduced": "0.5.0",
                            "fixed": "0.5.2"
                          }
                        ]
                      },
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "22a7c4d2-39ae-452e-a2ed-0b86cfb411d8",
                          "source_id": "GHSA-hg79-j56m-fxgv",
                          "source": "ghsa",
                          "severity_name": "High",
                          "cvss_score": null,
                          "summary": "Cross-Site Scripting in react",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.0.1",
                            "fixed": "0.14.0"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            {
              "id": "7b00a7fc-0b78-4858-962b-77f0ba8785c9",
              "parent_id": "09eff93b-14d2-d6c4-5522-bebdc308509f",
              "child_id": "361ab001-5531-8937-f222-b89338a53a6e",
              "analysis_results": [],
              "child": {
                "id": "361ab001-5531-8937-f222-b89338a53a6e",
                "range": "2.3.1",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "0cbb28ad-b7e9-4685-a8d0-6b500bfd0a3f",
                "release": {
                  "id": "0cbb28ad-b7e9-4685-a8d0-6b500bfd0a3f",
                  "version": "2.3.1",
                  "package": {
                    "name": "blueimp-md5",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "a9df43e2-9205-4079-a78b-e76f032ab479",
              "parent_id": "09eff93b-14d2-d6c4-5522-bebdc308509f",
              "child_id": "3bea9756-9e64-fcff-c8e1-5f9f593427d4",
              "analysis_results": [],
              "child": {
                "id": "3bea9756-9e64-fcff-c8e1-5f9f593427d4",
                "range": "^15.6.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "14c6b46a-e31d-44b3-856d-15c955c60aab",
                "release": {
                  "id": "14c6b46a-e31d-44b3-856d-15c955c60aab",
                  "version": "15.8.1",
                  "package": {
                    "name": "prop-types",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "b033aec6-0c1c-4283-8287-dce88d383cc8",
              "parent_id": "09eff93b-14d2-d6c4-5522-bebdc308509f",
              "child_id": "41db8b3d-b89c-831b-7802-055217634eac",
              "analysis_results": [],
              "child": {
                "id": "41db8b3d-b89c-831b-7802-055217634eac",
                "range": "^2.2.1",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "197e33f1-ed57-4074-9525-c506d3c05c4d",
                "release": {
                  "id": "197e33f1-ed57-4074-9525-c506d3c05c4d",
                  "version": "2.9.0",
                  "package": {
                    "name": "react-transition-group",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "32320321-d578-4389-8842-6b53a643e89c",
              "parent_id": "09eff93b-14d2-d6c4-5522-bebdc308509f",
              "child_id": "862c385b-c331-ea62-8bba-0039a723c03a",
              "analysis_results": [],
              "child": {
                "id": "862c385b-c331-ea62-8bba-0039a723c03a",
                "range": "^1.0.2",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "43187569-a20c-4d3a-8b56-19cf4fc90b03",
                "release": {
                  "id": "43187569-a20c-4d3a-8b56-19cf4fc90b03",
                  "version": "1.0.2",
                  "package": {
                    "name": "auth0-password-policies",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "cc183202-9a22-4b11-bb77-103c7c85ee62",
              "parent_id": "09eff93b-14d2-d6c4-5522-bebdc308509f",
              "child_id": "8da9cba1-1459-14a3-9b08-319b5e7fd9c3",
              "analysis_results": [],
              "child": {
                "id": "8da9cba1-1459-14a3-9b08-319b5e7fd9c3",
                "range": "^9.13.3",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "9552ab17-9c3a-4d1e-b6f4-ff2129ba14b2",
                "release": {
                  "id": "9552ab17-9c3a-4d1e-b6f4-ff2129ba14b2",
                  "version": "9.19.0",
                  "package": {
                    "name": "auth0-js",
                    "package_manager": "npm",
                    "affected_by_vulnerability": [
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "b8636a2e-0d5d-42dd-a56f-7714a50cacc7",
                          "source_id": "GHSA-3rpr-mg43-xhq4",
                          "source": "ghsa",
                          "severity_name": "High",
                          "cvss_score": 7.5,
                          "summary": "High severity vulnerability that affects auth0-js",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.0.0",
                            "fixed": "8.12.0"
                          }
                        ]
                      },
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "23fd58f6-3c95-40df-aac5-72a56de8f13e",
                          "source_id": "GHSA-wpq7-q8j4-72jg",
                          "source": "ghsa",
                          "severity_name": "High",
                          "cvss_score": 8.8,
                          "summary": "Auth0-js bypasses CSRF checks",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.0.0",
                            "fixed": "9.3.0"
                          }
                        ]
                      },
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "a6bbbc7b-4182-4613-8a56-730a1afb5a61",
                          "source_id": "GHSA-wv26-rj8c-4r33",
                          "source": "ghsa",
                          "severity_name": "High",
                          "cvss_score": 8.8,
                          "summary": "Cross-Site Request Forgery (CSRF) in Auth0",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.0.0",
                            "fixed": "9.0.0"
                          }
                        ]
                      },
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "788b114e-6f98-42f5-9326-cd574cc4dcac",
                          "source_id": "GHSA-prfq-f66g-43mp",
                          "source": "ghsa",
                          "severity_name": "High",
                          "cvss_score": 5.5,
                          "summary": "Information disclosure through error object in auth0.js",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "8.0.0",
                            "fixed": "9.13.2"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            {
              "id": "85b3529b-c27e-4d53-b6de-92561d3fd302",
              "parent_id": "09eff93b-14d2-d6c4-5522-bebdc308509f",
              "child_id": "983db857-23ff-eca4-21fd-28dffdd31acf",
              "analysis_results": [
              ],
              "child": {
                "id": "983db857-23ff-eca4-21fd-28dffdd31acf",
                "range": "^15.6.2",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "3b9570ac-d8c5-40b3-9ccd-7f3564fefebd",
                "release": {
                  "id": "3b9570ac-d8c5-40b3-9ccd-7f3564fefebd",
                  "version": "15.7.0",
                  "package": {
                    "name": "react-dom",
                    "package_manager": "npm",
                    "affected_by_vulnerability": [
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "ed6b4c20-5420-4a53-bf37-ca9f198ce0c6",
                          "source_id": "GHSA-mvjj-gqq2-p4hw",
                          "source": "ghsa",
                          "severity_name": "Low",
                          "cvss_score": null,
                          "summary": "Cross-Site Scripting in react-dom",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "16.0.0",
                            "fixed": "16.0.1"
                          },
                          {
                            "introduced": "16.1.0",
                            "fixed": "16.1.2"
                          },
                          {
                            "introduced": "16.2.0",
                            "fixed": "16.2.1"
                          },
                          {
                            "introduced": "16.3.0",
                            "fixed": "16.3.3"
                          },
                          {
                            "introduced": "16.4.0",
                            "fixed": "16.4.2"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            {
              "id": "a847fb27-aef5-4620-a7e0-94e52d108350",
              "parent_id": "09eff93b-14d2-d6c4-5522-bebdc308509f",
              "child_id": "a9034e97-fe70-a212-f974-d567d0f409a7",
              "analysis_results": [],
              "child": {
                "id": "a9034e97-fe70-a212-f974-d567d0f409a7",
                "range": "^3.7.3",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "2e32e021-d088-4b6f-8cbb-74f6d83d4483",
                "release": {
                  "id": "2e32e021-d088-4b6f-8cbb-74f6d83d4483",
                  "version": "3.8.2",
                  "package": {
                    "name": "immutable",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "60a361c0-9941-4385-970f-f1278dcf2dfb",
              "parent_id": "09eff93b-14d2-d6c4-5522-bebdc308509f",
              "child_id": "aed04ea9-cd1f-fc57-2e49-bfca525611b3",
              "analysis_results": [],
              "child": {
                "id": "aed04ea9-cd1f-fc57-2e49-bfca525611b3",
                "range": "^6.7.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "c363f1f9-2ffe-4a42-bd6b-212908642090",
                "release": {
                  "id": "c363f1f9-2ffe-4a42-bd6b-212908642090",
                  "version": "6.11.0",
                  "package": {
                    "name": "qs",
                    "package_manager": "npm",
                    "affected_by_vulnerability": [
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "51ccde0b-ef4c-4b02-8971-25e042b25cc5",
                          "source_id": "GHSA-jjv7-qpx3-h62q",
                          "source": "ghsa",
                          "severity_name": "High",
                          "cvss_score": null,
                          "summary": "Denial-of-Service Memory Exhaustion in qs",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.0.0",
                            "fixed": "1.0.0"
                          }
                        ]
                      },
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "610e6553-c064-46ab-bcfe-1409520fbe0a",
                          "source_id": "GHSA-crvj-3gj9-gm2p",
                          "source": "ghsa",
                          "severity_name": "High",
                          "cvss_score": null,
                          "summary": "High severity vulnerability that affects qs",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.0.0",
                            "fixed": "1.0.0"
                          }
                        ]
                      },
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "4e97446d-a2c1-4372-b71f-490d305233fc",
                          "source_id": "GHSA-f9cm-p3w6-xvr3",
                          "source": "ghsa",
                          "severity_name": "High",
                          "cvss_score": null,
                          "summary": "Denial-of-Service Extended Event Loop Blocking in qs",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.0.0",
                            "fixed": "1.0.0"
                          }
                        ]
                      },
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "88981548-9eec-4992-bfd0-4a83e9c65769",
                          "source_id": "GHSA-gqgv-6jq5-jjj9",
                          "source": "ghsa",
                          "severity_name": "High",
                          "cvss_score": 7.5,
                          "summary": "Prototype Pollution Protection Bypass in qs",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.0.0",
                            "fixed": "6.0.4"
                          },
                          {
                            "introduced": "6.1.0",
                            "fixed": "6.1.2"
                          },
                          {
                            "introduced": "6.2.0",
                            "fixed": "6.2.3"
                          },
                          {
                            "introduced": "6.3.0",
                            "fixed": "6.3.2"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            {
              "id": "741f5018-1dfa-4de3-aaa5-83ec49de4b78",
              "parent_id": "09eff93b-14d2-d6c4-5522-bebdc308509f",
              "child_id": "b0c94610-b027-204d-bb7f-b55670d8875e",
              "analysis_results": [],
              "child": {
                "id": "b0c94610-b027-204d-bb7f-b55670d8875e",
                "range": "^1.1.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "9fa19eaf-b6c5-467c-8f73-f0ed8eaafaef",
                "release": {
                  "id": "9fa19eaf-b6c5-467c-8f73-f0ed8eaafaef",
                  "version": "1.1.0",
                  "package": {
                    "name": "url-join",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "25d7df6a-f6b6-4e6e-bd34-705123d79588",
              "parent_id": "09eff93b-14d2-d6c4-5522-bebdc308509f",
              "child_id": "b97df119-f63a-dea0-ef87-9446756369f3",
              "analysis_results": [],
              "child": {
                "id": "b97df119-f63a-dea0-ef87-9446756369f3",
                "range": "^1.1.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "1f3f45da-ae02-4f1e-b1ea-d0a0b0952e7e",
                "release": {
                  "id": "1f3f45da-ae02-4f1e-b1ea-d0a0b0952e7e",
                  "version": "1.1.1",
                  "package": {
                    "name": "password-sheriff",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "44da8bde-9614-4f09-8725-6c276105b5b2",
              "parent_id": "09eff93b-14d2-d6c4-5522-bebdc308509f",
              "child_id": "f6b07e92-29bc-25ab-933c-91f5895af5e5",
              "analysis_results": [
              ],
              "child": {
                "id": "f6b07e92-29bc-25ab-933c-91f5895af5e5",
                "range": "0.0.1",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "17479727-d0d9-4722-9933-33e79fb1ae2e",
                "release": {
                  "id": "17479727-d0d9-4722-9933-33e79fb1ae2e",
                  "version": "0.0.1",
                  "package": {
                    "name": "trim",
                    "package_manager": "npm",
                    "affected_by_vulnerability": [
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "b8a85f1a-07cb-412b-9104-0b4d935b1a18",
                          "source_id": "GHSA-w5p7-h5w8-2hfq",
                          "source": "ghsa",
                          "severity_name": "High",
                          "cvss_score": 7.5,
                          "summary": "Regular Expression Denial of Service in trim",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.0.0",
                            "fixed": "0.0.3"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            {
              "id": "55439899-fbb5-48b3-802d-59605064984a",
              "parent_id": "09eff93b-14d2-d6c4-5522-bebdc308509f",
              "child_id": "ff162a61-ff10-c33a-cacd-e056e1e54ed0",
              "analysis_results": [],
              "child": {
                "id": "ff162a61-ff10-c33a-cacd-e056e1e54ed0",
                "range": "^0.2.1",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "d5d15810-9031-44f1-beba-3609e41d8812",
                "release": {
                  "id": "d5d15810-9031-44f1-beba-3609e41d8812",
                  "version": "0.2.1",
                  "package": {
                    "name": "jsonp",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "449e9d9d-76b6-48ea-a5e3-72823792987a",
              "parent_id": "3668ce8c-0912-9ce1-eaae-20aa6607cad7",
              "child_id": "0f282056-f145-447c-f513-6949adf4a3de",
              "analysis_results": [],
              "child": {
                "id": "0f282056-f145-447c-f513-6949adf4a3de",
                "range": "2.0.2",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "4e8dfa48-0df9-4e72-bee9-46a42ecb374c",
                "release": {
                  "id": "4e8dfa48-0df9-4e72-bee9-46a42ecb374c",
                  "version": "2.0.2",
                  "package": {
                    "name": "js-queue",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "43c72478-6d6e-43b6-8dd8-5cbd7ddd407e",
              "parent_id": "3668ce8c-0912-9ce1-eaae-20aa6607cad7",
              "child_id": "6eb11461-3825-d05d-8e76-612bc8711b92",
              "analysis_results": [],
              "child": {
                "id": "6eb11461-3825-d05d-8e76-612bc8711b92",
                "range": "1.0.7",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "00632c6c-6b3b-4948-965f-f12fae0b3334",
                "release": {
                  "id": "00632c6c-6b3b-4948-965f-f12fae0b3334",
                  "version": "1.0.7",
                  "package": {
                    "name": "js-message",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "979d2a09-0da1-42bc-b2c8-b3f386a66d12",
              "parent_id": "3668ce8c-0912-9ce1-eaae-20aa6607cad7",
              "child_id": "cd4a048b-6d93-a5a1-b828-15527788265a",
              "analysis_results": [],
              "child": {
                "id": "cd4a048b-6d93-a5a1-b828-15527788265a",
                "range": "5.0.3",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "e2de9c61-0ea1-43f6-ad1e-716ce51ee0c9",
                "release": {
                  "id": "e2de9c61-0ea1-43f6-ad1e-716ce51ee0c9",
                  "version": "5.0.3",
                  "package": {
                    "name": "event-pubsub",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "72ff9876-b7e8-403b-805a-2a05f1343145",
              "parent_id": "3668ce8c-0912-9ce1-eaae-20aa6607cad7",
              "child_id": "db7c3ddf-8071-3bfb-e918-9db9007d9bba",
              "analysis_results": [],
              "child": {
                "id": "db7c3ddf-8071-3bfb-e918-9db9007d9bba",
                "range": "^1.0.1",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "6ac814fe-e52e-4da7-9dff-e05778d1b067",
                "release": {
                  "id": "6ac814fe-e52e-4da7-9dff-e05778d1b067",
                  "version": "1.1.0",
                  "package": {
                    "name": "strong-type",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "bd696354-cfd8-4588-95ac-b4abc38401f2",
              "parent_id": "f3bbba40-db42-6bfe-b46d-e19b717d29ae",
              "child_id": "25050b5b-abf6-769e-566b-507735a3b278",
              "analysis_results": [],
              "child": {
                "id": "25050b5b-abf6-769e-566b-507735a3b278",
                "range": "^1.0.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "ee65a48b-a62c-4922-a898-8c263059dca3",
                "release": {
                  "id": "ee65a48b-a62c-4922-a898-8c263059dca3",
                  "version": "1.0.0",
                  "package": {
                    "name": "wordwrap",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "99bb21e0-2652-45d4-8c55-35a0630af084",
              "parent_id": "f3bbba40-db42-6bfe-b46d-e19b717d29ae",
              "child_id": "26d29879-0ce5-710b-2309-4967e0c048aa",
              "analysis_results": [],
              "child": {
                "id": "26d29879-0ce5-710b-2309-4967e0c048aa",
                "range": "^2.6.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "a865ef73-4dc8-4690-bbd1-0e2a2da87402",
                "release": {
                  "id": "a865ef73-4dc8-4690-bbd1-0e2a2da87402",
                  "version": "2.6.2",
                  "package": {
                    "name": "neo-async",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "fa4714ba-dba3-47f3-bf39-085b5712f8f4",
              "parent_id": "f3bbba40-db42-6bfe-b46d-e19b717d29ae",
              "child_id": "70915678-69f9-41b5-8372-04f4b9ab0be3",
              "analysis_results": [],
              "child": {
                "id": "70915678-69f9-41b5-8372-04f4b9ab0be3",
                "range": "^0.6.1",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "4aba9994-244d-4929-9bba-4b38d7fddb6f",
                "release": {
                  "id": "4aba9994-244d-4929-9bba-4b38d7fddb6f",
                  "version": "0.6.1",
                  "package": {
                    "name": "source-map",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "3debbf92-318f-41f2-9ee6-6829b6f4639c",
              "parent_id": "f3bbba40-db42-6bfe-b46d-e19b717d29ae",
              "child_id": "deec85f4-23e5-33bb-9483-7decb3b9055f",
              "analysis_results": [],
              "child": {
                "id": "deec85f4-23e5-33bb-9483-7decb3b9055f",
                "range": "^3.1.4",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "d87ff505-984e-4203-a78c-2db76759a9d8",
                "release": {
                  "id": "d87ff505-984e-4203-a78c-2db76759a9d8",
                  "version": "3.16.3",
                  "package": {
                    "name": "uglify-js",
                    "package_manager": "npm",
                    "affected_by_vulnerability": [
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "c4cb68e5-8100-49ad-874b-a3ba4bc141b7",
                          "source_id": "GHSA-34r7-q49f-h37c",
                          "source": "ghsa",
                          "severity_name": "Critical",
                          "cvss_score": 9.8,
                          "summary": "Incorrect Handling of Non-Boolean Comparisons During Minification in uglify-js",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.0.0",
                            "fixed": "2.4.24"
                          }
                        ]
                      },
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "e2e70527-edf8-4589-83cd-2ebe206d2882",
                          "source_id": "GHSA-c9f4-xj24-8jqx",
                          "source": "ghsa",
                          "severity_name": "High",
                          "cvss_score": 7.5,
                          "summary": "Regular Expression Denial of Service in uglify-js",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.0.0",
                            "fixed": "2.6.0"
                          }
                        ]
                      },
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "6c00bf16-8073-4bac-a0f5-d4554b1d4ab1",
                          "source_id": "GHSA-g6f4-j6c2-w3p3",
                          "source": "ghsa",
                          "severity_name": "High",
                          "cvss_score": null,
                          "summary": "High severity vulnerability that affects uglify-js",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.0.0",
                            "fixed": "2.4.24"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            {
              "id": "92531fad-bf60-4a77-a789-f45401667180",
              "parent_id": "f3bbba40-db42-6bfe-b46d-e19b717d29ae",
              "child_id": "fc3a0d95-4ac8-a2b3-c8d4-33e91d29ba65",
              "analysis_results": [],
              "child": {
                "id": "fc3a0d95-4ac8-a2b3-c8d4-33e91d29ba65",
                "range": "^1.2.5",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "670c3b2f-57e2-4056-a8f6-f9a1f962f5a0",
                "release": {
                  "id": "670c3b2f-57e2-4056-a8f6-f9a1f962f5a0",
                  "version": "1.2.6",
                  "package": {
                    "name": "minimist",
                    "package_manager": "npm",
                    "affected_by_vulnerability": [
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "cf72bf32-cdec-41e9-85d1-8f8ba713cc85",
                          "source_id": "GHSA-7fhm-mqm4-2wp7",
                          "source": "ghsa",
                          "severity_name": "Medium",
                          "cvss_score": null,
                          "summary": "Withdrawn: ESLint dependencies are vulnerable (ReDoS and Prototype Pollution)",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.0.0",
                            "fixed": "1.2.2"
                          }
                        ]
                      },
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "768db95c-6cd9-4013-a9f9-209b8105d37f",
                          "source_id": "GHSA-vh95-rmgr-6w4m",
                          "source": "ghsa",
                          "severity_name": "Medium",
                          "cvss_score": 5.6,
                          "summary": "Prototype Pollution in minimist",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.0.0",
                            "fixed": "0.2.1"
                          },
                          {
                            "introduced": "1.0.0",
                            "fixed": "1.2.3"
                          }
                        ]
                      },
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "bc073c23-e65a-43f9-8e04-e298dccb925c",
                          "source_id": "GHSA-xvch-5gv4-984h",
                          "source": "ghsa",
                          "severity_name": "Critical",
                          "cvss_score": 9.8,
                          "summary": "Prototype Pollution in minimist",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.0.0",
                            "fixed": "1.2.6"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            {
              "id": "a2ee362a-8409-4351-90e8-442b34f28100",
              "parent_id": "0f282056-f145-447c-f513-6949adf4a3de",
              "child_id": "1fbf160d-d52f-8916-3ae3-11f99ebe211c",
              "analysis_results": [],
              "child": {
                "id": "1fbf160d-d52f-8916-3ae3-11f99ebe211c",
                "range": "^1.0.1",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "3836755f-d71a-4de7-9499-0db9e41c40ab",
                "release": {
                  "id": "3836755f-d71a-4de7-9499-0db9e41c40ab",
                  "version": "1.0.1",
                  "package": {
                    "name": "easy-stack",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "0c1c46f0-b12d-4237-a48c-8be59acd8d1d",
              "parent_id": "1ec72a06-5fff-779d-c9b5-e1fce3fca1da",
              "child_id": "0c938475-e38d-1977-992b-be37c7fa9fbb",
              "analysis_results": [],
              "child": {
                "id": "0c938475-e38d-1977-992b-be37c7fa9fbb",
                "range": "^4.1.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "776c7362-6fdd-43c2-8aff-6cffbb5b4119",
                "release": {
                  "id": "776c7362-6fdd-43c2-8aff-6cffbb5b4119",
                  "version": "4.1.1",
                  "package": {
                    "name": "object-assign",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "6dd55657-9a87-4e2b-8242-83c79edddd4e",
              "parent_id": "1ec72a06-5fff-779d-c9b5-e1fce3fca1da",
              "child_id": "1a6b8bb6-b635-796b-be3a-841e1509bad8",
              "analysis_results": [
              ],
              "child": {
                "id": "1a6b8bb6-b635-796b-be3a-841e1509bad8",
                "range": "^0.8.9",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "afe0c06f-8ec7-4541-ac94-7f955230e36d",
                "release": {
                  "id": "afe0c06f-8ec7-4541-ac94-7f955230e36d",
                  "version": "0.8.18",
                  "package": {
                    "name": "fbjs",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "9fc1a861-7c7f-4df3-93a7-41e7b7e7b556",
              "parent_id": "1ec72a06-5fff-779d-c9b5-e1fce3fca1da",
              "child_id": "3bea9756-9e64-fcff-c8e1-5f9f593427d4",
              "analysis_results": [],
              "child": {
                "id": "3bea9756-9e64-fcff-c8e1-5f9f593427d4",
                "range": "^15.6.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "14c6b46a-e31d-44b3-856d-15c955c60aab",
                "release": {
                  "id": "14c6b46a-e31d-44b3-856d-15c955c60aab",
                  "version": "15.8.1",
                  "package": {
                    "name": "prop-types",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "273d7303-4180-44f6-8c34-cf86fbe0102c",
              "parent_id": "1ec72a06-5fff-779d-c9b5-e1fce3fca1da",
              "child_id": "6ec93234-fe9f-8f37-5b14-fd19cdca9534",
              "analysis_results": [],
              "child": {
                "id": "6ec93234-fe9f-8f37-5b14-fd19cdca9534",
                "range": "^1.4.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "4d1ccb13-8d9a-4afe-ae9a-5ae1b1a084d4",
                "release": {
                  "id": "4d1ccb13-8d9a-4afe-ae9a-5ae1b1a084d4",
                  "version": "1.4.0",
                  "package": {
                    "name": "loose-envify",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "01b393bc-6d32-4231-b1ef-da74f866ffd5",
              "parent_id": "1ec72a06-5fff-779d-c9b5-e1fce3fca1da",
              "child_id": "c4ba7cf5-fe41-ae45-c8fc-7827556862a1",
              "analysis_results": [],
              "child": {
                "id": "c4ba7cf5-fe41-ae45-c8fc-7827556862a1",
                "range": "^15.6.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "bcb97685-807f-4670-ad5c-ce3e85699b91",
                "release": {
                  "id": "bcb97685-807f-4670-ad5c-ce3e85699b91",
                  "version": "15.7.0",
                  "package": {
                    "name": "create-react-class",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "c9755250-118e-4fe4-90ab-c67048698c32",
              "parent_id": "3bea9756-9e64-fcff-c8e1-5f9f593427d4",
              "child_id": "0c938475-e38d-1977-992b-be37c7fa9fbb",
              "analysis_results": [],
              "child": {
                "id": "0c938475-e38d-1977-992b-be37c7fa9fbb",
                "range": "^4.1.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "776c7362-6fdd-43c2-8aff-6cffbb5b4119",
                "release": {
                  "id": "776c7362-6fdd-43c2-8aff-6cffbb5b4119",
                  "version": "4.1.1",
                  "package": {
                    "name": "object-assign",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "39cb4ca6-a3c6-49b9-874b-234fe4fa4c43",
              "parent_id": "3bea9756-9e64-fcff-c8e1-5f9f593427d4",
              "child_id": "6ec93234-fe9f-8f37-5b14-fd19cdca9534",
              "analysis_results": [],
              "child": {
                "id": "6ec93234-fe9f-8f37-5b14-fd19cdca9534",
                "range": "^1.4.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "4d1ccb13-8d9a-4afe-ae9a-5ae1b1a084d4",
                "release": {
                  "id": "4d1ccb13-8d9a-4afe-ae9a-5ae1b1a084d4",
                  "version": "1.4.0",
                  "package": {
                    "name": "loose-envify",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "d09405a2-fb90-4c46-9ef2-c7ecb6a87833",
              "parent_id": "3bea9756-9e64-fcff-c8e1-5f9f593427d4",
              "child_id": "ef8d71c4-9a7c-070a-40ce-f5ee420f5395",
              "analysis_results": [],
              "child": {
                "id": "ef8d71c4-9a7c-070a-40ce-f5ee420f5395",
                "range": "^16.13.1",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "758616b9-2376-49a1-83e5-7f5c11e68710",
                "release": {
                  "id": "758616b9-2376-49a1-83e5-7f5c11e68710",
                  "version": "16.13.1",
                  "package": {
                    "name": "react-is",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "25a86b80-8eb1-4f21-9c0e-1fe8f27d614f",
              "parent_id": "41db8b3d-b89c-831b-7802-055217634eac",
              "child_id": "1ff1b0ae-f568-6e19-b2e6-08b7bc36340d",
              "analysis_results": [],
              "child": {
                "id": "1ff1b0ae-f568-6e19-b2e6-08b7bc36340d",
                "range": "^3.4.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "0749cdb2-7f6f-456a-a031-2dc3af3469a7",
                "release": {
                  "id": "0749cdb2-7f6f-456a-a031-2dc3af3469a7",
                  "version": "3.4.0",
                  "package": {
                    "name": "dom-helpers",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "92be1be5-f641-4d1b-84d9-92410a290e6c",
              "parent_id": "41db8b3d-b89c-831b-7802-055217634eac",
              "child_id": "3bea9756-9e64-fcff-c8e1-5f9f593427d4",
              "analysis_results": [],
              "child": {
                "id": "3bea9756-9e64-fcff-c8e1-5f9f593427d4",
                "range": "^15.6.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "14c6b46a-e31d-44b3-856d-15c955c60aab",
                "release": {
                  "id": "14c6b46a-e31d-44b3-856d-15c955c60aab",
                  "version": "15.8.1",
                  "package": {
                    "name": "prop-types",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "ffd44919-6339-4b98-942a-10d5db7754f9",
              "parent_id": "41db8b3d-b89c-831b-7802-055217634eac",
              "child_id": "6a07cc55-d4a1-edca-2f9d-f54738439ada",
              "analysis_results": [],
              "child": {
                "id": "6a07cc55-d4a1-edca-2f9d-f54738439ada",
                "range": "^3.0.4",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "04d462b4-0c18-41a5-aedd-f23d85ccb522",
                "release": {
                  "id": "04d462b4-0c18-41a5-aedd-f23d85ccb522",
                  "version": "3.0.4",
                  "package": {
                    "name": "react-lifecycles-compat",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "940d6088-848b-43b2-8d21-d1c0ceff90c8",
              "parent_id": "41db8b3d-b89c-831b-7802-055217634eac",
              "child_id": "6ec93234-fe9f-8f37-5b14-fd19cdca9534",
              "analysis_results": [],
              "child": {
                "id": "6ec93234-fe9f-8f37-5b14-fd19cdca9534",
                "range": "^1.4.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "4d1ccb13-8d9a-4afe-ae9a-5ae1b1a084d4",
                "release": {
                  "id": "4d1ccb13-8d9a-4afe-ae9a-5ae1b1a084d4",
                  "version": "1.4.0",
                  "package": {
                    "name": "loose-envify",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "c35c61c0-7b22-4f08-b56c-392916ed068d",
              "parent_id": "862c385b-c331-ea62-8bba-0039a723c03a",
              "child_id": "b97df119-f63a-dea0-ef87-9446756369f3",
              "analysis_results": [],
              "child": {
                "id": "b97df119-f63a-dea0-ef87-9446756369f3",
                "range": "^1.1.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "1f3f45da-ae02-4f1e-b1ea-d0a0b0952e7e",
                "release": {
                  "id": "1f3f45da-ae02-4f1e-b1ea-d0a0b0952e7e",
                  "version": "1.1.1",
                  "package": {
                    "name": "password-sheriff",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "8cb34bfb-d75e-4192-837a-7984dc118f38",
              "parent_id": "8da9cba1-1459-14a3-9b08-319b5e7fd9c3",
              "child_id": "01d6bc12-57b2-3cd3-b954-99ff04a6d813",
              "analysis_results": [],
              "child": {
                "id": "01d6bc12-57b2-3cd3-b954-99ff04a6d813",
                "range": "^0.2.2",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "5d1a7b86-1ba4-4f20-83eb-d593fa275cd6",
                "release": {
                  "id": "5d1a7b86-1ba4-4f20-83eb-d593fa275cd6",
                  "version": "0.2.2",
                  "package": {
                    "name": "winchan",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "91540d49-5c17-44e2-a2ef-8b467fa49d94",
              "parent_id": "8da9cba1-1459-14a3-9b08-319b5e7fd9c3",
              "child_id": "092a4263-8a18-9bb4-bc25-ca87e788fe39",
              "analysis_results": [],
              "child": {
                "id": "092a4263-8a18-9bb4-bc25-ca87e788fe39",
                "range": "^4.0.1",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "cb7c22a8-39f7-4fc8-9559-00a5ec781fbd",
                "release": {
                  "id": "cb7c22a8-39f7-4fc8-9559-00a5ec781fbd",
                  "version": "4.0.1",
                  "package": {
                    "name": "url-join",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "28f08574-a3c4-4689-a485-9cef0e384e6c",
              "parent_id": "8da9cba1-1459-14a3-9b08-319b5e7fd9c3",
              "child_id": "15fa1231-609a-22cc-4385-c00269b9c6a4",
              "analysis_results": [],
              "child": {
                "id": "15fa1231-609a-22cc-4385-c00269b9c6a4",
                "range": "^2.2.2",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "6dc26317-b282-484e-80c4-55286f7ab40f",
                "release": {
                  "id": "6dc26317-b282-484e-80c4-55286f7ab40f",
                  "version": "2.2.2",
                  "package": {
                    "name": "idtoken-verifier",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "de6b13d3-5651-4e19-9834-03520b1a60f2",
              "parent_id": "8da9cba1-1459-14a3-9b08-319b5e7fd9c3",
              "child_id": "8bcbdd4e-280e-7ed0-65cb-8f1fbc412078",
              "analysis_results": [],
              "child": {
                "id": "8bcbdd4e-280e-7ed0-65cb-8f1fbc412078",
                "range": "^2.2.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "aded69d3-4a30-4fed-b827-43a6f3fa994d",
                "release": {
                  "id": "aded69d3-4a30-4fed-b827-43a6f3fa994d",
                  "version": "2.2.1",
                  "package": {
                    "name": "js-cookie",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "aab73195-9494-4805-aa07-514ec89a16fe",
              "parent_id": "8da9cba1-1459-14a3-9b08-319b5e7fd9c3",
              "child_id": "aed04ea9-cd1f-fc57-2e49-bfca525611b3",
              "analysis_results": [],
              "child": {
                "id": "aed04ea9-cd1f-fc57-2e49-bfca525611b3",
                "range": "^6.7.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "c363f1f9-2ffe-4a42-bd6b-212908642090",
                "release": {
                  "id": "c363f1f9-2ffe-4a42-bd6b-212908642090",
                  "version": "6.11.0",
                  "package": {
                    "name": "qs",
                    "package_manager": "npm",
                    "affected_by_vulnerability": [
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "51ccde0b-ef4c-4b02-8971-25e042b25cc5",
                          "source_id": "GHSA-jjv7-qpx3-h62q",
                          "source": "ghsa",
                          "severity_name": "High",
                          "cvss_score": null,
                          "summary": "Denial-of-Service Memory Exhaustion in qs",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.0.0",
                            "fixed": "1.0.0"
                          }
                        ]
                      },
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "610e6553-c064-46ab-bcfe-1409520fbe0a",
                          "source_id": "GHSA-crvj-3gj9-gm2p",
                          "source": "ghsa",
                          "severity_name": "High",
                          "cvss_score": null,
                          "summary": "High severity vulnerability that affects qs",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.0.0",
                            "fixed": "1.0.0"
                          }
                        ]
                      },
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "4e97446d-a2c1-4372-b71f-490d305233fc",
                          "source_id": "GHSA-f9cm-p3w6-xvr3",
                          "source": "ghsa",
                          "severity_name": "High",
                          "cvss_score": null,
                          "summary": "Denial-of-Service Extended Event Loop Blocking in qs",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.0.0",
                            "fixed": "1.0.0"
                          }
                        ]
                      },
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "88981548-9eec-4992-bfd0-4a83e9c65769",
                          "source_id": "GHSA-gqgv-6jq5-jjj9",
                          "source": "ghsa",
                          "severity_name": "High",
                          "cvss_score": 7.5,
                          "summary": "Prototype Pollution Protection Bypass in qs",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.0.0",
                            "fixed": "6.0.4"
                          },
                          {
                            "introduced": "6.1.0",
                            "fixed": "6.1.2"
                          },
                          {
                            "introduced": "6.2.0",
                            "fixed": "6.2.3"
                          },
                          {
                            "introduced": "6.3.0",
                            "fixed": "6.3.2"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            {
              "id": "36be4e05-443a-4f88-a843-205eeabaae1e",
              "parent_id": "8da9cba1-1459-14a3-9b08-319b5e7fd9c3",
              "child_id": "c57f0bf2-505e-c742-3e18-e97cb9fcaae0",
              "analysis_results": [],
              "child": {
                "id": "c57f0bf2-505e-c742-3e18-e97cb9fcaae0",
                "range": "^5.3.1",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "89f472b9-4896-48d3-b9a4-f071887ed598",
                "release": {
                  "id": "89f472b9-4896-48d3-b9a4-f071887ed598",
                  "version": "5.3.1",
                  "package": {
                    "name": "superagent",
                    "package_manager": "npm",
                    "affected_by_vulnerability": [
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "3e117703-b780-4d8b-85e2-c0e592cc185f",
                          "source_id": "GHSA-8225-6cvr-8pqp",
                          "source": "ghsa",
                          "severity_name": "Low",
                          "cvss_score": null,
                          "summary": "Large gzip Denial of Service in superagent",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.0.0",
                            "fixed": "3.7.0"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            {
              "id": "ae710594-96bb-4072-87fa-75feb7c93cd7",
              "parent_id": "8da9cba1-1459-14a3-9b08-319b5e7fd9c3",
              "child_id": "de056688-8197-3303-a555-ac524c513d9b",
              "analysis_results": [],
              "child": {
                "id": "de056688-8197-3303-a555-ac524c513d9b",
                "range": "^1.5.1",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "adcd959e-519e-4731-b6a2-5defc9dfb77f",
                "release": {
                  "id": "adcd959e-519e-4731-b6a2-5defc9dfb77f",
                  "version": "1.5.1",
                  "package": {
                    "name": "base64-js",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "617491e9-9082-4bd3-99fc-921a535f0930",
              "parent_id": "983db857-23ff-eca4-21fd-28dffdd31acf",
              "child_id": "0c938475-e38d-1977-992b-be37c7fa9fbb",
              "analysis_results": [],
              "child": {
                "id": "0c938475-e38d-1977-992b-be37c7fa9fbb",
                "range": "^4.1.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "776c7362-6fdd-43c2-8aff-6cffbb5b4119",
                "release": {
                  "id": "776c7362-6fdd-43c2-8aff-6cffbb5b4119",
                  "version": "4.1.1",
                  "package": {
                    "name": "object-assign",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "3be26403-91a0-4022-a779-475514dc1c7f",
              "parent_id": "983db857-23ff-eca4-21fd-28dffdd31acf",
              "child_id": "1a6b8bb6-b635-796b-be3a-841e1509bad8",
              "analysis_results": [
              ],
              "child": {
                "id": "1a6b8bb6-b635-796b-be3a-841e1509bad8",
                "range": "^0.8.9",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "afe0c06f-8ec7-4541-ac94-7f955230e36d",
                "release": {
                  "id": "afe0c06f-8ec7-4541-ac94-7f955230e36d",
                  "version": "0.8.18",
                  "package": {
                    "name": "fbjs",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "a49869ea-c8d4-4cc2-95e7-0924a9ef8be3",
              "parent_id": "983db857-23ff-eca4-21fd-28dffdd31acf",
              "child_id": "3bea9756-9e64-fcff-c8e1-5f9f593427d4",
              "analysis_results": [],
              "child": {
                "id": "3bea9756-9e64-fcff-c8e1-5f9f593427d4",
                "range": "^15.6.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "14c6b46a-e31d-44b3-856d-15c955c60aab",
                "release": {
                  "id": "14c6b46a-e31d-44b3-856d-15c955c60aab",
                  "version": "15.8.1",
                  "package": {
                    "name": "prop-types",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "17032568-90f2-40ea-ab8a-7efdddf8dfee",
              "parent_id": "983db857-23ff-eca4-21fd-28dffdd31acf",
              "child_id": "6ec93234-fe9f-8f37-5b14-fd19cdca9534",
              "analysis_results": [],
              "child": {
                "id": "6ec93234-fe9f-8f37-5b14-fd19cdca9534",
                "range": "^1.4.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "4d1ccb13-8d9a-4afe-ae9a-5ae1b1a084d4",
                "release": {
                  "id": "4d1ccb13-8d9a-4afe-ae9a-5ae1b1a084d4",
                  "version": "1.4.0",
                  "package": {
                    "name": "loose-envify",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "45a9f177-83f1-4965-8a6a-8834780a4a21",
              "parent_id": "aed04ea9-cd1f-fc57-2e49-bfca525611b3",
              "child_id": "26eb3ff8-a90a-4bcc-14ec-e1b4a4f6bd15",
              "analysis_results": [],
              "child": {
                "id": "26eb3ff8-a90a-4bcc-14ec-e1b4a4f6bd15",
                "range": "^1.0.4",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "e155aee3-ffee-44ec-b8a0-ccc86bb4c446",
                "release": {
                  "id": "e155aee3-ffee-44ec-b8a0-ccc86bb4c446",
                  "version": "1.0.4",
                  "package": {
                    "name": "side-channel",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "0fd31d4f-9df3-4213-8b29-deda775ad23e",
              "parent_id": "cd4a048b-6d93-a5a1-b828-15527788265a",
              "child_id": "7f947e39-6e0c-7887-cdfd-75eee404c2f9",
              "analysis_results": [],
              "child": {
                "id": "7f947e39-6e0c-7887-cdfd-75eee404c2f9",
                "range": "^2.4.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "e5a6b5f2-97e4-4b9b-9f93-f61e3cdf0f23",
                "release": {
                  "id": "e5a6b5f2-97e4-4b9b-9f93-f61e3cdf0f23",
                  "version": "2.4.1",
                  "package": {
                    "name": "copyfiles",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "a2f5f6bc-6099-41de-bb30-f373551076a5",
              "parent_id": "cd4a048b-6d93-a5a1-b828-15527788265a",
              "child_id": "b5f83a6e-fd22-9541-aad5-4dc369920746",
              "analysis_results": [],
              "child": {
                "id": "b5f83a6e-fd22-9541-aad5-4dc369920746",
                "range": "^0.1.3",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "b2e0f0e3-313e-4a61-ac82-6e39a72ce6b2",
                "release": {
                  "id": "b2e0f0e3-313e-4a61-ac82-6e39a72ce6b2",
                  "version": "0.1.6",
                  "package": {
                    "name": "strong-type",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "b96d3d96-3238-4943-b12e-24b11f18cf72",
              "parent_id": "ff162a61-ff10-c33a-cacd-e056e1e54ed0",
              "child_id": "55247049-5667-6c62-637a-7f621dc37f19",
              "analysis_results": [],
              "child": {
                "id": "55247049-5667-6c62-637a-7f621dc37f19",
                "range": "^2.1.3",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "c42d27e4-4515-41cb-9b8d-4131ffed38d3",
                "release": {
                  "id": "c42d27e4-4515-41cb-9b8d-4131ffed38d3",
                  "version": "2.6.9",
                  "package": {
                    "name": "debug",
                    "package_manager": "npm",
                    "affected_by_vulnerability": [
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "7918b12c-0c1f-4799-8212-544974a4a160",
                          "source_id": "GHSA-gxpj-cx7g-858c",
                          "source": "ghsa",
                          "severity_name": "Low",
                          "cvss_score": null,
                          "summary": "Regular Expression Denial of Service in debug",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.0.0",
                            "fixed": "2.6.9"
                          },
                          {
                            "introduced": "3.0.0",
                            "fixed": "3.1.0"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            {
              "id": "036448d4-0bd2-40c5-a18e-97632ed3a090",
              "parent_id": "15fa1231-609a-22cc-4385-c00269b9c6a4",
              "child_id": "092a4263-8a18-9bb4-bc25-ca87e788fe39",
              "analysis_results": [],
              "child": {
                "id": "092a4263-8a18-9bb4-bc25-ca87e788fe39",
                "range": "^4.0.1",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "cb7c22a8-39f7-4fc8-9559-00a5ec781fbd",
                "release": {
                  "id": "cb7c22a8-39f7-4fc8-9559-00a5ec781fbd",
                  "version": "4.0.1",
                  "package": {
                    "name": "url-join",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "7f798171-2e13-4f69-924d-a90a3466698f",
              "parent_id": "15fa1231-609a-22cc-4385-c00269b9c6a4",
              "child_id": "405354bf-2fe3-5982-ad78-fab6e7ecbd72",
              "analysis_results": [],
              "child": {
                "id": "405354bf-2fe3-5982-ad78-fab6e7ecbd72",
                "range": "^4.2.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "5d26d487-0f26-43f6-bf5c-bb6e6bc27557",
                "release": {
                  "id": "5d26d487-0f26-43f6-bf5c-bb6e6bc27557",
                  "version": "4.2.0",
                  "package": {
                    "name": "unfetch",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "b98285c2-7108-44ef-aa01-e1bdd4c45fff",
              "parent_id": "15fa1231-609a-22cc-4385-c00269b9c6a4",
              "child_id": "8b35b583-1161-e80f-29fd-53c65e8bef85",
              "analysis_results": [],
              "child": {
                "id": "8b35b583-1161-e80f-29fd-53c65e8bef85",
                "range": "^4.2.8",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "9fe44d94-d6af-4749-a551-95392c1b6173",
                "release": {
                  "id": "9fe44d94-d6af-4749-a551-95392c1b6173",
                  "version": "4.2.8",
                  "package": {
                    "name": "es6-promise",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "95ee5e8e-4707-4cea-bf58-05b2536b9381",
              "parent_id": "15fa1231-609a-22cc-4385-c00269b9c6a4",
              "child_id": "9194955d-3004-cdff-0df0-1f991fd919f4",
              "analysis_results": [],
              "child": {
                "id": "9194955d-3004-cdff-0df0-1f991fd919f4",
                "range": "^4.1.1",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "658033a8-d4b8-40c3-bc39-eb5c9b5f0571",
                "release": {
                  "id": "658033a8-d4b8-40c3-bc39-eb5c9b5f0571",
                  "version": "4.1.1",
                  "package": {
                    "name": "crypto-js",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "ff1cc595-2719-4337-8b4c-d0e43ea102fb",
              "parent_id": "15fa1231-609a-22cc-4385-c00269b9c6a4",
              "child_id": "cb36e116-37ff-c662-e821-ff93c13ce1e1",
              "analysis_results": [],
              "child": {
                "id": "cb36e116-37ff-c662-e821-ff93c13ce1e1",
                "range": "^1.1.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "549b697b-3b5e-49c4-b13c-4a4083dffc3f",
                "release": {
                  "id": "549b697b-3b5e-49c4-b13c-4a4083dffc3f",
                  "version": "1.1.0",
                  "package": {
                    "name": "jsbn",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "20c2b21a-e032-4d4c-9a3b-0de0d7365643",
              "parent_id": "15fa1231-609a-22cc-4385-c00269b9c6a4",
              "child_id": "de056688-8197-3303-a555-ac524c513d9b",
              "analysis_results": [],
              "child": {
                "id": "de056688-8197-3303-a555-ac524c513d9b",
                "range": "^1.5.1",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "adcd959e-519e-4731-b6a2-5defc9dfb77f",
                "release": {
                  "id": "adcd959e-519e-4731-b6a2-5defc9dfb77f",
                  "version": "1.5.1",
                  "package": {
                    "name": "base64-js",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "be7a0dba-493e-4889-aff5-d327f09c92df",
              "parent_id": "1a6b8bb6-b635-796b-be3a-841e1509bad8",
              "child_id": "0c938475-e38d-1977-992b-be37c7fa9fbb",
              "analysis_results": [],
              "child": {
                "id": "0c938475-e38d-1977-992b-be37c7fa9fbb",
                "range": "^4.1.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "776c7362-6fdd-43c2-8aff-6cffbb5b4119",
                "release": {
                  "id": "776c7362-6fdd-43c2-8aff-6cffbb5b4119",
                  "version": "4.1.1",
                  "package": {
                    "name": "object-assign",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "77bf5222-52fc-49c8-b774-8d5e092d9dee",
              "parent_id": "1a6b8bb6-b635-796b-be3a-841e1509bad8",
              "child_id": "154d37f1-05d6-d0a7-6a38-b2e9734bd501",
              "analysis_results": [],
              "child": {
                "id": "154d37f1-05d6-d0a7-6a38-b2e9734bd501",
                "range": "^7.1.1",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "b8bbeb18-edf3-42b3-b96e-c6f060db46ff",
                "release": {
                  "id": "b8bbeb18-edf3-42b3-b96e-c6f060db46ff",
                  "version": "7.3.1",
                  "package": {
                    "name": "promise",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "c3ab5cbb-df74-4b20-b607-bd8dfd43242f",
              "parent_id": "1a6b8bb6-b635-796b-be3a-841e1509bad8",
              "child_id": "3b62e2d1-9c18-97db-ce2f-d15224f8aac1",
              "analysis_results": [],
              "child": {
                "id": "3b62e2d1-9c18-97db-ce2f-d15224f8aac1",
                "range": "^1.0.5",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "52852c4d-964d-41ed-8fb4-56b31611bf91",
                "release": {
                  "id": "52852c4d-964d-41ed-8fb4-56b31611bf91",
                  "version": "1.0.5",
                  "package": {
                    "name": "setimmediate",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "83e6c616-4056-4bd9-9856-55df6a10b651",
              "parent_id": "1a6b8bb6-b635-796b-be3a-841e1509bad8",
              "child_id": "6ec93234-fe9f-8f37-5b14-fd19cdca9534",
              "analysis_results": [],
              "child": {
                "id": "6ec93234-fe9f-8f37-5b14-fd19cdca9534",
                "range": "^1.4.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "4d1ccb13-8d9a-4afe-ae9a-5ae1b1a084d4",
                "release": {
                  "id": "4d1ccb13-8d9a-4afe-ae9a-5ae1b1a084d4",
                  "version": "1.4.0",
                  "package": {
                    "name": "loose-envify",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "2fb3b7bc-8800-43fb-93ed-a907ca2dd13c",
              "parent_id": "1a6b8bb6-b635-796b-be3a-841e1509bad8",
              "child_id": "75a99f5d-5539-edb3-ecd9-a5789f22ef23",
              "analysis_results": [],
              "child": {
                "id": "75a99f5d-5539-edb3-ecd9-a5789f22ef23",
                "range": "^0.7.30",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "153b5388-2804-4227-a760-368bf24ed43c",
                "release": {
                  "id": "153b5388-2804-4227-a760-368bf24ed43c",
                  "version": "0.7.31",
                  "package": {
                    "name": "ua-parser-js",
                    "package_manager": "npm",
                    "affected_by_vulnerability": [
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "6d5b7521-5890-4302-a595-2ed5fd3180b9",
                          "source_id": "GHSA-662x-fhqg-9p8v",
                          "source": "ghsa",
                          "severity_name": "High",
                          "cvss_score": 7.5,
                          "summary": "Regular Expression Denial of Service in ua-parser-js",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.0.0",
                            "fixed": "0.7.22"
                          }
                        ]
                      },
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "6f92ef34-249d-4635-ae0c-56491656c4c1",
                          "source_id": "GHSA-78cj-fxph-m83p",
                          "source": "ghsa",
                          "severity_name": "High",
                          "cvss_score": 7.5,
                          "summary": "Regular Expression Denial of Service (ReDoS) in ua-parser-js",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.7.14",
                            "fixed": "0.7.24"
                          }
                        ]
                      },
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "0643a729-3e9a-4e06-ac41-ece5f7526fc9",
                          "source_id": "GHSA-pjwm-rvh2-c87w",
                          "source": "ghsa",
                          "severity_name": "Critical",
                          "cvss_score": null,
                          "summary": "Embedded malware in ua-parser-js",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.7.29",
                            "fixed": "0.7.30"
                          },
                          {
                            "introduced": "0.8.0",
                            "fixed": "0.8.1"
                          },
                          {
                            "introduced": "1.0.0",
                            "fixed": "1.0.1"
                          }
                        ]
                      },
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "94a4a46d-9392-4b57-beeb-7a161d83d3a2",
                          "source_id": "GHSA-394c-5j6w-4xmx",
                          "source": "ghsa",
                          "severity_name": "High",
                          "cvss_score": 7.5,
                          "summary": "ua-parser-js Regular Expression Denial of Service vulnerability",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.0.0",
                            "fixed": "0.7.23"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            {
              "id": "13b9d679-8422-4525-ba9b-d809fae8a13f",
              "parent_id": "1a6b8bb6-b635-796b-be3a-841e1509bad8",
              "child_id": "f423d581-d4b3-784f-5cab-55c59a420bca",
              "analysis_results": [],
              "child": {
                "id": "f423d581-d4b3-784f-5cab-55c59a420bca",
                "range": "^1.0.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "cf3e54e0-bd9b-45c7-b073-cbca860a4fd6",
                "release": {
                  "id": "cf3e54e0-bd9b-45c7-b073-cbca860a4fd6",
                  "version": "1.2.7",
                  "package": {
                    "name": "core-js",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "eaba8c22-a1ec-4350-af49-f388c96ee6f7",
              "parent_id": "1a6b8bb6-b635-796b-be3a-841e1509bad8",
              "child_id": "f9bda8fe-fd0d-b75d-379a-7d63fc7edfcf",
              "analysis_results": [
              ],
              "child": {
                "id": "f9bda8fe-fd0d-b75d-379a-7d63fc7edfcf",
                "range": "^2.1.1",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "6607b5d3-baf0-403e-ab19-40ca00d52424",
                "release": {
                  "id": "6607b5d3-baf0-403e-ab19-40ca00d52424",
                  "version": "2.2.1",
                  "package": {
                    "name": "isomorphic-fetch",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "13b84713-6931-4542-86f0-b315d35e6d60",
              "parent_id": "1ff1b0ae-f568-6e19-b2e6-08b7bc36340d",
              "child_id": "53b5ac9f-2e2a-047f-6932-2032782f909e",
              "analysis_results": [],
              "child": {
                "id": "53b5ac9f-2e2a-047f-6932-2032782f909e",
                "range": "^7.1.2",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "0ea13e1b-63d0-476d-b729-3f4e6f5c8c57",
                "release": {
                  "id": "0ea13e1b-63d0-476d-b729-3f4e6f5c8c57",
                  "version": "7.18.9",
                  "package": {
                    "name": "@babel/runtime",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "f57a2d97-0133-46cb-9890-852fedd08b86",
              "parent_id": "26eb3ff8-a90a-4bcc-14ec-e1b4a4f6bd15",
              "child_id": "37be4349-c19d-7006-4d24-f8bc4b27bc57",
              "analysis_results": [],
              "child": {
                "id": "37be4349-c19d-7006-4d24-f8bc4b27bc57",
                "range": "^1.9.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "7442e421-52f3-467b-b4c2-f83f3608b8c9",
                "release": {
                  "id": "7442e421-52f3-467b-b4c2-f83f3608b8c9",
                  "version": "1.12.2",
                  "package": {
                    "name": "object-inspect",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "404a3351-2819-4d2b-9ae6-9eb2665eb694",
              "parent_id": "26eb3ff8-a90a-4bcc-14ec-e1b4a4f6bd15",
              "child_id": "c5f74079-e7d5-6381-831a-bc4ee22549ee",
              "analysis_results": [],
              "child": {
                "id": "c5f74079-e7d5-6381-831a-bc4ee22549ee",
                "range": "^1.0.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "4d8f51b3-c39a-4638-bbf0-d45c873b3b2a",
                "release": {
                  "id": "4d8f51b3-c39a-4638-bbf0-d45c873b3b2a",
                  "version": "1.0.2",
                  "package": {
                    "name": "call-bind",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "c05ce483-48bb-4bc7-94f7-fa791564aca9",
              "parent_id": "26eb3ff8-a90a-4bcc-14ec-e1b4a4f6bd15",
              "child_id": "cfa211cf-661f-659f-cf6e-a1134e80181e",
              "analysis_results": [],
              "child": {
                "id": "cfa211cf-661f-659f-cf6e-a1134e80181e",
                "range": "^1.0.2",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "7d9ed08d-0b7a-451d-bd2e-2af8ac60ae09",
                "release": {
                  "id": "7d9ed08d-0b7a-451d-bd2e-2af8ac60ae09",
                  "version": "1.1.2",
                  "package": {
                    "name": "get-intrinsic",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "51393e53-ed1c-45f3-90ff-4fc73ef0b5dd",
              "parent_id": "55247049-5667-6c62-637a-7f621dc37f19",
              "child_id": "e9f4cccd-9635-3fc4-9694-27cd80ed5edb",
              "analysis_results": [],
              "child": {
                "id": "e9f4cccd-9635-3fc4-9694-27cd80ed5edb",
                "range": "2.0.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "9c118fcf-5891-4d5e-ac7b-cb771094d864",
                "release": {
                  "id": "9c118fcf-5891-4d5e-ac7b-cb771094d864",
                  "version": "2.0.0",
                  "package": {
                    "name": "ms",
                    "package_manager": "npm",
                    "affected_by_vulnerability": [
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "8abfd1aa-d412-45aa-a7f6-271bcc57ad25",
                          "source_id": "GHSA-3fx5-fwvr-xrjg",
                          "source": "ghsa",
                          "severity_name": "High",
                          "cvss_score": 7.5,
                          "summary": "Regular Expression Denial of Service in ms",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.0.0",
                            "fixed": "0.7.1"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            {
              "id": "0fad6152-9cda-4d90-a94f-5e6d37368131",
              "parent_id": "6ec93234-fe9f-8f37-5b14-fd19cdca9534",
              "child_id": "537185ca-0870-5780-bd2a-5347e58cd6d3",
              "analysis_results": [],
              "child": {
                "id": "537185ca-0870-5780-bd2a-5347e58cd6d3",
                "range": "^3.0.0 || ^4.0.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "cf30c17c-84e9-4061-b3df-411db3a892c2",
                "release": {
                  "id": "cf30c17c-84e9-4061-b3df-411db3a892c2",
                  "version": "4.0.0",
                  "package": {
                    "name": "js-tokens",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "a0c87947-ea48-49a8-9409-143eaccdd663",
              "parent_id": "7f947e39-6e0c-7887-cdfd-75eee404c2f9",
              "child_id": "086c4256-2cd5-a982-bfb7-e8d33dfaf208",
              "analysis_results": [],
              "child": {
                "id": "086c4256-2cd5-a982-bfb7-e8d33dfaf208",
                "range": "^1.0.4",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "00e9e6c1-93ac-4d68-ada8-0dfab971c27f",
                "release": {
                  "id": "00e9e6c1-93ac-4d68-ada8-0dfab971c27f",
                  "version": "1.0.4",
                  "package": {
                    "name": "mkdirp",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "27934d36-535c-4862-a9b4-56476eec475d",
              "parent_id": "7f947e39-6e0c-7887-cdfd-75eee404c2f9",
              "child_id": "38d06036-6785-33c5-091a-84d7c86e73a1",
              "analysis_results": [],
              "child": {
                "id": "38d06036-6785-33c5-091a-84d7c86e73a1",
                "range": "^3.0.3",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "657c29e8-d073-42e8-b9b5-dd66e206165b",
                "release": {
                  "id": "657c29e8-d073-42e8-b9b5-dd66e206165b",
                  "version": "3.1.2",
                  "package": {
                    "name": "minimatch",
                    "package_manager": "npm",
                    "affected_by_vulnerability": [
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "bc43c856-c60c-43cc-82a6-a9a1bb9414bd",
                          "source_id": "GHSA-hxm2-r34f-qmc5",
                          "source": "ghsa",
                          "severity_name": "High",
                          "cvss_score": 7.5,
                          "summary": "Regular Expression Denial of Service in minimatch",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.0.0",
                            "fixed": "3.0.2"
                          }
                        ]
                      },
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "44fe8d62-cb6b-44e4-b4fd-e115c4a63239",
                          "source_id": "GHSA-f8q6-p94x-37v3",
                          "source": "ghsa",
                          "severity_name": "High",
                          "cvss_score": 7.5,
                          "summary": "minimatch ReDoS vulnerability",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.0.0",
                            "fixed": "3.0.5"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            {
              "id": "f6592510-396d-4767-b590-53430a5c3e1c",
              "parent_id": "7f947e39-6e0c-7887-cdfd-75eee404c2f9",
              "child_id": "845a8db5-75ec-bbec-b559-73b8ab98ac42",
              "analysis_results": [],
              "child": {
                "id": "845a8db5-75ec-bbec-b559-73b8ab98ac42",
                "range": "^2.0.1",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "507643f1-06bc-4e43-9a8a-541ec2ff821a",
                "release": {
                  "id": "507643f1-06bc-4e43-9a8a-541ec2ff821a",
                  "version": "2.0.5",
                  "package": {
                    "name": "through2",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "b459f7eb-e5a4-4b0a-9896-76b57e4e1585",
              "parent_id": "7f947e39-6e0c-7887-cdfd-75eee404c2f9",
              "child_id": "8ce13b35-081d-2237-744e-2c0abeac4970",
              "analysis_results": [],
              "child": {
                "id": "8ce13b35-081d-2237-744e-2c0abeac4970",
                "range": "^4.0.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "618757e6-47ad-48c0-972d-7376d8ff7551",
                "release": {
                  "id": "618757e6-47ad-48c0-972d-7376d8ff7551",
                  "version": "4.0.0",
                  "package": {
                    "name": "untildify",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "8b27b426-907b-429e-9c7e-ef03048950a2",
              "parent_id": "7f947e39-6e0c-7887-cdfd-75eee404c2f9",
              "child_id": "9699c4b7-d7ae-fd08-7828-859e82f4023d",
              "analysis_results": [],
              "child": {
                "id": "9699c4b7-d7ae-fd08-7828-859e82f4023d",
                "range": "^7.0.5",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "8b9cde03-4ede-48d3-94bc-131f93f134c4",
                "release": {
                  "id": "8b9cde03-4ede-48d3-94bc-131f93f134c4",
                  "version": "7.2.3",
                  "package": {
                    "name": "glob",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "63414641-de6f-4005-ae4d-9be9960ab393",
              "parent_id": "7f947e39-6e0c-7887-cdfd-75eee404c2f9",
              "child_id": "99535c3d-3b7d-517e-c09a-accd1f1af218",
              "analysis_results": [],
              "child": {
                "id": "99535c3d-3b7d-517e-c09a-accd1f1af218",
                "range": "0.0.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "e45a0db6-1ce1-4864-b678-ee9435f2e3cc",
                "release": {
                  "id": "e45a0db6-1ce1-4864-b678-ee9435f2e3cc",
                  "version": "0.0.0",
                  "package": {
                    "name": "noms",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "2a2a99ac-6386-4a3e-b430-9363f0233835",
              "parent_id": "7f947e39-6e0c-7887-cdfd-75eee404c2f9",
              "child_id": "bf8014dd-8b76-2bf9-b3ee-a775ca378368",
              "analysis_results": [],
              "child": {
                "id": "bf8014dd-8b76-2bf9-b3ee-a775ca378368",
                "range": "^16.1.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "f2206448-dc5a-496b-8c4b-8a19c7181f32",
                "release": {
                  "id": "f2206448-dc5a-496b-8c4b-8a19c7181f32",
                  "version": "16.2.0",
                  "package": {
                    "name": "yargs",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "18b991d4-634d-40cf-a104-6ef2ac1e1786",
              "parent_id": "c4ba7cf5-fe41-ae45-c8fc-7827556862a1",
              "child_id": "0c938475-e38d-1977-992b-be37c7fa9fbb",
              "analysis_results": [],
              "child": {
                "id": "0c938475-e38d-1977-992b-be37c7fa9fbb",
                "range": "^4.1.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "776c7362-6fdd-43c2-8aff-6cffbb5b4119",
                "release": {
                  "id": "776c7362-6fdd-43c2-8aff-6cffbb5b4119",
                  "version": "4.1.1",
                  "package": {
                    "name": "object-assign",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "2cb4bfc5-720f-477e-9ce7-a25b83dc014a",
              "parent_id": "c4ba7cf5-fe41-ae45-c8fc-7827556862a1",
              "child_id": "6ec93234-fe9f-8f37-5b14-fd19cdca9534",
              "analysis_results": [],
              "child": {
                "id": "6ec93234-fe9f-8f37-5b14-fd19cdca9534",
                "range": "^1.4.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "4d1ccb13-8d9a-4afe-ae9a-5ae1b1a084d4",
                "release": {
                  "id": "4d1ccb13-8d9a-4afe-ae9a-5ae1b1a084d4",
                  "version": "1.4.0",
                  "package": {
                    "name": "loose-envify",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "4caaa787-8437-41e0-85ec-0425b7e52ad6",
              "parent_id": "c57f0bf2-505e-c742-3e18-e97cb9fcaae0",
              "child_id": "071fde55-ccd8-031d-57c4-73b0fdfdaf59",
              "analysis_results": [],
              "child": {
                "id": "071fde55-ccd8-031d-57c4-73b0fdfdaf59",
                "range": "^3.6.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "61c7b620-b697-46ab-94cd-792a1e4c3779",
                "release": {
                  "id": "61c7b620-b697-46ab-94cd-792a1e4c3779",
                  "version": "3.6.0",
                  "package": {
                    "name": "readable-stream",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "82ec7ea7-5e76-47c6-a8a1-d49b89c6cb2f",
              "parent_id": "c57f0bf2-505e-c742-3e18-e97cb9fcaae0",
              "child_id": "176c3c82-8002-1d8b-c3f9-8eadc5d61339",
              "analysis_results": [],
              "child": {
                "id": "176c3c82-8002-1d8b-c3f9-8eadc5d61339",
                "range": "^1.3.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "e218e7fb-b7ba-43cf-956d-ea56772734b3",
                "release": {
                  "id": "e218e7fb-b7ba-43cf-956d-ea56772734b3",
                  "version": "1.3.0",
                  "package": {
                    "name": "component-emitter",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "000e1c91-c546-4db8-aad5-51e0be36b83f",
              "parent_id": "c57f0bf2-505e-c742-3e18-e97cb9fcaae0",
              "child_id": "180d80e1-d7bc-3490-550f-978a3e7e6298",
              "analysis_results": [],
              "child": {
                "id": "180d80e1-d7bc-3490-550f-978a3e7e6298",
                "range": "^1.1.2",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "02bd2c3a-a047-4a02-b384-e947f50e2067",
                "release": {
                  "id": "02bd2c3a-a047-4a02-b384-e947f50e2067",
                  "version": "1.1.2",
                  "package": {
                    "name": "methods",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "74f8fde3-9723-47dd-acf3-0f35b1cddbf7",
              "parent_id": "c57f0bf2-505e-c742-3e18-e97cb9fcaae0",
              "child_id": "1ba2d0a0-e7b6-4c42-5746-84d5d1cdc645",
              "analysis_results": [],
              "child": {
                "id": "1ba2d0a0-e7b6-4c42-5746-84d5d1cdc645",
                "range": "^7.3.2",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "68c624f2-f5b4-449d-a8d7-4b40624dca58",
                "release": {
                  "id": "68c624f2-f5b4-449d-a8d7-4b40624dca58",
                  "version": "7.3.7",
                  "package": {
                    "name": "semver",
                    "package_manager": "npm",
                    "affected_by_vulnerability": [
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "7538bd79-5b3d-40db-9909-71a21f9ffc0b",
                          "source_id": "GHSA-x6fg-f45m-jf5q",
                          "source": "ghsa",
                          "severity_name": "High",
                          "cvss_score": 7.5,
                          "summary": "Regular Expression Denial of Service in semver",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.0.0",
                            "fixed": "4.3.2"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            {
              "id": "8ae8ae16-802e-4b9e-902e-4386b14b141e",
              "parent_id": "c57f0bf2-505e-c742-3e18-e97cb9fcaae0",
              "child_id": "2dd9a686-21a9-a769-ed8d-68b05079fefb",
              "analysis_results": [],
              "child": {
                "id": "2dd9a686-21a9-a769-ed8d-68b05079fefb",
                "range": "^2.4.6",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "4300457a-53a0-40be-956b-941d7c602e66",
                "release": {
                  "id": "4300457a-53a0-40be-956b-941d7c602e66",
                  "version": "2.6.0",
                  "package": {
                    "name": "mime",
                    "package_manager": "npm",
                    "affected_by_vulnerability": [
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "c3846d27-438a-42ac-878f-1c16eccac17b",
                          "source_id": "GHSA-wrvr-8mpx-r7pp",
                          "source": "ghsa",
                          "severity_name": "Medium",
                          "cvss_score": null,
                          "summary": "mime Regular Expression Denial of Service when mime lookup performed on untrusted user input",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "2.0.0",
                            "fixed": "2.0.3"
                          },
                          {
                            "introduced": "0.0.0",
                            "fixed": "1.4.1"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            {
              "id": "6a32b0cc-c9aa-4286-ad18-c08b1d785554",
              "parent_id": "c57f0bf2-505e-c742-3e18-e97cb9fcaae0",
              "child_id": "69372ae9-9c06-c5f4-6662-efa00f8e5b30",
              "analysis_results": [],
              "child": {
                "id": "69372ae9-9c06-c5f4-6662-efa00f8e5b30",
                "range": "^3.0.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "ae5641c5-7616-43ab-83c7-eb1bef0ee755",
                "release": {
                  "id": "ae5641c5-7616-43ab-83c7-eb1bef0ee755",
                  "version": "3.0.1",
                  "package": {
                    "name": "form-data",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "c7f79420-c42b-4ea8-bcf5-1d7d7a10c35b",
              "parent_id": "c57f0bf2-505e-c742-3e18-e97cb9fcaae0",
              "child_id": "7f3ba6f8-10d5-8be2-3b57-245b0f566d78",
              "analysis_results": [],
              "child": {
                "id": "7f3ba6f8-10d5-8be2-3b57-245b0f566d78",
                "range": "^2.0.7",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "6e1bb94f-9b86-4c67-b9a6-4aa97c4f61d6",
                "release": {
                  "id": "6e1bb94f-9b86-4c67-b9a6-4aa97c4f61d6",
                  "version": "2.1.1",
                  "package": {
                    "name": "fast-safe-stringify",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "748ba275-4683-4063-9f09-4354dfee4467",
              "parent_id": "c57f0bf2-505e-c742-3e18-e97cb9fcaae0",
              "child_id": "8e13c041-1e88-e73c-2875-a48952f3208f",
              "analysis_results": [],
              "child": {
                "id": "8e13c041-1e88-e73c-2875-a48952f3208f",
                "range": "^1.2.2",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "9ff04119-963e-43a6-baf2-3e22a0d6fb41",
                "release": {
                  "id": "9ff04119-963e-43a6-baf2-3e22a0d6fb41",
                  "version": "1.2.6",
                  "package": {
                    "name": "formidable",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "3470f07c-adbf-4dab-bd98-10171e10b2f1",
              "parent_id": "c57f0bf2-505e-c742-3e18-e97cb9fcaae0",
              "child_id": "9af638e8-6a6a-9fdb-54e6-d710be929e2c",
              "analysis_results": [],
              "child": {
                "id": "9af638e8-6a6a-9fdb-54e6-d710be929e2c",
                "range": "^4.1.1",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "299b77c4-3f81-4159-a16b-60011d636ce9",
                "release": {
                  "id": "299b77c4-3f81-4159-a16b-60011d636ce9",
                  "version": "4.3.4",
                  "package": {
                    "name": "debug",
                    "package_manager": "npm",
                    "affected_by_vulnerability": [
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "7918b12c-0c1f-4799-8212-544974a4a160",
                          "source_id": "GHSA-gxpj-cx7g-858c",
                          "source": "ghsa",
                          "severity_name": "Low",
                          "cvss_score": null,
                          "summary": "Regular Expression Denial of Service in debug",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.0.0",
                            "fixed": "2.6.9"
                          },
                          {
                            "introduced": "3.0.0",
                            "fixed": "3.1.0"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            {
              "id": "1bc21d1e-2c45-4e6d-b551-5b2f2be5e3b7",
              "parent_id": "c57f0bf2-505e-c742-3e18-e97cb9fcaae0",
              "child_id": "aed04ea9-cd1f-fc57-2e49-bfca525611b3",
              "analysis_results": [],
              "child": {
                "id": "aed04ea9-cd1f-fc57-2e49-bfca525611b3",
                "range": "^6.7.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "c363f1f9-2ffe-4a42-bd6b-212908642090",
                "release": {
                  "id": "c363f1f9-2ffe-4a42-bd6b-212908642090",
                  "version": "6.11.0",
                  "package": {
                    "name": "qs",
                    "package_manager": "npm",
                    "affected_by_vulnerability": [
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "51ccde0b-ef4c-4b02-8971-25e042b25cc5",
                          "source_id": "GHSA-jjv7-qpx3-h62q",
                          "source": "ghsa",
                          "severity_name": "High",
                          "cvss_score": null,
                          "summary": "Denial-of-Service Memory Exhaustion in qs",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.0.0",
                            "fixed": "1.0.0"
                          }
                        ]
                      },
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "610e6553-c064-46ab-bcfe-1409520fbe0a",
                          "source_id": "GHSA-crvj-3gj9-gm2p",
                          "source": "ghsa",
                          "severity_name": "High",
                          "cvss_score": null,
                          "summary": "High severity vulnerability that affects qs",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.0.0",
                            "fixed": "1.0.0"
                          }
                        ]
                      },
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "4e97446d-a2c1-4372-b71f-490d305233fc",
                          "source_id": "GHSA-f9cm-p3w6-xvr3",
                          "source": "ghsa",
                          "severity_name": "High",
                          "cvss_score": null,
                          "summary": "Denial-of-Service Extended Event Loop Blocking in qs",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.0.0",
                            "fixed": "1.0.0"
                          }
                        ]
                      },
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "88981548-9eec-4992-bfd0-4a83e9c65769",
                          "source_id": "GHSA-gqgv-6jq5-jjj9",
                          "source": "ghsa",
                          "severity_name": "High",
                          "cvss_score": 7.5,
                          "summary": "Prototype Pollution Protection Bypass in qs",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.0.0",
                            "fixed": "6.0.4"
                          },
                          {
                            "introduced": "6.1.0",
                            "fixed": "6.1.2"
                          },
                          {
                            "introduced": "6.2.0",
                            "fixed": "6.2.3"
                          },
                          {
                            "introduced": "6.3.0",
                            "fixed": "6.3.2"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            {
              "id": "ee905200-b679-4c75-910a-fd53544709da",
              "parent_id": "c57f0bf2-505e-c742-3e18-e97cb9fcaae0",
              "child_id": "ed63f975-e58e-c9bc-2167-f3140ccd7a76",
              "analysis_results": [],
              "child": {
                "id": "ed63f975-e58e-c9bc-2167-f3140ccd7a76",
                "range": "^2.1.2",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "573191f0-85d8-42c2-89f8-bd47a9b49335",
                "release": {
                  "id": "573191f0-85d8-42c2-89f8-bd47a9b49335",
                  "version": "2.1.3",
                  "package": {
                    "name": "cookiejar",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "1ff54ed4-4e48-4c67-8f5f-6074f89f3c3f",
              "parent_id": "071fde55-ccd8-031d-57c4-73b0fdfdaf59",
              "child_id": "6fad27f3-10f0-be93-97a1-215c0fd18a5f",
              "analysis_results": [],
              "child": {
                "id": "6fad27f3-10f0-be93-97a1-215c0fd18a5f",
                "range": "^1.1.1",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "9d9aaf9d-f888-449c-a912-cbbe9ab176bf",
                "release": {
                  "id": "9d9aaf9d-f888-449c-a912-cbbe9ab176bf",
                  "version": "1.3.0",
                  "package": {
                    "name": "string_decoder",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "637c3a38-746c-4260-a4a9-5563d0edccad",
              "parent_id": "071fde55-ccd8-031d-57c4-73b0fdfdaf59",
              "child_id": "c55db5fa-f2b0-ad6e-a88f-bb387da3f25c",
              "analysis_results": [],
              "child": {
                "id": "c55db5fa-f2b0-ad6e-a88f-bb387da3f25c",
                "range": "~1.0.1",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "96d6a6c1-4d64-4ffb-88eb-f0a661d12534",
                "release": {
                  "id": "96d6a6c1-4d64-4ffb-88eb-f0a661d12534",
                  "version": "1.0.2",
                  "package": {
                    "name": "util-deprecate",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "f016477f-13c4-4ae7-aa79-99a65a4a36a8",
              "parent_id": "071fde55-ccd8-031d-57c4-73b0fdfdaf59",
              "child_id": "e943b4a0-0c14-b7f1-de2a-32bb2b51b1f0",
              "analysis_results": [],
              "child": {
                "id": "e943b4a0-0c14-b7f1-de2a-32bb2b51b1f0",
                "range": "~2.0.3",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "f3eb1fa0-d8d0-4745-8213-a3045d3180b5",
                "release": {
                  "id": "f3eb1fa0-d8d0-4745-8213-a3045d3180b5",
                  "version": "2.0.4",
                  "package": {
                    "name": "inherits",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "711f0512-8f3e-410d-8646-f545699285cd",
              "parent_id": "154d37f1-05d6-d0a7-6a38-b2e9734bd501",
              "child_id": "8ccd23e3-b218-1739-78a3-e7521b2925d6",
              "analysis_results": [],
              "child": {
                "id": "8ccd23e3-b218-1739-78a3-e7521b2925d6",
                "range": "~2.0.3",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "594c0713-719a-4a95-8c1f-6185f20292c1",
                "release": {
                  "id": "594c0713-719a-4a95-8c1f-6185f20292c1",
                  "version": "2.0.6",
                  "package": {
                    "name": "asap",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "ea162132-17d1-4496-8aca-b1a391aa168f",
              "parent_id": "1ba2d0a0-e7b6-4c42-5746-84d5d1cdc645",
              "child_id": "b3b866cc-cf27-c494-bfd5-219465427a66",
              "analysis_results": [],
              "child": {
                "id": "b3b866cc-cf27-c494-bfd5-219465427a66",
                "range": "^6.0.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "163a1cc5-ad18-4389-b3d0-a53515f8d504",
                "release": {
                  "id": "163a1cc5-ad18-4389-b3d0-a53515f8d504",
                  "version": "6.0.0",
                  "package": {
                    "name": "lru-cache",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "2d08c268-85a3-4175-8d81-5a4363f387df",
              "parent_id": "38d06036-6785-33c5-091a-84d7c86e73a1",
              "child_id": "70d9033c-3e33-4cf8-cfde-8be74a3fe92c",
              "analysis_results": [],
              "child": {
                "id": "70d9033c-3e33-4cf8-cfde-8be74a3fe92c",
                "range": "^1.1.7",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "5f3e5cb6-43c9-47da-ac2b-650d3fd177f7",
                "release": {
                  "id": "5f3e5cb6-43c9-47da-ac2b-650d3fd177f7",
                  "version": "1.1.11",
                  "package": {
                    "name": "brace-expansion",
                    "package_manager": "npm",
                    "affected_by_vulnerability": [
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "0be2947d-c739-4f97-b332-04dce907f72d",
                          "source_id": "GHSA-832h-xg76-4gv6",
                          "source": "ghsa",
                          "severity_name": "High",
                          "cvss_score": 7.5,
                          "summary": "ReDoS in brace-expansion",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.0.0",
                            "fixed": "1.1.7"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            {
              "id": "2c64638a-1811-4b28-9c44-6dfd0f0e04f3",
              "parent_id": "53b5ac9f-2e2a-047f-6932-2032782f909e",
              "child_id": "027e2e88-d4ba-bf3a-7cf7-3d00e6640209",
              "analysis_results": [],
              "child": {
                "id": "027e2e88-d4ba-bf3a-7cf7-3d00e6640209",
                "range": "^0.13.4",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "00e6d06b-607f-4ed3-be92-1d0d81d78d8b",
                "release": {
                  "id": "00e6d06b-607f-4ed3-be92-1d0d81d78d8b",
                  "version": "0.13.9",
                  "package": {
                    "name": "regenerator-runtime",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "3d48079e-6fad-486a-94f1-bbfb11e4b5c1",
              "parent_id": "69372ae9-9c06-c5f4-6662-efa00f8e5b30",
              "child_id": "22ba4049-d594-5744-0a39-af46ab4a9aa7",
              "analysis_results": [],
              "child": {
                "id": "22ba4049-d594-5744-0a39-af46ab4a9aa7",
                "range": "^1.0.8",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "c29dd96b-c234-4696-8b18-5c81873f61de",
                "release": {
                  "id": "c29dd96b-c234-4696-8b18-5c81873f61de",
                  "version": "1.0.8",
                  "package": {
                    "name": "combined-stream",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "3836f172-8e5a-4f88-85da-c247318a39c3",
              "parent_id": "69372ae9-9c06-c5f4-6662-efa00f8e5b30",
              "child_id": "4612b7d2-3476-28fd-350d-3502a016a9d2",
              "analysis_results": [],
              "child": {
                "id": "4612b7d2-3476-28fd-350d-3502a016a9d2",
                "range": "^2.1.12",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "9f5ee925-07d9-4e08-bab2-8a4e5caeb9dd",
                "release": {
                  "id": "9f5ee925-07d9-4e08-bab2-8a4e5caeb9dd",
                  "version": "2.1.35",
                  "package": {
                    "name": "mime-types",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "7c8e46ab-3013-4cb8-9632-45b231941a7b",
              "parent_id": "69372ae9-9c06-c5f4-6662-efa00f8e5b30",
              "child_id": "c9ec3ab9-9e15-396b-0b89-5776aacd8290",
              "analysis_results": [],
              "child": {
                "id": "c9ec3ab9-9e15-396b-0b89-5776aacd8290",
                "range": "^0.4.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "746577dc-7f1b-4092-b725-d2c9f16e9665",
                "release": {
                  "id": "746577dc-7f1b-4092-b725-d2c9f16e9665",
                  "version": "0.4.0",
                  "package": {
                    "name": "asynckit",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "72b8264d-246c-453e-9db1-c9a22f0922e6",
              "parent_id": "845a8db5-75ec-bbec-b559-73b8ab98ac42",
              "child_id": "a7765c19-bc6f-a8e2-91ef-1fb446922568",
              "analysis_results": [],
              "child": {
                "id": "a7765c19-bc6f-a8e2-91ef-1fb446922568",
                "range": "~4.0.1",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "adbbc756-ba9a-419a-b058-755813bf7da5",
                "release": {
                  "id": "adbbc756-ba9a-419a-b058-755813bf7da5",
                  "version": "4.0.2",
                  "package": {
                    "name": "xtend",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "1e67be1e-a1cf-4b61-8e16-121a04b76fc3",
              "parent_id": "845a8db5-75ec-bbec-b559-73b8ab98ac42",
              "child_id": "d21126c1-96d6-9084-f55b-3ae3fbda36bd",
              "analysis_results": [],
              "child": {
                "id": "d21126c1-96d6-9084-f55b-3ae3fbda36bd",
                "range": "~2.3.6",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "f2b8af8a-8962-4e4d-882b-6e3420bc0e90",
                "release": {
                  "id": "f2b8af8a-8962-4e4d-882b-6e3420bc0e90",
                  "version": "2.3.7",
                  "package": {
                    "name": "readable-stream",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "edc6cbdc-c777-4723-8c35-cc906f687b9b",
              "parent_id": "9699c4b7-d7ae-fd08-7828-859e82f4023d",
              "child_id": "0a6d449c-f155-941b-caae-7b9a83092cd0",
              "analysis_results": [],
              "child": {
                "id": "0a6d449c-f155-941b-caae-7b9a83092cd0",
                "range": "^1.0.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "b59da5cd-e2dd-48db-ac73-30638d6b4e96",
                "release": {
                  "id": "b59da5cd-e2dd-48db-ac73-30638d6b4e96",
                  "version": "1.0.1",
                  "package": {
                    "name": "path-is-absolute",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "9c4798a1-907c-416f-ad07-7642970c27ec",
              "parent_id": "9699c4b7-d7ae-fd08-7828-859e82f4023d",
              "child_id": "38d06036-6785-33c5-091a-84d7c86e73a1",
              "analysis_results": [],
              "child": {
                "id": "38d06036-6785-33c5-091a-84d7c86e73a1",
                "range": "^3.0.3",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "657c29e8-d073-42e8-b9b5-dd66e206165b",
                "release": {
                  "id": "657c29e8-d073-42e8-b9b5-dd66e206165b",
                  "version": "3.1.2",
                  "package": {
                    "name": "minimatch",
                    "package_manager": "npm",
                    "affected_by_vulnerability": [
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "bc43c856-c60c-43cc-82a6-a9a1bb9414bd",
                          "source_id": "GHSA-hxm2-r34f-qmc5",
                          "source": "ghsa",
                          "severity_name": "High",
                          "cvss_score": 7.5,
                          "summary": "Regular Expression Denial of Service in minimatch",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.0.0",
                            "fixed": "3.0.2"
                          }
                        ]
                      },
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "44fe8d62-cb6b-44e4-b4fd-e115c4a63239",
                          "source_id": "GHSA-f8q6-p94x-37v3",
                          "source": "ghsa",
                          "severity_name": "High",
                          "cvss_score": 7.5,
                          "summary": "minimatch ReDoS vulnerability",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.0.0",
                            "fixed": "3.0.5"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            {
              "id": "d58dc958-43e3-4639-b4f6-6c30b1dd2de6",
              "parent_id": "9699c4b7-d7ae-fd08-7828-859e82f4023d",
              "child_id": "8e35bb50-e853-586c-fdfc-dc51abf34055",
              "analysis_results": [],
              "child": {
                "id": "8e35bb50-e853-586c-fdfc-dc51abf34055",
                "range": "^1.0.4",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "7000bda6-7027-456e-919a-49177e88823b",
                "release": {
                  "id": "7000bda6-7027-456e-919a-49177e88823b",
                  "version": "1.0.6",
                  "package": {
                    "name": "inflight",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "61d59436-d704-4f1f-9c61-33c5d06a94c4",
              "parent_id": "9699c4b7-d7ae-fd08-7828-859e82f4023d",
              "child_id": "adad82e7-c63c-273a-b39b-4a01eaef0cd9",
              "analysis_results": [],
              "child": {
                "id": "adad82e7-c63c-273a-b39b-4a01eaef0cd9",
                "range": "^1.3.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "4bfdabff-e25d-42b3-815b-b9f6e4543222",
                "release": {
                  "id": "4bfdabff-e25d-42b3-815b-b9f6e4543222",
                  "version": "1.4.0",
                  "package": {
                    "name": "once",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "db87d575-99fb-4747-9350-15d6c7245ac5",
              "parent_id": "9699c4b7-d7ae-fd08-7828-859e82f4023d",
              "child_id": "e943b4a0-0c14-b7f1-de2a-32bb2b51b1f0",
              "analysis_results": [],
              "child": {
                "id": "e943b4a0-0c14-b7f1-de2a-32bb2b51b1f0",
                "range": "~2.0.3",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "f3eb1fa0-d8d0-4745-8213-a3045d3180b5",
                "release": {
                  "id": "f3eb1fa0-d8d0-4745-8213-a3045d3180b5",
                  "version": "2.0.4",
                  "package": {
                    "name": "inherits",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "1c3c8a1b-9f26-4aad-9141-a4c3751861ca",
              "parent_id": "9699c4b7-d7ae-fd08-7828-859e82f4023d",
              "child_id": "f10a4c97-f777-53f3-705b-62d04457e1b0",
              "analysis_results": [],
              "child": {
                "id": "f10a4c97-f777-53f3-705b-62d04457e1b0",
                "range": "^1.0.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "6ce4d680-fb89-470c-b997-de455418ee6d",
                "release": {
                  "id": "6ce4d680-fb89-470c-b997-de455418ee6d",
                  "version": "1.0.0",
                  "package": {
                    "name": "fs.realpath",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "e16ec27d-ab4c-4764-b065-b4ea80b4209c",
              "parent_id": "99535c3d-3b7d-517e-c09a-accd1f1af218",
              "child_id": "3b6d1bd7-3b0d-acca-d069-f46efd57c573",
              "analysis_results": [],
              "child": {
                "id": "3b6d1bd7-3b0d-acca-d069-f46efd57c573",
                "range": "~1.0.31",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "286e3e6e-6430-4316-8bd9-848721b3e5d0",
                "release": {
                  "id": "286e3e6e-6430-4316-8bd9-848721b3e5d0",
                  "version": "1.0.34",
                  "package": {
                    "name": "readable-stream",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "f52a3435-ef97-4a8b-818b-098cf5cb1d3c",
              "parent_id": "99535c3d-3b7d-517e-c09a-accd1f1af218",
              "child_id": "e943b4a0-0c14-b7f1-de2a-32bb2b51b1f0",
              "analysis_results": [],
              "child": {
                "id": "e943b4a0-0c14-b7f1-de2a-32bb2b51b1f0",
                "range": "~2.0.3",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "f3eb1fa0-d8d0-4745-8213-a3045d3180b5",
                "release": {
                  "id": "f3eb1fa0-d8d0-4745-8213-a3045d3180b5",
                  "version": "2.0.4",
                  "package": {
                    "name": "inherits",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "ecdfbc10-4726-4537-b900-827dc61b7cd8",
              "parent_id": "9af638e8-6a6a-9fdb-54e6-d710be929e2c",
              "child_id": "299d1fdd-56cd-5832-441b-fe4431a646ce",
              "analysis_results": [],
              "child": {
                "id": "299d1fdd-56cd-5832-441b-fe4431a646ce",
                "range": "2.1.2",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "99cec646-69ba-4d01-979c-de3b51732418",
                "release": {
                  "id": "99cec646-69ba-4d01-979c-de3b51732418",
                  "version": "2.1.2",
                  "package": {
                    "name": "ms",
                    "package_manager": "npm",
                    "affected_by_vulnerability": [
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "8abfd1aa-d412-45aa-a7f6-271bcc57ad25",
                          "source_id": "GHSA-3fx5-fwvr-xrjg",
                          "source": "ghsa",
                          "severity_name": "High",
                          "cvss_score": 7.5,
                          "summary": "Regular Expression Denial of Service in ms",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.0.0",
                            "fixed": "0.7.1"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            {
              "id": "ddf33a96-dc18-4f7f-a87c-67025bed9f71",
              "parent_id": "bf8014dd-8b76-2bf9-b3ee-a775ca378368",
              "child_id": "08b0235c-6b27-9356-508d-12d2b75d5c17",
              "analysis_results": [],
              "child": {
                "id": "08b0235c-6b27-9356-508d-12d2b75d5c17",
                "range": "^7.0.2",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "e866b17d-6997-4333-8387-bae85fb40d3a",
                "release": {
                  "id": "e866b17d-6997-4333-8387-bae85fb40d3a",
                  "version": "7.0.4",
                  "package": {
                    "name": "cliui",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "b210fd2e-0da3-47b7-afda-d6d8911c5d07",
              "parent_id": "bf8014dd-8b76-2bf9-b3ee-a775ca378368",
              "child_id": "1fbbbc47-17ee-2738-97cf-bd3f8f4b0f94",
              "analysis_results": [],
              "child": {
                "id": "1fbbbc47-17ee-2738-97cf-bd3f8f4b0f94",
                "range": "^5.0.5",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "3f5bfeb8-a9ee-42ec-b4a4-1aef5d8aea6e",
                "release": {
                  "id": "3f5bfeb8-a9ee-42ec-b4a4-1aef5d8aea6e",
                  "version": "5.0.8",
                  "package": {
                    "name": "y18n",
                    "package_manager": "npm",
                    "affected_by_vulnerability": [
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "4575eb69-939b-4b21-85d2-ecde81aa464a",
                          "source_id": "GHSA-c4w7-xm78-47vh",
                          "source": "ghsa",
                          "severity_name": "High",
                          "cvss_score": 7.3,
                          "summary": "Prototype Pollution in y18n",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.0.0",
                            "fixed": "3.2.2"
                          },
                          {
                            "introduced": "4.0.0",
                            "fixed": "4.0.1"
                          },
                          {
                            "introduced": "5.0.0",
                            "fixed": "5.0.5"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            {
              "id": "3fcf23f3-bfda-4303-83f4-4202344c0a2e",
              "parent_id": "bf8014dd-8b76-2bf9-b3ee-a775ca378368",
              "child_id": "47f51dc4-ef07-75c0-95c8-d2005a976578",
              "analysis_results": [],
              "child": {
                "id": "47f51dc4-ef07-75c0-95c8-d2005a976578",
                "range": "^3.1.1",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "9a43bc66-fb34-4943-a90a-5fccf7b934a8",
                "release": {
                  "id": "9a43bc66-fb34-4943-a90a-5fccf7b934a8",
                  "version": "3.1.1",
                  "package": {
                    "name": "escalade",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "94df5a78-a53a-4dbe-9f0e-4722b2344c3f",
              "parent_id": "bf8014dd-8b76-2bf9-b3ee-a775ca378368",
              "child_id": "481a3a13-9e54-12d3-d5cf-e442d1de7573",
              "analysis_results": [],
              "child": {
                "id": "481a3a13-9e54-12d3-d5cf-e442d1de7573",
                "range": "^2.0.5",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "1d8c55d7-d283-400b-ace5-896e40ccb76f",
                "release": {
                  "id": "1d8c55d7-d283-400b-ace5-896e40ccb76f",
                  "version": "2.0.5",
                  "package": {
                    "name": "get-caller-file",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "b7b1a6ed-6362-479e-92a8-170ae9fbe948",
              "parent_id": "bf8014dd-8b76-2bf9-b3ee-a775ca378368",
              "child_id": "521d13de-00b2-b0cd-22e4-867c790cbf0e",
              "analysis_results": [],
              "child": {
                "id": "521d13de-00b2-b0cd-22e4-867c790cbf0e",
                "range": "^2.1.1",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "b5524880-5394-46fd-b1a7-ef53669c5459",
                "release": {
                  "id": "b5524880-5394-46fd-b1a7-ef53669c5459",
                  "version": "2.1.1",
                  "package": {
                    "name": "require-directory",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "a4cecf70-ecb5-4be4-bf2b-f09f3956194d",
              "parent_id": "bf8014dd-8b76-2bf9-b3ee-a775ca378368",
              "child_id": "621e12eb-8dc9-b4dc-cfb0-472033427189",
              "analysis_results": [],
              "child": {
                "id": "621e12eb-8dc9-b4dc-cfb0-472033427189",
                "range": "^20.2.2",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "f46c26ba-3419-4799-8c5a-be32c339fccb",
                "release": {
                  "id": "f46c26ba-3419-4799-8c5a-be32c339fccb",
                  "version": "20.2.9",
                  "package": {
                    "name": "yargs-parser",
                    "package_manager": "npm",
                    "affected_by_vulnerability": [
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "71cf0398-d1bc-473b-9073-a26423de4a60",
                          "source_id": "GHSA-p9pc-299p-vxgp",
                          "source": "ghsa",
                          "severity_name": "Medium",
                          "cvss_score": 5.3,
                          "summary": "yargs-parser Vulnerable to Prototype Pollution",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "6.0.0",
                            "fixed": "13.1.2"
                          },
                          {
                            "introduced": "14.0.0",
                            "fixed": "15.0.1"
                          },
                          {
                            "introduced": "16.0.0",
                            "fixed": "18.1.1"
                          },
                          {
                            "introduced": "0.0.0",
                            "fixed": "5.0.1"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            {
              "id": "e3c30504-9788-4f85-8c34-7e050cd4b30f",
              "parent_id": "bf8014dd-8b76-2bf9-b3ee-a775ca378368",
              "child_id": "aadbf69d-20db-c340-7399-c5daf17c6dca",
              "analysis_results": [],
              "child": {
                "id": "aadbf69d-20db-c340-7399-c5daf17c6dca",
                "range": "^4.2.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "513f0c90-14f3-4fea-97cc-b572a8f35f3c",
                "release": {
                  "id": "513f0c90-14f3-4fea-97cc-b572a8f35f3c",
                  "version": "4.2.3",
                  "package": {
                    "name": "string-width",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "f4d099f2-db85-49be-9a83-c72e96648e0a",
              "parent_id": "c5f74079-e7d5-6381-831a-bc4ee22549ee",
              "child_id": "8653054c-b253-b938-adc0-120371f060c6",
              "analysis_results": [],
              "child": {
                "id": "8653054c-b253-b938-adc0-120371f060c6",
                "range": "^1.1.1",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "8429a430-109a-46da-845f-b8f049b4ffee",
                "release": {
                  "id": "8429a430-109a-46da-845f-b8f049b4ffee",
                  "version": "1.1.1",
                  "package": {
                    "name": "function-bind",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "344d6953-c95d-4227-b622-e0de342c9c4d",
              "parent_id": "c5f74079-e7d5-6381-831a-bc4ee22549ee",
              "child_id": "cfa211cf-661f-659f-cf6e-a1134e80181e",
              "analysis_results": [],
              "child": {
                "id": "cfa211cf-661f-659f-cf6e-a1134e80181e",
                "range": "^1.0.2",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "7d9ed08d-0b7a-451d-bd2e-2af8ac60ae09",
                "release": {
                  "id": "7d9ed08d-0b7a-451d-bd2e-2af8ac60ae09",
                  "version": "1.1.2",
                  "package": {
                    "name": "get-intrinsic",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "ccad74ab-c9e0-4158-886a-9b575bb0074d",
              "parent_id": "cfa211cf-661f-659f-cf6e-a1134e80181e",
              "child_id": "68a29834-98db-e1b0-2280-7de6cef44d8a",
              "analysis_results": [],
              "child": {
                "id": "68a29834-98db-e1b0-2280-7de6cef44d8a",
                "range": "^1.0.3",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "44656fac-3032-469a-8590-90afecb60f70",
                "release": {
                  "id": "44656fac-3032-469a-8590-90afecb60f70",
                  "version": "1.0.3",
                  "package": {
                    "name": "has",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "a0e18fe1-8fa4-4474-87e0-034af246b779",
              "parent_id": "cfa211cf-661f-659f-cf6e-a1134e80181e",
              "child_id": "82fb7d93-be69-6f6a-e4f1-1056f2ba7a4e",
              "analysis_results": [],
              "child": {
                "id": "82fb7d93-be69-6f6a-e4f1-1056f2ba7a4e",
                "range": "^1.0.3",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "79b8d876-2cab-4c2f-b56c-50d4504b2b60",
                "release": {
                  "id": "79b8d876-2cab-4c2f-b56c-50d4504b2b60",
                  "version": "1.0.3",
                  "package": {
                    "name": "has-symbols",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "2982f7d6-290e-47b5-843c-90612a345a0e",
              "parent_id": "cfa211cf-661f-659f-cf6e-a1134e80181e",
              "child_id": "8653054c-b253-b938-adc0-120371f060c6",
              "analysis_results": [],
              "child": {
                "id": "8653054c-b253-b938-adc0-120371f060c6",
                "range": "^1.1.1",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "8429a430-109a-46da-845f-b8f049b4ffee",
                "release": {
                  "id": "8429a430-109a-46da-845f-b8f049b4ffee",
                  "version": "1.1.1",
                  "package": {
                    "name": "function-bind",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "80258df9-e7ec-4e65-a350-a37d874891f4",
              "parent_id": "f9bda8fe-fd0d-b75d-379a-7d63fc7edfcf",
              "child_id": "3b314328-81aa-47da-a40d-2ec3e9ed137a",
              "analysis_results": [
              ],
              "child": {
                "id": "3b314328-81aa-47da-a40d-2ec3e9ed137a",
                "range": "^1.0.1",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "0d7ab14a-ea2e-420f-96cc-9478542f59dc",
                "release": {
                  "id": "0d7ab14a-ea2e-420f-96cc-9478542f59dc",
                  "version": "1.7.3",
                  "package": {
                    "name": "node-fetch",
                    "package_manager": "npm",
                    "affected_by_vulnerability": [
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "d5835299-6054-49e5-86ee-ecfe3c32774c",
                          "source_id": "GHSA-w7rc-rwvf-8q5r",
                          "source": "ghsa",
                          "severity_name": "Low",
                          "cvss_score": 2.6,
                          "summary": "The `size` option isn't honored after following a redirect in node-fetch",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "0.0.0",
                            "fixed": "2.6.1"
                          },
                          {
                            "introduced": "3.0.0-beta.1",
                            "fixed": "3.0.0-beta.9"
                          }
                        ]
                      },
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "d976427f-5f63-4e59-acb0-59d77b74780a",
                          "source_id": "GHSA-r683-j2x4-v87g",
                          "source": "ghsa",
                          "severity_name": "High",
                          "cvss_score": 8.8,
                          "summary": "node-fetch is vulnerable to Exposure of Sensitive Information to an Unauthorized Actor",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "3.0.0",
                            "fixed": "3.1.1"
                          },
                          {
                            "introduced": "0.0.0",
                            "fixed": "2.6.7"
                          }
                        ]
                      },
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "75f7f6b2-c6c4-4e65-a152-e4e95a3c1489",
                          "source_id": "GHSA-vp56-6g26-6827",
                          "source": "ghsa",
                          "severity_name": "Medium",
                          "cvss_score": 5.9,
                          "summary": "node-fetch Inefficient Regular Expression Complexity ",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "3.0.0",
                            "fixed": "3.2.10"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            {
              "id": "50336bcb-2115-49b3-ad0d-bd446de5f5d7",
              "parent_id": "f9bda8fe-fd0d-b75d-379a-7d63fc7edfcf",
              "child_id": "d1cecb2e-76e1-642b-8ff3-f816b0e44023",
              "analysis_results": [],
              "child": {
                "id": "d1cecb2e-76e1-642b-8ff3-f816b0e44023",
                "range": ">=0.10.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "95384f84-35dd-451d-b912-1e761db61207",
                "release": {
                  "id": "95384f84-35dd-451d-b912-1e761db61207",
                  "version": "3.6.2",
                  "package": {
                    "name": "whatwg-fetch",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "e8c3ab81-1fd5-4868-9f20-4db921fea402",
              "parent_id": "08b0235c-6b27-9356-508d-12d2b75d5c17",
              "child_id": "50dabacb-dd90-cdd9-eba7-8fbdb4af3d5d",
              "analysis_results": [],
              "child": {
                "id": "50dabacb-dd90-cdd9-eba7-8fbdb4af3d5d",
                "range": "^7.0.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "5c83849e-ad3a-416e-9d54-895e29da4f9d",
                "release": {
                  "id": "5c83849e-ad3a-416e-9d54-895e29da4f9d",
                  "version": "7.0.0",
                  "package": {
                    "name": "wrap-ansi",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "62a2e978-0740-4411-a687-082e9ae6a578",
              "parent_id": "08b0235c-6b27-9356-508d-12d2b75d5c17",
              "child_id": "75c5e349-e122-5cc9-3252-fc9fa5435ea1",
              "analysis_results": [],
              "child": {
                "id": "75c5e349-e122-5cc9-3252-fc9fa5435ea1",
                "range": "^6.0.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "57574c43-abcb-4533-8937-bf70f1ef1b31",
                "release": {
                  "id": "57574c43-abcb-4533-8937-bf70f1ef1b31",
                  "version": "6.0.1",
                  "package": {
                    "name": "strip-ansi",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "fbbac7d6-2f9e-4000-8be1-b12c34067e89",
              "parent_id": "08b0235c-6b27-9356-508d-12d2b75d5c17",
              "child_id": "aadbf69d-20db-c340-7399-c5daf17c6dca",
              "analysis_results": [],
              "child": {
                "id": "aadbf69d-20db-c340-7399-c5daf17c6dca",
                "range": "^4.2.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "513f0c90-14f3-4fea-97cc-b572a8f35f3c",
                "release": {
                  "id": "513f0c90-14f3-4fea-97cc-b572a8f35f3c",
                  "version": "4.2.3",
                  "package": {
                    "name": "string-width",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "3fe3c5a8-57de-418b-b2d8-fc6f0a1e9d8b",
              "parent_id": "22ba4049-d594-5744-0a39-af46ab4a9aa7",
              "child_id": "6d0e6063-5dfa-350b-7134-0b39ae6a2c14",
              "analysis_results": [],
              "child": {
                "id": "6d0e6063-5dfa-350b-7134-0b39ae6a2c14",
                "range": "~1.0.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "e28b626c-2fd8-419f-a6c8-d994c3cf3df6",
                "release": {
                  "id": "e28b626c-2fd8-419f-a6c8-d994c3cf3df6",
                  "version": "1.0.0",
                  "package": {
                    "name": "delayed-stream",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "e2ada48b-6ecb-4899-9ee3-7b5b95fa0bca",
              "parent_id": "3b314328-81aa-47da-a40d-2ec3e9ed137a",
              "child_id": "945aeeca-9769-a3b6-5482-e56a861d0173",
              "analysis_results": [],
              "child": {
                "id": "945aeeca-9769-a3b6-5482-e56a861d0173",
                "range": "^1.0.1",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "b9740030-87b0-4478-a5f6-3808126e72fa",
                "release": {
                  "id": "b9740030-87b0-4478-a5f6-3808126e72fa",
                  "version": "1.1.0",
                  "package": {
                    "name": "is-stream",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "4bcca620-874b-46fc-bcde-e0beb16a6285",
              "parent_id": "3b314328-81aa-47da-a40d-2ec3e9ed137a",
              "child_id": "de3ddf96-0765-b5f2-bda1-d772982d03d7",
              "analysis_results": [],
              "child": {
                "id": "de3ddf96-0765-b5f2-bda1-d772982d03d7",
                "range": "^0.1.11",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "0975d5b4-d11d-4acd-aaa5-613c44b3ef28",
                "release": {
                  "id": "0975d5b4-d11d-4acd-aaa5-613c44b3ef28",
                  "version": "0.1.13",
                  "package": {
                    "name": "encoding",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "5d01ee10-63c9-476e-aafe-a726d8aaef39",
              "parent_id": "3b6d1bd7-3b0d-acca-d069-f46efd57c573",
              "child_id": "221a168f-4302-d83b-8b4a-89480a85039e",
              "analysis_results": [],
              "child": {
                "id": "221a168f-4302-d83b-8b4a-89480a85039e",
                "range": "0.0.1",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "c2fb7fe5-352d-4d4b-8d82-cd1c832cb5d7",
                "release": {
                  "id": "c2fb7fe5-352d-4d4b-8d82-cd1c832cb5d7",
                  "version": "0.0.1",
                  "package": {
                    "name": "isarray",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "c7681055-4425-4a0a-ad9b-972b6cb1c73c",
              "parent_id": "3b6d1bd7-3b0d-acca-d069-f46efd57c573",
              "child_id": "529f1ec2-22da-ee1c-756f-2f1b7d330f74",
              "analysis_results": [],
              "child": {
                "id": "529f1ec2-22da-ee1c-756f-2f1b7d330f74",
                "range": "~1.0.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "130d7da0-1c7a-40ee-acb5-20bcb146972e",
                "release": {
                  "id": "130d7da0-1c7a-40ee-acb5-20bcb146972e",
                  "version": "1.0.3",
                  "package": {
                    "name": "core-util-is",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "a8c6f867-8a02-44dc-ae4b-240ead3a6647",
              "parent_id": "3b6d1bd7-3b0d-acca-d069-f46efd57c573",
              "child_id": "af4ab454-42e9-a9ad-0ea0-137c89d0646e",
              "analysis_results": [],
              "child": {
                "id": "af4ab454-42e9-a9ad-0ea0-137c89d0646e",
                "range": "~0.10.x",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "5073aaa2-935e-40f2-b5b1-93b239712266",
                "release": {
                  "id": "5073aaa2-935e-40f2-b5b1-93b239712266",
                  "version": "0.10.31",
                  "package": {
                    "name": "string_decoder",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "910624bf-d96e-4bf2-9361-43133fd9664b",
              "parent_id": "3b6d1bd7-3b0d-acca-d069-f46efd57c573",
              "child_id": "e943b4a0-0c14-b7f1-de2a-32bb2b51b1f0",
              "analysis_results": [],
              "child": {
                "id": "e943b4a0-0c14-b7f1-de2a-32bb2b51b1f0",
                "range": "~2.0.3",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "f3eb1fa0-d8d0-4745-8213-a3045d3180b5",
                "release": {
                  "id": "f3eb1fa0-d8d0-4745-8213-a3045d3180b5",
                  "version": "2.0.4",
                  "package": {
                    "name": "inherits",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "627648ef-95fa-4e6d-90a3-bbf277aba996",
              "parent_id": "4612b7d2-3476-28fd-350d-3502a016a9d2",
              "child_id": "e94a4f59-8978-47dc-0e79-d53acb075906",
              "analysis_results": [],
              "child": {
                "id": "e94a4f59-8978-47dc-0e79-d53acb075906",
                "range": "1.52.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "5291d315-375c-4baf-ba0d-1fbc20a54941",
                "release": {
                  "id": "5291d315-375c-4baf-ba0d-1fbc20a54941",
                  "version": "1.52.0",
                  "package": {
                    "name": "mime-db",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "91abc8fb-1aaf-46a5-be93-4c43def11dbe",
              "parent_id": "68a29834-98db-e1b0-2280-7de6cef44d8a",
              "child_id": "8653054c-b253-b938-adc0-120371f060c6",
              "analysis_results": [],
              "child": {
                "id": "8653054c-b253-b938-adc0-120371f060c6",
                "range": "^1.1.1",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "8429a430-109a-46da-845f-b8f049b4ffee",
                "release": {
                  "id": "8429a430-109a-46da-845f-b8f049b4ffee",
                  "version": "1.1.1",
                  "package": {
                    "name": "function-bind",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "870f9481-f89e-4ca9-984e-18f19b790aee",
              "parent_id": "6fad27f3-10f0-be93-97a1-215c0fd18a5f",
              "child_id": "fbbd8e8d-c591-d2ca-535b-fbb8b0665b92",
              "analysis_results": [],
              "child": {
                "id": "fbbd8e8d-c591-d2ca-535b-fbb8b0665b92",
                "range": "~5.2.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "9464a778-8b5c-479b-834b-3d72303fdd59",
                "release": {
                  "id": "9464a778-8b5c-479b-834b-3d72303fdd59",
                  "version": "5.2.1",
                  "package": {
                    "name": "safe-buffer",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "9f04b1de-b8cb-43ca-9b03-99fb5725f71a",
              "parent_id": "70d9033c-3e33-4cf8-cfde-8be74a3fe92c",
              "child_id": "6d0f2022-987d-b69a-9356-ed23faa0e3cb",
              "analysis_results": [],
              "child": {
                "id": "6d0f2022-987d-b69a-9356-ed23faa0e3cb",
                "range": "^1.0.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "01428a53-56fc-4cda-8227-132a29c62676",
                "release": {
                  "id": "01428a53-56fc-4cda-8227-132a29c62676",
                  "version": "1.0.2",
                  "package": {
                    "name": "balanced-match",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "71f53b0a-b122-4424-85e3-1c5ef45abf0a",
              "parent_id": "70d9033c-3e33-4cf8-cfde-8be74a3fe92c",
              "child_id": "842b2204-f8f3-f641-3432-c2117bd761e7",
              "analysis_results": [],
              "child": {
                "id": "842b2204-f8f3-f641-3432-c2117bd761e7",
                "range": "0.0.1",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "2bf35f7c-eba9-406e-9719-fd3ad01c854e",
                "release": {
                  "id": "2bf35f7c-eba9-406e-9719-fd3ad01c854e",
                  "version": "0.0.1",
                  "package": {
                    "name": "concat-map",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "2d07860a-c529-40f6-b664-368eb7a6de86",
              "parent_id": "8e35bb50-e853-586c-fdfc-dc51abf34055",
              "child_id": "9fc964ba-031c-b6f9-b223-af5988907929",
              "analysis_results": [],
              "child": {
                "id": "9fc964ba-031c-b6f9-b223-af5988907929",
                "range": "1",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "a6db1e0a-2de6-40c9-aafc-934c02adb871",
                "release": {
                  "id": "a6db1e0a-2de6-40c9-aafc-934c02adb871",
                  "version": "1.0.2",
                  "package": {
                    "name": "wrappy",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "e9bea185-d672-4b98-8839-865cde7e72c6",
              "parent_id": "8e35bb50-e853-586c-fdfc-dc51abf34055",
              "child_id": "adad82e7-c63c-273a-b39b-4a01eaef0cd9",
              "analysis_results": [],
              "child": {
                "id": "adad82e7-c63c-273a-b39b-4a01eaef0cd9",
                "range": "^1.3.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "4bfdabff-e25d-42b3-815b-b9f6e4543222",
                "release": {
                  "id": "4bfdabff-e25d-42b3-815b-b9f6e4543222",
                  "version": "1.4.0",
                  "package": {
                    "name": "once",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "05f36833-e51a-4917-b3fc-e1113d9be449",
              "parent_id": "aadbf69d-20db-c340-7399-c5daf17c6dca",
              "child_id": "3558cbcc-2cca-3dd0-c9ef-f5dbcb78255a",
              "analysis_results": [],
              "child": {
                "id": "3558cbcc-2cca-3dd0-c9ef-f5dbcb78255a",
                "range": "^3.0.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "e7f9f2ff-5a4d-49ab-a1be-dd5906732fcd",
                "release": {
                  "id": "e7f9f2ff-5a4d-49ab-a1be-dd5906732fcd",
                  "version": "3.0.0",
                  "package": {
                    "name": "is-fullwidth-code-point",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "26d223aa-2fbf-4450-93cd-8411a0f95cf2",
              "parent_id": "aadbf69d-20db-c340-7399-c5daf17c6dca",
              "child_id": "6047620a-743e-f447-4ad9-1578607a4db2",
              "analysis_results": [],
              "child": {
                "id": "6047620a-743e-f447-4ad9-1578607a4db2",
                "range": "^8.0.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "c164eecc-d719-4ba0-93bf-c33513a5f822",
                "release": {
                  "id": "c164eecc-d719-4ba0-93bf-c33513a5f822",
                  "version": "8.0.0",
                  "package": {
                    "name": "emoji-regex",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "68ead93a-d32d-4515-bd12-7ad3cc2aa67e",
              "parent_id": "aadbf69d-20db-c340-7399-c5daf17c6dca",
              "child_id": "75c5e349-e122-5cc9-3252-fc9fa5435ea1",
              "analysis_results": [],
              "child": {
                "id": "75c5e349-e122-5cc9-3252-fc9fa5435ea1",
                "range": "^6.0.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "57574c43-abcb-4533-8937-bf70f1ef1b31",
                "release": {
                  "id": "57574c43-abcb-4533-8937-bf70f1ef1b31",
                  "version": "6.0.1",
                  "package": {
                    "name": "strip-ansi",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "d806a624-b72a-497a-a382-a43797bb9d06",
              "parent_id": "adad82e7-c63c-273a-b39b-4a01eaef0cd9",
              "child_id": "9fc964ba-031c-b6f9-b223-af5988907929",
              "analysis_results": [],
              "child": {
                "id": "9fc964ba-031c-b6f9-b223-af5988907929",
                "range": "1",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "a6db1e0a-2de6-40c9-aafc-934c02adb871",
                "release": {
                  "id": "a6db1e0a-2de6-40c9-aafc-934c02adb871",
                  "version": "1.0.2",
                  "package": {
                    "name": "wrappy",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "6b107492-1bc0-4b9f-a2be-4c2e4ea5f78b",
              "parent_id": "b3b866cc-cf27-c494-bfd5-219465427a66",
              "child_id": "7035ddbf-383d-abce-3cf5-98cb653f5fb1",
              "analysis_results": [],
              "child": {
                "id": "7035ddbf-383d-abce-3cf5-98cb653f5fb1",
                "range": "^4.0.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "00943af9-4fcc-42a6-963e-3c5573137979",
                "release": {
                  "id": "00943af9-4fcc-42a6-963e-3c5573137979",
                  "version": "4.0.0",
                  "package": {
                    "name": "yallist",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "07c25f98-c9e6-42db-9a60-100e81383bb8",
              "parent_id": "d21126c1-96d6-9084-f55b-3ae3fbda36bd",
              "child_id": "30480a0f-3763-8982-5562-658e8d2060e9",
              "analysis_results": [],
              "child": {
                "id": "30480a0f-3763-8982-5562-658e8d2060e9",
                "range": "~1.1.1",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "4da3e23b-ca4c-4bc9-8305-e425eca9b3f0",
                "release": {
                  "id": "4da3e23b-ca4c-4bc9-8305-e425eca9b3f0",
                  "version": "1.1.1",
                  "package": {
                    "name": "string_decoder",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "f3bc85ed-20c3-44d3-8d99-64a3c0110473",
              "parent_id": "d21126c1-96d6-9084-f55b-3ae3fbda36bd",
              "child_id": "529f1ec2-22da-ee1c-756f-2f1b7d330f74",
              "analysis_results": [],
              "child": {
                "id": "529f1ec2-22da-ee1c-756f-2f1b7d330f74",
                "range": "~1.0.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "130d7da0-1c7a-40ee-acb5-20bcb146972e",
                "release": {
                  "id": "130d7da0-1c7a-40ee-acb5-20bcb146972e",
                  "version": "1.0.3",
                  "package": {
                    "name": "core-util-is",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "8eaaf34a-2136-469f-bec0-9553a53d34c6",
              "parent_id": "d21126c1-96d6-9084-f55b-3ae3fbda36bd",
              "child_id": "9a179bb8-6523-f6b0-f66b-1c82e317959a",
              "analysis_results": [],
              "child": {
                "id": "9a179bb8-6523-f6b0-f66b-1c82e317959a",
                "range": "~1.0.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "c5f17913-2bfa-4982-9d27-e6a3e1817284",
                "release": {
                  "id": "c5f17913-2bfa-4982-9d27-e6a3e1817284",
                  "version": "1.0.0",
                  "package": {
                    "name": "isarray",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "bf31f9f1-4d2a-4c6a-8dbc-d68100393490",
              "parent_id": "d21126c1-96d6-9084-f55b-3ae3fbda36bd",
              "child_id": "c55db5fa-f2b0-ad6e-a88f-bb387da3f25c",
              "analysis_results": [],
              "child": {
                "id": "c55db5fa-f2b0-ad6e-a88f-bb387da3f25c",
                "range": "~1.0.1",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "96d6a6c1-4d64-4ffb-88eb-f0a661d12534",
                "release": {
                  "id": "96d6a6c1-4d64-4ffb-88eb-f0a661d12534",
                  "version": "1.0.2",
                  "package": {
                    "name": "util-deprecate",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "70f44f0f-0ae0-4008-a6a2-b270f09affc3",
              "parent_id": "d21126c1-96d6-9084-f55b-3ae3fbda36bd",
              "child_id": "c69ec0a2-37c5-a6e8-1a8a-68b0c2212623",
              "analysis_results": [],
              "child": {
                "id": "c69ec0a2-37c5-a6e8-1a8a-68b0c2212623",
                "range": "~2.0.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "89796a21-8374-40ca-82bc-615b27d668a6",
                "release": {
                  "id": "89796a21-8374-40ca-82bc-615b27d668a6",
                  "version": "2.0.1",
                  "package": {
                    "name": "process-nextick-args",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "39fbddf6-f4c8-4ef8-8846-6d2f16cec147",
              "parent_id": "d21126c1-96d6-9084-f55b-3ae3fbda36bd",
              "child_id": "e0cc057f-65c4-43c2-96cc-77f3d58fbd3c",
              "analysis_results": [],
              "child": {
                "id": "e0cc057f-65c4-43c2-96cc-77f3d58fbd3c",
                "range": "~5.1.1",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "0ba4f67e-4151-41eb-9020-c58c2bc153d8",
                "release": {
                  "id": "0ba4f67e-4151-41eb-9020-c58c2bc153d8",
                  "version": "5.1.2",
                  "package": {
                    "name": "safe-buffer",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "4be2c5c5-92e8-45f3-86c3-0897a9ab83e5",
              "parent_id": "d21126c1-96d6-9084-f55b-3ae3fbda36bd",
              "child_id": "e943b4a0-0c14-b7f1-de2a-32bb2b51b1f0",
              "analysis_results": [],
              "child": {
                "id": "e943b4a0-0c14-b7f1-de2a-32bb2b51b1f0",
                "range": "~2.0.3",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "f3eb1fa0-d8d0-4745-8213-a3045d3180b5",
                "release": {
                  "id": "f3eb1fa0-d8d0-4745-8213-a3045d3180b5",
                  "version": "2.0.4",
                  "package": {
                    "name": "inherits",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "25f5335e-29ff-4c4b-85cd-414dab1b027d",
              "parent_id": "30480a0f-3763-8982-5562-658e8d2060e9",
              "child_id": "e0cc057f-65c4-43c2-96cc-77f3d58fbd3c",
              "analysis_results": [],
              "child": {
                "id": "e0cc057f-65c4-43c2-96cc-77f3d58fbd3c",
                "range": "~5.1.1",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "0ba4f67e-4151-41eb-9020-c58c2bc153d8",
                "release": {
                  "id": "0ba4f67e-4151-41eb-9020-c58c2bc153d8",
                  "version": "5.1.2",
                  "package": {
                    "name": "safe-buffer",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "6dac7260-cbb3-4b7c-afb0-44e28535cfaa",
              "parent_id": "50dabacb-dd90-cdd9-eba7-8fbdb4af3d5d",
              "child_id": "75c5e349-e122-5cc9-3252-fc9fa5435ea1",
              "analysis_results": [],
              "child": {
                "id": "75c5e349-e122-5cc9-3252-fc9fa5435ea1",
                "range": "^6.0.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "57574c43-abcb-4533-8937-bf70f1ef1b31",
                "release": {
                  "id": "57574c43-abcb-4533-8937-bf70f1ef1b31",
                  "version": "6.0.1",
                  "package": {
                    "name": "strip-ansi",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "00ec264a-850c-4182-931f-6b4fd0715600",
              "parent_id": "50dabacb-dd90-cdd9-eba7-8fbdb4af3d5d",
              "child_id": "aadbf69d-20db-c340-7399-c5daf17c6dca",
              "analysis_results": [],
              "child": {
                "id": "aadbf69d-20db-c340-7399-c5daf17c6dca",
                "range": "^4.2.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "513f0c90-14f3-4fea-97cc-b572a8f35f3c",
                "release": {
                  "id": "513f0c90-14f3-4fea-97cc-b572a8f35f3c",
                  "version": "4.2.3",
                  "package": {
                    "name": "string-width",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "89749ffc-feac-47cc-8987-5fe31019dda0",
              "parent_id": "50dabacb-dd90-cdd9-eba7-8fbdb4af3d5d",
              "child_id": "d9abd725-dd70-9628-45df-50a78036348a",
              "analysis_results": [],
              "child": {
                "id": "d9abd725-dd70-9628-45df-50a78036348a",
                "range": "^4.0.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "3817017f-c2a2-410c-8f51-2f1e40c11cff",
                "release": {
                  "id": "3817017f-c2a2-410c-8f51-2f1e40c11cff",
                  "version": "4.3.0",
                  "package": {
                    "name": "ansi-styles",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "27b577b0-dfdb-4e45-ad4b-c135f15abd3a",
              "parent_id": "75c5e349-e122-5cc9-3252-fc9fa5435ea1",
              "child_id": "9a4e1877-0be2-5e69-ea6e-f49d87490487",
              "analysis_results": [],
              "child": {
                "id": "9a4e1877-0be2-5e69-ea6e-f49d87490487",
                "range": "^5.0.1",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "cc82a679-b3d9-4af2-9a6a-a74f74658ba4",
                "release": {
                  "id": "cc82a679-b3d9-4af2-9a6a-a74f74658ba4",
                  "version": "5.0.1",
                  "package": {
                    "name": "ansi-regex",
                    "package_manager": "npm",
                    "affected_by_vulnerability": [
                      {
                        "vulnerability": {
severities: [], cwes: [],
                          "id": "9b0c3bd4-afa8-4846-beb2-c83793e566aa",
                          "source_id": "GHSA-93q8-gq69-wqmw",
                          "source": "ghsa",
                          "severity_name": "High",
                          "cvss_score": 7.5,
                          "summary": "Inefficient Regular Expression Complexity in chalk/ansi-regex",
                          "guide_vulnerabilities": []
                        },
                        "ranges": [
                          {
                            "introduced": "6.0.0",
                            "fixed": "6.0.1"
                          },
                          {
                            "introduced": "5.0.0",
                            "fixed": "5.0.1"
                          },
                          {
                            "introduced": "4.0.0",
                            "fixed": "4.1.1"
                          },
                          {
                            "introduced": "3.0.0",
                            "fixed": "3.0.1"
                          }
                        ]
                      }
                    ]
                  }
                }
              }
            },
            {
              "id": "2aa936d5-caec-4e10-a1be-2098b2e1dce0",
              "parent_id": "de3ddf96-0765-b5f2-bda1-d772982d03d7",
              "child_id": "10df8940-b281-71d6-7e2f-a7182b4a4ef2",
              "analysis_results": [],
              "child": {
                "id": "10df8940-b281-71d6-7e2f-a7182b4a4ef2",
                "range": "^0.6.2",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "79ee82d9-2c88-4769-8389-ff53e834ae38",
                "release": {
                  "id": "79ee82d9-2c88-4769-8389-ff53e834ae38",
                  "version": "0.6.3",
                  "package": {
                    "name": "iconv-lite",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "0368ae35-7118-4310-82f1-6a696437ca99",
              "parent_id": "10df8940-b281-71d6-7e2f-a7182b4a4ef2",
              "child_id": "a9588bcd-2e65-6e4d-b1bb-73b57a15d4bc",
              "analysis_results": [],
              "child": {
                "id": "a9588bcd-2e65-6e4d-b1bb-73b57a15d4bc",
                "range": ">= 2.1.2 < 3.0.0",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "9d457f73-f035-4943-a6de-616f1197d4e5",
                "release": {
                  "id": "9d457f73-f035-4943-a6de-616f1197d4e5",
                  "version": "2.1.2",
                  "package": {
                    "name": "safer-buffer",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "c07b203d-3d81-40ce-abd4-9df959afda4c",
              "parent_id": "d9abd725-dd70-9628-45df-50a78036348a",
              "child_id": "1736ebe8-02e8-1af9-6dc2-a929a64ac1fa",
              "analysis_results": [],
              "child": {
                "id": "1736ebe8-02e8-1af9-6dc2-a929a64ac1fa",
                "range": "^2.0.1",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "b3c3e4be-2f1a-438a-a9be-2be3058a5cc5",
                "release": {
                  "id": "b3c3e4be-2f1a-438a-a9be-2be3058a5cc5",
                  "version": "2.0.1",
                  "package": {
                    "name": "color-convert",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            },
            {
              "id": "9a7082bc-e881-4df1-bb08-8f59bd443105",
              "parent_id": "1736ebe8-02e8-1af9-6dc2-a929a64ac1fa",
              "child_id": "850d0848-121c-225a-63e3-80dca16092c2",
              "analysis_results": [],
              "child": {
                "id": "850d0848-121c-225a-63e3-80dca16092c2",
                "range": "~1.1.4",
                "labels": {
                  "scope": "prod"
                },
                "release_id": "f1674533-bc11-4448-99f9-468a78caf91a",
                "release": {
                  "id": "f1674533-bc11-4448-99f9-468a78caf91a",
                  "version": "1.1.4",
                  "package": {
                    "name": "color-name",
                    "package_manager": "npm",
                    "affected_by_vulnerability": []
                  }
                }
              }
            }
          ]
        }
]
