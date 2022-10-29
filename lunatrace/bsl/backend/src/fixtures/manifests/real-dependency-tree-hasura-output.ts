import {RawManifest} from "../../models/dependency-tree/types";


export const realDependencyTreeHasuraOutputFixture: Array<RawManifest> = [
    {
        "path": "/package-lock.json",
        "child_edges_recursive": [
            {
                "parent_id": "00000000-0000-0000-0000-000000000000",
                "child_id": "8d5f7ad9-11ce-bffc-591c-171bca663032",
                "id": "00000000-0000-0000-0000-000000000000",
                "child": {
                    "id": "8d5f7ad9-11ce-bffc-591c-171bca663032",
                    "range": "~3.4.8",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "e9715348-6bb6-4855-97ec-23880cb60b9f",
                    "release": {
                        "id": "e9715348-6bb6-4855-97ec-23880cb60b9f",
                        "version": "3.4.8",
                        "package": {
                            "name": "express",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "fc78610e-8206-4ebc-8e51-0a4b1a703a0a",
                                        "source_id": "GHSA-gpvr-g6gh-9mc2",
                                        "source": "ghsa",
                                        "severity_name": "Medium",
                                        "cvss_score": 6.1,
                                        "summary": "No Charset in Content-Type Header in express",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "3.11.0"
                                        },
                                        {
                                            "introduced": "4.0.0",
                                            "fixed": "4.5.0"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "00000000-0000-0000-0000-000000000000",
                "child_id": "0fbcff3d-c729-0b5c-78f3-c6a2fc611434",
                "id": "00000000-0000-0000-0000-000000000000",
                "child": {
                    "id": "0fbcff3d-c729-0b5c-78f3-c6a2fc611434",
                    "range": "~0.3.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "0655991a-703b-45c3-bff4-d67a61846ea9",
                    "release": {
                        "id": "0655991a-703b-45c3-bff4-d67a61846ea9",
                        "version": "0.3.0",
                        "package": {
                            "name": "coffee-middleware",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "00000000-0000-0000-0000-000000000000",
                "child_id": "c97ea9e4-6a3b-9c6a-3bdd-148919c82204",
                "id": "00000000-0000-0000-0000-000000000000",
                "child": {
                    "id": "c97ea9e4-6a3b-9c6a-3bdd-148919c82204",
                    "range": "~0.8.3",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "f2a3e6da-9115-461e-bdd6-b0ff8182322c",
                    "release": {
                        "id": "f2a3e6da-9115-461e-bdd6-b0ff8182322c",
                        "version": "0.8.6",
                        "package": {
                            "name": "node-sass",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "d2486673-197f-4217-8c4d-51652a744f1f",
                                        "source_id": "GHSA-9v62-24cr-58cx",
                                        "source": "ghsa",
                                        "severity_name": "Medium",
                                        "cvss_score": 5.9,
                                        "summary": "Denial of Service in node-sass",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "3.3.0",
                                            "fixed": "4.13.1"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "8a5755ae-d274-4f98-8c4e-0c800d806ece",
                                        "source_id": "GHSA-r8f7-9pfq-mjmv",
                                        "source": "ghsa",
                                        "severity_name": "Medium",
                                        "cvss_score": 5.3,
                                        "summary": "Improper Certificate Validation in node-sass",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "2.0.0",
                                            "fixed": "7.0.0"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "00000000-0000-0000-0000-000000000000",
                "child_id": "df85a2fc-f172-5bc2-0867-98bdc134d85c",
                "id": "00000000-0000-0000-0000-000000000000",
                "child": {
                    "id": "df85a2fc-f172-5bc2-0867-98bdc134d85c",
                    "range": "~0.0.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "fc1f00a6-653a-4e4d-9827-5d84bc5429f7",
                    "release": {
                        "id": "fc1f00a6-653a-4e4d-9827-5d84bc5429f7",
                        "version": "0.0.0",
                        "package": {
                            "name": "node",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "00000000-0000-0000-0000-000000000000",
                "child_id": "5c87bb25-537f-1f00-e3ca-cf50efcd7c7e",
                "id": "00000000-0000-0000-0000-000000000000",
                "child": {
                    "id": "5c87bb25-537f-1f00-e3ca-cf50efcd7c7e",
                    "range": "~0.5.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "535874d8-18e1-4b8a-9c3c-8757d6b831d5",
                    "release": {
                        "id": "535874d8-18e1-4b8a-9c3c-8757d6b831d5",
                        "version": "0.5.0",
                        "package": {
                            "name": "sass",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "00000000-0000-0000-0000-000000000000",
                "child_id": "53e7b2ed-168f-c0db-d959-71673b7a3ecb",
                "id": "00000000-0000-0000-0000-000000000000",
                "child": {
                    "id": "53e7b2ed-168f-c0db-d959-71673b7a3ecb",
                    "range": "~0.0.3",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "80fd4faf-cbe4-43a5-900f-a6ac944adece",
                    "release": {
                        "id": "80fd4faf-cbe4-43a5-900f-a6ac944adece",
                        "version": "0.0.3",
                        "package": {
                            "name": "sass-middleware",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "00000000-0000-0000-0000-000000000000",
                "child_id": "4033e0ca-d419-7624-882c-8a718f564c2d",
                "id": "00000000-0000-0000-0000-000000000000",
                "child": {
                    "id": "4033e0ca-d419-7624-882c-8a718f564c2d",
                    "range": "~1.3.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "bb59b632-4233-40f8-b646-d11f246593c7",
                    "release": {
                        "id": "bb59b632-4233-40f8-b646-d11f246593c7",
                        "version": "1.3.1",
                        "package": {
                            "name": "jade",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "00000000-0000-0000-0000-000000000000",
                "child_id": "6b3dff96-0273-46af-d259-a2e36d3b55ca",
                "id": "00000000-0000-0000-0000-000000000000",
                "child": {
                    "id": "6b3dff96-0273-46af-d259-a2e36d3b55ca",
                    "range": "~0.1.2",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "b5eb6816-a116-41da-ba92-88260f2663bb",
                    "release": {
                        "id": "b5eb6816-a116-41da-ba92-88260f2663bb",
                        "version": "0.1.2",
                        "package": {
                            "name": "twitter-bootstrap-node",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "00000000-0000-0000-0000-000000000000",
                "child_id": "57bd8663-2c4a-a8cf-0e57-e3abf9c84116",
                "id": "00000000-0000-0000-0000-000000000000",
                "child": {
                    "id": "57bd8663-2c4a-a8cf-0e57-e3abf9c84116",
                    "range": "~0.2.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "8c4a47c0-fb28-4b06-9404-f86ab5017e7b",
                    "release": {
                        "id": "8c4a47c0-fb28-4b06-9404-f86ab5017e7b",
                        "version": "0.2.1",
                        "package": {
                            "name": "connect-coffee-script",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "00000000-0000-0000-0000-000000000000",
                "child_id": "3d034dfd-d8d5-2de2-acfc-53e553d3f327",
                "id": "00000000-0000-0000-0000-000000000000",
                "child": {
                    "id": "3d034dfd-d8d5-2de2-acfc-53e553d3f327",
                    "range": "~1.7.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "74d2f6a1-b38c-4b10-a18a-bf7f0154e1c8",
                    "release": {
                        "id": "74d2f6a1-b38c-4b10-a18a-bf7f0154e1c8",
                        "version": "1.7.1",
                        "package": {
                            "name": "coffee-script",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "00000000-0000-0000-0000-000000000000",
                "child_id": "c36afa31-dcd9-fe0e-988c-6573907ac738",
                "id": "00000000-0000-0000-0000-000000000000",
                "child": {
                    "id": "c36afa31-dcd9-fe0e-988c-6573907ac738",
                    "range": "^5",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "558fea58-6fef-4ab5-bd2d-d98f202ce1dc",
                    "release": {
                        "id": "558fea58-6fef-4ab5-bd2d-d98f202ce1dc",
                        "version": "5.4.0",
                        "package": {
                            "name": "coffee",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "00000000-0000-0000-0000-000000000000",
                "child_id": "fb8446b9-73bb-8e7c-59d6-b46ea324bfa5",
                "id": "00000000-0000-0000-0000-000000000000",
                "child": {
                    "id": "fb8446b9-73bb-8e7c-59d6-b46ea324bfa5",
                    "range": "~2.1.5",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "6e4986ca-221e-4bce-ac3d-dfded7e6880f",
                    "release": {
                        "id": "6e4986ca-221e-4bce-ac3d-dfded7e6880f",
                        "version": "2.1.7",
                        "package": {
                            "name": "serve-favicon",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "00000000-0000-0000-0000-000000000000",
                "child_id": "b09f52d6-f4fe-e7f7-1246-d633fa353400",
                "id": "00000000-0000-0000-0000-000000000000",
                "child": {
                    "id": "b09f52d6-f4fe-e7f7-1246-d633fa353400",
                    "range": "~0.7.9",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "70e4269e-8c58-4843-9479-85e8e3c6b1e2",
                    "release": {
                        "id": "70e4269e-8c58-4843-9479-85e8e3c6b1e2",
                        "version": "0.7.9",
                        "package": {
                            "name": "bookshelf",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "00000000-0000-0000-0000-000000000000",
                "child_id": "f62bba4d-86b6-1c3f-d89b-49403f2a6e1a",
                "id": "00000000-0000-0000-0000-000000000000",
                "child": {
                    "id": "f62bba4d-86b6-1c3f-d89b-49403f2a6e1a",
                    "range": "~3.6.2",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "fdf166d9-d0cc-4fe0-815d-93a7f2f1b7f0",
                    "release": {
                        "id": "fdf166d9-d0cc-4fe0-815d-93a7f2f1b7f0",
                        "version": "3.6.4",
                        "package": {
                            "name": "pg",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "a1dde20c-f378-42bd-92e1-833f255f22be",
                                        "source_id": "GHSA-wc9v-mj63-m9g5",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": null,
                                        "summary": "Remote Code Execution in pg",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "2.11.2"
                                        },
                                        {
                                            "introduced": "3.0.0",
                                            "fixed": "3.6.4"
                                        },
                                        {
                                            "introduced": "4.0.0",
                                            "fixed": "4.5.7"
                                        },
                                        {
                                            "introduced": "5.0.0",
                                            "fixed": "5.2.1"
                                        },
                                        {
                                            "introduced": "6.0.0",
                                            "fixed": "6.0.5"
                                        },
                                        {
                                            "introduced": "6.1.0",
                                            "fixed": "6.1.6"
                                        },
                                        {
                                            "introduced": "6.2.0",
                                            "fixed": "6.2.5"
                                        },
                                        {
                                            "introduced": "6.3.0",
                                            "fixed": "6.3.3"
                                        },
                                        {
                                            "introduced": "6.4.0",
                                            "fixed": "6.4.2"
                                        },
                                        {
                                            "introduced": "7.0.0",
                                            "fixed": "7.0.2"
                                        },
                                        {
                                            "introduced": "7.1.0",
                                            "fixed": "7.1.2"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "00000000-0000-0000-0000-000000000000",
                "child_id": "19875f50-6adf-15ba-73db-92cffcf4d165",
                "id": "00000000-0000-0000-0000-000000000000",
                "child": {
                    "id": "19875f50-6adf-15ba-73db-92cffcf4d165",
                    "range": "~1.2.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "063a3ef3-f6c0-42dd-9426-dcca2adf8ed6",
                    "release": {
                        "id": "063a3ef3-f6c0-42dd-9426-dcca2adf8ed6",
                        "version": "1.2.0",
                        "package": {
                            "name": "replify",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "00000000-0000-0000-0000-000000000000",
                "child_id": "1220780d-8992-fae6-e274-0cbcb0db27d8",
                "id": "00000000-0000-0000-0000-000000000000",
                "child": {
                    "id": "1220780d-8992-fae6-e274-0cbcb0db27d8",
                    "range": "~2.0.1",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "8da389c2-9fa2-4bae-a927-720f52c26e89",
                    "release": {
                        "id": "8da389c2-9fa2-4bae-a927-720f52c26e89",
                        "version": "2.0.1",
                        "package": {
                            "name": "mocha",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "00000000-0000-0000-0000-000000000000",
                "child_id": "c814b958-58e0-d9de-4ee6-a1254c2a0e92",
                "id": "00000000-0000-0000-0000-000000000000",
                "child": {
                    "id": "c814b958-58e0-d9de-4ee6-a1254c2a0e92",
                    "range": "~1.9.2",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "206986cc-c84b-4194-9e5b-6c56f6c28bb8",
                    "release": {
                        "id": "206986cc-c84b-4194-9e5b-6c56f6c28bb8",
                        "version": "1.9.2",
                        "package": {
                            "name": "chai",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "00000000-0000-0000-0000-000000000000",
                "child_id": "8fe30d2d-54ff-0c69-353e-2880f93508f0",
                "id": "00000000-0000-0000-0000-000000000000",
                "child": {
                    "id": "8fe30d2d-54ff-0c69-353e-2880f93508f0",
                    "range": "~1.9.2",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "6425aa6c-7fa4-4b6b-9214-e100c5395056",
                    "release": {
                        "id": "6425aa6c-7fa4-4b6b-9214-e100c5395056",
                        "version": "1.9.3",
                        "package": {
                            "name": "body-parser",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "00000000-0000-0000-0000-000000000000",
                "child_id": "8e82fc0a-56d0-b117-b508-0b435efcf36d",
                "id": "00000000-0000-0000-0000-000000000000",
                "child": {
                    "id": "8e82fc0a-56d0-b117-b508-0b435efcf36d",
                    "range": "~0.1.2",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "c50e4aef-96c6-4fee-a09d-c6c979362a1f",
                    "release": {
                        "id": "c50e4aef-96c6-4fee-a09d-c6c979362a1f",
                        "version": "0.1.2",
                        "package": {
                            "name": "postgeo",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "00000000-0000-0000-0000-000000000000",
                "child_id": "6991f8c2-97b2-4c5c-18a6-219c1f4df87f",
                "id": "00000000-0000-0000-0000-000000000000",
                "child": {
                    "id": "6991f8c2-97b2-4c5c-18a6-219c1f4df87f",
                    "range": "~1.1.1",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "42de43c1-83b9-41ec-b568-41d52234a5d5",
                    "release": {
                        "id": "42de43c1-83b9-41ec-b568-41d52234a5d5",
                        "version": "1.1.2",
                        "package": {
                            "name": "q",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "00000000-0000-0000-0000-000000000000",
                "child_id": "faf861b0-c7ad-0ecb-caa9-a5ec9ed53900",
                "id": "00000000-0000-0000-0000-000000000000",
                "child": {
                    "id": "faf861b0-c7ad-0ecb-caa9-a5ec9ed53900",
                    "range": "~1.3.12",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "21274591-707b-4694-8c3e-3182bd7def84",
                    "release": {
                        "id": "21274591-707b-4694-8c3e-3182bd7def84",
                        "version": "1.3.12",
                        "package": {
                            "name": "bower",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "0523b750-4153-4361-aa5b-f78a75ecbe7d",
                                        "source_id": "GHSA-p6mr-pxg4-68hx",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": null,
                                        "summary": "Symlink Arbitrary File Overwrite in bower",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "1.8.8"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "00000000-0000-0000-0000-000000000000",
                "child_id": "0adec263-926b-8489-66ec-778e58f56612",
                "id": "00000000-0000-0000-0000-000000000000",
                "child": {
                    "id": "0adec263-926b-8489-66ec-778e58f56612",
                    "range": "~0.7.3",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "9a64624e-5ea7-453a-bc60-45c754025a90",
                    "release": {
                        "id": "9a64624e-5ea7-453a-bc60-45c754025a90",
                        "version": "0.7.6",
                        "package": {
                            "name": "knex",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "4ed98db6-d109-44f7-8a58-be90517fc765",
                                        "source_id": "GHSA-58v4-qwx5-7f59",
                                        "source": "ghsa",
                                        "severity_name": "Critical",
                                        "cvss_score": 9.8,
                                        "summary": "SQL Injection in knex",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "0.19.5"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "8d5f7ad9-11ce-bffc-591c-171bca663032",
                "child_id": "e5f61fc5-00fd-1afb-df90-245c955b6f3e",
                "id": "314724ac-3048-4234-9f93-d1d1d945c030",
                "child": {
                    "id": "e5f61fc5-00fd-1afb-df90-245c955b6f3e",
                    "range": "1.3.2",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "ab9b3633-5967-4fd0-9000-05b855fcbcb4",
                    "release": {
                        "id": "ab9b3633-5967-4fd0-9000-05b855fcbcb4",
                        "version": "1.3.2",
                        "package": {
                            "name": "commander",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "8d5f7ad9-11ce-bffc-591c-171bca663032",
                "child_id": "cdd7579f-8afa-5af6-d183-e60f4fa6dee3",
                "id": "536ce369-a807-4fd6-9960-f39185ca127a",
                "child": {
                    "id": "cdd7579f-8afa-5af6-d183-e60f4fa6dee3",
                    "range": "0.1.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "9b0e6f09-ba53-4a1d-8bf6-a2745acac502",
                    "release": {
                        "id": "9b0e6f09-ba53-4a1d-8bf6-a2745acac502",
                        "version": "0.1.0",
                        "package": {
                            "name": "cookie",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "8d5f7ad9-11ce-bffc-591c-171bca663032",
                "child_id": "cd84ab0c-4e5d-424c-09ef-eb4b116a2d6e",
                "id": "33541242-d2d9-4d62-b29b-1c314d92a0ab",
                "child": {
                    "id": "cd84ab0c-4e5d-424c-09ef-eb4b116a2d6e",
                    "range": "~0.3.5",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "e27545fc-1ec0-4217-b01f-96cbe95177a3",
                    "release": {
                        "id": "e27545fc-1ec0-4217-b01f-96cbe95177a3",
                        "version": "0.3.5",
                        "package": {
                            "name": "mkdirp",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "8d5f7ad9-11ce-bffc-591c-171bca663032",
                "child_id": "cbc987de-101a-ad7c-cd89-6b780490c719",
                "id": "0b8799bf-62e5-41fc-978c-7436efa9f399",
                "child": {
                    "id": "cbc987de-101a-ad7c-cd89-6b780490c719",
                    "range": "0.1.4",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "68149972-8e8d-44bf-a6eb-e230cf171669",
                    "release": {
                        "id": "68149972-8e8d-44bf-a6eb-e230cf171669",
                        "version": "0.1.4",
                        "package": {
                            "name": "send",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "73c2a0e7-7cec-46f4-b506-54eaee65e170",
                                        "source_id": "GHSA-jgqf-hwc5-hh37",
                                        "source": "ghsa",
                                        "severity_name": null,
                                        "cvss_score": 5.3,
                                        "summary": "Root Path Disclosure in send",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "0.11.1"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "fcdf94d5-3a52-4a04-a70e-02dc46617035",
                                        "source_id": "GHSA-pgv6-jrvv-75jp",
                                        "source": "ghsa",
                                        "severity_name": "Medium",
                                        "cvss_score": null,
                                        "summary": "Moderate severity vulnerability that affects send",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "0.8.4"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "f8485ae1-f40e-4c1a-9544-016541e7fd97",
                                        "source_id": "GHSA-xwg4-93c6-3h42",
                                        "source": "ghsa",
                                        "severity_name": null,
                                        "cvss_score": null,
                                        "summary": "Directory Traversal in send",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "0.8.4"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "8d5f7ad9-11ce-bffc-591c-171bca663032",
                "child_id": "9cacf877-627a-4bc1-5195-4626ae6ba6c3",
                "id": "5ca4aee7-ed7e-4377-b811-5c711938c5d0",
                "child": {
                    "id": "9cacf877-627a-4bc1-5195-4626ae6ba6c3",
                    "range": "0.2.1",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "0bce9d23-6a78-4b2c-8d62-ab21193766fc",
                    "release": {
                        "id": "0bce9d23-6a78-4b2c-8d62-ab21193766fc",
                        "version": "0.2.1",
                        "package": {
                            "name": "buffer-crc32",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "8d5f7ad9-11ce-bffc-591c-171bca663032",
                "child_id": "8a3e513f-2fe7-a1e7-812f-05048b5a56f5",
                "id": "513b4c86-d424-4613-b92b-3853c3c7c635",
                "child": {
                    "id": "8a3e513f-2fe7-a1e7-812f-05048b5a56f5",
                    "range": "2.12.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "4976e16f-e981-4a9d-81fe-7bbff53aa41f",
                    "release": {
                        "id": "4976e16f-e981-4a9d-81fe-7bbff53aa41f",
                        "version": "2.12.0",
                        "package": {
                            "name": "connect",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "8981b680-aae5-4c34-80db-4b84ece2be8f",
                                        "source_id": "GHSA-3fw8-66wf-pr7m",
                                        "source": "ghsa",
                                        "severity_name": "Low",
                                        "cvss_score": null,
                                        "summary": "methodOverride Middleware Reflected Cross-Site Scripting in connect",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "2.8.1"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "8d5f7ad9-11ce-bffc-591c-171bca663032",
                "child_id": "7c986198-c71b-5667-8415-74cc9448e21d",
                "id": "a6cc036b-c20e-423e-84f2-c656c5967d18",
                "child": {
                    "id": "7c986198-c71b-5667-8415-74cc9448e21d",
                    "range": "1.0.1",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "e86cde77-fd62-4175-9baf-72121562d488",
                    "release": {
                        "id": "e86cde77-fd62-4175-9baf-72121562d488",
                        "version": "1.0.1",
                        "package": {
                            "name": "cookie-signature",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "f9ab37c0-fcdc-4fbc-a01f-7b498cbe447c",
                                        "source_id": "GHSA-92vm-wfm5-mxvv",
                                        "source": "ghsa",
                                        "severity_name": "Medium",
                                        "cvss_score": 4.4,
                                        "summary": "cookie-signature Timing Attack",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "1.0.4"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "8d5f7ad9-11ce-bffc-591c-171bca663032",
                "child_id": "5b4e070f-e4d9-2dfe-9185-6163a11d1862",
                "id": "15e30a36-506b-4e56-9f96-952a68c44781",
                "child": {
                    "id": "5b4e070f-e4d9-2dfe-9185-6163a11d1862",
                    "range": "0.1.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "9e53ee2a-8ffe-44ab-88c6-16a961f224ad",
                    "release": {
                        "id": "9e53ee2a-8ffe-44ab-88c6-16a961f224ad",
                        "version": "0.1.0",
                        "package": {
                            "name": "methods",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "8d5f7ad9-11ce-bffc-591c-171bca663032",
                "child_id": "51264937-b775-dbe9-f059-a1e5f0350bb0",
                "id": "796e5e17-e2e1-4192-8686-965b3a628a4c",
                "child": {
                    "id": "51264937-b775-dbe9-f059-a1e5f0350bb0",
                    "range": "0.0.4",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "1fd5d97b-731b-4bbb-a755-419a1b8f7aee",
                    "release": {
                        "id": "1fd5d97b-731b-4bbb-a755-419a1b8f7aee",
                        "version": "0.0.4",
                        "package": {
                            "name": "range-parser",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "8d5f7ad9-11ce-bffc-591c-171bca663032",
                "child_id": "281d0fe3-f1ad-f762-180e-1424ddd33374",
                "id": "dbe197e1-8b33-4434-9a6e-e01d84b5e28d",
                "child": {
                    "id": "281d0fe3-f1ad-f762-180e-1424ddd33374",
                    "range": "0.2.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "a192151b-058e-4211-9020-5a2460521f47",
                    "release": {
                        "id": "a192151b-058e-4211-9020-5a2460521f47",
                        "version": "0.2.0",
                        "package": {
                            "name": "fresh",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "5e0c7c52-9c18-4469-a21a-86d7a813bd1b",
                                        "source_id": "GHSA-9qj9-36jm-prpv",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": null,
                                        "summary": "Regular Expression Denial of Service in fresh",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "0.5.2"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "8d5f7ad9-11ce-bffc-591c-171bca663032",
                "child_id": "1cfc8fbd-9eae-5c56-bc33-043601c170e1",
                "id": "b51d7018-3462-41e1-a4af-ce00ef6c2424",
                "child": {
                    "id": "1cfc8fbd-9eae-5c56-bc33-043601c170e1",
                    "range": "0.0.1",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "3fc6b3c0-1ff9-47d6-8e7c-3938c5e612ad",
                    "release": {
                        "id": "3fc6b3c0-1ff9-47d6-8e7c-3938c5e612ad",
                        "version": "0.0.1",
                        "package": {
                            "name": "merge-descriptors",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "8d5f7ad9-11ce-bffc-591c-171bca663032",
                "child_id": "0ffef466-cf53-c9a5-0672-80e3e5e150cb",
                "id": "5191e6a4-ecc2-48a0-958b-93b01d2e69c7",
                "child": {
                    "id": "0ffef466-cf53-c9a5-0672-80e3e5e150cb",
                    "range": ">= 0.7.3 < 1",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "3c508170-9563-4e47-89d4-a7fdc72769cf",
                    "release": {
                        "id": "3c508170-9563-4e47-89d4-a7fdc72769cf",
                        "version": "0.8.1",
                        "package": {
                            "name": "debug",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "b3306022-4834-4e54-a45d-2f2397bbbe94",
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
                "parent_id": "0fbcff3d-c729-0b5c-78f3-c6a2fc611434",
                "child_id": "e97a7013-1684-edc0-750d-c07f80a54f14",
                "id": "b0e2fdf9-a1fe-466b-8932-2947af37fe72",
                "child": {
                    "id": "e97a7013-1684-edc0-750d-c07f80a54f14",
                    "range": ">= 1.6.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "699387f1-fcb3-45af-b347-31627ee441fc",
                    "release": {
                        "id": "699387f1-fcb3-45af-b347-31627ee441fc",
                        "version": "1.12.7",
                        "package": {
                            "name": "coffee-script",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "0fbcff3d-c729-0b5c-78f3-c6a2fc611434",
                "child_id": "bf021edb-4c8e-334d-5157-be27a30bfd81",
                "id": "4491f06a-65dc-4277-b469-efc621e178dd",
                "child": {
                    "id": "bf021edb-4c8e-334d-5157-be27a30bfd81",
                    "range": ">= 0.3.1",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "2cb43135-129b-41cf-93a6-a9b83cda3582",
                    "release": {
                        "id": "2cb43135-129b-41cf-93a6-a9b83cda3582",
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
                "parent_id": "0fbcff3d-c729-0b5c-78f3-c6a2fc611434",
                "child_id": "35a7e9a1-adb8-43cd-1929-d56028c7e2c7",
                "id": "441a8e84-e2a2-4801-84f7-799b942db179",
                "child": {
                    "id": "35a7e9a1-adb8-43cd-1929-d56028c7e2c7",
                    "range": "~0.2.5",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "659983cd-1d72-4005-800a-1724db6fa67e",
                    "release": {
                        "id": "659983cd-1d72-4005-800a-1724db6fa67e",
                        "version": "0.2.6",
                        "package": {
                            "name": "convert-source-map",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "c97ea9e4-6a3b-9c6a-3bdd-148919c82204",
                "child_id": "cd84ab0c-4e5d-424c-09ef-eb4b116a2d6e",
                "id": "7270114e-cc41-4430-b976-3d9230407ff4",
                "child": {
                    "id": "cd84ab0c-4e5d-424c-09ef-eb4b116a2d6e",
                    "range": "~0.3.5",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "e27545fc-1ec0-4217-b01f-96cbe95177a3",
                    "release": {
                        "id": "e27545fc-1ec0-4217-b01f-96cbe95177a3",
                        "version": "0.3.5",
                        "package": {
                            "name": "mkdirp",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "c97ea9e4-6a3b-9c6a-3bdd-148919c82204",
                "child_id": "a3903e80-9096-5b97-eb5b-5e431a35d523",
                "id": "7d31917d-bade-4f86-a724-6c0234104de1",
                "child": {
                    "id": "a3903e80-9096-5b97-eb5b-5e431a35d523",
                    "range": "~0.4.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "441e9cb1-2860-4b72-97be-7213109b1e26",
                    "release": {
                        "id": "441e9cb1-2860-4b72-97be-7213109b1e26",
                        "version": "0.4.0",
                        "package": {
                            "name": "chalk",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "c97ea9e4-6a3b-9c6a-3bdd-148919c82204",
                "child_id": "5da08d7f-6679-3e55-3dea-581ba340cf1e",
                "id": "e544cfa2-bcd7-4dc8-ab28-a61e85596fcf",
                "child": {
                    "id": "5da08d7f-6679-3e55-3dea-581ba340cf1e",
                    "range": "1.18.x",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "d82a64a9-714d-4a39-ba82-788c2cd846bb",
                    "release": {
                        "id": "d82a64a9-714d-4a39-ba82-788c2cd846bb",
                        "version": "1.18.2",
                        "package": {
                            "name": "mocha",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "c97ea9e4-6a3b-9c6a-3bdd-148919c82204",
                "child_id": "37b41347-61e5-3aa5-507f-269508e182c3",
                "id": "514fda3c-4017-4631-bdd0-15615627836b",
                "child": {
                    "id": "37b41347-61e5-3aa5-507f-269508e182c3",
                    "range": "0.6.x",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "e20ac76b-29ab-4582-a835-67201968b66b",
                    "release": {
                        "id": "e20ac76b-29ab-4582-a835-67201968b66b",
                        "version": "0.6.1",
                        "package": {
                            "name": "optimist",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "c97ea9e4-6a3b-9c6a-3bdd-148919c82204",
                "child_id": "30a3a470-01cc-e890-7ecf-9f0490113bef",
                "id": "1c40963a-a134-44ed-bce5-4bc15e1598f8",
                "child": {
                    "id": "30a3a470-01cc-e890-7ecf-9f0490113bef",
                    "range": "~0.8.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "bd7c0f06-9edd-40b3-8fa4-b76d2b6db78c",
                    "release": {
                        "id": "bd7c0f06-9edd-40b3-8fa4-b76d2b6db78c",
                        "version": "0.8.0",
                        "package": {
                            "name": "nan",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "c97ea9e4-6a3b-9c6a-3bdd-148919c82204",
                "child_id": "0c0df1ba-b032-b9c3-e544-bb3f2dd702c9",
                "id": "66e0935c-0d40-4fc5-8ef4-b50b9b545e8f",
                "child": {
                    "id": "0c0df1ba-b032-b9c3-e544-bb3f2dd702c9",
                    "range": "^1.9.1",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "4514e559-e217-4fdf-a70e-c28815c15a2e",
                    "release": {
                        "id": "4514e559-e217-4fdf-a70e-c28815c15a2e",
                        "version": "1.17.7",
                        "package": {
                            "name": "sinon",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "c97ea9e4-6a3b-9c6a-3bdd-148919c82204",
                "child_id": "05d17aad-3a8a-3942-4273-2e21af1e2490",
                "id": "46875545-05e6-4ade-ac32-749ce579457e",
                "child": {
                    "id": "05d17aad-3a8a-3942-4273-2e21af1e2490",
                    "range": "0.3.x",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "5fa97c6b-d745-4ef3-b8ba-29a316179c96",
                    "release": {
                        "id": "5fa97c6b-d745-4ef3-b8ba-29a316179c96",
                        "version": "0.3.5",
                        "package": {
                            "name": "node-watch",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "4033e0ca-d419-7624-882c-8a718f564c2d",
                "child_id": "e4645b23-a218-df3c-39dc-68bbab99b605",
                "id": "13d910eb-b938-4d44-a8a6-aa813cc6bddc",
                "child": {
                    "id": "e4645b23-a218-df3c-39dc-68bbab99b605",
                    "range": "1.2.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "7b9e5085-6d55-4e3d-b502-a4ce1fecb413",
                    "release": {
                        "id": "7b9e5085-6d55-4e3d-b502-a4ce1fecb413",
                        "version": "1.2.0",
                        "package": {
                            "name": "character-parser",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "4033e0ca-d419-7624-882c-8a718f564c2d",
                "child_id": "cd84ab0c-4e5d-424c-09ef-eb4b116a2d6e",
                "id": "ecbe5c75-b2ed-42e6-9799-42cc1b07ed58",
                "child": {
                    "id": "cd84ab0c-4e5d-424c-09ef-eb4b116a2d6e",
                    "range": "~0.3.5",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "e27545fc-1ec0-4217-b01f-96cbe95177a3",
                    "release": {
                        "id": "e27545fc-1ec0-4217-b01f-96cbe95177a3",
                        "version": "0.3.5",
                        "package": {
                            "name": "mkdirp",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "4033e0ca-d419-7624-882c-8a718f564c2d",
                "child_id": "b2c4bf21-47bc-83c3-1f81-19e9324216cc",
                "id": "c6b7d659-8c74-4abc-8bae-86bfe2987d43",
                "child": {
                    "id": "b2c4bf21-47bc-83c3-1f81-19e9324216cc",
                    "range": "~2.0.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "a5bae08a-07eb-4301-9a31-ffdcbf597ff4",
                    "release": {
                        "id": "a5bae08a-07eb-4301-9a31-ffdcbf597ff4",
                        "version": "2.0.1",
                        "package": {
                            "name": "constantinople",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "06bb2605-8aca-4ae6-b4cb-dafb102c4301",
                                        "source_id": "GHSA-4vmm-mhcq-4x9j",
                                        "source": "ghsa",
                                        "severity_name": "Critical",
                                        "cvss_score": 10,
                                        "summary": "Sandbox Bypass Leading to Arbitrary Code Execution in constantinople",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "3.1.1"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "0cb2a171-f13f-470e-b9e9-54974f627088",
                                        "source_id": "GHSA-hg7c-66ff-9q8g",
                                        "source": "ghsa",
                                        "severity_name": "Medium",
                                        "cvss_score": null,
                                        "summary": "Sandbox bypass in constantinople",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "3.1.1"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "4033e0ca-d419-7624-882c-8a718f564c2d",
                "child_id": "aeb027e5-ef74-bc16-f9b8-ada617b2467b",
                "id": "2b67af88-b3b7-4987-8b38-cbe244d38b54",
                "child": {
                    "id": "aeb027e5-ef74-bc16-f9b8-ada617b2467b",
                    "range": "~3.0.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "3c7c0bd6-38f1-4ed1-b489-e2b03f795328",
                    "release": {
                        "id": "3c7c0bd6-38f1-4ed1-b489-e2b03f795328",
                        "version": "3.0.1",
                        "package": {
                            "name": "with",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "4033e0ca-d419-7624-882c-8a718f564c2d",
                "child_id": "99d60b80-02da-d12e-fde9-e9d076f91341",
                "id": "69c2eb51-764b-4029-864d-8aa8673454ba",
                "child": {
                    "id": "99d60b80-02da-d12e-fde9-e9d076f91341",
                    "range": "2.1.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "fe5176ad-58eb-4a8d-9872-0f8bea52aae0",
                    "release": {
                        "id": "fe5176ad-58eb-4a8d-9872-0f8bea52aae0",
                        "version": "2.1.0",
                        "package": {
                            "name": "transformers",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "4033e0ca-d419-7624-882c-8a718f564c2d",
                "child_id": "866eccb6-87b8-8e3a-45af-547cf3b639f4",
                "id": "f9d03d06-c5db-4777-bf5e-dbcb230952c6",
                "child": {
                    "id": "866eccb6-87b8-8e3a-45af-547cf3b639f4",
                    "range": "2.1.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "7c105831-1268-4e51-8a25-016ca080b97f",
                    "release": {
                        "id": "7c105831-1268-4e51-8a25-016ca080b97f",
                        "version": "2.1.0",
                        "package": {
                            "name": "commander",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "4033e0ca-d419-7624-882c-8a718f564c2d",
                "child_id": "4393f64c-7307-50bb-affd-18f628b3a938",
                "id": "dd68b6ec-3bcd-4bf9-ad66-e517fbeeaee7",
                "child": {
                    "id": "4393f64c-7307-50bb-affd-18f628b3a938",
                    "range": "1.1.51",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "24db2a74-6e5f-4284-a1e7-b7f0315ffca6",
                    "release": {
                        "id": "24db2a74-6e5f-4284-a1e7-b7f0315ffca6",
                        "version": "1.1.51",
                        "package": {
                            "name": "monocle",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "6b3dff96-0273-46af-d259-a2e36d3b55ca",
                "child_id": "fc456e80-764f-58fe-d84c-ba150330c278",
                "id": "820da107-d8da-4418-a93c-f93674ba891f",
                "child": {
                    "id": "fc456e80-764f-58fe-d84c-ba150330c278",
                    "range": "",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "ab13453b-7cfa-40b7-9ac1-ef109854010d",
                    "release": {
                        "id": "ab13453b-7cfa-40b7-9ac1-ef109854010d",
                        "version": "1.3.2",
                        "package": {
                            "name": "fs.extra",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "6b3dff96-0273-46af-d259-a2e36d3b55ca",
                "child_id": "dad8fb11-84e7-5c04-cc29-183f741e3afa",
                "id": "9f95152d-8a9e-4348-9cf8-22b6f3547513",
                "child": {
                    "id": "dad8fb11-84e7-5c04-cc29-183f741e3afa",
                    "range": "0.3.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "60f960ac-8db8-43bf-abd7-ef13535f24fb",
                    "release": {
                        "id": "60f960ac-8db8-43bf-abd7-ef13535f24fb",
                        "version": "0.3.0",
                        "package": {
                            "name": "mkdirp",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "57bd8663-2c4a-a8cf-0e57-e3abf9c84116",
                "child_id": "b5e057bc-7166-187e-8ec9-152bcf4d62ac",
                "id": "175a1111-a973-48de-8608-21f14ca7197d",
                "child": {
                    "id": "b5e057bc-7166-187e-8ec9-152bcf4d62ac",
                    "range": "*",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "5632676e-8b96-47d5-b68b-e0568245d42a",
                    "release": {
                        "id": "5632676e-8b96-47d5-b68b-e0568245d42a",
                        "version": "4.3.4",
                        "package": {
                            "name": "debug",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "b3306022-4834-4e54-a45d-2f2397bbbe94",
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
                "parent_id": "57bd8663-2c4a-a8cf-0e57-e3abf9c84116",
                "child_id": "6c5f042e-5e1e-30b8-2cfb-03a639555ee5",
                "id": "79652a04-9a33-4314-86a2-28f0a88bc4ea",
                "child": {
                    "id": "6c5f042e-5e1e-30b8-2cfb-03a639555ee5",
                    "range": ">=0.5.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "2cb43135-129b-41cf-93a6-a9b83cda3582",
                    "release": {
                        "id": "2cb43135-129b-41cf-93a6-a9b83cda3582",
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
                "parent_id": "57bd8663-2c4a-a8cf-0e57-e3abf9c84116",
                "child_id": "6997529c-6b18-ebda-d77b-67823e9b79bf",
                "id": "18a5f8f5-d370-44fa-9ba6-9acb6d4aef0f",
                "child": {
                    "id": "6997529c-6b18-ebda-d77b-67823e9b79bf",
                    "range": ">=1.8.x",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "699387f1-fcb3-45af-b347-31627ee441fc",
                    "release": {
                        "id": "699387f1-fcb3-45af-b347-31627ee441fc",
                        "version": "1.12.7",
                        "package": {
                            "name": "coffee-script",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "3d034dfd-d8d5-2de2-acfc-53e553d3f327",
                "child_id": "cd84ab0c-4e5d-424c-09ef-eb4b116a2d6e",
                "id": "d18a108f-ae02-4120-80f9-6b9c4e69199e",
                "child": {
                    "id": "cd84ab0c-4e5d-424c-09ef-eb4b116a2d6e",
                    "range": "~0.3.5",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "e27545fc-1ec0-4217-b01f-96cbe95177a3",
                    "release": {
                        "id": "e27545fc-1ec0-4217-b01f-96cbe95177a3",
                        "version": "0.3.5",
                        "package": {
                            "name": "mkdirp",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "c36afa31-dcd9-fe0e-988c-6573907ac738",
                "child_id": "b5e057bc-7166-187e-8ec9-152bcf4d62ac",
                "id": "0bebc870-8dc6-4dda-af66-07f1c40bd83d",
                "child": {
                    "id": "b5e057bc-7166-187e-8ec9-152bcf4d62ac",
                    "range": "*",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "5632676e-8b96-47d5-b68b-e0568245d42a",
                    "release": {
                        "id": "5632676e-8b96-47d5-b68b-e0568245d42a",
                        "version": "4.3.4",
                        "package": {
                            "name": "debug",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "b3306022-4834-4e54-a45d-2f2397bbbe94",
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
                "parent_id": "c36afa31-dcd9-fe0e-988c-6573907ac738",
                "child_id": "afacebe4-607a-eab7-be5b-8ab30abdbca1",
                "id": "053a16fb-2cca-4bc9-a56f-98267063e273",
                "child": {
                    "id": "afacebe4-607a-eab7-be5b-8ab30abdbca1",
                    "range": "^1.2.1",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "cd3ba970-23a1-4676-8f04-a6c8d74cd100",
                    "release": {
                        "id": "cd3ba970-23a1-4676-8f04-a6c8d74cd100",
                        "version": "1.2.1",
                        "package": {
                            "name": "is-type-of",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "c36afa31-dcd9-fe0e-988c-6573907ac738",
                "child_id": "ab8515a7-e3b6-a90e-18f1-50c96e2ccd16",
                "id": "605961f1-a15b-41a6-9138-598acd4cf40b",
                "child": {
                    "id": "ab8515a7-e3b6-a90e-18f1-50c96e2ccd16",
                    "range": "^6.0.5",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "f7e06f9a-0f78-4db2-b950-a9b0b10f18e4",
                    "release": {
                        "id": "f7e06f9a-0f78-4db2-b950-a9b0b10f18e4",
                        "version": "6.0.5",
                        "package": {
                            "name": "cross-spawn",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "fb8446b9-73bb-8e7c-59d6-b46ea324bfa5",
                "child_id": "6f52ac1d-6e33-8c01-0eef-c2bf814696b5",
                "id": "5258794b-f3a2-4885-ae2e-48e8b3eb81af",
                "child": {
                    "id": "6f52ac1d-6e33-8c01-0eef-c2bf814696b5",
                    "range": "0.6.2",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "6a5fc9ae-42cb-4b81-8a51-4ffd00246752",
                    "release": {
                        "id": "6a5fc9ae-42cb-4b81-8a51-4ffd00246752",
                        "version": "0.6.2",
                        "package": {
                            "name": "ms",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "ae99bc66-cf69-49df-807e-5b15b9c2da79",
                                        "source_id": "GHSA-3fx5-fwvr-xrjg",
                                        "source": "ghsa",
                                        "severity_name": null,
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
                "parent_id": "fb8446b9-73bb-8e7c-59d6-b46ea324bfa5",
                "child_id": "14de0290-07f3-ab5e-6470-3cd35f16c7d7",
                "id": "bb6e6c38-38bf-4daa-bbdf-95463e448f7c",
                "child": {
                    "id": "14de0290-07f3-ab5e-6470-3cd35f16c7d7",
                    "range": "0.2.4",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "493359a2-7fd0-4b9f-a527-a16c5a852a9f",
                    "release": {
                        "id": "493359a2-7fd0-4b9f-a527-a16c5a852a9f",
                        "version": "0.2.4",
                        "package": {
                            "name": "fresh",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "5e0c7c52-9c18-4469-a21a-86d7a813bd1b",
                                        "source_id": "GHSA-9qj9-36jm-prpv",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": null,
                                        "summary": "Regular Expression Denial of Service in fresh",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "0.5.2"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "fb8446b9-73bb-8e7c-59d6-b46ea324bfa5",
                "child_id": "0b0b7fe8-6361-40a5-eb06-5ef36d891df2",
                "id": "1ca7cb33-5fb5-485c-b741-1b3403b724e3",
                "child": {
                    "id": "0b0b7fe8-6361-40a5-eb06-5ef36d891df2",
                    "range": "~1.5.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "04f81975-4952-4e97-97ec-c69c531e580d",
                    "release": {
                        "id": "04f81975-4952-4e97-97ec-c69c531e580d",
                        "version": "1.5.1",
                        "package": {
                            "name": "etag",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "b09f52d6-f4fe-e7f7-1246-d633fa353400",
                "child_id": "ef6be226-5ae7-23ce-f311-c4c2734def51",
                "id": "849ef403-1fe3-4eb2-9304-b0d4352dfd0f",
                "child": {
                    "id": "ef6be226-5ae7-23ce-f311-c4c2734def51",
                    "range": "0.1.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "b1da12fc-c30a-4f1a-81f3-1cc9ce86e846",
                    "release": {
                        "id": "b1da12fc-c30a-4f1a-81f3-1cc9ce86e846",
                        "version": "0.1.0",
                        "package": {
                            "name": "simple-extend",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "b09f52d6-f4fe-e7f7-1246-d633fa353400",
                "child_id": "b04bf441-4fce-5dd6-6d63-72bfa17372ba",
                "id": "8a862a83-1fa4-451f-9e40-414fec8e9e40",
                "child": {
                    "id": "b04bf441-4fce-5dd6-6d63-72bfa17372ba",
                    "range": "~2.4.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "2b29afdf-6ff4-40c3-972e-27d726a04ab9",
                    "release": {
                        "id": "2b29afdf-6ff4-40c3-972e-27d726a04ab9",
                        "version": "2.4.2",
                        "package": {
                            "name": "lodash",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "ec3a4329-493a-432c-b340-44eb59a7f111",
                                        "source_id": "GHSA-jf85-cpcp-j695",
                                        "source": "ghsa",
                                        "severity_name": "Critical",
                                        "cvss_score": 9.1,
                                        "summary": "Prototype Pollution in lodash",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "4.17.12"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "9cb1d5ac-9802-42de-8f74-7ee219eb30ae",
                                        "source_id": "GHSA-4xc9-xhrj-v574",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": null,
                                        "summary": "Prototype Pollution in lodash",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "4.17.11"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "4d4be38d-1e7f-41d3-8a43-ec1ff19dfe5c",
                                        "source_id": "GHSA-x5rq-j2xg-h7qm",
                                        "source": "ghsa",
                                        "severity_name": "Medium",
                                        "cvss_score": null,
                                        "summary": "Regular Expression Denial of Service (ReDoS) in lodash",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "4.17.11"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "4565e95f-8f85-4374-a638-8556e20430de",
                                        "source_id": "GHSA-fvqr-27wr-82fm",
                                        "source": "ghsa",
                                        "severity_name": "Low",
                                        "cvss_score": null,
                                        "summary": "Prototype Pollution in lodash",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "4.17.5"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "ddbcb8d9-a3fe-4e43-b88a-8498b45c2f59",
                                        "source_id": "GHSA-35jh-r3h4-6jhm",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": 7.2,
                                        "summary": "Command Injection in lodash",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "4.17.21"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "7f704fd4-a981-451e-bd29-2fb74a296b5f",
                                        "source_id": "GHSA-p6mc-m468-83gw",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": 7.4,
                                        "summary": "Prototype Pollution in lodash",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "4.17.20"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "649a016e-2205-428e-95e7-41d4e2511ffd",
                                        "source_id": "GHSA-8p5q-j9m2-g8wr",
                                        "source": "ghsa",
                                        "severity_name": "Low",
                                        "cvss_score": 9.8,
                                        "summary": "Withdrawn: Arbitrary code execution in lodash",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": null
                                        },
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": null
                                        },
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": null
                                        },
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": null
                                        },
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": null
                                        },
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": null
                                        },
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": null
                                        },
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": null
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "3c05bb46-4b73-4863-a45e-e6ea8c45379b",
                                        "source_id": "GHSA-29mw-wpgm-hmr9",
                                        "source": "ghsa",
                                        "severity_name": "Medium",
                                        "cvss_score": 5.3,
                                        "summary": "Regular Expression Denial of Service (ReDoS) in lodash",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "4.17.21"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "b09f52d6-f4fe-e7f7-1246-d633fa353400",
                "child_id": "97a9cb41-4601-b213-2b03-c373e8ed962c",
                "id": "c716b54b-a2ed-4028-a21d-0e3a6d11f607",
                "child": {
                    "id": "97a9cb41-4601-b213-2b03-c373e8ed962c",
                    "range": "1.1.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "faedc5ea-d884-485f-9d83-fea3354d0538",
                    "release": {
                        "id": "faedc5ea-d884-485f-9d83-fea3354d0538",
                        "version": "1.1.0",
                        "package": {
                            "name": "backbone",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "59b1ad89-b87d-40cb-a400-3da5906e2e17",
                                        "source_id": "GHSA-j6p2-cx3w-6jcp",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": null,
                                        "summary": "Cross-Site Scripting in backbone",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "0.5.0"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "b09f52d6-f4fe-e7f7-1246-d633fa353400",
                "child_id": "9746272b-dee7-0161-0c96-afb720e32d09",
                "id": "0c33e06d-5315-40bc-9bb7-f2e1f2341725",
                "child": {
                    "id": "9746272b-dee7-0161-0c96-afb720e32d09",
                    "range": "^4.1.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "39e64c35-931d-4c1d-bf81-782feff04b56",
                    "release": {
                        "id": "39e64c35-931d-4c1d-bf81-782feff04b56",
                        "version": "4.3.6",
                        "package": {
                            "name": "semver",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "d32467a3-d773-4248-8959-296be4df611d",
                                        "source_id": "GHSA-x6fg-f45m-jf5q",
                                        "source": "ghsa",
                                        "severity_name": null,
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
                "parent_id": "b09f52d6-f4fe-e7f7-1246-d633fa353400",
                "child_id": "96132f16-8803-d94f-890f-2b47db84d36d",
                "id": "898c1436-9a80-4660-83b7-cc7f1de87e8f",
                "child": {
                    "id": "96132f16-8803-d94f-890f-2b47db84d36d",
                    "range": "~0.3.1",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "97564744-ea4c-4d32-a377-4fb0433d2bcf",
                    "release": {
                        "id": "97564744-ea4c-4d32-a377-4fb0433d2bcf",
                        "version": "0.3.1",
                        "package": {
                            "name": "create-error",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "b09f52d6-f4fe-e7f7-1246-d633fa353400",
                "child_id": "60f76259-b68a-c76f-0357-cc0f686f84a4",
                "id": "54c0cac2-67b5-4c38-8eaa-4ee1db14356c",
                "child": {
                    "id": "60f76259-b68a-c76f-0357-cc0f686f84a4",
                    "range": "^2.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "2bc1c9ef-d402-42b2-aa11-773c1e77d402",
                    "release": {
                        "id": "2bc1c9ef-d402-42b2-aa11-773c1e77d402",
                        "version": "2.11.0",
                        "package": {
                            "name": "bluebird",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "b09f52d6-f4fe-e7f7-1246-d633fa353400",
                "child_id": "48b522b9-45b0-0efb-9269-9de40666cee0",
                "id": "e093ac0d-9404-4225-9e11-33daef18afe1",
                "child": {
                    "id": "48b522b9-45b0-0efb-9269-9de40666cee0",
                    "range": "^2.0.3",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "47eeabb9-0f9c-42ac-933c-0e1fe5154350",
                    "release": {
                        "id": "47eeabb9-0f9c-42ac-933c-0e1fe5154350",
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
                "parent_id": "b09f52d6-f4fe-e7f7-1246-d633fa353400",
                "child_id": "3c099e84-312f-e2c4-b181-2ac3fe4d8dfd",
                "id": "f367b211-e337-408f-b0a5-2b5f79a650d9",
                "child": {
                    "id": "3c099e84-312f-e2c4-b181-2ac3fe4d8dfd",
                    "range": "^1.5.1",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "ca282aab-289a-43de-8fea-be3a7ead5807",
                    "release": {
                        "id": "ca282aab-289a-43de-8fea-be3a7ead5807",
                        "version": "1.13.2",
                        "package": {
                            "name": "inflection",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "b09f52d6-f4fe-e7f7-1246-d633fa353400",
                "child_id": "2664ef23-65ba-44a5-19de-9d94ab63a8a5",
                "id": "acecc7d6-fdfe-4bd0-bef0-a3972e457bdb",
                "child": {
                    "id": "2664ef23-65ba-44a5-19de-9d94ab63a8a5",
                    "range": "0.3.x",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "9df8f0a7-e186-4cd8-ad0a-4fe6d7e7ef06",
                    "release": {
                        "id": "9df8f0a7-e186-4cd8-ad0a-4fe6d7e7ef06",
                        "version": "0.3.0",
                        "package": {
                            "name": "trigger-then",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "f62bba4d-86b6-1c3f-d89b-49403f2a6e1a",
                "child_id": "caec939c-fc0e-5739-d1f0-05118bb14122",
                "id": "b822e566-176e-4a72-85a4-061a6a23d7b4",
                "child": {
                    "id": "caec939c-fc0e-5739-d1f0-05118bb14122",
                    "range": "1.6.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "15efff62-fbb6-4299-8d63-32d4991da121",
                    "release": {
                        "id": "15efff62-fbb6-4299-8d63-32d4991da121",
                        "version": "1.6.0",
                        "package": {
                            "name": "pg-types",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "f62bba4d-86b6-1c3f-d89b-49403f2a6e1a",
                "child_id": "a1ce3263-75d9-99a3-f6b1-06d5e203017a",
                "id": "6a1fe3f4-a125-497e-a10b-1f087ffb682c",
                "child": {
                    "id": "a1ce3263-75d9-99a3-f6b1-06d5e203017a",
                    "range": "2.1.1",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "953edf58-01f2-483f-b62a-867df5b2311a",
                    "release": {
                        "id": "953edf58-01f2-483f-b62a-867df5b2311a",
                        "version": "2.1.1",
                        "package": {
                            "name": "generic-pool",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "f62bba4d-86b6-1c3f-d89b-49403f2a6e1a",
                "child_id": "8f93e25a-cf29-9eba-2a7e-2b91e7acf850",
                "id": "57755797-4680-4508-8ba2-4b33a9286dff",
                "child": {
                    "id": "8f93e25a-cf29-9eba-2a7e-2b91e7acf850",
                    "range": "0.0.3",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "061f1fdb-b329-4e99-aee6-8ec9c8245139",
                    "release": {
                        "id": "061f1fdb-b329-4e99-aee6-8ec9c8245139",
                        "version": "0.0.3",
                        "package": {
                            "name": "pgpass",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "f62bba4d-86b6-1c3f-d89b-49403f2a6e1a",
                "child_id": "6d3b73f2-2cad-d84d-09de-8f00740223dc",
                "id": "103d0195-b106-4804-bd5d-e34294913210",
                "child": {
                    "id": "6d3b73f2-2cad-d84d-09de-8f00740223dc",
                    "range": "0.2.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "ee81099d-0373-4550-9b06-ba954fbe35c7",
                    "release": {
                        "id": "ee81099d-0373-4550-9b06-ba954fbe35c7",
                        "version": "0.2.0",
                        "package": {
                            "name": "packet-reader",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "f62bba4d-86b6-1c3f-d89b-49403f2a6e1a",
                "child_id": "6084f5b9-9fd8-ca7b-ddb2-d72bec6e1075",
                "id": "07f6f84c-ae96-4b2a-9e08-ed449d08a35a",
                "child": {
                    "id": "6084f5b9-9fd8-ca7b-ddb2-d72bec6e1075",
                    "range": "1.3.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "ca4b7b79-8141-4edd-81c4-527a9aa1e48f",
                    "release": {
                        "id": "ca4b7b79-8141-4edd-81c4-527a9aa1e48f",
                        "version": "1.3.0",
                        "package": {
                            "name": "nan",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "f62bba4d-86b6-1c3f-d89b-49403f2a6e1a",
                "child_id": "5b33eb43-a982-a865-a5ad-d2642e1461e4",
                "id": "7f21b221-9d01-4df0-86db-a2e03dc873de",
                "child": {
                    "id": "5b33eb43-a982-a865-a5ad-d2642e1461e4",
                    "range": "0.1.3",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "676bff33-f578-4355-99e4-c40bd13228c3",
                    "release": {
                        "id": "676bff33-f578-4355-99e4-c40bd13228c3",
                        "version": "0.1.3",
                        "package": {
                            "name": "pg-connection-string",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "f62bba4d-86b6-1c3f-d89b-49403f2a6e1a",
                "child_id": "3492dc73-1e52-e40d-aaf0-150e07b9a2d0",
                "id": "2fbbb61d-9cd6-42a7-a8ce-aa1f64e5a814",
                "child": {
                    "id": "3492dc73-1e52-e40d-aaf0-150e07b9a2d0",
                    "range": "1.0.1",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "202c3a76-1760-45ab-bfd5-0264e659d76c",
                    "release": {
                        "id": "202c3a76-1760-45ab-bfd5-0264e659d76c",
                        "version": "1.0.1",
                        "package": {
                            "name": "js-string-escape",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "f62bba4d-86b6-1c3f-d89b-49403f2a6e1a",
                "child_id": "117569a1-deb1-341f-5e0d-f058aa9f5d76",
                "id": "6df47880-4f24-4a32-9bc3-840504cc4664",
                "child": {
                    "id": "117569a1-deb1-341f-5e0d-f058aa9f5d76",
                    "range": "1.0.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "aac28e32-7f65-4de7-8a24-74066a1b6159",
                    "release": {
                        "id": "aac28e32-7f65-4de7-8a24-74066a1b6159",
                        "version": "1.0.0",
                        "package": {
                            "name": "buffer-writer",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "f62bba4d-86b6-1c3f-d89b-49403f2a6e1a",
                "child_id": "0b63e795-c231-b5a6-ee40-beb048494227",
                "id": "e956d975-b489-4caa-afd9-ab176217fef9",
                "child": {
                    "id": "0b63e795-c231-b5a6-ee40-beb048494227",
                    "range": "1.2.1",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "6a190879-3e34-49d9-80c4-801ee0a852ae",
                    "release": {
                        "id": "6a190879-3e34-49d9-80c4-801ee0a852ae",
                        "version": "1.2.1",
                        "package": {
                            "name": "bindings",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "1220780d-8992-fae6-e274-0cbcb0db27d8",
                "child_id": "f1cf7c8f-eb7c-af67-c4ba-dbb500e977ae",
                "id": "add1f6f1-56c2-4156-b9cf-dc36af7f67e3",
                "child": {
                    "id": "f1cf7c8f-eb7c-af67-c4ba-dbb500e977ae",
                    "range": "2.0.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "94e0360f-a466-48c5-8fd5-76649ef90d45",
                    "release": {
                        "id": "94e0360f-a466-48c5-8fd5-76649ef90d45",
                        "version": "2.0.0",
                        "package": {
                            "name": "debug",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "b3306022-4834-4e54-a45d-2f2397bbbe94",
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
                "parent_id": "1220780d-8992-fae6-e274-0cbcb0db27d8",
                "child_id": "c4e844e7-83eb-55ee-3a98-c855f632588b",
                "id": "09d6fc35-4732-478b-984f-9aa651724354",
                "child": {
                    "id": "c4e844e7-83eb-55ee-3a98-c855f632588b",
                    "range": "3.2.3",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "b30a9768-4ad0-4277-a944-bb317144d1d1",
                    "release": {
                        "id": "b30a9768-4ad0-4277-a944-bb317144d1d1",
                        "version": "3.2.3",
                        "package": {
                            "name": "glob",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "1220780d-8992-fae6-e274-0cbcb0db27d8",
                "child_id": "bc974d2c-f819-be44-4ddd-734e2aa3a362",
                "id": "d16835f0-eb76-4ebe-867f-1bf71425e6cc",
                "child": {
                    "id": "bc974d2c-f819-be44-4ddd-734e2aa3a362",
                    "range": "1.0.2",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "0b1ca23b-56b4-4cbd-bf14-a6698f1ec2ac",
                    "release": {
                        "id": "0b1ca23b-56b4-4cbd-bf14-a6698f1ec2ac",
                        "version": "1.0.2",
                        "package": {
                            "name": "escape-string-regexp",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "1220780d-8992-fae6-e274-0cbcb0db27d8",
                "child_id": "bc17e850-9f23-c81f-3211-8aba01771a77",
                "id": "caf54f83-3eea-4ea4-9a5b-d1ba614bd31a",
                "child": {
                    "id": "bc17e850-9f23-c81f-3211-8aba01771a77",
                    "range": "1.8.1",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "9bb6c489-65db-4b86-ab7d-fa69a68051d3",
                    "release": {
                        "id": "9bb6c489-65db-4b86-ab7d-fa69a68051d3",
                        "version": "1.8.1",
                        "package": {
                            "name": "growl",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "50310196-031d-483f-aa6f-1e4291d14a84",
                                        "source_id": "GHSA-qh2h-chj9-jffq",
                                        "source": "ghsa",
                                        "severity_name": "Critical",
                                        "cvss_score": null,
                                        "summary": "Growl before 1.10.0 vulnerable to Command Injection",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "1.10.0"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "1220780d-8992-fae6-e274-0cbcb0db27d8",
                "child_id": "bc046354-863c-7aa2-a6a4-ff200781baf8",
                "id": "7c78904d-c425-4ebd-aef5-81cf029dc44e",
                "child": {
                    "id": "bc046354-863c-7aa2-a6a4-ff200781baf8",
                    "range": "2.3.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "254ca171-b984-48c1-9ccc-3671cde51a6f",
                    "release": {
                        "id": "254ca171-b984-48c1-9ccc-3671cde51a6f",
                        "version": "2.3.0",
                        "package": {
                            "name": "commander",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "1220780d-8992-fae6-e274-0cbcb0db27d8",
                "child_id": "75ecb225-89bd-078f-49ba-be900d08444e",
                "id": "192b6a87-2928-4a44-a4e9-8a696bc1fb54",
                "child": {
                    "id": "75ecb225-89bd-078f-49ba-be900d08444e",
                    "range": "0.26.3",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "cfd05410-ccf3-4bfc-a82c-182e7e829c9d",
                    "release": {
                        "id": "cfd05410-ccf3-4bfc-a82c-182e7e829c9d",
                        "version": "0.26.3",
                        "package": {
                            "name": "jade",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "1220780d-8992-fae6-e274-0cbcb0db27d8",
                "child_id": "58d3e41b-34df-f01d-3c0d-b83e03403ff7",
                "id": "816657a8-2dc6-4670-9a72-474a55642a04",
                "child": {
                    "id": "58d3e41b-34df-f01d-3c0d-b83e03403ff7",
                    "range": "0.5.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "e6e2ce2e-e229-4790-883a-8688d105fe1b",
                    "release": {
                        "id": "e6e2ce2e-e229-4790-883a-8688d105fe1b",
                        "version": "0.5.0",
                        "package": {
                            "name": "mkdirp",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "1220780d-8992-fae6-e274-0cbcb0db27d8",
                "child_id": "38a77c47-da62-e628-390d-af2b8c8f4ec3",
                "id": "b968d281-ef4a-4814-a367-eabf1e978c36",
                "child": {
                    "id": "38a77c47-da62-e628-390d-af2b8c8f4ec3",
                    "range": "1.0.8",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "412a7333-d89d-461e-95bf-741df29c51c4",
                    "release": {
                        "id": "412a7333-d89d-461e-95bf-741df29c51c4",
                        "version": "1.0.8",
                        "package": {
                            "name": "diff",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "dd31718f-b72c-4376-828e-6b8638cc34a3",
                                        "source_id": "GHSA-h6ch-v84p-w6p9",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": null,
                                        "summary": "Regular Expression Denial of Service (ReDoS)",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "3.5.0"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "c814b958-58e0-d9de-4ee6-a1254c2a0e92",
                "child_id": "1a56b931-49e8-bddd-d866-06903e15a62c",
                "id": "6300ae83-8c73-4b04-a47b-f5df1a61737f",
                "child": {
                    "id": "1a56b931-49e8-bddd-d866-06903e15a62c",
                    "range": "1.0.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "5089df44-1280-4579-84ad-75c0d4ffcd80",
                    "release": {
                        "id": "5089df44-1280-4579-84ad-75c0d4ffcd80",
                        "version": "1.0.0",
                        "package": {
                            "name": "assertion-error",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "c814b958-58e0-d9de-4ee6-a1254c2a0e92",
                "child_id": "0258c571-c083-1db3-60e1-e7a05c90f992",
                "id": "b0e16186-6e6d-4d6a-b293-f99faee58554",
                "child": {
                    "id": "0258c571-c083-1db3-60e1-e7a05c90f992",
                    "range": "0.1.3",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "fb81cb62-50af-4fda-8130-f53b5e5919d3",
                    "release": {
                        "id": "fb81cb62-50af-4fda-8130-f53b5e5919d3",
                        "version": "0.1.3",
                        "package": {
                            "name": "deep-eql",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "8fe30d2d-54ff-0c69-353e-2880f93508f0",
                "child_id": "ef3a3171-3edf-9c32-af5a-26226207c513",
                "id": "3877618c-e5b4-4e67-b5d7-a911c383dc71",
                "child": {
                    "id": "ef3a3171-3edf-9c32-af5a-26226207c513",
                    "range": "~2.1.1",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "9a538dc4-5ac5-496b-839f-eb5f201e5bde",
                    "release": {
                        "id": "9a538dc4-5ac5-496b-839f-eb5f201e5bde",
                        "version": "2.1.1",
                        "package": {
                            "name": "on-finished",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "8fe30d2d-54ff-0c69-353e-2880f93508f0",
                "child_id": "d7971537-f8ba-4a4f-c525-79fb372464be",
                "id": "7cd618e9-da83-4162-b9a7-bfee1fcac098",
                "child": {
                    "id": "d7971537-f8ba-4a4f-c525-79fb372464be",
                    "range": "1.3.1",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "f74733db-087c-4bd8-83ff-568bb7caa503",
                    "release": {
                        "id": "f74733db-087c-4bd8-83ff-568bb7caa503",
                        "version": "1.3.1",
                        "package": {
                            "name": "raw-body",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "8fe30d2d-54ff-0c69-353e-2880f93508f0",
                "child_id": "9293588a-9929-23a6-6a53-1a0d7fd144e6",
                "id": "9b37bf6d-63a2-472d-961a-7e479ebe99b4",
                "child": {
                    "id": "9293588a-9929-23a6-6a53-1a0d7fd144e6",
                    "range": "0.3.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "385a98a2-b9d2-419e-9075-c01b607a81fe",
                    "release": {
                        "id": "385a98a2-b9d2-419e-9075-c01b607a81fe",
                        "version": "0.3.0",
                        "package": {
                            "name": "media-typer",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "8fe30d2d-54ff-0c69-353e-2880f93508f0",
                "child_id": "79f37a55-fc87-3896-7cf0-3b1ec36fa306",
                "id": "ca4021a5-4e61-41b3-bf58-ba6b3faa40be",
                "child": {
                    "id": "79f37a55-fc87-3896-7cf0-3b1ec36fa306",
                    "range": "0.4.5",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "24dd52f1-60e7-410a-9c1f-b561f752f96d",
                    "release": {
                        "id": "24dd52f1-60e7-410a-9c1f-b561f752f96d",
                        "version": "0.4.5",
                        "package": {
                            "name": "iconv-lite",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "8fe30d2d-54ff-0c69-353e-2880f93508f0",
                "child_id": "4f7f8fbd-ad8a-276c-d8a6-b197a8e7f917",
                "id": "149ee185-2791-434b-b82e-89f0b9f6511b",
                "child": {
                    "id": "4f7f8fbd-ad8a-276c-d8a6-b197a8e7f917",
                    "range": "~1.5.3",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "cd51696a-de87-4981-bf44-c6116d743378",
                    "release": {
                        "id": "cd51696a-de87-4981-bf44-c6116d743378",
                        "version": "1.5.7",
                        "package": {
                            "name": "type-is",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "8fe30d2d-54ff-0c69-353e-2880f93508f0",
                "child_id": "3d18ce2b-3057-e5b9-6e90-e528d4f349e1",
                "id": "274d0bed-e021-46e5-88d0-db33e9e6ebdf",
                "child": {
                    "id": "3d18ce2b-3057-e5b9-6e90-e528d4f349e1",
                    "range": "1.0.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "8cd5dfe2-ed8e-4cfe-bd12-df8ccfdf9168",
                    "release": {
                        "id": "8cd5dfe2-ed8e-4cfe-bd12-df8ccfdf9168",
                        "version": "1.0.0",
                        "package": {
                            "name": "bytes",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "8fe30d2d-54ff-0c69-353e-2880f93508f0",
                "child_id": "231528ba-bf6f-bddf-a389-a669ad961be7",
                "id": "5f2ed76d-a30f-4ef2-8022-a517d1db5ffe",
                "child": {
                    "id": "231528ba-bf6f-bddf-a389-a669ad961be7",
                    "range": "~2.3.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "158fde0d-0059-4997-9808-4b3ec893558f",
                    "release": {
                        "id": "158fde0d-0059-4997-9808-4b3ec893558f",
                        "version": "2.3.3",
                        "package": {
                            "name": "qs",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "e9050ca8-e5b7-4ed2-b88e-01235da0c165",
                                        "source_id": "GHSA-jjv7-qpx3-h62q",
                                        "source": "ghsa",
                                        "severity_name": null,
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
                                        "id": "282e73dc-75b0-47f6-a65c-863c71ad224a",
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
                                        "id": "36560865-327c-4393-b0a5-1637f16f235f",
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
                                },
                                {
                                    "vulnerability": {
                                        "id": "7d32681a-1370-4d06-a023-803106111dac",
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
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "8fe30d2d-54ff-0c69-353e-2880f93508f0",
                "child_id": "183ea0c9-7c13-a708-a43f-92b1003ae3ce",
                "id": "a8741816-e2ac-49a6-97d6-8e2deb902279",
                "child": {
                    "id": "183ea0c9-7c13-a708-a43f-92b1003ae3ce",
                    "range": "~1.0.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "391ce20d-0644-4f75-8ead-a0b96aa5b5f4",
                    "release": {
                        "id": "391ce20d-0644-4f75-8ead-a0b96aa5b5f4",
                        "version": "1.0.1",
                        "package": {
                            "name": "depd",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "8e82fc0a-56d0-b117-b508-0b435efcf36d",
                "child_id": "f2a7ff8e-9944-6ed4-ea2d-7fb8dd13c8f1",
                "id": "46680fde-f5d9-4115-85c8-32a09de88b18",
                "child": {
                    "id": "f2a7ff8e-9944-6ed4-ea2d-7fb8dd13c8f1",
                    "range": ">=3.x",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "64c01286-537b-467b-908c-1e39cfdd2597",
                    "release": {
                        "id": "64c01286-537b-467b-908c-1e39cfdd2597",
                        "version": "8.7.3",
                        "package": {
                            "name": "pg",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "a1dde20c-f378-42bd-92e1-833f255f22be",
                                        "source_id": "GHSA-wc9v-mj63-m9g5",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": null,
                                        "summary": "Remote Code Execution in pg",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "2.11.2"
                                        },
                                        {
                                            "introduced": "3.0.0",
                                            "fixed": "3.6.4"
                                        },
                                        {
                                            "introduced": "4.0.0",
                                            "fixed": "4.5.7"
                                        },
                                        {
                                            "introduced": "5.0.0",
                                            "fixed": "5.2.1"
                                        },
                                        {
                                            "introduced": "6.0.0",
                                            "fixed": "6.0.5"
                                        },
                                        {
                                            "introduced": "6.1.0",
                                            "fixed": "6.1.6"
                                        },
                                        {
                                            "introduced": "6.2.0",
                                            "fixed": "6.2.5"
                                        },
                                        {
                                            "introduced": "6.3.0",
                                            "fixed": "6.3.3"
                                        },
                                        {
                                            "introduced": "6.4.0",
                                            "fixed": "6.4.2"
                                        },
                                        {
                                            "introduced": "7.0.0",
                                            "fixed": "7.0.2"
                                        },
                                        {
                                            "introduced": "7.1.0",
                                            "fixed": "7.1.2"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "8e82fc0a-56d0-b117-b508-0b435efcf36d",
                "child_id": "ebf4a2e0-d421-0ace-fee1-73ebbf000569",
                "id": "dac00e40-c1cc-419e-8727-e0a60a2534ec",
                "child": {
                    "id": "ebf4a2e0-d421-0ace-fee1-73ebbf000569",
                    "range": ">=1.6.x",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "24f18ce8-b8ef-4237-b745-7378ee4ef1fb",
                    "release": {
                        "id": "24f18ce8-b8ef-4237-b745-7378ee4ef1fb",
                        "version": "3.0.2",
                        "package": {
                            "name": "topojson",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "8e82fc0a-56d0-b117-b508-0b435efcf36d",
                "child_id": "e9c62c11-7e6f-a46f-9553-1b78e4981249",
                "id": "9ba44d3f-886e-4c8c-81bb-d37d10575f59",
                "child": {
                    "id": "e9c62c11-7e6f-a46f-9553-1b78e4981249",
                    "range": ">=0.8.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "a06de4e8-f267-4836-bc2e-38c54bc442eb",
                    "release": {
                        "id": "a06de4e8-f267-4836-bc2e-38c54bc442eb",
                        "version": "3.2.3",
                        "package": {
                            "name": "async",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "de2e897c-13bb-4e3a-b35a-872a3c39bfe3",
                                        "source_id": "GHSA-fwr7-v2mv-hh25",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": 7.8,
                                        "summary": "Prototype Pollution in async",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "2.0.0",
                                            "fixed": "2.6.4"
                                        },
                                        {
                                            "introduced": "3.0.0",
                                            "fixed": "3.2.2"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "faf861b0-c7ad-0ecb-caa9-a5ec9ed53900",
                "child_id": "fdca1cf2-2eaf-8f7a-b920-cbeaf1972333",
                "id": "34a67eb7-2295-4213-a436-5bed27db492a",
                "child": {
                    "id": "fdca1cf2-2eaf-8f7a-b920-cbeaf1972333",
                    "range": "0.1.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "ad411730-1d32-4f6d-a51f-ac1e65e73205",
                    "release": {
                        "id": "ad411730-1d32-4f6d-a51f-ac1e65e73205",
                        "version": "0.1.0",
                        "package": {
                            "name": "osenv",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "faf861b0-c7ad-0ecb-caa9-a5ec9ed53900",
                "child_id": "f9cc8aaa-e5eb-d0e6-0092-8384f8d1177d",
                "id": "279a5ef3-edb0-43b0-97de-90bcf471fc90",
                "child": {
                    "id": "f9cc8aaa-e5eb-d0e6-0092-8384f8d1177d",
                    "range": "~2.2.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "13ce85e4-dbb4-41bc-8639-1625dd1bde4f",
                    "release": {
                        "id": "13ce85e4-dbb4-41bc-8639-1625dd1bde4f",
                        "version": "2.2.8",
                        "package": {
                            "name": "rimraf",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "faf861b0-c7ad-0ecb-caa9-a5ec9ed53900",
                "child_id": "f920bf76-8e88-6d2e-67aa-799410a308f2",
                "id": "8ae0d1cb-cb59-4c26-8c22-813b263aa697",
                "child": {
                    "id": "f920bf76-8e88-6d2e-67aa-799410a308f2",
                    "range": "0.2.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "0aa07482-055d-487a-b364-33ebab867561",
                    "release": {
                        "id": "0aa07482-055d-487a-b364-33ebab867561",
                        "version": "0.2.0",
                        "package": {
                            "name": "promptly",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "faf861b0-c7ad-0ecb-caa9-a5ec9ed53900",
                "child_id": "f8e63a87-d8a2-bf20-d945-1082baae8321",
                "id": "bf1e8157-eb56-470a-8d01-936e393df708",
                "child": {
                    "id": "f8e63a87-d8a2-bf20-d945-1082baae8321",
                    "range": "~0.4.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "c46bf4ef-ba4e-4f7e-b84b-32400c3dc7cc",
                    "release": {
                        "id": "c46bf4ef-ba4e-4f7e-b84b-32400c3dc7cc",
                        "version": "0.4.0",
                        "package": {
                            "name": "bower-json",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "faf861b0-c7ad-0ecb-caa9-a5ec9ed53900",
                "child_id": "f2d6ed72-999b-6349-2d49-5e71c774cb63",
                "id": "70fa1aa7-4206-49b1-82d7-24b3a576bbaa",
                "child": {
                    "id": "f2d6ed72-999b-6349-2d49-5e71c774cb63",
                    "range": "~2.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "051fa825-1b2b-4e9b-8dc8-e6925f64317e",
                    "release": {
                        "id": "051fa825-1b2b-4e9b-8dc8-e6925f64317e",
                        "version": "2.0.0",
                        "package": {
                            "name": "handlebars",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "7b33da58-5bf9-4581-9d8e-20b775d24562",
                                        "source_id": "GHSA-fmr4-7g9q-7hc7",
                                        "source": "ghsa",
                                        "severity_name": null,
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
                                        "id": "47c8b46e-79af-4836-8cc4-f2ab154deb0f",
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
                                        "id": "0d4f5599-ff0f-43b0-9a87-4768fa869641",
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
                                        "id": "96fad321-dc50-4d67-ba23-ad3670a3a695",
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
                                        "id": "e4b24c69-4c5a-4e0d-b3e7-135712700ab4",
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
                                        "id": "f4c74857-1d54-4144-84d6-be5df95f1477",
                                        "source_id": "GHSA-q42p-pg8m-cqh6",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": 7.3,
                                        "summary": "Prototype Pollution in handlebars",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "3.0.7"
                                        },
                                        {
                                            "introduced": "4.0.0",
                                            "fixed": "4.0.14"
                                        },
                                        {
                                            "introduced": "4.1.0",
                                            "fixed": "4.1.2"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "45a813fb-c763-4aa1-b65c-3d36e8775253",
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
                                        "id": "936837e7-834b-4085-96ab-d0cb8c2568f3",
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
                                        "id": "cdb887e1-b63e-42fe-b7f1-25f84ebe5c86",
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
                                        "id": "61cfbbea-358a-4e8e-8b84-15919047f218",
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
                                        "id": "b03d099e-24a5-48f2-88b2-0159e458c8cf",
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
                                        "id": "fcfe4393-3b53-48e2-95eb-b138520d18f8",
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
                                        "id": "e8546e04-d477-46a9-aebe-8ca386d6d32e",
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
                "parent_id": "faf861b0-c7ad-0ecb-caa9-a5ec9ed53900",
                "child_id": "f09ff271-b7b9-776c-bc87-08f02dc80917",
                "id": "a873b3b3-1d67-4894-b8f6-a553187cf96b",
                "child": {
                    "id": "f09ff271-b7b9-776c-bc87-08f02dc80917",
                    "range": "0.5.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "2b88268e-858c-4cb0-8d15-534b0c4522a7",
                    "release": {
                        "id": "2b88268e-858c-4cb0-8d15-534b0c4522a7",
                        "version": "0.5.0",
                        "package": {
                            "name": "chalk",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "faf861b0-c7ad-0ecb-caa9-a5ec9ed53900",
                "child_id": "ecb44f65-845a-8a08-1761-37f43e72645c",
                "id": "ed61fe3a-7dee-4c92-ae09-d92d2c11ce65",
                "child": {
                    "id": "ecb44f65-845a-8a08-1761-37f43e72645c",
                    "range": "~2.42.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "56cb670e-21ac-4e96-a07a-dc3b684bbedb",
                    "release": {
                        "id": "56cb670e-21ac-4e96-a07a-dc3b684bbedb",
                        "version": "2.42.0",
                        "package": {
                            "name": "request",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "cd00cfb1-dc83-42ea-a085-a96275e22377",
                                        "source_id": "GHSA-7xfp-9c55-5vqj",
                                        "source": "ghsa",
                                        "severity_name": "Medium",
                                        "cvss_score": null,
                                        "summary": "Remote Memory Exposure in request",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "2.2.6",
                                            "fixed": "2.68.0"
                                        },
                                        {
                                            "introduced": "2.49.0",
                                            "fixed": "2.68.0"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "faf861b0-c7ad-0ecb-caa9-a5ec9ed53900",
                "child_id": "e49242dc-42c4-177f-6960-818a5627ff46",
                "id": "079e14d2-5c10-4388-825b-a162b9ce8d40",
                "child": {
                    "id": "e49242dc-42c4-177f-6960-818a5627ff46",
                    "range": "~1.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "fce03a31-0107-4905-923d-36c741e5a618",
                    "release": {
                        "id": "fce03a31-0107-4905-923d-36c741e5a618",
                        "version": "1.0.1",
                        "package": {
                            "name": "stringify-object",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "faf861b0-c7ad-0ecb-caa9-a5ec9ed53900",
                "child_id": "e19291e9-64b5-7157-96ba-86937acd6ab8",
                "id": "38a2cfce-ea8f-4c29-978e-90ac09dca7f8",
                "child": {
                    "id": "e19291e9-64b5-7157-96ba-86937acd6ab8",
                    "range": "0.1.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "1433cc07-1dd1-4db1-8808-c6c48b263679",
                    "release": {
                        "id": "1433cc07-1dd1-4db1-8808-c6c48b263679",
                        "version": "0.1.0",
                        "package": {
                            "name": "chmodr",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "faf861b0-c7ad-0ecb-caa9-a5ec9ed53900",
                "child_id": "d2ecb0b2-66cd-c8e7-4dfa-ae4bd77e86ba",
                "id": "64629a98-58f4-4575-941b-b209333f1f3c",
                "child": {
                    "id": "d2ecb0b2-66cd-c8e7-4dfa-ae4bd77e86ba",
                    "range": "0.3.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "8ecd31f7-3362-410a-ac0d-fa4a82908217",
                    "release": {
                        "id": "8ecd31f7-3362-410a-ac0d-fa4a82908217",
                        "version": "0.3.0",
                        "package": {
                            "name": "request-progress",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "faf861b0-c7ad-0ecb-caa9-a5ec9ed53900",
                "child_id": "cf15a087-aac8-0c30-4201-b56454b465ee",
                "id": "db39f1e0-d0b3-42de-9870-192fedb4f639",
                "child": {
                    "id": "cf15a087-aac8-0c30-4201-b56454b465ee",
                    "range": "0.1.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "07e788b6-e367-4d30-b756-c3fb5a39d135",
                    "release": {
                        "id": "07e788b6-e367-4d30-b756-c3fb5a39d135",
                        "version": "0.1.0",
                        "package": {
                            "name": "p-throttler",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "faf861b0-c7ad-0ecb-caa9-a5ec9ed53900",
                "child_id": "ceffa740-00f6-696e-388a-a725266f11f8",
                "id": "5f36e1c5-eb02-4b83-82cc-d8149481f648",
                "child": {
                    "id": "ceffa740-00f6-696e-388a-a725266f11f8",
                    "range": "~1.0.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "6b7691a3-4a68-412d-ab8f-d16cf5725a02",
                    "release": {
                        "id": "6b7691a3-4a68-412d-ab8f-d16cf5725a02",
                        "version": "1.0.5",
                        "package": {
                            "name": "fstream-ignore",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "faf861b0-c7ad-0ecb-caa9-a5ec9ed53900",
                "child_id": "ce364168-c213-0986-1ded-5cc1473a6631",
                "id": "a7421641-d910-4db0-af55-e8bd4ce88fe3",
                "child": {
                    "id": "ce364168-c213-0986-1ded-5cc1473a6631",
                    "range": "~1.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "914827f6-82ed-47c4-a3a1-62c3a88ba068",
                    "release": {
                        "id": "914827f6-82ed-47c4-a3a1-62c3a88ba068",
                        "version": "1.0.2",
                        "package": {
                            "name": "opn",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "faf861b0-c7ad-0ecb-caa9-a5ec9ed53900",
                "child_id": "b67e647a-0093-333c-17e1-786ca5008ec6",
                "id": "d9a8016e-cb81-4923-bdb2-085b8aa155db",
                "child": {
                    "id": "b67e647a-0093-333c-17e1-786ca5008ec6",
                    "range": "~2.3.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "cb5e4e15-22dd-4094-9b0f-1f8ae03e2a29",
                    "release": {
                        "id": "cb5e4e15-22dd-4094-9b0f-1f8ae03e2a29",
                        "version": "2.3.2",
                        "package": {
                            "name": "semver",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "d32467a3-d773-4248-8959-296be4df611d",
                                        "source_id": "GHSA-x6fg-f45m-jf5q",
                                        "source": "ghsa",
                                        "severity_name": null,
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
                "parent_id": "faf861b0-c7ad-0ecb-caa9-a5ec9ed53900",
                "child_id": "b580b111-aed3-853f-aa35-3f6e3d5d6db9",
                "id": "89b6b27b-c3c8-4edd-a2a4-f7fa0d784bb2",
                "child": {
                    "id": "b580b111-aed3-853f-aa35-3f6e3d5d6db9",
                    "range": "~0.9.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "e348dba1-8aad-4b77-a8ab-49ac4454a4f5",
                    "release": {
                        "id": "e348dba1-8aad-4b77-a8ab-49ac4454a4f5",
                        "version": "0.9.1",
                        "package": {
                            "name": "mout",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "4be4c6d9-d27c-434a-a5d5-c0f4d21c3e4a",
                                        "source_id": "GHSA-vvv8-xw5f-3f88",
                                        "source": "ghsa",
                                        "severity_name": null,
                                        "cvss_score": 7.5,
                                        "summary": "Prototype Pollution in mout",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": null
                                        },
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": null
                                        },
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": null
                                        },
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": null
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "522126c3-d3e3-48b3-90d4-18fbed703744",
                                        "source_id": "GHSA-pc58-wgmc-hfjr",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": 7.5,
                                        "summary": "Prototype Pollution in mout",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "1.2.3"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "faf861b0-c7ad-0ecb-caa9-a5ec9ed53900",
                "child_id": "aec82ef4-84da-6be0-4385-f8e24f32f75f",
                "id": "7c16e117-f4e2-4d57-946a-3f08081da561",
                "child": {
                    "id": "aec82ef4-84da-6be0-4385-f8e24f32f75f",
                    "range": "~4.0.2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "abba2d9f-44f4-4c7e-87f2-9420e048866a",
                    "release": {
                        "id": "abba2d9f-44f4-4c7e-87f2-9420e048866a",
                        "version": "4.0.6",
                        "package": {
                            "name": "glob",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "faf861b0-c7ad-0ecb-caa9-a5ec9ed53900",
                "child_id": "91ee4fb4-2666-0d8f-8b9a-d85f6901db9a",
                "id": "6b1fc5ec-4b70-44b5-92ec-ccbe0e76d666",
                "child": {
                    "id": "91ee4fb4-2666-0d8f-8b9a-d85f6901db9a",
                    "range": "0.2.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "71489590-dff6-40e2-9961-6aefed530e68",
                    "release": {
                        "id": "71489590-dff6-40e2-9961-6aefed530e68",
                        "version": "0.2.0",
                        "package": {
                            "name": "update-notifier",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "faf861b0-c7ad-0ecb-caa9-a5ec9ed53900",
                "child_id": "9172b009-cdfb-385e-a98c-2931a60188a6",
                "id": "121a3b45-b4c1-4558-a318-c782fb81bb3e",
                "child": {
                    "id": "9172b009-cdfb-385e-a98c-2931a60188a6",
                    "range": "0.7.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "801f88aa-9a60-498e-acc1-460defd1c8ce",
                    "release": {
                        "id": "801f88aa-9a60-498e-acc1-460defd1c8ce",
                        "version": "0.7.1",
                        "package": {
                            "name": "inquirer",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "faf861b0-c7ad-0ecb-caa9-a5ec9ed53900",
                "child_id": "84ff66c3-ffa9-a044-5cd3-88504a556b6d",
                "id": "d9f720ef-b3c9-4e67-b60e-0fbbb5a54aac",
                "child": {
                    "id": "84ff66c3-ffa9-a044-5cd3-88504a556b6d",
                    "range": "0.6.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "fc771725-700c-4d32-9e4d-3a5e74d9b63f",
                    "release": {
                        "id": "fc771725-700c-4d32-9e4d-3a5e74d9b63f",
                        "version": "0.6.0",
                        "package": {
                            "name": "retry",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "faf861b0-c7ad-0ecb-caa9-a5ec9ed53900",
                "child_id": "6c1e9ceb-61c5-dfc8-d270-394b4903bb35",
                "id": "77c711f3-1b79-4433-8720-11243621d600",
                "child": {
                    "id": "6c1e9ceb-61c5-dfc8-d270-394b4903bb35",
                    "range": "~1.0.2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "fa250e3e-6137-4b1d-84fb-922e781b40b2",
                    "release": {
                        "id": "fa250e3e-6137-4b1d-84fb-922e781b40b2",
                        "version": "1.0.12",
                        "package": {
                            "name": "fstream",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "57ca188d-5cf4-4508-b0cd-c523fca10d82",
                                        "source_id": "GHSA-xf7w-r453-m56c",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": 7.5,
                                        "summary": "Arbitrary File Overwrite in fstream",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "1.0.12"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "faf861b0-c7ad-0ecb-caa9-a5ec9ed53900",
                "child_id": "6a812a6f-f4d2-5d71-952f-b83a6312436e",
                "id": "fc291ad0-62ed-4613-b4a1-d8353f619954",
                "child": {
                    "id": "6a812a6f-f4d2-5d71-952f-b83a6312436e",
                    "range": "0.4.3",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "ecf9adb5-29b8-4c13-a948-c7b68813231d",
                    "release": {
                        "id": "ecf9adb5-29b8-4c13-a948-c7b68813231d",
                        "version": "0.4.3",
                        "package": {
                            "name": "insight",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "faf861b0-c7ad-0ecb-caa9-a5ec9ed53900",
                "child_id": "61501349-f844-cc8f-ac62-93a249cac0a3",
                "id": "1009e44f-79b4-4877-9be5-cb9cd8cb2afd",
                "child": {
                    "id": "61501349-f844-cc8f-ac62-93a249cac0a3",
                    "range": "~1.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "23ec01b9-a700-406a-a159-388e1e9d30bc",
                    "release": {
                        "id": "23ec01b9-a700-406a-a159-388e1e9d30bc",
                        "version": "1.0.3",
                        "package": {
                            "name": "junk",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "faf861b0-c7ad-0ecb-caa9-a5ec9ed53900",
                "child_id": "606fbee6-8882-2fa1-90ec-ce42a0c2ee91",
                "id": "9b16cac8-9a36-45bc-93b8-3ad83fa31447",
                "child": {
                    "id": "606fbee6-8882-2fa1-90ec-ce42a0c2ee91",
                    "range": "~0.2.2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "f3adbb7f-4c04-4198-8750-8b636024fe56",
                    "release": {
                        "id": "f3adbb7f-4c04-4198-8750-8b636024fe56",
                        "version": "0.2.2",
                        "package": {
                            "name": "bower-endpoint-parser",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "faf861b0-c7ad-0ecb-caa9-a5ec9ed53900",
                "child_id": "5c994d00-36ff-eb6d-0801-c461744df79a",
                "id": "96f10d34-9857-46b7-b0fe-2531f4df5c15",
                "child": {
                    "id": "5c994d00-36ff-eb6d-0801-c461744df79a",
                    "range": "~0.2.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "c988d9a2-8c7b-47a0-9468-36e20705d163",
                    "release": {
                        "id": "c988d9a2-8c7b-47a0-9468-36e20705d163",
                        "version": "0.2.4",
                        "package": {
                            "name": "bower-registry-client",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "faf861b0-c7ad-0ecb-caa9-a5ec9ed53900",
                "child_id": "5a695773-727b-499a-47e5-d265d38bb107",
                "id": "5f6c2076-81a2-4388-b688-50f77ce90d4a",
                "child": {
                    "id": "5a695773-727b-499a-47e5-d265d38bb107",
                    "range": "~1.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "7dfb9e9f-ae41-472c-ac89-cc40980a8f56",
                    "release": {
                        "id": "7dfb9e9f-ae41-472c-ac89-cc40980a8f56",
                        "version": "1.0.0",
                        "package": {
                            "name": "is-root",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "faf861b0-c7ad-0ecb-caa9-a5ec9ed53900",
                "child_id": "58d3e41b-34df-f01d-3c0d-b83e03403ff7",
                "id": "f7bcb525-da57-4ce6-b2f8-243a7b2502a3",
                "child": {
                    "id": "58d3e41b-34df-f01d-3c0d-b83e03403ff7",
                    "range": "0.5.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "e6e2ce2e-e229-4790-883a-8688d105fe1b",
                    "release": {
                        "id": "e6e2ce2e-e229-4790-883a-8688d105fe1b",
                        "version": "0.5.0",
                        "package": {
                            "name": "mkdirp",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "faf861b0-c7ad-0ecb-caa9-a5ec9ed53900",
                "child_id": "5650c867-f843-a34b-76a9-0f47c870360e",
                "id": "49421ffd-4ea6-4209-9a3c-a4602c4b2406",
                "child": {
                    "id": "5650c867-f843-a34b-76a9-0f47c870360e",
                    "range": "0.4.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "fad6ca9e-be1a-4b17-8f0d-b7cad3d5fe8b",
                    "release": {
                        "id": "fad6ca9e-be1a-4b17-8f0d-b7cad3d5fe8b",
                        "version": "0.4.0",
                        "package": {
                            "name": "cardinal",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "faf861b0-c7ad-0ecb-caa9-a5ec9ed53900",
                "child_id": "4c562b2e-c413-29cb-fa34-28b2567d3a2b",
                "id": "b675735d-dbce-4bc9-b54c-6abe6181730d",
                "child": {
                    "id": "4c562b2e-c413-29cb-fa34-28b2567d3a2b",
                    "range": "~1.0.5",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "3b7d54cc-7cb4-4f5f-855f-a3ec489ef777",
                    "release": {
                        "id": "3b7d54cc-7cb4-4f5f-855f-a3ec489ef777",
                        "version": "1.0.9",
                        "package": {
                            "name": "which",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "faf861b0-c7ad-0ecb-caa9-a5ec9ed53900",
                "child_id": "3d9af5e9-4e06-0d2b-027b-ab0f64accd99",
                "id": "d382f521-aac7-41ba-bd52-5bf7704a1ea1",
                "child": {
                    "id": "3d9af5e9-4e06-0d2b-027b-ab0f64accd99",
                    "range": "~3.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "a17e9c63-52d9-4ba2-8489-825ce00aba69",
                    "release": {
                        "id": "a17e9c63-52d9-4ba2-8489-825ce00aba69",
                        "version": "3.0.6",
                        "package": {
                            "name": "nopt",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "faf861b0-c7ad-0ecb-caa9-a5ec9ed53900",
                "child_id": "3b673881-b05f-5609-cf33-d49c3e03d7eb",
                "id": "97f4d171-9809-4999-bc50-6698c0a5424a",
                "child": {
                    "id": "3b673881-b05f-5609-cf33-d49c3e03d7eb",
                    "range": "~1.4.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "876db3bb-2aea-4ad3-9d54-07d490e5a58f",
                    "release": {
                        "id": "876db3bb-2aea-4ad3-9d54-07d490e5a58f",
                        "version": "1.4.3",
                        "package": {
                            "name": "shell-quote",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "da2365d1-568b-4e3f-ab73-2ecafdba0523",
                                        "source_id": "GHSA-qg8p-v9q4-gh34",
                                        "source": "ghsa",
                                        "severity_name": "Critical",
                                        "cvss_score": null,
                                        "summary": "Potential Command Injection in shell-quote",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "1.6.1"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "c9033e09-907a-48e4-9b98-c211fa7cff5b",
                                        "source_id": "GHSA-g4rg-993r-mgx7",
                                        "source": "ghsa",
                                        "severity_name": "Critical",
                                        "cvss_score": 9.8,
                                        "summary": "Improper Neutralization of Special Elements used in a Command in Shell-quote",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "1.7.3"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "faf861b0-c7ad-0ecb-caa9-a5ec9ed53900",
                "child_id": "39cea088-a9f3-7588-3c58-2fbc01d817dd",
                "id": "e9c116b0-830a-4c4f-808f-81decf61fd29",
                "child": {
                    "id": "39cea088-a9f3-7588-3c58-2fbc01d817dd",
                    "range": "~3.0.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "f062020c-ca5f-46f2-8544-2d217bc1988b",
                    "release": {
                        "id": "f062020c-ca5f-46f2-8544-2d217bc1988b",
                        "version": "3.0.12",
                        "package": {
                            "name": "graceful-fs",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "faf861b0-c7ad-0ecb-caa9-a5ec9ed53900",
                "child_id": "378bace8-c0d8-6338-75c9-2309608b99e2",
                "id": "750302c7-7ae7-4f10-857f-43cb84e7e37e",
                "child": {
                    "id": "378bace8-c0d8-6338-75c9-2309608b99e2",
                    "range": "0.0.23",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "94a934f1-8577-4bb4-be78-df236d065224",
                    "release": {
                        "id": "94a934f1-8577-4bb4-be78-df236d065224",
                        "version": "0.0.23",
                        "package": {
                            "name": "tmp",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "faf861b0-c7ad-0ecb-caa9-a5ec9ed53900",
                "child_id": "31c20ec1-6a39-f436-a5d9-e33bdabd09d8",
                "id": "ddf8dd40-3839-44ad-a66e-36549d22db33",
                "child": {
                    "id": "31c20ec1-6a39-f436-a5d9-e33bdabd09d8",
                    "range": "~1.0.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "266acb62-b87b-4134-87b8-d880097c5f88",
                    "release": {
                        "id": "266acb62-b87b-4134-87b8-d880097c5f88",
                        "version": "1.0.1",
                        "package": {
                            "name": "q",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "faf861b0-c7ad-0ecb-caa9-a5ec9ed53900",
                "child_id": "2e171d4b-5a5a-0c6f-a91d-ae2739396207",
                "id": "2b7565b8-bf49-4c50-bfd0-15682bcf28cc",
                "child": {
                    "id": "2e171d4b-5a5a-0c6f-a91d-ae2739396207",
                    "range": "~0.5.2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "c00da22d-d774-4ad8-96e2-9c66a708e201",
                    "release": {
                        "id": "c00da22d-d774-4ad8-96e2-9c66a708e201",
                        "version": "0.5.3",
                        "package": {
                            "name": "bower-config",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "faf861b0-c7ad-0ecb-caa9-a5ec9ed53900",
                "child_id": "24250622-2f93-4063-2748-4ccabfd0a3f8",
                "id": "81e4e68c-5ec3-439d-be57-7ce92ad7552d",
                "child": {
                    "id": "24250622-2f93-4063-2748-4ccabfd0a3f8",
                    "range": "0.5.2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "6b2725be-3d87-4a03-aace-37e987599380",
                    "release": {
                        "id": "6b2725be-3d87-4a03-aace-37e987599380",
                        "version": "0.5.2",
                        "package": {
                            "name": "tar-fs",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "3075de86-24dd-46b4-b886-5fe2ce23a9f1",
                                        "source_id": "GHSA-x2mc-8fgj-3wmr",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": 7.5,
                                        "summary": "Improper Input Validation in tar-fs",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "1.16.2"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "faf861b0-c7ad-0ecb-caa9-a5ec9ed53900",
                "child_id": "2288f61f-e549-b33f-dc9c-de1a2e1cc38d",
                "id": "6ae83549-c48a-4d66-adf2-d6dfb31acf5f",
                "child": {
                    "id": "2288f61f-e549-b33f-dc9c-de1a2e1cc38d",
                    "range": "0.0.8",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "7d32cc16-1dcc-4ffa-822b-0c63d656a716",
                    "release": {
                        "id": "7d32cc16-1dcc-4ffa-822b-0c63d656a716",
                        "version": "0.0.8",
                        "package": {
                            "name": "decompress-zip",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "d5e6fa09-d46e-4bcc-a550-d72ea3039819",
                                        "source_id": "GHSA-73v8-v6g4-vrpm",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": null,
                                        "summary": "Arbitrary File Overwrite in decompress-zip",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "0.2.2"
                                        },
                                        {
                                            "introduced": "0.3.0",
                                            "fixed": "0.3.2"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "faf861b0-c7ad-0ecb-caa9-a5ec9ed53900",
                "child_id": "1d883a78-7877-4576-bfc5-98956163cad3",
                "id": "9c22ab35-6d90-45f3-80ec-e8f5d90b86fd",
                "child": {
                    "id": "1d883a78-7877-4576-bfc5-98956163cad3",
                    "range": "0.0.2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "c58805dc-cb42-4766-8918-4d29f78728be",
                    "release": {
                        "id": "c58805dc-cb42-4766-8918-4d29f78728be",
                        "version": "0.0.2",
                        "package": {
                            "name": "archy",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "faf861b0-c7ad-0ecb-caa9-a5ec9ed53900",
                "child_id": "193f5671-c400-8530-2c6b-a51039d84e34",
                "id": "38a572a9-fdfc-4080-9460-6ffa07a2dfec",
                "child": {
                    "id": "193f5671-c400-8530-2c6b-a51039d84e34",
                    "range": "~1.0.4",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "02932df7-5ddc-4cba-a7c3-d688999f561a",
                    "release": {
                        "id": "02932df7-5ddc-4cba-a7c3-d688999f561a",
                        "version": "1.0.9",
                        "package": {
                            "name": "abbrev",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "faf861b0-c7ad-0ecb-caa9-a5ec9ed53900",
                "child_id": "16487cfd-be27-bcd0-85d8-2c616b66fc4f",
                "id": "f06e6837-272d-457c-862c-0215bdf2b119",
                "child": {
                    "id": "16487cfd-be27-bcd0-85d8-2c616b66fc4f",
                    "range": "~0.2.2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "34d01d1b-7b14-44f8-8c84-eabcc544f9ec",
                    "release": {
                        "id": "34d01d1b-7b14-44f8-8c84-eabcc544f9ec",
                        "version": "0.2.2",
                        "package": {
                            "name": "bower-logger",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "faf861b0-c7ad-0ecb-caa9-a5ec9ed53900",
                "child_id": "0bf23f43-ebe0-99c3-e790-73cd8c3a47ed",
                "id": "e9e13d09-1a40-4df3-9e44-7456f3559373",
                "child": {
                    "id": "0bf23f43-ebe0-99c3-e790-73cd8c3a47ed",
                    "range": "~1.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "63627ffd-fa73-44d3-9660-71f84ff6ca06",
                    "release": {
                        "id": "63627ffd-fa73-44d3-9660-71f84ff6ca06",
                        "version": "1.0.4",
                        "package": {
                            "name": "lockfile",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "faf861b0-c7ad-0ecb-caa9-a5ec9ed53900",
                "child_id": "09383a29-7983-c718-ce6b-43cdda0351b6",
                "id": "4d824cc0-e3ea-44e2-b80f-6ecf59e017b0",
                "child": {
                    "id": "09383a29-7983-c718-ce6b-43cdda0351b6",
                    "range": "~2.5.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "77f6e549-1522-44ae-a153-42419455ccc6",
                    "release": {
                        "id": "77f6e549-1522-44ae-a153-42419455ccc6",
                        "version": "2.5.2",
                        "package": {
                            "name": "lru-cache",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "0adec263-926b-8489-66ec-778e58f56612",
                "child_id": "f213d577-1461-6e39-cd4d-4e32975b992a",
                "id": "91b253a9-b6fe-458e-b555-09c63d080e93",
                "child": {
                    "id": "f213d577-1461-6e39-cd4d-4e32975b992a",
                    "range": "~0.1.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "22c2d451-f5f9-4260-9c49-2b8b6823cd2c",
                    "release": {
                        "id": "22c2d451-f5f9-4260-9c49-2b8b6823cd2c",
                        "version": "0.1.0",
                        "package": {
                            "name": "generic-pool-redux",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "0adec263-926b-8489-66ec-778e58f56612",
                "child_id": "f068c227-280a-01f3-cdb1-b15ab40f3785",
                "id": "abf46805-5ce9-4d52-9383-e79cd87bd42c",
                "child": {
                    "id": "f068c227-280a-01f3-cdb1-b15ab40f3785",
                    "range": "~0.13.2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "927341b3-1d23-47bd-a89a-2601680de3b9",
                    "release": {
                        "id": "927341b3-1d23-47bd-a89a-2601680de3b9",
                        "version": "0.13.6",
                        "package": {
                            "name": "liftoff",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "0adec263-926b-8489-66ec-778e58f56612",
                "child_id": "b04bf441-4fce-5dd6-6d63-72bfa17372ba",
                "id": "6dda1835-47a6-4031-8a0f-52dba5ee004c",
                "child": {
                    "id": "b04bf441-4fce-5dd6-6d63-72bfa17372ba",
                    "range": "~2.4.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "2b29afdf-6ff4-40c3-972e-27d726a04ab9",
                    "release": {
                        "id": "2b29afdf-6ff4-40c3-972e-27d726a04ab9",
                        "version": "2.4.2",
                        "package": {
                            "name": "lodash",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "ec3a4329-493a-432c-b340-44eb59a7f111",
                                        "source_id": "GHSA-jf85-cpcp-j695",
                                        "source": "ghsa",
                                        "severity_name": "Critical",
                                        "cvss_score": 9.1,
                                        "summary": "Prototype Pollution in lodash",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "4.17.12"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "9cb1d5ac-9802-42de-8f74-7ee219eb30ae",
                                        "source_id": "GHSA-4xc9-xhrj-v574",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": null,
                                        "summary": "Prototype Pollution in lodash",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "4.17.11"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "4d4be38d-1e7f-41d3-8a43-ec1ff19dfe5c",
                                        "source_id": "GHSA-x5rq-j2xg-h7qm",
                                        "source": "ghsa",
                                        "severity_name": "Medium",
                                        "cvss_score": null,
                                        "summary": "Regular Expression Denial of Service (ReDoS) in lodash",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "4.17.11"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "4565e95f-8f85-4374-a638-8556e20430de",
                                        "source_id": "GHSA-fvqr-27wr-82fm",
                                        "source": "ghsa",
                                        "severity_name": "Low",
                                        "cvss_score": null,
                                        "summary": "Prototype Pollution in lodash",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "4.17.5"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "ddbcb8d9-a3fe-4e43-b88a-8498b45c2f59",
                                        "source_id": "GHSA-35jh-r3h4-6jhm",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": 7.2,
                                        "summary": "Command Injection in lodash",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "4.17.21"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "7f704fd4-a981-451e-bd29-2fb74a296b5f",
                                        "source_id": "GHSA-p6mc-m468-83gw",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": 7.4,
                                        "summary": "Prototype Pollution in lodash",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "4.17.20"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "649a016e-2205-428e-95e7-41d4e2511ffd",
                                        "source_id": "GHSA-8p5q-j9m2-g8wr",
                                        "source": "ghsa",
                                        "severity_name": "Low",
                                        "cvss_score": 9.8,
                                        "summary": "Withdrawn: Arbitrary code execution in lodash",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": null
                                        },
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": null
                                        },
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": null
                                        },
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": null
                                        },
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": null
                                        },
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": null
                                        },
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": null
                                        },
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": null
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "3c05bb46-4b73-4863-a45e-e6ea8c45379b",
                                        "source_id": "GHSA-29mw-wpgm-hmr9",
                                        "source": "ghsa",
                                        "severity_name": "Medium",
                                        "cvss_score": 5.3,
                                        "summary": "Regular Expression Denial of Service (ReDoS) in lodash",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "4.17.21"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "0adec263-926b-8489-66ec-778e58f56612",
                "child_id": "ae4d2d55-b56a-58ee-c94e-2e1fa9462680",
                "id": "8f76c035-f4ef-4021-a2c9-cda806995627",
                "child": {
                    "id": "ae4d2d55-b56a-58ee-c94e-2e1fa9462680",
                    "range": "^0.5.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "baadfbde-755c-42f2-998e-0316d739646c",
                    "release": {
                        "id": "baadfbde-755c-42f2-998e-0316d739646c",
                        "version": "0.5.6",
                        "package": {
                            "name": "mkdirp",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "0adec263-926b-8489-66ec-778e58f56612",
                "child_id": "902f9355-b7dc-aa3e-633e-b81c047e1f37",
                "id": "ee65c7dc-f814-41d6-be5f-bc9330f59b67",
                "child": {
                    "id": "902f9355-b7dc-aa3e-633e-b81c047e1f37",
                    "range": "~1.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "142f8244-d44b-4f10-99ca-d2bae17db776",
                    "release": {
                        "id": "142f8244-d44b-4f10-99ca-d2bae17db776",
                        "version": "1.0.0",
                        "package": {
                            "name": "tildify",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "0adec263-926b-8489-66ec-778e58f56612",
                "child_id": "7a0711c0-b390-bd6c-1ec4-0a90052a6e1e",
                "id": "433db360-b353-4436-af37-02ea0174a042",
                "child": {
                    "id": "7a0711c0-b390-bd6c-1ec4-0a90052a6e1e",
                    "range": "2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "800de5fb-d028-45db-b4b9-670e84177edf",
                    "release": {
                        "id": "800de5fb-d028-45db-b4b9-670e84177edf",
                        "version": "2.20.3",
                        "package": {
                            "name": "commander",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "0adec263-926b-8489-66ec-778e58f56612",
                "child_id": "60f76259-b68a-c76f-0357-cc0f686f84a4",
                "id": "fce4cb40-ee00-4eb0-bdf9-255272b82ebb",
                "child": {
                    "id": "60f76259-b68a-c76f-0357-cc0f686f84a4",
                    "range": "^2.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "2bc1c9ef-d402-42b2-aa11-773c1e77d402",
                    "release": {
                        "id": "2bc1c9ef-d402-42b2-aa11-773c1e77d402",
                        "version": "2.11.0",
                        "package": {
                            "name": "bluebird",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "0adec263-926b-8489-66ec-778e58f56612",
                "child_id": "48b522b9-45b0-0efb-9269-9de40666cee0",
                "id": "2d98097e-5bf7-4c5b-8faa-1970fcbecd94",
                "child": {
                    "id": "48b522b9-45b0-0efb-9269-9de40666cee0",
                    "range": "^2.0.3",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "47eeabb9-0f9c-42ac-933c-0e1fe5154350",
                    "release": {
                        "id": "47eeabb9-0f9c-42ac-933c-0e1fe5154350",
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
                "parent_id": "0adec263-926b-8489-66ec-778e58f56612",
                "child_id": "37a10d91-acbd-788e-6477-ac59449847af",
                "id": "500f156c-efb2-4210-8eeb-fdd7ad1233f3",
                "child": {
                    "id": "37a10d91-acbd-788e-6477-ac59449847af",
                    "range": "~0.5.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "c6e6fb9a-329b-441c-879d-e1364d7203a9",
                    "release": {
                        "id": "c6e6fb9a-329b-441c-879d-e1364d7203a9",
                        "version": "0.5.1",
                        "package": {
                            "name": "chalk",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "0adec263-926b-8489-66ec-778e58f56612",
                "child_id": "2d441d65-302d-c4db-3d2d-3431a738dcd1",
                "id": "c246b9c9-341c-49ed-891f-8826abc9f89d",
                "child": {
                    "id": "2d441d65-302d-c4db-3d2d-3431a738dcd1",
                    "range": "^1.1.12",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "4054d042-b5d3-4cee-abc4-3e1cb11052c3",
                    "release": {
                        "id": "4054d042-b5d3-4cee-abc4-3e1cb11052c3",
                        "version": "1.1.14",
                        "package": {
                            "name": "readable-stream",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "0adec263-926b-8489-66ec-778e58f56612",
                "child_id": "263e665d-fdb3-7dfd-6333-444bd816e8c1",
                "id": "7f20b50e-ac4d-454b-b7f5-288825b1c3e5",
                "child": {
                    "id": "263e665d-fdb3-7dfd-6333-444bd816e8c1",
                    "range": "~1.1.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "b14a580e-d60b-40b7-b21d-553417d34fbd",
                    "release": {
                        "id": "b14a580e-d60b-40b7-b21d-553417d34fbd",
                        "version": "1.1.3",
                        "package": {
                            "name": "minimist",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "7c707cae-b730-46eb-94c3-813a8857ed93",
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
                                        "id": "6eaca9bb-8cf3-4f8a-9915-5b3e1d3bec0a",
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
                                        "id": "176f6c35-d07c-4086-a8a8-d9bbe97eb53c",
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
                "parent_id": "0adec263-926b-8489-66ec-778e58f56612",
                "child_id": "062ae1f0-dcac-6fc1-22b2-26fe7557deee",
                "id": "76c3f1f7-0bad-4436-afb9-d6b4f3f2e5c4",
                "child": {
                    "id": "062ae1f0-dcac-6fc1-22b2-26fe7557deee",
                    "range": "^0.3.2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "dad4b1b6-a2e0-49ba-a6a0-cc8ce80d4187",
                    "release": {
                        "id": "dad4b1b6-a2e0-49ba-a6a0-cc8ce80d4187",
                        "version": "0.3.10",
                        "package": {
                            "name": "interpret",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "e5f61fc5-00fd-1afb-df90-245c955b6f3e",
                "child_id": "baf87905-642b-6ab9-4e67-ef5b1145d25d",
                "id": "d71dc2a2-fc0e-427d-bd7d-b6d83256497d",
                "child": {
                    "id": "baf87905-642b-6ab9-4e67-ef5b1145d25d",
                    "range": "0.1.x",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "c78068a5-80d3-4c3b-ba60-8b148a3e5b00",
                    "release": {
                        "id": "c78068a5-80d3-4c3b-ba60-8b148a3e5b00",
                        "version": "0.1.0",
                        "package": {
                            "name": "keypress",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "cbc987de-101a-ad7c-cd89-6b780490c719",
                "child_id": "b5e057bc-7166-187e-8ec9-152bcf4d62ac",
                "id": "4fc39719-bf8f-4a6a-8d74-e7620b1dc506",
                "child": {
                    "id": "b5e057bc-7166-187e-8ec9-152bcf4d62ac",
                    "range": "*",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "5632676e-8b96-47d5-b68b-e0568245d42a",
                    "release": {
                        "id": "5632676e-8b96-47d5-b68b-e0568245d42a",
                        "version": "4.3.4",
                        "package": {
                            "name": "debug",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "b3306022-4834-4e54-a45d-2f2397bbbe94",
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
                "parent_id": "cbc987de-101a-ad7c-cd89-6b780490c719",
                "child_id": "70ed664e-0022-9811-95e4-463c094ea464",
                "id": "9c11e713-b784-46bc-a3a1-d3df89c9f540",
                "child": {
                    "id": "70ed664e-0022-9811-95e4-463c094ea464",
                    "range": "~1.2.9",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "44e95430-4cbe-4df5-9170-0a8fa90ebf81",
                    "release": {
                        "id": "44e95430-4cbe-4df5-9170-0a8fa90ebf81",
                        "version": "1.2.11",
                        "package": {
                            "name": "mime",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "3e108104-0435-4123-a85b-6db0e6ea1403",
                                        "source_id": "GHSA-wrvr-8mpx-r7pp",
                                        "source": "ghsa",
                                        "severity_name": "Medium",
                                        "cvss_score": null,
                                        "summary": "mime Regular Expression Denial of Service when mime lookup performed on untrusted user input",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "1.4.1"
                                        },
                                        {
                                            "introduced": "2.0.0",
                                            "fixed": "2.0.3"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "cbc987de-101a-ad7c-cd89-6b780490c719",
                "child_id": "51264937-b775-dbe9-f059-a1e5f0350bb0",
                "id": "267d0e29-58d5-4d19-ac7e-9024065135e6",
                "child": {
                    "id": "51264937-b775-dbe9-f059-a1e5f0350bb0",
                    "range": "0.0.4",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "1fd5d97b-731b-4bbb-a755-419a1b8f7aee",
                    "release": {
                        "id": "1fd5d97b-731b-4bbb-a755-419a1b8f7aee",
                        "version": "0.0.4",
                        "package": {
                            "name": "range-parser",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "cbc987de-101a-ad7c-cd89-6b780490c719",
                "child_id": "281d0fe3-f1ad-f762-180e-1424ddd33374",
                "id": "44464e0b-6eff-40d0-87cd-ab3b4eedd5a8",
                "child": {
                    "id": "281d0fe3-f1ad-f762-180e-1424ddd33374",
                    "range": "0.2.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "a192151b-058e-4211-9020-5a2460521f47",
                    "release": {
                        "id": "a192151b-058e-4211-9020-5a2460521f47",
                        "version": "0.2.0",
                        "package": {
                            "name": "fresh",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "5e0c7c52-9c18-4469-a21a-86d7a813bd1b",
                                        "source_id": "GHSA-9qj9-36jm-prpv",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": null,
                                        "summary": "Regular Expression Denial of Service in fresh",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "0.5.2"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "8a3e513f-2fe7-a1e7-812f-05048b5a56f5",
                "child_id": "ecfcf2a3-fdf6-f507-251a-6f6828f046da",
                "id": "5fd14a11-f241-4aad-9d88-e4b9a6fd52af",
                "child": {
                    "id": "ecfcf2a3-fdf6-f507-251a-6f6828f046da",
                    "range": "0.3.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "f6c3216d-8674-4afb-b179-5194d6ca52dc",
                    "release": {
                        "id": "f6c3216d-8674-4afb-b179-5194d6ca52dc",
                        "version": "0.3.0",
                        "package": {
                            "name": "negotiator",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "0c9d7079-821f-4bc2-8277-09397c73507a",
                                        "source_id": "GHSA-7mc5-chhp-fmc3",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": null,
                                        "summary": "Regular Expression Denial of Service in negotiator",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "0.6.1"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "8a3e513f-2fe7-a1e7-812f-05048b5a56f5",
                "child_id": "d74c8bf0-9287-3fc2-105c-7bd5205bf9d4",
                "id": "e40587cc-7d12-4225-bb11-87d82ae5a029",
                "child": {
                    "id": "d74c8bf0-9287-3fc2-105c-7bd5205bf9d4",
                    "range": "0.0.1",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "ce599d10-bc61-4015-a302-faf650e4c363",
                    "release": {
                        "id": "ce599d10-bc61-4015-a302-faf650e4c363",
                        "version": "0.0.1",
                        "package": {
                            "name": "pause",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "8a3e513f-2fe7-a1e7-812f-05048b5a56f5",
                "child_id": "cdd7579f-8afa-5af6-d183-e60f4fa6dee3",
                "id": "04db97ca-d598-4fea-a660-0323ba48079b",
                "child": {
                    "id": "cdd7579f-8afa-5af6-d183-e60f4fa6dee3",
                    "range": "0.1.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "9b0e6f09-ba53-4a1d-8bf6-a2745acac502",
                    "release": {
                        "id": "9b0e6f09-ba53-4a1d-8bf6-a2745acac502",
                        "version": "0.1.0",
                        "package": {
                            "name": "cookie",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "8a3e513f-2fe7-a1e7-812f-05048b5a56f5",
                "child_id": "cbc987de-101a-ad7c-cd89-6b780490c719",
                "id": "cf1ea7cc-3084-49cc-a4f7-10a01f73aa72",
                "child": {
                    "id": "cbc987de-101a-ad7c-cd89-6b780490c719",
                    "range": "0.1.4",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "68149972-8e8d-44bf-a6eb-e230cf171669",
                    "release": {
                        "id": "68149972-8e8d-44bf-a6eb-e230cf171669",
                        "version": "0.1.4",
                        "package": {
                            "name": "send",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "73c2a0e7-7cec-46f4-b506-54eaee65e170",
                                        "source_id": "GHSA-jgqf-hwc5-hh37",
                                        "source": "ghsa",
                                        "severity_name": null,
                                        "cvss_score": 5.3,
                                        "summary": "Root Path Disclosure in send",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "0.11.1"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "fcdf94d5-3a52-4a04-a70e-02dc46617035",
                                        "source_id": "GHSA-pgv6-jrvv-75jp",
                                        "source": "ghsa",
                                        "severity_name": "Medium",
                                        "cvss_score": null,
                                        "summary": "Moderate severity vulnerability that affects send",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "0.8.4"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "f8485ae1-f40e-4c1a-9544-016541e7fd97",
                                        "source_id": "GHSA-xwg4-93c6-3h42",
                                        "source": "ghsa",
                                        "severity_name": null,
                                        "cvss_score": null,
                                        "summary": "Directory Traversal in send",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "0.8.4"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "8a3e513f-2fe7-a1e7-812f-05048b5a56f5",
                "child_id": "bfe8701d-3576-77f9-88ae-3507a44fbf27",
                "id": "08154b47-e809-4384-802c-fe6f4f488bb3",
                "child": {
                    "id": "bfe8701d-3576-77f9-88ae-3507a44fbf27",
                    "range": "0.6.6",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "d34cbc6b-a5b9-4c04-a512-68e758962a33",
                    "release": {
                        "id": "d34cbc6b-a5b9-4c04-a512-68e758962a33",
                        "version": "0.6.6",
                        "package": {
                            "name": "qs",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "e9050ca8-e5b7-4ed2-b88e-01235da0c165",
                                        "source_id": "GHSA-jjv7-qpx3-h62q",
                                        "source": "ghsa",
                                        "severity_name": null,
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
                                        "id": "282e73dc-75b0-47f6-a65c-863c71ad224a",
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
                                        "id": "36560865-327c-4393-b0a5-1637f16f235f",
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
                                },
                                {
                                    "vulnerability": {
                                        "id": "7d32681a-1370-4d06-a023-803106111dac",
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
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "8a3e513f-2fe7-a1e7-812f-05048b5a56f5",
                "child_id": "a66aeda3-63ac-7c2a-1086-e4d3ab880a7a",
                "id": "8b6e03c1-4da3-40e5-9de7-3db214a61871",
                "child": {
                    "id": "a66aeda3-63ac-7c2a-1086-e4d3ab880a7a",
                    "range": "2.2.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "104cdd27-70c7-4680-9b1f-ed95842af31f",
                    "release": {
                        "id": "104cdd27-70c7-4680-9b1f-ed95842af31f",
                        "version": "2.2.0",
                        "package": {
                            "name": "multiparty",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "8a3e513f-2fe7-a1e7-812f-05048b5a56f5",
                "child_id": "9cacf877-627a-4bc1-5195-4626ae6ba6c3",
                "id": "b8e5734a-93a8-48a0-8497-783464985797",
                "child": {
                    "id": "9cacf877-627a-4bc1-5195-4626ae6ba6c3",
                    "range": "0.2.1",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "0bce9d23-6a78-4b2c-8d62-ab21193766fc",
                    "release": {
                        "id": "0bce9d23-6a78-4b2c-8d62-ab21193766fc",
                        "version": "0.2.1",
                        "package": {
                            "name": "buffer-crc32",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "8a3e513f-2fe7-a1e7-812f-05048b5a56f5",
                "child_id": "81e9cc8e-d6ec-5750-3b08-75421ef2da48",
                "id": "7ab19d9b-256a-4320-9bce-4f5ecde04360",
                "child": {
                    "id": "81e9cc8e-d6ec-5750-3b08-75421ef2da48",
                    "range": "0.5.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "1bd562d6-212d-409f-a382-dc6ba9716882",
                    "release": {
                        "id": "1bd562d6-212d-409f-a382-dc6ba9716882",
                        "version": "0.5.0",
                        "package": {
                            "name": "batch",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "8a3e513f-2fe7-a1e7-812f-05048b5a56f5",
                "child_id": "7c986198-c71b-5667-8415-74cc9448e21d",
                "id": "3b7967f3-a239-4040-a299-61b96d2aa99e",
                "child": {
                    "id": "7c986198-c71b-5667-8415-74cc9448e21d",
                    "range": "1.0.1",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "e86cde77-fd62-4175-9baf-72121562d488",
                    "release": {
                        "id": "e86cde77-fd62-4175-9baf-72121562d488",
                        "version": "1.0.1",
                        "package": {
                            "name": "cookie-signature",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "f9ab37c0-fcdc-4fbc-a01f-7b498cbe447c",
                                        "source_id": "GHSA-92vm-wfm5-mxvv",
                                        "source": "ghsa",
                                        "severity_name": "Medium",
                                        "cvss_score": 4.4,
                                        "summary": "cookie-signature Timing Attack",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "1.0.4"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "8a3e513f-2fe7-a1e7-812f-05048b5a56f5",
                "child_id": "5b4e070f-e4d9-2dfe-9185-6163a11d1862",
                "id": "4054e3bb-a7fc-4fa4-8d6b-937255a9207d",
                "child": {
                    "id": "5b4e070f-e4d9-2dfe-9185-6163a11d1862",
                    "range": "0.1.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "9e53ee2a-8ffe-44ab-88c6-16a961f224ad",
                    "release": {
                        "id": "9e53ee2a-8ffe-44ab-88c6-16a961f224ad",
                        "version": "0.1.0",
                        "package": {
                            "name": "methods",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "8a3e513f-2fe7-a1e7-812f-05048b5a56f5",
                "child_id": "38c2519e-4704-7e2b-472a-d1e7519bfdf0",
                "id": "c2c311f2-8103-43bf-919a-e589bc50e102",
                "child": {
                    "id": "38c2519e-4704-7e2b-472a-d1e7519bfdf0",
                    "range": "0.0.3",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "1a145e90-37f7-4d50-b463-d764df6b5ab7",
                    "release": {
                        "id": "1a145e90-37f7-4d50-b463-d764df6b5ab7",
                        "version": "0.0.3",
                        "package": {
                            "name": "uid2",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "8a3e513f-2fe7-a1e7-812f-05048b5a56f5",
                "child_id": "3575a45c-9f5c-6dca-e821-8c325d9a07d7",
                "id": "dac28938-5470-4162-ae35-a57aed9cdac5",
                "child": {
                    "id": "3575a45c-9f5c-6dca-e821-8c325d9a07d7",
                    "range": "1.1.2",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "0b589463-5804-4d46-a8d7-8c9a4da20495",
                    "release": {
                        "id": "0b589463-5804-4d46-a8d7-8c9a4da20495",
                        "version": "1.1.2",
                        "package": {
                            "name": "raw-body",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "8a3e513f-2fe7-a1e7-812f-05048b5a56f5",
                "child_id": "2e67fa7a-67b1-0f78-7e2b-e7cac7d5943c",
                "id": "1e937fa8-9157-4f67-afc8-992a63da86b7",
                "child": {
                    "id": "2e67fa7a-67b1-0f78-7e2b-e7cac7d5943c",
                    "range": "0.2.1",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "469be34f-48f6-4b0c-b0a5-7b4e4ca444a5",
                    "release": {
                        "id": "469be34f-48f6-4b0c-b0a5-7b4e4ca444a5",
                        "version": "0.2.1",
                        "package": {
                            "name": "bytes",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "8a3e513f-2fe7-a1e7-812f-05048b5a56f5",
                "child_id": "281d0fe3-f1ad-f762-180e-1424ddd33374",
                "id": "9a0aa088-3e10-4b96-a2c6-da85c38017c8",
                "child": {
                    "id": "281d0fe3-f1ad-f762-180e-1424ddd33374",
                    "range": "0.2.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "a192151b-058e-4211-9020-5a2460521f47",
                    "release": {
                        "id": "a192151b-058e-4211-9020-5a2460521f47",
                        "version": "0.2.0",
                        "package": {
                            "name": "fresh",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "5e0c7c52-9c18-4469-a21a-86d7a813bd1b",
                                        "source_id": "GHSA-9qj9-36jm-prpv",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": null,
                                        "summary": "Regular Expression Denial of Service in fresh",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "0.5.2"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "8a3e513f-2fe7-a1e7-812f-05048b5a56f5",
                "child_id": "0ffef466-cf53-c9a5-0672-80e3e5e150cb",
                "id": "128aac36-55ba-482a-85c4-99d3a0350c33",
                "child": {
                    "id": "0ffef466-cf53-c9a5-0672-80e3e5e150cb",
                    "range": ">= 0.7.3 < 1",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "3c508170-9563-4e47-89d4-a7fdc72769cf",
                    "release": {
                        "id": "3c508170-9563-4e47-89d4-a7fdc72769cf",
                        "version": "0.8.1",
                        "package": {
                            "name": "debug",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "b3306022-4834-4e54-a45d-2f2397bbbe94",
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
                "parent_id": "a3903e80-9096-5b97-eb5b-5e431a35d523",
                "child_id": "d54ef789-bdf4-e8ee-5c52-46e573f8a1dc",
                "id": "c7ff3cba-c3ab-4741-b719-b0397226df2e",
                "child": {
                    "id": "d54ef789-bdf4-e8ee-5c52-46e573f8a1dc",
                    "range": "~1.0.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "01f1ec8a-1c2b-4241-b5d3-b2f44deca205",
                    "release": {
                        "id": "01f1ec8a-1c2b-4241-b5d3-b2f44deca205",
                        "version": "1.0.0",
                        "package": {
                            "name": "ansi-styles",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "a3903e80-9096-5b97-eb5b-5e431a35d523",
                "child_id": "9d8b4f53-79f2-7816-1ca1-6b3b3f745df2",
                "id": "de3c0f92-f813-4102-9f20-121b2190fc98",
                "child": {
                    "id": "9d8b4f53-79f2-7816-1ca1-6b3b3f745df2",
                    "range": "~0.1.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "e3f20e86-5342-4994-b4fb-c79692465252",
                    "release": {
                        "id": "e3f20e86-5342-4994-b4fb-c79692465252",
                        "version": "0.1.1",
                        "package": {
                            "name": "strip-ansi",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "a3903e80-9096-5b97-eb5b-5e431a35d523",
                "child_id": "8a8a1974-9d02-9e37-4f4c-229a1dce50c4",
                "id": "66c21ecb-9dd0-41f5-978a-0e2d9bf3d88c",
                "child": {
                    "id": "8a8a1974-9d02-9e37-4f4c-229a1dce50c4",
                    "range": "~0.1.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "92bb1fa2-5e21-4f69-a4f2-77d62d0e1b1d",
                    "release": {
                        "id": "92bb1fa2-5e21-4f69-a4f2-77d62d0e1b1d",
                        "version": "0.1.7",
                        "package": {
                            "name": "has-color",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "5da08d7f-6679-3e55-3dea-581ba340cf1e",
                "child_id": "cd84ab0c-4e5d-424c-09ef-eb4b116a2d6e",
                "id": "6276e618-efd7-457c-ba0c-af9f03dbba19",
                "child": {
                    "id": "cd84ab0c-4e5d-424c-09ef-eb4b116a2d6e",
                    "range": "~0.3.5",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "e27545fc-1ec0-4217-b01f-96cbe95177a3",
                    "release": {
                        "id": "e27545fc-1ec0-4217-b01f-96cbe95177a3",
                        "version": "0.3.5",
                        "package": {
                            "name": "mkdirp",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "5da08d7f-6679-3e55-3dea-581ba340cf1e",
                "child_id": "c4e844e7-83eb-55ee-3a98-c855f632588b",
                "id": "6bc7fd2f-9f12-4bc5-9be8-4b55fce77f22",
                "child": {
                    "id": "c4e844e7-83eb-55ee-3a98-c855f632588b",
                    "range": "3.2.3",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "b30a9768-4ad0-4277-a944-bb317144d1d1",
                    "release": {
                        "id": "b30a9768-4ad0-4277-a944-bb317144d1d1",
                        "version": "3.2.3",
                        "package": {
                            "name": "glob",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "5da08d7f-6679-3e55-3dea-581ba340cf1e",
                "child_id": "c2c75e26-889b-77da-25b7-1770c15c3476",
                "id": "55d7a59f-b604-47c1-9d7a-89bf691eb669",
                "child": {
                    "id": "c2c75e26-889b-77da-25b7-1770c15c3476",
                    "range": "1.0.7",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "9c88c75d-14c2-4c03-ac10-4d991f6f885c",
                    "release": {
                        "id": "9c88c75d-14c2-4c03-ac10-4d991f6f885c",
                        "version": "1.0.7",
                        "package": {
                            "name": "diff",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "dd31718f-b72c-4376-828e-6b8638cc34a3",
                                        "source_id": "GHSA-h6ch-v84p-w6p9",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": null,
                                        "summary": "Regular Expression Denial of Service (ReDoS)",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "3.5.0"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "5da08d7f-6679-3e55-3dea-581ba340cf1e",
                "child_id": "b5e057bc-7166-187e-8ec9-152bcf4d62ac",
                "id": "abb0afbe-9706-41ca-9537-5645cd7d9d83",
                "child": {
                    "id": "b5e057bc-7166-187e-8ec9-152bcf4d62ac",
                    "range": "*",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "5632676e-8b96-47d5-b68b-e0568245d42a",
                    "release": {
                        "id": "5632676e-8b96-47d5-b68b-e0568245d42a",
                        "version": "4.3.4",
                        "package": {
                            "name": "debug",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "b3306022-4834-4e54-a45d-2f2397bbbe94",
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
                "parent_id": "5da08d7f-6679-3e55-3dea-581ba340cf1e",
                "child_id": "8268db04-8cb6-e1f8-2fe1-9469a9b2bcb9",
                "id": "b6b33873-2caf-43b4-b9c1-0488887bd5de",
                "child": {
                    "id": "8268db04-8cb6-e1f8-2fe1-9469a9b2bcb9",
                    "range": "2.0.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "3d5ab28e-b3e6-49f7-a444-e730562b1e4c",
                    "release": {
                        "id": "3d5ab28e-b3e6-49f7-a444-e730562b1e4c",
                        "version": "2.0.0",
                        "package": {
                            "name": "commander",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "5da08d7f-6679-3e55-3dea-581ba340cf1e",
                "child_id": "75ecb225-89bd-078f-49ba-be900d08444e",
                "id": "e029dda9-de65-421f-b55f-16592479199f",
                "child": {
                    "id": "75ecb225-89bd-078f-49ba-be900d08444e",
                    "range": "0.26.3",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "cfd05410-ccf3-4bfc-a82c-182e7e829c9d",
                    "release": {
                        "id": "cfd05410-ccf3-4bfc-a82c-182e7e829c9d",
                        "version": "0.26.3",
                        "package": {
                            "name": "jade",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "5da08d7f-6679-3e55-3dea-581ba340cf1e",
                "child_id": "5fa0b2c8-4f28-3606-9b25-5f02a432303f",
                "id": "4972bed9-b5e9-4d44-a440-5aed15a738c2",
                "child": {
                    "id": "5fa0b2c8-4f28-3606-9b25-5f02a432303f",
                    "range": "1.7.x",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "7a028674-5b39-46da-a982-c10270546b2a",
                    "release": {
                        "id": "7a028674-5b39-46da-a982-c10270546b2a",
                        "version": "1.7.0",
                        "package": {
                            "name": "growl",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "50310196-031d-483f-aa6f-1e4291d14a84",
                                        "source_id": "GHSA-qh2h-chj9-jffq",
                                        "source": "ghsa",
                                        "severity_name": "Critical",
                                        "cvss_score": null,
                                        "summary": "Growl before 1.10.0 vulnerable to Command Injection",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "1.10.0"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "37b41347-61e5-3aa5-507f-269508e182c3",
                "child_id": "dc6f4a62-b33f-bb28-adca-47e16f9d4eb0",
                "id": "ee59ab2b-4ad7-44a8-baa0-571a80869c0a",
                "child": {
                    "id": "dc6f4a62-b33f-bb28-adca-47e16f9d4eb0",
                    "range": "~0.0.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "5595ef84-9555-4a80-8137-c55154471862",
                    "release": {
                        "id": "5595ef84-9555-4a80-8137-c55154471862",
                        "version": "0.0.10",
                        "package": {
                            "name": "minimist",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "7c707cae-b730-46eb-94c3-813a8857ed93",
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
                                        "id": "6eaca9bb-8cf3-4f8a-9915-5b3e1d3bec0a",
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
                                        "id": "176f6c35-d07c-4086-a8a8-d9bbe97eb53c",
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
                "parent_id": "37b41347-61e5-3aa5-507f-269508e182c3",
                "child_id": "acf2a6c6-e051-e119-473a-9661a01735c8",
                "id": "5a7bef77-784e-4283-962b-9dd7230cb39b",
                "child": {
                    "id": "acf2a6c6-e051-e119-473a-9661a01735c8",
                    "range": "~0.0.2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "fc6b8d51-9adf-47f0-84c2-60df3b3d1274",
                    "release": {
                        "id": "fc6b8d51-9adf-47f0-84c2-60df3b3d1274",
                        "version": "0.0.3",
                        "package": {
                            "name": "wordwrap",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "0c0df1ba-b032-b9c3-e544-bb3f2dd702c9",
                "child_id": "f39113c5-f0c0-7138-b06b-3a0f95175619",
                "id": "d802db71-22a3-4eba-b114-44689a9a237f",
                "child": {
                    "id": "f39113c5-f0c0-7138-b06b-3a0f95175619",
                    "range": "1.1.2",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "b9c520e4-ea31-43eb-bdbc-b045eda03b18",
                    "release": {
                        "id": "b9c520e4-ea31-43eb-bdbc-b045eda03b18",
                        "version": "1.1.2",
                        "package": {
                            "name": "samsam",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "0c0df1ba-b032-b9c3-e544-bb3f2dd702c9",
                "child_id": "eb365e40-3cf2-15c9-fbc0-4d1bc57ef75c",
                "id": "e39519a1-d99c-4b3c-a7a8-97348cae4de4",
                "child": {
                    "id": "eb365e40-3cf2-15c9-fbc0-4d1bc57ef75c",
                    "range": ">=0.10.3 <1",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "5b61b033-8ba2-46aa-a3f1-78cfa12f8e95",
                    "release": {
                        "id": "5b61b033-8ba2-46aa-a3f1-78cfa12f8e95",
                        "version": "0.12.4",
                        "package": {
                            "name": "util",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "0c0df1ba-b032-b9c3-e544-bb3f2dd702c9",
                "child_id": "c4ed09d7-3173-54a2-fcd7-5b3a25e1d22e",
                "id": "1bc3c07f-bba8-4823-85fe-9cafae61bbb5",
                "child": {
                    "id": "c4ed09d7-3173-54a2-fcd7-5b3a25e1d22e",
                    "range": "1.3.2",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "94310c64-6665-4f4b-98a3-767865658bfe",
                    "release": {
                        "id": "94310c64-6665-4f4b-98a3-767865658bfe",
                        "version": "1.3.2",
                        "package": {
                            "name": "lolex",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "0c0df1ba-b032-b9c3-e544-bb3f2dd702c9",
                "child_id": "c2cf98fc-4dc0-eccc-418d-038eecdef672",
                "id": "e08c2d48-7eda-4a35-9cdd-e43bf5cc4ea7",
                "child": {
                    "id": "c2cf98fc-4dc0-eccc-418d-038eecdef672",
                    "range": "1.1.1",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "e1859ef7-3dd0-487d-9720-9e49bd29e342",
                    "release": {
                        "id": "e1859ef7-3dd0-487d-9720-9e49bd29e342",
                        "version": "1.1.1",
                        "package": {
                            "name": "formatio",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "b2c4bf21-47bc-83c3-1f81-19e9324216cc",
                "child_id": "af0b02f0-3760-ce75-2674-c70727599de4",
                "id": "04726f87-4aad-4e3e-a496-171a7ee65e95",
                "child": {
                    "id": "af0b02f0-3760-ce75-2674-c70727599de4",
                    "range": "~2.4.12",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "f6a68d1b-69fe-454b-9e57-fe1bf0625c60",
                    "release": {
                        "id": "f6a68d1b-69fe-454b-9e57-fe1bf0625c60",
                        "version": "2.4.24",
                        "package": {
                            "name": "uglify-js",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "f0d8e160-fef4-4daa-ba28-60b7e26e335b",
                                        "source_id": "GHSA-c9f4-xj24-8jqx",
                                        "source": "ghsa",
                                        "severity_name": null,
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
                                        "id": "a243ae4f-c931-4235-9eff-6fbc29453172",
                                        "source_id": "GHSA-34r7-q49f-h37c",
                                        "source": "ghsa",
                                        "severity_name": null,
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
                                        "id": "5be56235-c292-486d-b23f-c59f10c53d64",
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
                "parent_id": "aeb027e5-ef74-bc16-f9b8-ada617b2467b",
                "child_id": "af0b02f0-3760-ce75-2674-c70727599de4",
                "id": "99d8ee30-f19e-4e6e-898c-640d2ba5ebfb",
                "child": {
                    "id": "af0b02f0-3760-ce75-2674-c70727599de4",
                    "range": "~2.4.12",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "f6a68d1b-69fe-454b-9e57-fe1bf0625c60",
                    "release": {
                        "id": "f6a68d1b-69fe-454b-9e57-fe1bf0625c60",
                        "version": "2.4.24",
                        "package": {
                            "name": "uglify-js",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "f0d8e160-fef4-4daa-ba28-60b7e26e335b",
                                        "source_id": "GHSA-c9f4-xj24-8jqx",
                                        "source": "ghsa",
                                        "severity_name": null,
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
                                        "id": "a243ae4f-c931-4235-9eff-6fbc29453172",
                                        "source_id": "GHSA-34r7-q49f-h37c",
                                        "source": "ghsa",
                                        "severity_name": null,
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
                                        "id": "5be56235-c292-486d-b23f-c59f10c53d64",
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
                "parent_id": "99d60b80-02da-d12e-fde9-e9d076f91341",
                "child_id": "bb05f340-95da-3540-3386-1e7169bed4ea",
                "id": "2f1f89c4-b5db-49d8-9acd-dbe585200c65",
                "child": {
                    "id": "bb05f340-95da-3540-3386-1e7169bed4ea",
                    "range": "~2.2.5",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "802024c0-d19d-43f6-9e77-37cd4e474191",
                    "release": {
                        "id": "802024c0-d19d-43f6-9e77-37cd4e474191",
                        "version": "2.2.5",
                        "package": {
                            "name": "uglify-js",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "f0d8e160-fef4-4daa-ba28-60b7e26e335b",
                                        "source_id": "GHSA-c9f4-xj24-8jqx",
                                        "source": "ghsa",
                                        "severity_name": null,
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
                                        "id": "a243ae4f-c931-4235-9eff-6fbc29453172",
                                        "source_id": "GHSA-34r7-q49f-h37c",
                                        "source": "ghsa",
                                        "severity_name": null,
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
                                        "id": "5be56235-c292-486d-b23f-c59f10c53d64",
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
                "parent_id": "99d60b80-02da-d12e-fde9-e9d076f91341",
                "child_id": "0680c4b5-3a38-51f7-d249-2144f1b2b9cc",
                "id": "6e7ae77c-ebdf-4885-9299-95b22563f4e6",
                "child": {
                    "id": "0680c4b5-3a38-51f7-d249-2144f1b2b9cc",
                    "range": "~2.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "c6de0108-be30-4718-803f-edd080f3082a",
                    "release": {
                        "id": "c6de0108-be30-4718-803f-edd080f3082a",
                        "version": "2.0.0",
                        "package": {
                            "name": "promise",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "99d60b80-02da-d12e-fde9-e9d076f91341",
                "child_id": "007ffe16-70a6-ea30-5c28-f0d1401a07e2",
                "id": "34c3b6db-07e7-4fc8-853b-c407b918ddb5",
                "child": {
                    "id": "007ffe16-70a6-ea30-5c28-f0d1401a07e2",
                    "range": "~1.0.8",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "19784e01-fcfb-425b-ad53-59f825f354bd",
                    "release": {
                        "id": "19784e01-fcfb-425b-ad53-59f825f354bd",
                        "version": "1.0.8",
                        "package": {
                            "name": "css",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "4393f64c-7307-50bb-affd-18f628b3a938",
                "child_id": "340273ed-cccb-1497-21dd-ae7c3a564f3e",
                "id": "5cf9f77d-c045-4366-8e50-00873cacfdf5",
                "child": {
                    "id": "340273ed-cccb-1497-21dd-ae7c3a564f3e",
                    "range": "~0.2.3",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "d42b4cfe-0a21-4116-bdad-13f3ae4f2c39",
                    "release": {
                        "id": "d42b4cfe-0a21-4116-bdad-13f3ae4f2c39",
                        "version": "0.2.5",
                        "package": {
                            "name": "readdirp",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "fc456e80-764f-58fe-d84c-ba150330c278",
                "child_id": "cd84ab0c-4e5d-424c-09ef-eb4b116a2d6e",
                "id": "d8768c2d-6749-4d31-af68-8610cd1eb6fb",
                "child": {
                    "id": "cd84ab0c-4e5d-424c-09ef-eb4b116a2d6e",
                    "range": "~0.3.5",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "e27545fc-1ec0-4217-b01f-96cbe95177a3",
                    "release": {
                        "id": "e27545fc-1ec0-4217-b01f-96cbe95177a3",
                        "version": "0.3.5",
                        "package": {
                            "name": "mkdirp",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "fc456e80-764f-58fe-d84c-ba150330c278",
                "child_id": "97c39eba-0003-df50-bac3-b4b361fc35e4",
                "id": "500331ea-e9ea-43e0-8b16-304cf959ff8a",
                "child": {
                    "id": "97c39eba-0003-df50-bac3-b4b361fc35e4",
                    "range": "^2.3.9",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "78f90d65-d705-4e95-9ec9-04d9b32d1b70",
                    "release": {
                        "id": "78f90d65-d705-4e95-9ec9-04d9b32d1b70",
                        "version": "2.3.15",
                        "package": {
                            "name": "walk",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "fc456e80-764f-58fe-d84c-ba150330c278",
                "child_id": "7571dd15-a872-5819-9e47-1a614fbbac85",
                "id": "569273b8-b8f4-4450-abb8-3b9976cedf06",
                "child": {
                    "id": "7571dd15-a872-5819-9e47-1a614fbbac85",
                    "range": "~0.6.1",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "d4e263fb-45bd-4444-90b7-e37a7e94a991",
                    "release": {
                        "id": "d4e263fb-45bd-4444-90b7-e37a7e94a991",
                        "version": "0.6.4",
                        "package": {
                            "name": "fs-extra",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "b5e057bc-7166-187e-8ec9-152bcf4d62ac",
                "child_id": "299d1fdd-56cd-5832-441b-fe4431a646ce",
                "id": "6ccf65f3-2b05-4e83-95f6-91b544f6d053",
                "child": {
                    "id": "299d1fdd-56cd-5832-441b-fe4431a646ce",
                    "range": "2.1.2",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "2f25d665-14ae-439e-b9d0-c1f9bebc0256",
                    "release": {
                        "id": "2f25d665-14ae-439e-b9d0-c1f9bebc0256",
                        "version": "2.1.2",
                        "package": {
                            "name": "ms",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "ae99bc66-cf69-49df-807e-5b15b9c2da79",
                                        "source_id": "GHSA-3fx5-fwvr-xrjg",
                                        "source": "ghsa",
                                        "severity_name": null,
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
                "parent_id": "afacebe4-607a-eab7-be5b-8ab30abdbca1",
                "child_id": "cd97d993-e245-6066-5846-825d6e7cffd4",
                "id": "d3480ea0-b09c-481b-9446-c3139d8ea5e6",
                "child": {
                    "id": "cd97d993-e245-6066-5846-825d6e7cffd4",
                    "range": "~0.0.6",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "bf1c9c64-68ec-4433-9d64-62fa68e55e95",
                    "release": {
                        "id": "bf1c9c64-68ec-4433-9d64-62fa68e55e95",
                        "version": "0.0.6",
                        "package": {
                            "name": "is-class-hotfix",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "afacebe4-607a-eab7-be5b-8ab30abdbca1",
                "child_id": "965c2f1e-5802-bbf8-5064-34daff90f492",
                "id": "c048e7e9-7b85-43fd-8aed-60ca17dae5e0",
                "child": {
                    "id": "965c2f1e-5802-bbf8-5064-34daff90f492",
                    "range": "~0.1.2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "99589ca6-cebd-4d85-8489-906e9a3a81da",
                    "release": {
                        "id": "99589ca6-cebd-4d85-8489-906e9a3a81da",
                        "version": "0.1.2",
                        "package": {
                            "name": "isstream",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "afacebe4-607a-eab7-be5b-8ab30abdbca1",
                "child_id": "6b2bcc0a-19fb-9f0f-1617-78f9bb663f1f",
                "id": "c6d0ab0e-2d36-4d57-b57d-c7e5defe1c1b",
                "child": {
                    "id": "6b2bcc0a-19fb-9f0f-1617-78f9bb663f1f",
                    "range": "^1.0.2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "9c8e6272-08f6-48e9-a9ab-6c0682318dec",
                    "release": {
                        "id": "9c8e6272-08f6-48e9-a9ab-6c0682318dec",
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
                "parent_id": "ab8515a7-e3b6-a90e-18f1-50c96e2ccd16",
                "child_id": "a34ccaac-541f-c02c-0358-83543b11839d",
                "id": "0a2b9232-b407-4e2d-9948-20c7beaa9a44",
                "child": {
                    "id": "a34ccaac-541f-c02c-0358-83543b11839d",
                    "range": "^1.2.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "a618b76a-6b94-42aa-9069-51260449bb10",
                    "release": {
                        "id": "a618b76a-6b94-42aa-9069-51260449bb10",
                        "version": "1.2.0",
                        "package": {
                            "name": "shebang-command",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "ab8515a7-e3b6-a90e-18f1-50c96e2ccd16",
                "child_id": "874506c4-0f1e-d4ef-fb0f-718b8938dfaf",
                "id": "869dc991-6660-48cc-917a-e987e248f192",
                "child": {
                    "id": "874506c4-0f1e-d4ef-fb0f-718b8938dfaf",
                    "range": "^1.0.4",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "2328cff0-e40f-4c5c-8060-7ba903e340e1",
                    "release": {
                        "id": "2328cff0-e40f-4c5c-8060-7ba903e340e1",
                        "version": "1.0.5",
                        "package": {
                            "name": "nice-try",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "ab8515a7-e3b6-a90e-18f1-50c96e2ccd16",
                "child_id": "5e7ea4f3-5a96-7c04-bece-aee4006b05ce",
                "id": "e453eaa5-3ca2-4b23-a1ef-308459108b48",
                "child": {
                    "id": "5e7ea4f3-5a96-7c04-bece-aee4006b05ce",
                    "range": "^2.0.1",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "6291a514-2473-4415-8d09-93317bbed4b7",
                    "release": {
                        "id": "6291a514-2473-4415-8d09-93317bbed4b7",
                        "version": "2.0.1",
                        "package": {
                            "name": "path-key",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "ab8515a7-e3b6-a90e-18f1-50c96e2ccd16",
                "child_id": "3c627a15-37e1-16ce-534b-2690fa458664",
                "id": "2c8cd49e-f122-4954-a10f-87c703bb10eb",
                "child": {
                    "id": "3c627a15-37e1-16ce-534b-2690fa458664",
                    "range": "^5.5.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "1dbc6e6d-4cbd-4718-8ce0-bd0305430b2e",
                    "release": {
                        "id": "1dbc6e6d-4cbd-4718-8ce0-bd0305430b2e",
                        "version": "5.7.1",
                        "package": {
                            "name": "semver",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "d32467a3-d773-4248-8959-296be4df611d",
                                        "source_id": "GHSA-x6fg-f45m-jf5q",
                                        "source": "ghsa",
                                        "severity_name": null,
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
                "parent_id": "ab8515a7-e3b6-a90e-18f1-50c96e2ccd16",
                "child_id": "1b3341cf-9d91-e016-c21f-af4e62dd57b5",
                "id": "7e51fab7-4c2c-416d-a031-b09f27b964d7",
                "child": {
                    "id": "1b3341cf-9d91-e016-c21f-af4e62dd57b5",
                    "range": "^1.2.9",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "efec0b99-c123-456b-8cde-7a1ee7687602",
                    "release": {
                        "id": "efec0b99-c123-456b-8cde-7a1ee7687602",
                        "version": "1.3.1",
                        "package": {
                            "name": "which",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "0b0b7fe8-6361-40a5-eb06-5ef36d891df2",
                "child_id": "67143871-a2cf-9e8a-0798-0a81a70b65b4",
                "id": "cfa3b09f-c1cc-4cdc-89f6-2b78bb16cbb9",
                "child": {
                    "id": "67143871-a2cf-9e8a-0798-0a81a70b65b4",
                    "range": "3.2.1",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "490cbdce-00f4-45ac-bc50-f3abc0ca19ac",
                    "release": {
                        "id": "490cbdce-00f4-45ac-bc50-f3abc0ca19ac",
                        "version": "3.2.1",
                        "package": {
                            "name": "crc",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "ef6be226-5ae7-23ce-f311-c4c2734def51",
                "child_id": "da8cf46d-f0f9-667b-9633-02fa5bf68d58",
                "id": "b55978ea-a881-4be8-98b7-a95021b9f6d4",
                "child": {
                    "id": "da8cf46d-f0f9-667b-9633-02fa5bf68d58",
                    "range": ">=2.0.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "d1d6e65a-1291-43f0-a1d9-9827976f5a77",
                    "release": {
                        "id": "d1d6e65a-1291-43f0-a1d9-9827976f5a77",
                        "version": "4.17.21",
                        "package": {
                            "name": "lodash",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "ec3a4329-493a-432c-b340-44eb59a7f111",
                                        "source_id": "GHSA-jf85-cpcp-j695",
                                        "source": "ghsa",
                                        "severity_name": "Critical",
                                        "cvss_score": 9.1,
                                        "summary": "Prototype Pollution in lodash",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "4.17.12"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "9cb1d5ac-9802-42de-8f74-7ee219eb30ae",
                                        "source_id": "GHSA-4xc9-xhrj-v574",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": null,
                                        "summary": "Prototype Pollution in lodash",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "4.17.11"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "4d4be38d-1e7f-41d3-8a43-ec1ff19dfe5c",
                                        "source_id": "GHSA-x5rq-j2xg-h7qm",
                                        "source": "ghsa",
                                        "severity_name": "Medium",
                                        "cvss_score": null,
                                        "summary": "Regular Expression Denial of Service (ReDoS) in lodash",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "4.17.11"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "4565e95f-8f85-4374-a638-8556e20430de",
                                        "source_id": "GHSA-fvqr-27wr-82fm",
                                        "source": "ghsa",
                                        "severity_name": "Low",
                                        "cvss_score": null,
                                        "summary": "Prototype Pollution in lodash",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "4.17.5"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "ddbcb8d9-a3fe-4e43-b88a-8498b45c2f59",
                                        "source_id": "GHSA-35jh-r3h4-6jhm",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": 7.2,
                                        "summary": "Command Injection in lodash",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "4.17.21"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "7f704fd4-a981-451e-bd29-2fb74a296b5f",
                                        "source_id": "GHSA-p6mc-m468-83gw",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": 7.4,
                                        "summary": "Prototype Pollution in lodash",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "4.17.20"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "649a016e-2205-428e-95e7-41d4e2511ffd",
                                        "source_id": "GHSA-8p5q-j9m2-g8wr",
                                        "source": "ghsa",
                                        "severity_name": "Low",
                                        "cvss_score": 9.8,
                                        "summary": "Withdrawn: Arbitrary code execution in lodash",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": null
                                        },
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": null
                                        },
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": null
                                        },
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": null
                                        },
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": null
                                        },
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": null
                                        },
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": null
                                        },
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": null
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "3c05bb46-4b73-4863-a45e-e6ea8c45379b",
                                        "source_id": "GHSA-29mw-wpgm-hmr9",
                                        "source": "ghsa",
                                        "severity_name": "Medium",
                                        "cvss_score": 5.3,
                                        "summary": "Regular Expression Denial of Service (ReDoS) in lodash",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "4.17.21"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "97a9cb41-4601-b213-2b03-c373e8ed962c",
                "child_id": "a0c12785-acab-68df-9a26-917b1037ca08",
                "id": "051bdbb0-70ae-488e-a5a4-68bb88c3fc53",
                "child": {
                    "id": "a0c12785-acab-68df-9a26-917b1037ca08",
                    "range": ">=1.4.3",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "77499fde-1c38-45ff-b419-4fff47f6364f",
                    "release": {
                        "id": "77499fde-1c38-45ff-b419-4fff47f6364f",
                        "version": "1.13.3",
                        "package": {
                            "name": "underscore",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "d73bdb5d-7c6b-4bde-80d1-7e24c85e26d8",
                                        "source_id": "GHSA-cf4h-3jhx-xvhq",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": 9.8,
                                        "summary": "Arbitrary Code Execution in underscore",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "1.3.2",
                                            "fixed": "1.12.1"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "8f93e25a-cf29-9eba-2a7e-2b91e7acf850",
                "child_id": "5120e247-99ba-32b0-1463-f7a464516989",
                "id": "f53128ce-7fad-4a2c-bca1-e13fcddfd624",
                "child": {
                    "id": "5120e247-99ba-32b0-1463-f7a464516989",
                    "range": "~0.3",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "108f0cb2-c9d9-438d-a9ff-cd3b142e45fd",
                    "release": {
                        "id": "108f0cb2-c9d9-438d-a9ff-cd3b142e45fd",
                        "version": "0.3.3",
                        "package": {
                            "name": "split",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "f1cf7c8f-eb7c-af67-c4ba-dbb500e977ae",
                "child_id": "6f52ac1d-6e33-8c01-0eef-c2bf814696b5",
                "id": "8a0e3a1e-1d57-4d06-8e09-b7996bc90510",
                "child": {
                    "id": "6f52ac1d-6e33-8c01-0eef-c2bf814696b5",
                    "range": "0.6.2",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "6a5fc9ae-42cb-4b81-8a51-4ffd00246752",
                    "release": {
                        "id": "6a5fc9ae-42cb-4b81-8a51-4ffd00246752",
                        "version": "0.6.2",
                        "package": {
                            "name": "ms",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "ae99bc66-cf69-49df-807e-5b15b9c2da79",
                                        "source_id": "GHSA-3fx5-fwvr-xrjg",
                                        "source": "ghsa",
                                        "severity_name": null,
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
                "parent_id": "c4e844e7-83eb-55ee-3a98-c855f632588b",
                "child_id": "b6e21dfa-52cb-4a93-c144-d7803d197374",
                "id": "37fb9687-885a-4eb2-9d3c-9709032c6f72",
                "child": {
                    "id": "b6e21dfa-52cb-4a93-c144-d7803d197374",
                    "range": "~2.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "30d12a10-0c37-4738-bfb1-4f315a69bf7f",
                    "release": {
                        "id": "30d12a10-0c37-4738-bfb1-4f315a69bf7f",
                        "version": "2.0.3",
                        "package": {
                            "name": "graceful-fs",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "c4e844e7-83eb-55ee-3a98-c855f632588b",
                "child_id": "48b522b9-45b0-0efb-9269-9de40666cee0",
                "id": "aaad94e2-2d95-4adf-89a8-f65442d28fa9",
                "child": {
                    "id": "48b522b9-45b0-0efb-9269-9de40666cee0",
                    "range": "^2.0.3",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "47eeabb9-0f9c-42ac-933c-0e1fe5154350",
                    "release": {
                        "id": "47eeabb9-0f9c-42ac-933c-0e1fe5154350",
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
                "parent_id": "c4e844e7-83eb-55ee-3a98-c855f632588b",
                "child_id": "0396516d-3eb5-bd05-1bb8-a9c761384a4c",
                "id": "4b60a9f6-e37a-4155-a588-8279ef31624d",
                "child": {
                    "id": "0396516d-3eb5-bd05-1bb8-a9c761384a4c",
                    "range": "~0.2.11",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "6432dddb-478c-4be5-97a3-9c608ae2ef67",
                    "release": {
                        "id": "6432dddb-478c-4be5-97a3-9c608ae2ef67",
                        "version": "0.2.14",
                        "package": {
                            "name": "minimatch",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "9ee1009d-38c5-43d3-b28b-874f0e8fc32f",
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
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "75ecb225-89bd-078f-49ba-be900d08444e",
                "child_id": "dad8fb11-84e7-5c04-cc29-183f741e3afa",
                "id": "c110e3aa-d918-432d-9464-43e4a1f2d42a",
                "child": {
                    "id": "dad8fb11-84e7-5c04-cc29-183f741e3afa",
                    "range": "0.3.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "60f960ac-8db8-43bf-abd7-ef13535f24fb",
                    "release": {
                        "id": "60f960ac-8db8-43bf-abd7-ef13535f24fb",
                        "version": "0.3.0",
                        "package": {
                            "name": "mkdirp",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "75ecb225-89bd-078f-49ba-be900d08444e",
                "child_id": "6efb8097-3f46-0b0f-42b4-b6bd2e19bf55",
                "id": "984155f3-d085-47d6-a951-24077a1ad230",
                "child": {
                    "id": "6efb8097-3f46-0b0f-42b4-b6bd2e19bf55",
                    "range": "0.6.1",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "8d3b291f-bcd8-4dd2-b20c-15e1e4d92925",
                    "release": {
                        "id": "8d3b291f-bcd8-4dd2-b20c-15e1e4d92925",
                        "version": "0.6.1",
                        "package": {
                            "name": "commander",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "58d3e41b-34df-f01d-3c0d-b83e03403ff7",
                "child_id": "1c0127aa-0cf7-a380-a5d8-166143372c73",
                "id": "832cfd38-42c9-4a6a-8f74-59e0e489a297",
                "child": {
                    "id": "1c0127aa-0cf7-a380-a5d8-166143372c73",
                    "range": "0.0.8",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "ff48d39f-d5ff-49fa-a90f-b9d7b1e04101",
                    "release": {
                        "id": "ff48d39f-d5ff-49fa-a90f-b9d7b1e04101",
                        "version": "0.0.8",
                        "package": {
                            "name": "minimist",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "7c707cae-b730-46eb-94c3-813a8857ed93",
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
                                        "id": "6eaca9bb-8cf3-4f8a-9915-5b3e1d3bec0a",
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
                                        "id": "176f6c35-d07c-4086-a8a8-d9bbe97eb53c",
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
                "parent_id": "0258c571-c083-1db3-60e1-e7a05c90f992",
                "child_id": "1d6f8689-9401-e8fe-12b1-8cc67cd41b1c",
                "id": "70ad58d9-6638-408b-82dd-9c864322f3c4",
                "child": {
                    "id": "1d6f8689-9401-e8fe-12b1-8cc67cd41b1c",
                    "range": "0.1.1",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "14fd41c7-1e5e-4b27-a3b2-f22dffc0fccd",
                    "release": {
                        "id": "14fd41c7-1e5e-4b27-a3b2-f22dffc0fccd",
                        "version": "0.1.1",
                        "package": {
                            "name": "type-detect",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "ef3a3171-3edf-9c32-af5a-26226207c513",
                "child_id": "0c9160a6-22b4-c507-b9dd-13cd1b2a08a5",
                "id": "ffabf49a-e77f-4a20-a075-2d16d6d11770",
                "child": {
                    "id": "0c9160a6-22b4-c507-b9dd-13cd1b2a08a5",
                    "range": "1.1.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "1ae61dc7-f633-47a2-9e65-5d5faa837f6c",
                    "release": {
                        "id": "1ae61dc7-f633-47a2-9e65-5d5faa837f6c",
                        "version": "1.1.0",
                        "package": {
                            "name": "ee-first",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "d7971537-f8ba-4a4f-c525-79fb372464be",
                "child_id": "79f37a55-fc87-3896-7cf0-3b1ec36fa306",
                "id": "f8c04eb8-9ea5-4117-bebc-f1fe320c9302",
                "child": {
                    "id": "79f37a55-fc87-3896-7cf0-3b1ec36fa306",
                    "range": "0.4.5",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "24dd52f1-60e7-410a-9c1f-b561f752f96d",
                    "release": {
                        "id": "24dd52f1-60e7-410a-9c1f-b561f752f96d",
                        "version": "0.4.5",
                        "package": {
                            "name": "iconv-lite",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "d7971537-f8ba-4a4f-c525-79fb372464be",
                "child_id": "34974314-b538-3a70-4e36-4c88b3d3d751",
                "id": "429add42-2bac-4535-8fbb-93bc1c0ab269",
                "child": {
                    "id": "34974314-b538-3a70-4e36-4c88b3d3d751",
                    "range": "1",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "8cd5dfe2-ed8e-4cfe-bd12-df8ccfdf9168",
                    "release": {
                        "id": "8cd5dfe2-ed8e-4cfe-bd12-df8ccfdf9168",
                        "version": "1.0.0",
                        "package": {
                            "name": "bytes",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "4f7f8fbd-ad8a-276c-d8a6-b197a8e7f917",
                "child_id": "9293588a-9929-23a6-6a53-1a0d7fd144e6",
                "id": "c62bb33f-86ea-4ff6-8c05-e4645e027313",
                "child": {
                    "id": "9293588a-9929-23a6-6a53-1a0d7fd144e6",
                    "range": "0.3.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "385a98a2-b9d2-419e-9075-c01b607a81fe",
                    "release": {
                        "id": "385a98a2-b9d2-419e-9075-c01b607a81fe",
                        "version": "0.3.0",
                        "package": {
                            "name": "media-typer",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "4f7f8fbd-ad8a-276c-d8a6-b197a8e7f917",
                "child_id": "064a6d33-e4aa-0444-c403-39f346c513a3",
                "id": "48e40476-f41f-4283-b4e8-6c1a6359f624",
                "child": {
                    "id": "064a6d33-e4aa-0444-c403-39f346c513a3",
                    "range": "~2.0.9",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "fffc345c-4016-4653-bf3c-c27ae85d69be",
                    "release": {
                        "id": "fffc345c-4016-4653-bf3c-c27ae85d69be",
                        "version": "2.0.14",
                        "package": {
                            "name": "mime-types",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "f2a7ff8e-9944-6ed4-ea2d-7fb8dd13c8f1",
                "child_id": "f1cb5f7b-a7b3-177c-dade-fa0d521a66c1",
                "id": "64296541-44f2-453f-be62-dbf07ce0a5c8",
                "child": {
                    "id": "f1cb5f7b-a7b3-177c-dade-fa0d521a66c1",
                    "range": "2.0.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "1925fc99-7508-4697-a2c0-c0619f63c54e",
                    "release": {
                        "id": "1925fc99-7508-4697-a2c0-c0619f63c54e",
                        "version": "2.0.0",
                        "package": {
                            "name": "buffer-writer",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "f2a7ff8e-9944-6ed4-ea2d-7fb8dd13c8f1",
                "child_id": "ea195d03-8bbb-2c36-0091-dbf87cd93adf",
                "id": "d483276e-1e8e-4ecd-aeaf-2a7112d6ac56",
                "child": {
                    "id": "ea195d03-8bbb-2c36-0091-dbf87cd93adf",
                    "range": "^3.5.1",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "20df4c61-e459-4076-9f6b-65408e2a9aa9",
                    "release": {
                        "id": "20df4c61-e459-4076-9f6b-65408e2a9aa9",
                        "version": "3.5.1",
                        "package": {
                            "name": "pg-pool",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "f2a7ff8e-9944-6ed4-ea2d-7fb8dd13c8f1",
                "child_id": "de1f42bd-bac1-b1b2-13a9-0b64efb11984",
                "id": "7103bf46-39a7-46d9-9b5e-553aee9d34f0",
                "child": {
                    "id": "de1f42bd-bac1-b1b2-13a9-0b64efb11984",
                    "range": "^2.5.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "f4d336c5-83f3-49a0-8e13-314bb0980eb3",
                    "release": {
                        "id": "f4d336c5-83f3-49a0-8e13-314bb0980eb3",
                        "version": "2.5.0",
                        "package": {
                            "name": "pg-connection-string",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "f2a7ff8e-9944-6ed4-ea2d-7fb8dd13c8f1",
                "child_id": "d6d798d9-0327-ffb3-449f-7316132cdec0",
                "id": "4dc3f7ec-d2af-49b8-8ee2-bd3f24a25a9e",
                "child": {
                    "id": "d6d798d9-0327-ffb3-449f-7316132cdec0",
                    "range": "1.0.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "6aa0e216-855a-4228-ba41-4f6cf8299c24",
                    "release": {
                        "id": "6aa0e216-855a-4228-ba41-4f6cf8299c24",
                        "version": "1.0.0",
                        "package": {
                            "name": "packet-reader",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "f2a7ff8e-9944-6ed4-ea2d-7fb8dd13c8f1",
                "child_id": "d6915a86-ef82-4fec-946a-46985e4604fe",
                "id": "4d9b3f7a-a9cc-4cd9-a2cf-611319610ef0",
                "child": {
                    "id": "d6915a86-ef82-4fec-946a-46985e4604fe",
                    "range": "1.x",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "7d1ce721-8db9-4b1c-a731-53bea17372dd",
                    "release": {
                        "id": "7d1ce721-8db9-4b1c-a731-53bea17372dd",
                        "version": "1.0.5",
                        "package": {
                            "name": "pgpass",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "f2a7ff8e-9944-6ed4-ea2d-7fb8dd13c8f1",
                "child_id": "598e9fe2-a051-1fcf-9f2a-c077b69c2530",
                "id": "07199a80-0031-41e3-a891-89a3f99fa918",
                "child": {
                    "id": "598e9fe2-a051-1fcf-9f2a-c077b69c2530",
                    "range": "^1.5.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "6b1b987c-06a4-42b9-ac84-ff679ed2d5a5",
                    "release": {
                        "id": "6b1b987c-06a4-42b9-ac84-ff679ed2d5a5",
                        "version": "1.5.0",
                        "package": {
                            "name": "pg-protocol",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "f2a7ff8e-9944-6ed4-ea2d-7fb8dd13c8f1",
                "child_id": "53bd0c67-f282-93ab-aa52-ed150397e90b",
                "id": "fff0d3d4-6f94-48a1-bd91-fc232cc25b65",
                "child": {
                    "id": "53bd0c67-f282-93ab-aa52-ed150397e90b",
                    "range": "^2.1.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "0db1c9ec-fed9-41d0-bd36-6856c97af596",
                    "release": {
                        "id": "0db1c9ec-fed9-41d0-bd36-6856c97af596",
                        "version": "2.2.0",
                        "package": {
                            "name": "pg-types",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "ebf4a2e0-d421-0ace-fee1-73ebbf000569",
                "child_id": "e8096a8e-9618-dbfc-a541-50d796ac0cd5",
                "id": "3616b33c-d589-4f0f-b85b-ebf7d20237bb",
                "child": {
                    "id": "e8096a8e-9618-dbfc-a541-50d796ac0cd5",
                    "range": "3.0.2",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "f3a01441-ca28-4704-ac6f-8a296e08c1b8",
                    "release": {
                        "id": "f3a01441-ca28-4704-ac6f-8a296e08c1b8",
                        "version": "3.0.2",
                        "package": {
                            "name": "topojson-simplify",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "ebf4a2e0-d421-0ace-fee1-73ebbf000569",
                "child_id": "40eeee12-141f-aea7-8dc3-650c2b372c88",
                "id": "d21a727f-075a-40fe-bbe1-71c5c5e15e32",
                "child": {
                    "id": "40eeee12-141f-aea7-8dc3-650c2b372c88",
                    "range": "3.0.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "f37c3c7f-6da2-45c2-93dd-21a3e1d2a5ee",
                    "release": {
                        "id": "f37c3c7f-6da2-45c2-93dd-21a3e1d2a5ee",
                        "version": "3.0.0",
                        "package": {
                            "name": "topojson-server",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "ebf4a2e0-d421-0ace-fee1-73ebbf000569",
                "child_id": "26ed383f-ee03-62e8-00f9-74c951608e66",
                "id": "8df35968-874e-4203-921f-d8db0542a1a6",
                "child": {
                    "id": "26ed383f-ee03-62e8-00f9-74c951608e66",
                    "range": "3.0.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "d4fa9760-b605-4f6f-bcee-fc29a54e6267",
                    "release": {
                        "id": "d4fa9760-b605-4f6f-bcee-fc29a54e6267",
                        "version": "3.0.0",
                        "package": {
                            "name": "topojson-client",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "f920bf76-8e88-6d2e-67aa-799410a308f2",
                "child_id": "f5f42487-d5b5-3f85-3b2d-96cf155417ce",
                "id": "aa442cb5-2083-423b-8334-5af5a38969da",
                "child": {
                    "id": "f5f42487-d5b5-3f85-3b2d-96cf155417ce",
                    "range": "~1.0.4",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "5da18ff7-68a1-43c2-a31a-3fc627d8c107",
                    "release": {
                        "id": "5da18ff7-68a1-43c2-a31a-3fc627d8c107",
                        "version": "1.0.7",
                        "package": {
                            "name": "read",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "f8e63a87-d8a2-bf20-d945-1082baae8321",
                "child_id": "b6e21dfa-52cb-4a93-c144-d7803d197374",
                "id": "83a27491-c49a-41af-b048-353ab78f8c8c",
                "child": {
                    "id": "b6e21dfa-52cb-4a93-c144-d7803d197374",
                    "range": "~2.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "30d12a10-0c37-4738-bfb1-4f315a69bf7f",
                    "release": {
                        "id": "30d12a10-0c37-4738-bfb1-4f315a69bf7f",
                        "version": "2.0.3",
                        "package": {
                            "name": "graceful-fs",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "f8e63a87-d8a2-bf20-d945-1082baae8321",
                "child_id": "52ab0891-2d13-a5af-b546-25eb35e8baa6",
                "id": "50cd24a9-268f-4652-b4a5-4478e09a514f",
                "child": {
                    "id": "52ab0891-2d13-a5af-b546-25eb35e8baa6",
                    "range": "~0.0.3",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "98ce8893-0def-4333-b4af-ecd7679feeae",
                    "release": {
                        "id": "98ce8893-0def-4333-b4af-ecd7679feeae",
                        "version": "0.0.3",
                        "package": {
                            "name": "intersect",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "f8e63a87-d8a2-bf20-d945-1082baae8321",
                "child_id": "39a43097-610c-fbd8-b320-bb4fc47a038b",
                "id": "5cd6981e-e0e3-45fb-853f-ab44709c1b26",
                "child": {
                    "id": "39a43097-610c-fbd8-b320-bb4fc47a038b",
                    "range": "~0.2.5",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "86cd95c5-6819-4779-9c44-c2038435113f",
                    "release": {
                        "id": "86cd95c5-6819-4779-9c44-c2038435113f",
                        "version": "0.2.11",
                        "package": {
                            "name": "deep-extend",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "8c4c94ee-282d-4e58-b306-a7525f799e13",
                                        "source_id": "GHSA-hr2v-3952-633q",
                                        "source": "ghsa",
                                        "severity_name": "Critical",
                                        "cvss_score": 9.8,
                                        "summary": "Prototype Pollution in deep-extend",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "0.5.1"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "f2d6ed72-999b-6349-2d49-5e71c774cb63",
                "child_id": "c1793751-0fa3-936f-92c2-0a5ed02ce4ac",
                "id": "985ae53d-3a8f-4b31-be1a-988c9c00bfd1",
                "child": {
                    "id": "c1793751-0fa3-936f-92c2-0a5ed02ce4ac",
                    "range": "~0.3.5",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "759f2406-0918-4e59-a8c1-3272c715a57c",
                    "release": {
                        "id": "759f2406-0918-4e59-a8c1-3272c715a57c",
                        "version": "0.3.7",
                        "package": {
                            "name": "optimist",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "f2d6ed72-999b-6349-2d49-5e71c774cb63",
                "child_id": "2eea31c8-bc15-a4ce-7b5b-0223975397a8",
                "id": "d4114e8a-1f4a-4fb2-ad4e-cff1cc5a207b",
                "child": {
                    "id": "2eea31c8-bc15-a4ce-7b5b-0223975397a8",
                    "range": "~2.3",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "855108c6-2334-42de-a13a-2097edbcfbf0",
                    "release": {
                        "id": "855108c6-2334-42de-a13a-2097edbcfbf0",
                        "version": "2.3.6",
                        "package": {
                            "name": "uglify-js",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "f0d8e160-fef4-4daa-ba28-60b7e26e335b",
                                        "source_id": "GHSA-c9f4-xj24-8jqx",
                                        "source": "ghsa",
                                        "severity_name": null,
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
                                        "id": "a243ae4f-c931-4235-9eff-6fbc29453172",
                                        "source_id": "GHSA-34r7-q49f-h37c",
                                        "source": "ghsa",
                                        "severity_name": null,
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
                                        "id": "5be56235-c292-486d-b23f-c59f10c53d64",
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
                "parent_id": "f09ff271-b7b9-776c-bc87-08f02dc80917",
                "child_id": "f2f2ae7b-8504-1e19-05d4-b28cdb3f0b6b",
                "id": "5eb22e4c-9365-4e81-9ec6-eeede77da876",
                "child": {
                    "id": "f2f2ae7b-8504-1e19-05d4-b28cdb3f0b6b",
                    "range": "^0.3.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "5588bafd-5122-4988-877c-833d7d9188b7",
                    "release": {
                        "id": "5588bafd-5122-4988-877c-833d7d9188b7",
                        "version": "0.3.0",
                        "package": {
                            "name": "strip-ansi",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "f09ff271-b7b9-776c-bc87-08f02dc80917",
                "child_id": "e79a807e-b70a-c2e0-ad1b-659ee6ebbd04",
                "id": "525f2259-d9f3-426a-84ca-755a28430a19",
                "child": {
                    "id": "e79a807e-b70a-c2e0-ad1b-659ee6ebbd04",
                    "range": "^1.1.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "6a5716e6-873a-4c28-bfd4-d15a5c1e3dc8",
                    "release": {
                        "id": "6a5716e6-873a-4c28-bfd4-d15a5c1e3dc8",
                        "version": "1.1.0",
                        "package": {
                            "name": "ansi-styles",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "f09ff271-b7b9-776c-bc87-08f02dc80917",
                "child_id": "b2ae9581-9de8-c8a1-fa72-6194f839ffcf",
                "id": "199ec2b6-320c-4e11-b106-c44aab7ec480",
                "child": {
                    "id": "b2ae9581-9de8-c8a1-fa72-6194f839ffcf",
                    "range": "^1.0.5",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "97bdc6c7-6351-49e6-b3ba-2a0270dd61f5",
                    "release": {
                        "id": "97bdc6c7-6351-49e6-b3ba-2a0270dd61f5",
                        "version": "1.0.5",
                        "package": {
                            "name": "escape-string-regexp",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "f09ff271-b7b9-776c-bc87-08f02dc80917",
                "child_id": "7e52520f-aadb-85ee-8791-8b7e9d03f5be",
                "id": "229bc13b-b7f5-4581-85b8-72e5cccaa8c0",
                "child": {
                    "id": "7e52520f-aadb-85ee-8791-8b7e9d03f5be",
                    "range": "^0.1.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "281aae9d-ae9f-4d92-bacc-e966bb6567fa",
                    "release": {
                        "id": "281aae9d-ae9f-4d92-bacc-e966bb6567fa",
                        "version": "0.1.0",
                        "package": {
                            "name": "has-ansi",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "f09ff271-b7b9-776c-bc87-08f02dc80917",
                "child_id": "1e75acec-8c60-d07b-6d7a-81ee0147e4a8",
                "id": "a4d36772-8466-4328-bb2f-641a709c26bf",
                "child": {
                    "id": "1e75acec-8c60-d07b-6d7a-81ee0147e4a8",
                    "range": "^0.2.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "1cd3e844-e9ad-4d01-a0d3-349d71b9304c",
                    "release": {
                        "id": "1cd3e844-e9ad-4d01-a0d3-349d71b9304c",
                        "version": "0.2.0",
                        "package": {
                            "name": "supports-color",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "ecb44f65-845a-8a08-1761-37f43e72645c",
                "child_id": "e682f525-ce16-81cc-ae82-fde9c096d7d8",
                "id": "c453d556-c516-4f53-9364-cabe6e39af89",
                "child": {
                    "id": "e682f525-ce16-81cc-ae82-fde9c096d7d8",
                    "range": "~0.1.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "058c6e3a-a179-493e-9fdb-41b7535ca531",
                    "release": {
                        "id": "058c6e3a-a179-493e-9fdb-41b7535ca531",
                        "version": "0.1.4",
                        "package": {
                            "name": "form-data",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "ecb44f65-845a-8a08-1761-37f43e72645c",
                "child_id": "de4f1fe5-6b54-237c-c57a-90abf4679765",
                "id": "054903e5-384a-498f-b8a4-171ee684e0a1",
                "child": {
                    "id": "de4f1fe5-6b54-237c-c57a-90abf4679765",
                    "range": "~0.4.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "28a4a87d-d997-435b-bdbf-269e372a91ca",
                    "release": {
                        "id": "28a4a87d-d997-435b-bdbf-269e372a91ca",
                        "version": "0.4.0",
                        "package": {
                            "name": "oauth-sign",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "ecb44f65-845a-8a08-1761-37f43e72645c",
                "child_id": "ddd6ca21-5620-cbf0-9d8c-1009c6a69328",
                "id": "ad63f6fb-848f-45be-a9a9-5dc6d7d67575",
                "child": {
                    "id": "ddd6ca21-5620-cbf0-9d8c-1009c6a69328",
                    "range": "^0.9.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "0593a916-853f-4680-816c-d828843cdb1f",
                    "release": {
                        "id": "0593a916-853f-4680-816c-d828843cdb1f",
                        "version": "0.9.5",
                        "package": {
                            "name": "bl",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "ae1dcb18-038f-483c-acdc-937136451e75",
                                        "source_id": "GHSA-wrw9-m778-g6mc",
                                        "source": "ghsa",
                                        "severity_name": "Medium",
                                        "cvss_score": null,
                                        "summary": "Memory Exposure in bl",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "0.9.5"
                                        },
                                        {
                                            "introduced": "1.0.0",
                                            "fixed": "1.0.1"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "09e7b740-ab2a-4bc7-bebb-71f0e6fcfceb",
                                        "source_id": "GHSA-pp7h-53gx-mx7r",
                                        "source": "ghsa",
                                        "severity_name": "Medium",
                                        "cvss_score": 6.5,
                                        "summary": "Remote Memory Exposure in bl",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "1.2.3"
                                        },
                                        {
                                            "introduced": "2.0.0",
                                            "fixed": "2.2.1"
                                        },
                                        {
                                            "introduced": "3.0.0",
                                            "fixed": "3.0.1"
                                        },
                                        {
                                            "introduced": "4.0.0",
                                            "fixed": "4.0.3"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "ecb44f65-845a-8a08-1761-37f43e72645c",
                "child_id": "ce0840b6-34d4-332b-b9f4-87ca3cf298bd",
                "id": "fed2685d-f498-4a69-b3da-ad47461b4102",
                "child": {
                    "id": "ce0840b6-34d4-332b-b9f4-87ca3cf298bd",
                    "range": "~1.0.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "6040d63a-50a1-4317-b297-d6351a661382",
                    "release": {
                        "id": "6040d63a-50a1-4317-b297-d6351a661382",
                        "version": "1.0.2",
                        "package": {
                            "name": "mime-types",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "ecb44f65-845a-8a08-1761-37f43e72645c",
                "child_id": "cca8de58-59b0-288d-05b8-681d84251a85",
                "id": "badd7378-84d3-4eb8-85bf-05d8a88bcf02",
                "child": {
                    "id": "cca8de58-59b0-288d-05b8-681d84251a85",
                    "range": "~0.5.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "3705ea1d-2d72-418a-916e-1f1edd45b8bf",
                    "release": {
                        "id": "3705ea1d-2d72-418a-916e-1f1edd45b8bf",
                        "version": "0.5.2",
                        "package": {
                            "name": "forever-agent",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "ecb44f65-845a-8a08-1761-37f43e72645c",
                "child_id": "c27bf57f-9595-8f35-7581-4d1484fff968",
                "id": "d33e4e62-2f49-418d-9597-f31748b0d310",
                "child": {
                    "id": "c27bf57f-9595-8f35-7581-4d1484fff968",
                    "range": "~1.2.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "d3e934a5-4b09-449b-b980-a0a84e6129a6",
                    "release": {
                        "id": "d3e934a5-4b09-449b-b980-a0a84e6129a6",
                        "version": "1.2.2",
                        "package": {
                            "name": "qs",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "e9050ca8-e5b7-4ed2-b88e-01235da0c165",
                                        "source_id": "GHSA-jjv7-qpx3-h62q",
                                        "source": "ghsa",
                                        "severity_name": null,
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
                                        "id": "282e73dc-75b0-47f6-a65c-863c71ad224a",
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
                                        "id": "36560865-327c-4393-b0a5-1637f16f235f",
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
                                },
                                {
                                    "vulnerability": {
                                        "id": "7d32681a-1370-4d06-a023-803106111dac",
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
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "ecb44f65-845a-8a08-1761-37f43e72645c",
                "child_id": "bfbb9c9f-9339-8c0e-0f82-d02db97a5645",
                "id": "32ad5191-67f6-4b7f-a32d-d9347f6dc91b",
                "child": {
                    "id": "bfbb9c9f-9339-8c0e-0f82-d02db97a5645",
                    "range": "1.1.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "574c8eea-b602-4850-9041-1ba6d65511b2",
                    "release": {
                        "id": "574c8eea-b602-4850-9041-1ba6d65511b2",
                        "version": "1.1.1",
                        "package": {
                            "name": "hawk",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "4166263d-578e-4019-98e2-6b01d33546e6",
                                        "source_id": "GHSA-44pw-h2cw-w3vq",
                                        "source": "ghsa",
                                        "severity_name": null,
                                        "cvss_score": 7.4,
                                        "summary": "Uncontrolled Resource Consumption in Hawk",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "9.0.1"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "7c184ac0-d271-4c01-8342-781e7fded388",
                                        "source_id": "GHSA-jcpv-g9rr-qxrc",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": 7.5,
                                        "summary": "Regular Expression Denial of Service in hawk",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "3.1.3"
                                        },
                                        {
                                            "introduced": "4.0.0",
                                            "fixed": "4.1.1"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "ecb44f65-845a-8a08-1761-37f43e72645c",
                "child_id": "bb60001e-f7d0-fe58-d6cd-5cacd40129fb",
                "id": "87c00d01-619a-411c-b1a4-6fa41d56396f",
                "child": {
                    "id": "bb60001e-f7d0-fe58-d6cd-5cacd40129fb",
                    "range": "~1.4.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "4bcacd42-d242-461e-ba34-617b1f59bdbb",
                    "release": {
                        "id": "4bcacd42-d242-461e-ba34-617b1f59bdbb",
                        "version": "1.4.8",
                        "package": {
                            "name": "node-uuid",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "81eb7c7f-6b41-466c-9460-1d5895e97379",
                                        "source_id": "GHSA-265q-28rp-chq5",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": 7.5,
                                        "summary": "Insecure Entropy Source - Math.random() in node-uuid",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "1.4.4"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "ecb44f65-845a-8a08-1761-37f43e72645c",
                "child_id": "725f6588-469e-b7a6-98ec-f8fb206eaa02",
                "id": "ec29a9a0-1456-415e-aad7-962d1c5c77dd",
                "child": {
                    "id": "725f6588-469e-b7a6-98ec-f8fb206eaa02",
                    "range": "~0.10.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "afa9d936-3b1f-4985-a78e-96050a14e205",
                    "release": {
                        "id": "afa9d936-3b1f-4985-a78e-96050a14e205",
                        "version": "0.10.1",
                        "package": {
                            "name": "http-signature",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "ab478de8-4fa9-48e3-a126-a8d9aa63646a",
                                        "source_id": "GHSA-q257-vv4p-fg92",
                                        "source": "ghsa",
                                        "severity_name": "Low",
                                        "cvss_score": null,
                                        "summary": "Header Forgery in http-signature",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "0.10.0"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "ecb44f65-845a-8a08-1761-37f43e72645c",
                "child_id": "68fff1b5-b2bf-940e-1344-64dc74df502e",
                "id": "79ff9319-0e74-4fe6-a7c7-effc5db9a0c0",
                "child": {
                    "id": "68fff1b5-b2bf-940e-1344-64dc74df502e",
                    "range": "~5.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "85396bf8-a54f-48e5-9464-221cab2c6704",
                    "release": {
                        "id": "85396bf8-a54f-48e5-9464-221cab2c6704",
                        "version": "5.0.1",
                        "package": {
                            "name": "json-stringify-safe",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "ecb44f65-845a-8a08-1761-37f43e72645c",
                "child_id": "41c2e95c-ec5f-390d-0027-9603c0e8d9ed",
                "id": "71bb3e3f-cd31-4f98-ab80-04a505ec3777",
                "child": {
                    "id": "41c2e95c-ec5f-390d-0027-9603c0e8d9ed",
                    "range": "~0.4.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "3788161d-6d11-4ead-9ac2-4b2560d2fc4f",
                    "release": {
                        "id": "3788161d-6d11-4ead-9ac2-4b2560d2fc4f",
                        "version": "0.4.3",
                        "package": {
                            "name": "tunnel-agent",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "495910d2-4f10-4c26-877c-4523d7ca0d5d",
                                        "source_id": "GHSA-xc7v-wxcw-j472",
                                        "source": "ghsa",
                                        "severity_name": "Medium",
                                        "cvss_score": null,
                                        "summary": "Memory Exposure in tunnel-agent",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "0.6.0"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "ecb44f65-845a-8a08-1761-37f43e72645c",
                "child_id": "393040af-6926-d210-02a0-f5d97a8700d7",
                "id": "38f94d8a-707f-4738-9e52-be43f702fe12",
                "child": {
                    "id": "393040af-6926-d210-02a0-f5d97a8700d7",
                    "range": ">=0.12.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "2e10d6fe-a406-4969-b59d-407560cfaf54",
                    "release": {
                        "id": "2e10d6fe-a406-4969-b59d-407560cfaf54",
                        "version": "4.0.0",
                        "package": {
                            "name": "tough-cookie",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "685920ef-2793-4f1d-bf45-d975efff1344",
                                        "source_id": "GHSA-g7q5-pjjr-gqvp",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": 7.5,
                                        "summary": "Regular Expression Denial of Service in tough-cookie",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "2.3.3"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "10a2d39a-dc2f-492b-a36f-2c55a81cbf31",
                                        "source_id": "GHSA-qhv9-728r-6jqg",
                                        "source": "ghsa",
                                        "severity_name": "Medium",
                                        "cvss_score": 5.3,
                                        "summary": "ReDoS via long string of semicolons in tough-cookie",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "2.3.0"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "ecb44f65-845a-8a08-1761-37f43e72645c",
                "child_id": "204dca54-b106-17a0-a811-1f2c56a6b89c",
                "id": "beaae139-efb5-4f7a-9826-953d0dbcc2ba",
                "child": {
                    "id": "204dca54-b106-17a0-a811-1f2c56a6b89c",
                    "range": "~0.5.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "d3c06d3f-405c-440d-a15a-7b9234e32c5c",
                    "release": {
                        "id": "d3c06d3f-405c-440d-a15a-7b9234e32c5c",
                        "version": "0.5.0",
                        "package": {
                            "name": "aws-sign2",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "ecb44f65-845a-8a08-1761-37f43e72645c",
                "child_id": "0f6916c8-eb0a-2111-44c9-1c9db450d9f7",
                "id": "8d8f0114-a4ae-4042-b51e-93ab645cdc44",
                "child": {
                    "id": "0f6916c8-eb0a-2111-44c9-1c9db450d9f7",
                    "range": "~0.6.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "ecc6f205-1e36-4ba0-b9b7-32d85d185422",
                    "release": {
                        "id": "ecc6f205-1e36-4ba0-b9b7-32d85d185422",
                        "version": "0.6.0",
                        "package": {
                            "name": "caseless",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "ecb44f65-845a-8a08-1761-37f43e72645c",
                "child_id": "04722eb2-aaa7-d050-8fcc-a3bc2a5f4176",
                "id": "0df3f197-1434-4ed4-bd59-dae78e1414d4",
                "child": {
                    "id": "04722eb2-aaa7-d050-8fcc-a3bc2a5f4176",
                    "range": "~0.0.4",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "3a574489-400b-4b51-ab09-b5c16d8d833f",
                    "release": {
                        "id": "3a574489-400b-4b51-ab09-b5c16d8d833f",
                        "version": "0.0.6",
                        "package": {
                            "name": "stringstream",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "6e5c72f1-a35a-4a61-9d9d-7720cfdd203b",
                                        "source_id": "GHSA-mf6x-7mm4-x2g7",
                                        "source": "ghsa",
                                        "severity_name": "Medium",
                                        "cvss_score": null,
                                        "summary": "Out-of-bounds Read in stringstream",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "0.0.6"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "2d690170-9b39-4bd6-bafe-8f49853c5596",
                                        "source_id": "GHSA-qpw2-xchm-655q",
                                        "source": "ghsa",
                                        "severity_name": "Medium",
                                        "cvss_score": 6.5,
                                        "summary": "Out-of-Bounds read in stringstream",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "0.0.6"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "d2ecb0b2-66cd-c8e7-4dfa-ae4bd77e86ba",
                "child_id": "513fa77f-b7c2-af7d-eedd-e515e63f2286",
                "id": "390dfd81-a29b-4239-80a3-c1a79d474cc3",
                "child": {
                    "id": "513fa77f-b7c2-af7d-eedd-e515e63f2286",
                    "range": "~0.0.2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "8fa03ab4-a7ec-46e2-8942-39b1034c4759",
                    "release": {
                        "id": "8fa03ab4-a7ec-46e2-8942-39b1034c4759",
                        "version": "0.0.2",
                        "package": {
                            "name": "throttleit",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "cf15a087-aac8-0c30-4201-b56454b465ee",
                "child_id": "e2cbfd71-de51-78c9-8288-eb3acdf84aea",
                "id": "97b88d6a-cba9-45f1-9b59-152378d8cdd1",
                "child": {
                    "id": "e2cbfd71-de51-78c9-8288-eb3acdf84aea",
                    "range": "~0.9.2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "ed1dce7a-54be-4f0f-9046-2bb431809f56",
                    "release": {
                        "id": "ed1dce7a-54be-4f0f-9046-2bb431809f56",
                        "version": "0.9.7",
                        "package": {
                            "name": "q",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "ceffa740-00f6-696e-388a-a725266f11f8",
                "child_id": "c30e5cbe-48d1-d41f-6742-035418c04fa8",
                "id": "0041f2d1-b28e-427e-b70b-4871f66b1fe7",
                "child": {
                    "id": "c30e5cbe-48d1-d41f-6742-035418c04fa8",
                    "range": "^3.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "ff59a40d-fed9-4e6d-beef-d3fc0dbced94",
                    "release": {
                        "id": "ff59a40d-fed9-4e6d-beef-d3fc0dbced94",
                        "version": "3.1.2",
                        "package": {
                            "name": "minimatch",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "9ee1009d-38c5-43d3-b28b-874f0e8fc32f",
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
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "ceffa740-00f6-696e-388a-a725266f11f8",
                "child_id": "6c1e9ceb-61c5-dfc8-d270-394b4903bb35",
                "id": "291fdd27-2fdb-4243-9149-c4146e194723",
                "child": {
                    "id": "6c1e9ceb-61c5-dfc8-d270-394b4903bb35",
                    "range": "~1.0.2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "fa250e3e-6137-4b1d-84fb-922e781b40b2",
                    "release": {
                        "id": "fa250e3e-6137-4b1d-84fb-922e781b40b2",
                        "version": "1.0.12",
                        "package": {
                            "name": "fstream",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "57ca188d-5cf4-4508-b0cd-c523fca10d82",
                                        "source_id": "GHSA-xf7w-r453-m56c",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": 7.5,
                                        "summary": "Arbitrary File Overwrite in fstream",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "1.0.12"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "ceffa740-00f6-696e-388a-a725266f11f8",
                "child_id": "48b522b9-45b0-0efb-9269-9de40666cee0",
                "id": "b5ff174c-c6c2-4600-8a68-c87593d4fb77",
                "child": {
                    "id": "48b522b9-45b0-0efb-9269-9de40666cee0",
                    "range": "^2.0.3",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "47eeabb9-0f9c-42ac-933c-0e1fe5154350",
                    "release": {
                        "id": "47eeabb9-0f9c-42ac-933c-0e1fe5154350",
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
                "parent_id": "aec82ef4-84da-6be0-4385-f8e24f32f75f",
                "child_id": "48b522b9-45b0-0efb-9269-9de40666cee0",
                "id": "f8392c9a-c34d-454d-b644-493edd334977",
                "child": {
                    "id": "48b522b9-45b0-0efb-9269-9de40666cee0",
                    "range": "^2.0.3",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "47eeabb9-0f9c-42ac-933c-0e1fe5154350",
                    "release": {
                        "id": "47eeabb9-0f9c-42ac-933c-0e1fe5154350",
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
                "parent_id": "aec82ef4-84da-6be0-4385-f8e24f32f75f",
                "child_id": "39cea088-a9f3-7588-3c58-2fbc01d817dd",
                "id": "bf86fae5-752b-4877-bc65-c6681382d3dc",
                "child": {
                    "id": "39cea088-a9f3-7588-3c58-2fbc01d817dd",
                    "range": "~3.0.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "f062020c-ca5f-46f2-8544-2d217bc1988b",
                    "release": {
                        "id": "f062020c-ca5f-46f2-8544-2d217bc1988b",
                        "version": "3.0.12",
                        "package": {
                            "name": "graceful-fs",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "aec82ef4-84da-6be0-4385-f8e24f32f75f",
                "child_id": "3487915d-7521-2260-6bca-c6dc705e09e0",
                "id": "08bfa966-9429-4cca-a9c1-76fb50a848de",
                "child": {
                    "id": "3487915d-7521-2260-6bca-c6dc705e09e0",
                    "range": "^1.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "f89e00bb-c64a-4c66-8d56-948f84aa400b",
                    "release": {
                        "id": "f89e00bb-c64a-4c66-8d56-948f84aa400b",
                        "version": "1.0.0",
                        "package": {
                            "name": "minimatch",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "9ee1009d-38c5-43d3-b28b-874f0e8fc32f",
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
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "aec82ef4-84da-6be0-4385-f8e24f32f75f",
                "child_id": "18210398-ef09-02c2-dd07-1a6bbc286082",
                "id": "715d8764-fa4b-4a5b-8d90-72b2f2f1cd9e",
                "child": {
                    "id": "18210398-ef09-02c2-dd07-1a6bbc286082",
                    "range": "^1.4.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "952d0b9c-55c8-4e92-839d-fabb0382b93c",
                    "release": {
                        "id": "952d0b9c-55c8-4e92-839d-fabb0382b93c",
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
                "parent_id": "91ee4fb4-2666-0d8f-8b9a-d85f6901db9a",
                "child_id": "4d1c646c-59f7-930d-71cb-4fd66c6957e6",
                "id": "290518c4-3268-44f1-9558-9dc2b5b066ac",
                "child": {
                    "id": "4d1c646c-59f7-930d-71cb-4fd66c6957e6",
                    "range": "^0.1.2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "69c86b4a-fbf6-4c8e-b86c-418d7fe150c8",
                    "release": {
                        "id": "69c86b4a-fbf6-4c8e-b86c-418d7fe150c8",
                        "version": "0.1.2",
                        "package": {
                            "name": "string-length",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "91ee4fb4-2666-0d8f-8b9a-d85f6901db9a",
                "child_id": "37a10d91-acbd-788e-6477-ac59449847af",
                "id": "3a2bff5c-3404-4bf2-8cbc-90b479efa410",
                "child": {
                    "id": "37a10d91-acbd-788e-6477-ac59449847af",
                    "range": "~0.5.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "c6e6fb9a-329b-441c-879d-e1364d7203a9",
                    "release": {
                        "id": "c6e6fb9a-329b-441c-879d-e1364d7203a9",
                        "version": "0.5.1",
                        "package": {
                            "name": "chalk",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "91ee4fb4-2666-0d8f-8b9a-d85f6901db9a",
                "child_id": "26af4568-f12e-e35f-6c78-3aaca2f206ee",
                "id": "bb8fa920-3c17-4fc2-b1cd-6bb2b1af805a",
                "child": {
                    "id": "26af4568-f12e-e35f-6c78-3aaca2f206ee",
                    "range": "^0.3.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "e79f3ebe-453f-40fb-a7c4-1addbc24421e",
                    "release": {
                        "id": "e79f3ebe-453f-40fb-a7c4-1addbc24421e",
                        "version": "0.3.2",
                        "package": {
                            "name": "configstore",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "91ee4fb4-2666-0d8f-8b9a-d85f6901db9a",
                "child_id": "1cd830cf-b8b5-e0e4-49d4-090253813e35",
                "id": "9491247b-642e-4427-a749-28da6a7686e3",
                "child": {
                    "id": "1cd830cf-b8b5-e0e4-49d4-090253813e35",
                    "range": "^0.1.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "dc604aed-66bc-4b1a-a52d-b32fb91fe583",
                    "release": {
                        "id": "dc604aed-66bc-4b1a-a52d-b32fb91fe583",
                        "version": "0.1.0",
                        "package": {
                            "name": "semver-diff",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "91ee4fb4-2666-0d8f-8b9a-d85f6901db9a",
                "child_id": "16895655-49ab-4c34-d2b1-a823f5cff9d0",
                "id": "1764e7cf-c8fb-43b6-8cf4-5deb939f2dcb",
                "child": {
                    "id": "16895655-49ab-4c34-d2b1-a823f5cff9d0",
                    "range": "^0.2.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "3d55ba7d-eab5-4550-bde8-5f5aba214b14",
                    "release": {
                        "id": "3d55ba7d-eab5-4550-bde8-5f5aba214b14",
                        "version": "0.2.0",
                        "package": {
                            "name": "latest-version",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "9172b009-cdfb-385e-a98c-2931a60188a6",
                "child_id": "c3be9cef-4752-7967-add4-ae6cfc1dfe6f",
                "id": "a789ccca-3697-4631-9894-44de24ba8c79",
                "child": {
                    "id": "c3be9cef-4752-7967-add4-ae6cfc1dfe6f",
                    "range": "~0.1.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "455a2c93-2121-4e1f-a0e0-daf7f8cbdf8e",
                    "release": {
                        "id": "455a2c93-2121-4e1f-a0e0-daf7f8cbdf8e",
                        "version": "0.1.1",
                        "package": {
                            "name": "readline2",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "9172b009-cdfb-385e-a98c-2931a60188a6",
                "child_id": "b04bf441-4fce-5dd6-6d63-72bfa17372ba",
                "id": "39aa05cd-d4cd-4f57-9d4f-ead86c43ba13",
                "child": {
                    "id": "b04bf441-4fce-5dd6-6d63-72bfa17372ba",
                    "range": "~2.4.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "2b29afdf-6ff4-40c3-972e-27d726a04ab9",
                    "release": {
                        "id": "2b29afdf-6ff4-40c3-972e-27d726a04ab9",
                        "version": "2.4.2",
                        "package": {
                            "name": "lodash",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "ec3a4329-493a-432c-b340-44eb59a7f111",
                                        "source_id": "GHSA-jf85-cpcp-j695",
                                        "source": "ghsa",
                                        "severity_name": "Critical",
                                        "cvss_score": 9.1,
                                        "summary": "Prototype Pollution in lodash",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "4.17.12"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "9cb1d5ac-9802-42de-8f74-7ee219eb30ae",
                                        "source_id": "GHSA-4xc9-xhrj-v574",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": null,
                                        "summary": "Prototype Pollution in lodash",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "4.17.11"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "4d4be38d-1e7f-41d3-8a43-ec1ff19dfe5c",
                                        "source_id": "GHSA-x5rq-j2xg-h7qm",
                                        "source": "ghsa",
                                        "severity_name": "Medium",
                                        "cvss_score": null,
                                        "summary": "Regular Expression Denial of Service (ReDoS) in lodash",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "4.17.11"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "4565e95f-8f85-4374-a638-8556e20430de",
                                        "source_id": "GHSA-fvqr-27wr-82fm",
                                        "source": "ghsa",
                                        "severity_name": "Low",
                                        "cvss_score": null,
                                        "summary": "Prototype Pollution in lodash",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "4.17.5"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "ddbcb8d9-a3fe-4e43-b88a-8498b45c2f59",
                                        "source_id": "GHSA-35jh-r3h4-6jhm",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": 7.2,
                                        "summary": "Command Injection in lodash",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "4.17.21"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "7f704fd4-a981-451e-bd29-2fb74a296b5f",
                                        "source_id": "GHSA-p6mc-m468-83gw",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": 7.4,
                                        "summary": "Prototype Pollution in lodash",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "4.17.20"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "649a016e-2205-428e-95e7-41d4e2511ffd",
                                        "source_id": "GHSA-8p5q-j9m2-g8wr",
                                        "source": "ghsa",
                                        "severity_name": "Low",
                                        "cvss_score": 9.8,
                                        "summary": "Withdrawn: Arbitrary code execution in lodash",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": null
                                        },
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": null
                                        },
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": null
                                        },
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": null
                                        },
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": null
                                        },
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": null
                                        },
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": null
                                        },
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": null
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "3c05bb46-4b73-4863-a45e-e6ea8c45379b",
                                        "source_id": "GHSA-29mw-wpgm-hmr9",
                                        "source": "ghsa",
                                        "severity_name": "Medium",
                                        "cvss_score": 5.3,
                                        "summary": "Regular Expression Denial of Service (ReDoS) in lodash",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "4.17.21"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "9172b009-cdfb-385e-a98c-2931a60188a6",
                "child_id": "85de69d1-d14d-aa28-47b5-03059bd59e3e",
                "id": "1ea6202c-4600-456c-9c11-6089e834e4af",
                "child": {
                    "id": "85de69d1-d14d-aa28-47b5-03059bd59e3e",
                    "range": "0.0.4",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "8ca72293-2354-4b73-96d0-dd40f773ca2b",
                    "release": {
                        "id": "8ca72293-2354-4b73-96d0-dd40f773ca2b",
                        "version": "0.0.4",
                        "package": {
                            "name": "mute-stream",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "9172b009-cdfb-385e-a98c-2931a60188a6",
                "child_id": "845ce936-d0d8-0533-bd8f-3afe5af9e9b4",
                "id": "53ac001a-a81e-4cba-ad44-9e9d78105bb1",
                "child": {
                    "id": "845ce936-d0d8-0533-bd8f-3afe5af9e9b4",
                    "range": "^1.3.2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "52e7b566-7d13-47ff-9a2d-9474bab44df8",
                    "release": {
                        "id": "52e7b566-7d13-47ff-9a2d-9474bab44df8",
                        "version": "1.7.0",
                        "package": {
                            "name": "figures",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "9172b009-cdfb-385e-a98c-2931a60188a6",
                "child_id": "4f559dc1-3ade-1d25-badc-c4fd69c916ce",
                "id": "5cd2fa67-6bb3-47bf-b539-cb4d710c4cdf",
                "child": {
                    "id": "4f559dc1-3ade-1d25-badc-c4fd69c916ce",
                    "range": "~0.3.2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "27f91a55-54e0-40b5-a698-6e6e6ed69c54",
                    "release": {
                        "id": "27f91a55-54e0-40b5-a698-6e6e6ed69c54",
                        "version": "0.3.3",
                        "package": {
                            "name": "cli-color",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "9172b009-cdfb-385e-a98c-2931a60188a6",
                "child_id": "37a10d91-acbd-788e-6477-ac59449847af",
                "id": "60faedc9-2053-4074-91ee-bcdfe02a2647",
                "child": {
                    "id": "37a10d91-acbd-788e-6477-ac59449847af",
                    "range": "~0.5.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "c6e6fb9a-329b-441c-879d-e1364d7203a9",
                    "release": {
                        "id": "c6e6fb9a-329b-441c-879d-e1364d7203a9",
                        "version": "0.5.1",
                        "package": {
                            "name": "chalk",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "9172b009-cdfb-385e-a98c-2931a60188a6",
                "child_id": "356157e5-5a68-81c2-b9d1-dafd8895580b",
                "id": "0d5327f9-2387-4b12-87cb-90c7f38fed4c",
                "child": {
                    "id": "356157e5-5a68-81c2-b9d1-dafd8895580b",
                    "range": "^2.2.27",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "8ab49c8c-048a-44b8-ad7e-b008dd62990d",
                    "release": {
                        "id": "8ab49c8c-048a-44b8-ad7e-b008dd62990d",
                        "version": "2.5.3",
                        "package": {
                            "name": "rx",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "9172b009-cdfb-385e-a98c-2931a60188a6",
                "child_id": "001e1efb-6ea7-bdd0-cd20-179e033503b7",
                "id": "d1d2b3db-b418-4a0e-a456-4097e4e65cec",
                "child": {
                    "id": "001e1efb-6ea7-bdd0-cd20-179e033503b7",
                    "range": "2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "bb74e822-ff83-4267-aaba-04dd389efb9a",
                    "release": {
                        "id": "bb74e822-ff83-4267-aaba-04dd389efb9a",
                        "version": "2.3.8",
                        "package": {
                            "name": "through",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "6c1e9ceb-61c5-dfc8-d270-394b4903bb35",
                "child_id": "f716439d-d58c-b000-d977-877632ec39ec",
                "id": "51810c13-6cb5-4de9-b7ec-eaefabf0319d",
                "child": {
                    "id": "f716439d-d58c-b000-d977-877632ec39ec",
                    "range": "2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "1875b321-73a1-4256-8968-6f837a6410a7",
                    "release": {
                        "id": "1875b321-73a1-4256-8968-6f837a6410a7",
                        "version": "2.7.1",
                        "package": {
                            "name": "rimraf",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "6c1e9ceb-61c5-dfc8-d270-394b4903bb35",
                "child_id": "c1d1eb61-07a0-4a3f-3a4b-1160edb70c15",
                "id": "88a74556-759b-4597-a03c-74d631d5b531",
                "child": {
                    "id": "c1d1eb61-07a0-4a3f-3a4b-1160edb70c15",
                    "range": "^4.1.2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "b8153bed-ed14-4b80-af04-df2368bc0f4f",
                    "release": {
                        "id": "b8153bed-ed14-4b80-af04-df2368bc0f4f",
                        "version": "4.2.10",
                        "package": {
                            "name": "graceful-fs",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "6c1e9ceb-61c5-dfc8-d270-394b4903bb35",
                "child_id": "b70333f5-9309-4e77-b8cc-6dfbdbaf4a82",
                "id": "b9b8d9db-7ac3-486d-a0c5-1a6c7b4c3d4e",
                "child": {
                    "id": "b70333f5-9309-4e77-b8cc-6dfbdbaf4a82",
                    "range": ">=0.5 0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "baadfbde-755c-42f2-998e-0316d739646c",
                    "release": {
                        "id": "baadfbde-755c-42f2-998e-0316d739646c",
                        "version": "0.5.6",
                        "package": {
                            "name": "mkdirp",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "6c1e9ceb-61c5-dfc8-d270-394b4903bb35",
                "child_id": "48b522b9-45b0-0efb-9269-9de40666cee0",
                "id": "9decb009-38b9-463e-8944-0d1396ac1cf6",
                "child": {
                    "id": "48b522b9-45b0-0efb-9269-9de40666cee0",
                    "range": "^2.0.3",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "47eeabb9-0f9c-42ac-933c-0e1fe5154350",
                    "release": {
                        "id": "47eeabb9-0f9c-42ac-933c-0e1fe5154350",
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
                "parent_id": "6a812a6f-f4d2-5d71-952f-b83a6312436e",
                "child_id": "ff62d72e-d04a-c7f7-5b3e-036dc8641908",
                "id": "310b8695-0bf2-4acd-b114-4dedd3d7e38e",
                "child": {
                    "id": "ff62d72e-d04a-c7f7-5b3e-036dc8641908",
                    "range": "^2.4.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "b7feffd7-4566-4943-8f27-0fee76e0f05c",
                    "release": {
                        "id": "b7feffd7-4566-4943-8f27-0fee76e0f05c",
                        "version": "2.4.1",
                        "package": {
                            "name": "lodash.debounce",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "6a812a6f-f4d2-5d71-952f-b83a6312436e",
                "child_id": "ef170009-bd35-f315-e792-025f828755a2",
                "id": "ce52580d-7661-4673-af0f-459cc2fba1f6",
                "child": {
                    "id": "ef170009-bd35-f315-e792-025f828755a2",
                    "range": "^2.40.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "703df88c-840e-4c9b-a94e-f2f352a1801f",
                    "release": {
                        "id": "703df88c-840e-4c9b-a94e-f2f352a1801f",
                        "version": "2.88.2",
                        "package": {
                            "name": "request",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "cd00cfb1-dc83-42ea-a085-a96275e22377",
                                        "source_id": "GHSA-7xfp-9c55-5vqj",
                                        "source": "ghsa",
                                        "severity_name": "Medium",
                                        "cvss_score": null,
                                        "summary": "Remote Memory Exposure in request",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "2.2.6",
                                            "fixed": "2.68.0"
                                        },
                                        {
                                            "introduced": "2.49.0",
                                            "fixed": "2.68.0"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "6a812a6f-f4d2-5d71-952f-b83a6312436e",
                "child_id": "edd10efd-a1e1-24d6-9d97-97272635356e",
                "id": "67c51115-abbc-4833-860c-5b286204ea17",
                "child": {
                    "id": "edd10efd-a1e1-24d6-9d97-97272635356e",
                    "range": "^0.6.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "f53b65ae-f310-44e4-8b49-5868a6ae084c",
                    "release": {
                        "id": "f53b65ae-f310-44e4-8b49-5868a6ae084c",
                        "version": "0.6.0",
                        "package": {
                            "name": "inquirer",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "6a812a6f-f4d2-5d71-952f-b83a6312436e",
                "child_id": "b31da7a6-6a88-c0cc-de9a-16b0fdc8d603",
                "id": "8f06b070-e475-47bf-91c9-63ba26245bc7",
                "child": {
                    "id": "b31da7a6-6a88-c0cc-de9a-16b0fdc8d603",
                    "range": "^0.12.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "b3090d00-9955-4032-ada4-5def24a4d12d",
                    "release": {
                        "id": "b3090d00-9955-4032-ada4-5def24a4d12d",
                        "version": "0.12.1",
                        "package": {
                            "name": "tough-cookie",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "685920ef-2793-4f1d-bf45-d975efff1344",
                                        "source_id": "GHSA-g7q5-pjjr-gqvp",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": 7.5,
                                        "summary": "Regular Expression Denial of Service in tough-cookie",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "2.3.3"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "10a2d39a-dc2f-492b-a36f-2c55a81cbf31",
                                        "source_id": "GHSA-qhv9-728r-6jqg",
                                        "source": "ghsa",
                                        "severity_name": "Medium",
                                        "cvss_score": 5.3,
                                        "summary": "ReDoS via long string of semicolons in tough-cookie",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "2.3.0"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "6a812a6f-f4d2-5d71-952f-b83a6312436e",
                "child_id": "83466041-f12d-a88e-868a-cf250aa63428",
                "id": "ca8539d3-5fc1-4df9-b117-f95e6541b0fb",
                "child": {
                    "id": "83466041-f12d-a88e-868a-cf250aa63428",
                    "range": "^1.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "05d3dca7-5560-4a9c-81d7-705af0f71e0f",
                    "release": {
                        "id": "05d3dca7-5560-4a9c-81d7-705af0f71e0f",
                        "version": "1.0.0",
                        "package": {
                            "name": "object-assign",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "6a812a6f-f4d2-5d71-952f-b83a6312436e",
                "child_id": "446b3966-6be5-f375-1288-514b249b357c",
                "id": "c4a30630-5e8f-4692-a239-bf5e4049f2fd",
                "child": {
                    "id": "446b3966-6be5-f375-1288-514b249b357c",
                    "range": "^0.9.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "ddfa8a5b-f5c6-46e6-b57e-8ce2877f8384",
                    "release": {
                        "id": "ddfa8a5b-f5c6-46e6-b57e-8ce2877f8384",
                        "version": "0.9.2",
                        "package": {
                            "name": "async",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "de2e897c-13bb-4e3a-b35a-872a3c39bfe3",
                                        "source_id": "GHSA-fwr7-v2mv-hh25",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": 7.8,
                                        "summary": "Prototype Pollution in async",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "2.0.0",
                                            "fixed": "2.6.4"
                                        },
                                        {
                                            "introduced": "3.0.0",
                                            "fixed": "3.2.2"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "6a812a6f-f4d2-5d71-952f-b83a6312436e",
                "child_id": "38005c83-2172-7ad4-14a2-9569676361fe",
                "id": "adfc5aa7-5bac-4e21-b96f-c98605bc7640",
                "child": {
                    "id": "38005c83-2172-7ad4-14a2-9569676361fe",
                    "range": "^1.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "0852af5c-3217-4829-9ab7-0e3938eeab3e",
                    "release": {
                        "id": "0852af5c-3217-4829-9ab7-0e3938eeab3e",
                        "version": "1.0.3",
                        "package": {
                            "name": "os-name",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "6a812a6f-f4d2-5d71-952f-b83a6312436e",
                "child_id": "37a10d91-acbd-788e-6477-ac59449847af",
                "id": "3e3e62fb-1247-4c53-9d06-64a9c6d8f669",
                "child": {
                    "id": "37a10d91-acbd-788e-6477-ac59449847af",
                    "range": "~0.5.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "c6e6fb9a-329b-441c-879d-e1364d7203a9",
                    "release": {
                        "id": "c6e6fb9a-329b-441c-879d-e1364d7203a9",
                        "version": "0.5.1",
                        "package": {
                            "name": "chalk",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "6a812a6f-f4d2-5d71-952f-b83a6312436e",
                "child_id": "26af4568-f12e-e35f-6c78-3aaca2f206ee",
                "id": "a6456444-46a0-460c-8107-fbc9c5b173ec",
                "child": {
                    "id": "26af4568-f12e-e35f-6c78-3aaca2f206ee",
                    "range": "^0.3.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "e79f3ebe-453f-40fb-a7c4-1addbc24421e",
                    "release": {
                        "id": "e79f3ebe-453f-40fb-a7c4-1addbc24421e",
                        "version": "0.3.2",
                        "package": {
                            "name": "configstore",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "5c994d00-36ff-eb6d-0801-c461744df79a",
                "child_id": "fea6d467-587b-a299-11bb-fc58f2d25a87",
                "id": "f7ad58d6-48c1-4657-9b59-69d95a1888be",
                "child": {
                    "id": "fea6d467-587b-a299-11bb-fc58f2d25a87",
                    "range": "~2.51.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "99747927-b5e5-4bfa-82c7-30cf0a4fbd89",
                    "release": {
                        "id": "99747927-b5e5-4bfa-82c7-30cf0a4fbd89",
                        "version": "2.51.0",
                        "package": {
                            "name": "request",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "cd00cfb1-dc83-42ea-a085-a96275e22377",
                                        "source_id": "GHSA-7xfp-9c55-5vqj",
                                        "source": "ghsa",
                                        "severity_name": "Medium",
                                        "cvss_score": null,
                                        "summary": "Remote Memory Exposure in request",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "2.2.6",
                                            "fixed": "2.68.0"
                                        },
                                        {
                                            "introduced": "2.49.0",
                                            "fixed": "2.68.0"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "5c994d00-36ff-eb6d-0801-c461744df79a",
                "child_id": "f9cc8aaa-e5eb-d0e6-0092-8384f8d1177d",
                "id": "f01f7d9a-0075-4a0c-ad52-cd59db8e9b86",
                "child": {
                    "id": "f9cc8aaa-e5eb-d0e6-0092-8384f8d1177d",
                    "range": "~2.2.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "13ce85e4-dbb4-41bc-8639-1625dd1bde4f",
                    "release": {
                        "id": "13ce85e4-dbb4-41bc-8639-1625dd1bde4f",
                        "version": "2.2.8",
                        "package": {
                            "name": "rimraf",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "5c994d00-36ff-eb6d-0801-c461744df79a",
                "child_id": "cd84ab0c-4e5d-424c-09ef-eb4b116a2d6e",
                "id": "5bb22346-1d80-4d2f-a4cd-32caae3bf3ae",
                "child": {
                    "id": "cd84ab0c-4e5d-424c-09ef-eb4b116a2d6e",
                    "range": "~0.3.5",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "e27545fc-1ec0-4217-b01f-96cbe95177a3",
                    "release": {
                        "id": "e27545fc-1ec0-4217-b01f-96cbe95177a3",
                        "version": "0.3.5",
                        "package": {
                            "name": "mkdirp",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "5c994d00-36ff-eb6d-0801-c461744df79a",
                "child_id": "c5979ee8-196d-a050-fbce-1628e58587f4",
                "id": "6a9a9856-39bd-4a9a-8ae7-21f0452bce1e",
                "child": {
                    "id": "c5979ee8-196d-a050-fbce-1628e58587f4",
                    "range": "~0.2.6",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "f516129e-8b04-41d8-b881-638c24be8d40",
                    "release": {
                        "id": "f516129e-8b04-41d8-b881-638c24be8d40",
                        "version": "0.2.10",
                        "package": {
                            "name": "async",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "de2e897c-13bb-4e3a-b35a-872a3c39bfe3",
                                        "source_id": "GHSA-fwr7-v2mv-hh25",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": 7.8,
                                        "summary": "Prototype Pollution in async",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "2.0.0",
                                            "fixed": "2.6.4"
                                        },
                                        {
                                            "introduced": "3.0.0",
                                            "fixed": "3.2.2"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "5c994d00-36ff-eb6d-0801-c461744df79a",
                "child_id": "b6e21dfa-52cb-4a93-c144-d7803d197374",
                "id": "48b386e3-7aa8-4f59-93ec-09c77c85ec06",
                "child": {
                    "id": "b6e21dfa-52cb-4a93-c144-d7803d197374",
                    "range": "~2.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "30d12a10-0c37-4738-bfb1-4f315a69bf7f",
                    "release": {
                        "id": "30d12a10-0c37-4738-bfb1-4f315a69bf7f",
                        "version": "2.0.3",
                        "package": {
                            "name": "graceful-fs",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "5c994d00-36ff-eb6d-0801-c461744df79a",
                "child_id": "70e7326c-ae26-a8d6-2231-45721a77b4da",
                "id": "ba07f7e8-81dd-479b-b1a7-6e15dcd70925",
                "child": {
                    "id": "70e7326c-ae26-a8d6-2231-45721a77b4da",
                    "range": "~0.2.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "d1f40102-8d37-4d8e-b369-6e4e2ab42049",
                    "release": {
                        "id": "d1f40102-8d37-4d8e-b369-6e4e2ab42049",
                        "version": "0.2.0",
                        "package": {
                            "name": "request-replay",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "5c994d00-36ff-eb6d-0801-c461744df79a",
                "child_id": "2e171d4b-5a5a-0c6f-a91d-ae2739396207",
                "id": "1385d3e1-473d-4ccb-9655-a02802e5dc48",
                "child": {
                    "id": "2e171d4b-5a5a-0c6f-a91d-ae2739396207",
                    "range": "~0.5.2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "c00da22d-d774-4ad8-96e2-9c66a708e201",
                    "release": {
                        "id": "c00da22d-d774-4ad8-96e2-9c66a708e201",
                        "version": "0.5.3",
                        "package": {
                            "name": "bower-config",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "5c994d00-36ff-eb6d-0801-c461744df79a",
                "child_id": "0aa03936-64b9-51b1-f44a-6334dd567b29",
                "id": "48f05c03-d294-4188-8b16-127703179653",
                "child": {
                    "id": "0aa03936-64b9-51b1-f44a-6334dd567b29",
                    "range": "~2.3.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "73d6f344-350c-4061-b4d0-5fd9b00000d5",
                    "release": {
                        "id": "73d6f344-350c-4061-b4d0-5fd9b00000d5",
                        "version": "2.3.1",
                        "package": {
                            "name": "lru-cache",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "5650c867-f843-a34b-76a9-0f47c870360e",
                "child_id": "90f228be-fc69-8d97-674f-724b909c2909",
                "id": "39f22558-d5a7-421d-a5a2-bf80f0a93ffb",
                "child": {
                    "id": "90f228be-fc69-8d97-674f-724b909c2909",
                    "range": "~0.4.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "1de80c50-36f3-4381-ae49-bd642bdc97e1",
                    "release": {
                        "id": "1de80c50-36f3-4381-ae49-bd642bdc97e1",
                        "version": "0.4.4",
                        "package": {
                            "name": "redeyed",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "3d9af5e9-4e06-0d2b-027b-ab0f64accd99",
                "child_id": "5be041b1-e009-68d3-6193-6bb3d5b64b59",
                "id": "4913be1f-75c4-4917-aedd-fa4c7e6ff4c4",
                "child": {
                    "id": "5be041b1-e009-68d3-6193-6bb3d5b64b59",
                    "range": "1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "06c99d8e-8760-450c-b69f-cb98f932d2a7",
                    "release": {
                        "id": "06c99d8e-8760-450c-b69f-cb98f932d2a7",
                        "version": "1.1.1",
                        "package": {
                            "name": "abbrev",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "3b673881-b05f-5609-cf33-d49c3e03d7eb",
                "child_id": "c4f44bfb-69c4-2bd2-f525-82bcfd119a4c",
                "id": "568e12b8-8a42-4e8f-b317-88f555908bef",
                "child": {
                    "id": "c4f44bfb-69c4-2bd2-f525-82bcfd119a4c",
                    "range": "~0.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "7d103b8d-3814-40a1-8dbc-df61117de92f",
                    "release": {
                        "id": "7d103b8d-3814-40a1-8dbc-df61117de92f",
                        "version": "0.0.0",
                        "package": {
                            "name": "array-reduce",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "3b673881-b05f-5609-cf33-d49c3e03d7eb",
                "child_id": "bc821378-6493-bc84-dc96-1fc95a433815",
                "id": "47375e83-a2f5-4841-91de-00043d9b213f",
                "child": {
                    "id": "bc821378-6493-bc84-dc96-1fc95a433815",
                    "range": "~0.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "60326384-f800-417d-acf3-4271f68cc70e",
                    "release": {
                        "id": "60326384-f800-417d-acf3-4271f68cc70e",
                        "version": "0.0.0",
                        "package": {
                            "name": "jsonify",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "3b673881-b05f-5609-cf33-d49c3e03d7eb",
                "child_id": "a8aaf50c-b3b4-3f4e-f87b-58fdc012dfb0",
                "id": "6c36ec20-0f4b-4725-909e-3a8343077857",
                "child": {
                    "id": "a8aaf50c-b3b4-3f4e-f87b-58fdc012dfb0",
                    "range": "~0.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "11877476-1522-42eb-b132-f3a5879468c0",
                    "release": {
                        "id": "11877476-1522-42eb-b132-f3a5879468c0",
                        "version": "0.0.0",
                        "package": {
                            "name": "array-map",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "3b673881-b05f-5609-cf33-d49c3e03d7eb",
                "child_id": "705306e9-6ff5-b967-ada6-50f7c70de7d8",
                "id": "5fe1df6c-d404-45d6-b09b-46d8daec9f30",
                "child": {
                    "id": "705306e9-6ff5-b967-ada6-50f7c70de7d8",
                    "range": "~0.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "03e5d745-cd4b-4c79-bcdc-0fe2aacf86e0",
                    "release": {
                        "id": "03e5d745-cd4b-4c79-bcdc-0fe2aacf86e0",
                        "version": "0.0.1",
                        "package": {
                            "name": "array-filter",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "39cea088-a9f3-7588-3c58-2fbc01d817dd",
                "child_id": "f7de74cb-bb0b-3f7a-9658-db96a9833ece",
                "id": "88e68745-8d76-4cdf-9f85-82902d5eab61",
                "child": {
                    "id": "f7de74cb-bb0b-3f7a-9658-db96a9833ece",
                    "range": "^1.1.3",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "6e3278e4-07de-465f-8af3-fb5f7c0b6c21",
                    "release": {
                        "id": "6e3278e4-07de-465f-8af3-fb5f7c0b6c21",
                        "version": "1.1.6",
                        "package": {
                            "name": "natives",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "2e171d4b-5a5a-0c6f-a91d-ae2739396207",
                "child_id": "b6e21dfa-52cb-4a93-c144-d7803d197374",
                "id": "990d53fd-8f89-4e4e-8bf2-801a1fe05616",
                "child": {
                    "id": "b6e21dfa-52cb-4a93-c144-d7803d197374",
                    "range": "~2.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "30d12a10-0c37-4738-bfb1-4f315a69bf7f",
                    "release": {
                        "id": "30d12a10-0c37-4738-bfb1-4f315a69bf7f",
                        "version": "2.0.3",
                        "package": {
                            "name": "graceful-fs",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "2e171d4b-5a5a-0c6f-a91d-ae2739396207",
                "child_id": "b580b111-aed3-853f-aa35-3f6e3d5d6db9",
                "id": "b2332582-07c2-4f0c-af28-4a13e6cae3cc",
                "child": {
                    "id": "b580b111-aed3-853f-aa35-3f6e3d5d6db9",
                    "range": "~0.9.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "e348dba1-8aad-4b77-a8ab-49ac4454a4f5",
                    "release": {
                        "id": "e348dba1-8aad-4b77-a8ab-49ac4454a4f5",
                        "version": "0.9.1",
                        "package": {
                            "name": "mout",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "4be4c6d9-d27c-434a-a5d5-c0f4d21c3e4a",
                                        "source_id": "GHSA-vvv8-xw5f-3f88",
                                        "source": "ghsa",
                                        "severity_name": null,
                                        "cvss_score": 7.5,
                                        "summary": "Prototype Pollution in mout",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": null
                                        },
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": null
                                        },
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": null
                                        },
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": null
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "522126c3-d3e3-48b3-90d4-18fbed703744",
                                        "source_id": "GHSA-pc58-wgmc-hfjr",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": 7.5,
                                        "summary": "Prototype Pollution in mout",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "1.2.3"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "2e171d4b-5a5a-0c6f-a91d-ae2739396207",
                "child_id": "995dead7-fd08-c27f-dafb-4050518c3caa",
                "id": "62c912ae-b09e-4f39-a137-dd57311040de",
                "child": {
                    "id": "995dead7-fd08-c27f-dafb-4050518c3caa",
                    "range": "0.0.3",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "82019f6a-59b0-488a-a998-fe0485536d47",
                    "release": {
                        "id": "82019f6a-59b0-488a-a998-fe0485536d47",
                        "version": "0.0.3",
                        "package": {
                            "name": "osenv",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "2e171d4b-5a5a-0c6f-a91d-ae2739396207",
                "child_id": "8fdf28b6-e957-8a16-fb3b-87307fbc6d82",
                "id": "e425f40a-03b1-4559-b92e-53510d29537f",
                "child": {
                    "id": "8fdf28b6-e957-8a16-fb3b-87307fbc6d82",
                    "range": "~0.6.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "e20ac76b-29ab-4582-a835-67201968b66b",
                    "release": {
                        "id": "e20ac76b-29ab-4582-a835-67201968b66b",
                        "version": "0.6.1",
                        "package": {
                            "name": "optimist",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "24250622-2f93-4063-2748-4ccabfd0a3f8",
                "child_id": "ae4d2d55-b56a-58ee-c94e-2e1fa9462680",
                "id": "9535095c-3d4c-4aec-a00d-33be871f689b",
                "child": {
                    "id": "ae4d2d55-b56a-58ee-c94e-2e1fa9462680",
                    "range": "^0.5.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "baadfbde-755c-42f2-998e-0316d739646c",
                    "release": {
                        "id": "baadfbde-755c-42f2-998e-0316d739646c",
                        "version": "0.5.6",
                        "package": {
                            "name": "mkdirp",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "24250622-2f93-4063-2748-4ccabfd0a3f8",
                "child_id": "37cdc31d-370e-9bbc-7e0b-725b88e82ed9",
                "id": "1f71901c-9e9e-49a5-b2be-7f2f064c3a1b",
                "child": {
                    "id": "37cdc31d-370e-9bbc-7e0b-725b88e82ed9",
                    "range": "^0.3.5",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "0a1050c6-4241-4c3f-8bbe-728a82f37284",
                    "release": {
                        "id": "0a1050c6-4241-4c3f-8bbe-728a82f37284",
                        "version": "0.3.5",
                        "package": {
                            "name": "pump",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "24250622-2f93-4063-2748-4ccabfd0a3f8",
                "child_id": "299689de-3f7b-e5b4-1bd4-47291fb03394",
                "id": "177023cc-b98b-4f33-ac8d-5d1f80d91bcb",
                "child": {
                    "id": "299689de-3f7b-e5b4-1bd4-47291fb03394",
                    "range": "^0.4.6",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "02119e51-ed06-4f4d-9e0a-7c8fc056e581",
                    "release": {
                        "id": "02119e51-ed06-4f4d-9e0a-7c8fc056e581",
                        "version": "0.4.7",
                        "package": {
                            "name": "tar-stream",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "2288f61f-e549-b33f-dc9c-de1a2e1cc38d",
                "child_id": "ee52d9e3-f65d-b1e6-6902-d4a551e66b99",
                "id": "688ae4c2-3f97-46df-9ac1-56120f8efdb9",
                "child": {
                    "id": "ee52d9e3-f65d-b1e6-6902-d4a551e66b99",
                    "range": "~0.1.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "3fe7db62-9e5a-4414-b5a6-ddea5819bede",
                    "release": {
                        "id": "3fe7db62-9e5a-4414-b5a6-ddea5819bede",
                        "version": "0.1.0",
                        "package": {
                            "name": "mkpath",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "2288f61f-e549-b33f-dc9c-de1a2e1cc38d",
                "child_id": "ec38ba7f-55a5-bd8d-8b93-ebf88d167475",
                "id": "d38de836-7831-4dde-a956-5af608da74a4",
                "child": {
                    "id": "ec38ba7f-55a5-bd8d-8b93-ebf88d167475",
                    "range": "~2.2.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "a2d3fde7-f8cc-4ab2-9546-89c46f266429",
                    "release": {
                        "id": "a2d3fde7-f8cc-4ab2-9546-89c46f266429",
                        "version": "2.2.1",
                        "package": {
                            "name": "nopt",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "2288f61f-e549-b33f-dc9c-de1a2e1cc38d",
                "child_id": "bf231447-976e-2b57-9a62-e5eaf142fb39",
                "id": "2664455f-2027-40c5-9501-dcfea37bacef",
                "child": {
                    "id": "bf231447-976e-2b57-9a62-e5eaf142fb39",
                    "range": "~1.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "266acb62-b87b-4134-87b8-d880097c5f88",
                    "release": {
                        "id": "266acb62-b87b-4134-87b8-d880097c5f88",
                        "version": "1.0.1",
                        "package": {
                            "name": "q",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "2288f61f-e549-b33f-dc9c-de1a2e1cc38d",
                "child_id": "84067b1c-d81a-3aba-7d86-41c0dc01b78f",
                "id": "bab25853-5dd8-4c6c-aa9b-d8cda84f31e5",
                "child": {
                    "id": "84067b1c-d81a-3aba-7d86-41c0dc01b78f",
                    "range": "0.0.2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "14188517-fb0c-4cf5-9c13-e4b992e8e3b7",
                    "release": {
                        "id": "14188517-fb0c-4cf5-9c13-e4b992e8e3b7",
                        "version": "0.0.2",
                        "package": {
                            "name": "touch",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "2288f61f-e549-b33f-dc9c-de1a2e1cc38d",
                "child_id": "7c22422c-4cb2-80f1-919c-19d504b535eb",
                "id": "f1780378-b4cf-4846-9128-9f71f0880e2e",
                "child": {
                    "id": "7c22422c-4cb2-80f1-919c-19d504b535eb",
                    "range": "~3.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "f062020c-ca5f-46f2-8544-2d217bc1988b",
                    "release": {
                        "id": "f062020c-ca5f-46f2-8544-2d217bc1988b",
                        "version": "3.0.12",
                        "package": {
                            "name": "graceful-fs",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "2288f61f-e549-b33f-dc9c-de1a2e1cc38d",
                "child_id": "2d441d65-302d-c4db-3d2d-3431a738dcd1",
                "id": "d85f7bf5-472a-4baa-8e75-31797f424aa1",
                "child": {
                    "id": "2d441d65-302d-c4db-3d2d-3431a738dcd1",
                    "range": "^1.1.12",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "4054d042-b5d3-4cee-abc4-3e1cb11052c3",
                    "release": {
                        "id": "4054d042-b5d3-4cee-abc4-3e1cb11052c3",
                        "version": "1.1.14",
                        "package": {
                            "name": "readable-stream",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "2288f61f-e549-b33f-dc9c-de1a2e1cc38d",
                "child_id": "08266d5a-6695-b489-068e-30005203778e",
                "id": "d5d3d9f2-3583-42e6-8aa1-7cb0f11a8249",
                "child": {
                    "id": "08266d5a-6695-b489-068e-30005203778e",
                    "range": "~0.3.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "f2d15a11-b189-4ac3-882c-38e4466b72bf",
                    "release": {
                        "id": "f2d15a11-b189-4ac3-882c-38e4466b72bf",
                        "version": "0.3.0",
                        "package": {
                            "name": "binary",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "0bf23f43-ebe0-99c3-e790-73cd8c3a47ed",
                "child_id": "14ae9aec-8329-32bf-d1c7-fbdb40ce9a91",
                "id": "bc25ec97-af2f-4da2-970f-38508126f1f5",
                "child": {
                    "id": "14ae9aec-8329-32bf-d1c7-fbdb40ce9a91",
                    "range": "^3.0.2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "0e8a4161-4ede-4605-8729-cbfbe3b41208",
                    "release": {
                        "id": "0e8a4161-4ede-4605-8729-cbfbe3b41208",
                        "version": "3.0.7",
                        "package": {
                            "name": "signal-exit",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "f068c227-280a-01f3-cdb1-b15ab40f3785",
                "child_id": "419f7e96-aa83-b936-1c67-0b605ae009ec",
                "id": "354fbd3f-053d-42e6-946c-d50bce2d81c2",
                "child": {
                    "id": "419f7e96-aa83-b936-1c67-0b605ae009ec",
                    "range": "~0.3.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "a919709b-8582-493f-af22-48ee4d28f7f4",
                    "release": {
                        "id": "a919709b-8582-493f-af22-48ee4d28f7f4",
                        "version": "0.3.2",
                        "package": {
                            "name": "flagged-respawn",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "f068c227-280a-01f3-cdb1-b15ab40f3785",
                "child_id": "2ec79080-7b01-7611-424a-104cc1605660",
                "id": "cbce886b-2b3e-4249-81f3-2a597dc7d02f",
                "child": {
                    "id": "2ec79080-7b01-7611-424a-104cc1605660",
                    "range": "~0.1.2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "539c342a-ef41-4cb3-a373-687b7d92423c",
                    "release": {
                        "id": "539c342a-ef41-4cb3-a373-687b7d92423c",
                        "version": "0.1.3",
                        "package": {
                            "name": "findup-sync",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "f068c227-280a-01f3-cdb1-b15ab40f3785",
                "child_id": "263e665d-fdb3-7dfd-6333-444bd816e8c1",
                "id": "fef5d2de-2000-415f-a7aa-79aa7761703a",
                "child": {
                    "id": "263e665d-fdb3-7dfd-6333-444bd816e8c1",
                    "range": "~1.1.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "b14a580e-d60b-40b7-b21d-553417d34fbd",
                    "release": {
                        "id": "b14a580e-d60b-40b7-b21d-553417d34fbd",
                        "version": "1.1.3",
                        "package": {
                            "name": "minimist",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "7c707cae-b730-46eb-94c3-813a8857ed93",
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
                                        "id": "6eaca9bb-8cf3-4f8a-9915-5b3e1d3bec0a",
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
                                        "id": "176f6c35-d07c-4086-a8a8-d9bbe97eb53c",
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
                "parent_id": "f068c227-280a-01f3-cdb1-b15ab40f3785",
                "child_id": "09a8c689-77c6-27f9-69b5-38f7a508aa13",
                "id": "9dadfaae-7b09-476a-8dda-f505983e0e93",
                "child": {
                    "id": "09a8c689-77c6-27f9-69b5-38f7a508aa13",
                    "range": "~1.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "7da5b8a6-006d-4bfe-a26c-d7a38fdfd68f",
                    "release": {
                        "id": "7da5b8a6-006d-4bfe-a26c-d7a38fdfd68f",
                        "version": "1.0.0",
                        "package": {
                            "name": "resolve",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "f068c227-280a-01f3-cdb1-b15ab40f3785",
                "child_id": "06708af8-054d-dc82-2145-12fef5485c5f",
                "id": "42c4ddd2-a6b6-464d-9df6-d560e9cad2a7",
                "child": {
                    "id": "06708af8-054d-dc82-2145-12fef5485c5f",
                    "range": "~1.3.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "213ede54-d0ab-4019-bdd3-76923f739c18",
                    "release": {
                        "id": "213ede54-d0ab-4019-bdd3-76923f739c18",
                        "version": "1.3.0",
                        "package": {
                            "name": "extend",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "851ebfe2-ff32-491f-8708-ab5dd67e7149",
                                        "source_id": "GHSA-qrmc-fj45-qfc2",
                                        "source": "ghsa",
                                        "severity_name": "Medium",
                                        "cvss_score": null,
                                        "summary": "Prototype Pollution in extend",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "2.0.2"
                                        },
                                        {
                                            "introduced": "3.0.0",
                                            "fixed": "3.0.2"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "ae4d2d55-b56a-58ee-c94e-2e1fa9462680",
                "child_id": "1c5f62c7-1e13-9e32-155d-f5efaab5fcbe",
                "id": "9706eb13-223e-4f1e-881e-9237b88bd737",
                "child": {
                    "id": "1c5f62c7-1e13-9e32-155d-f5efaab5fcbe",
                    "range": "^1.2.6",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "4ce43681-6619-4f96-b815-e64565c3fb83",
                    "release": {
                        "id": "4ce43681-6619-4f96-b815-e64565c3fb83",
                        "version": "1.2.6",
                        "package": {
                            "name": "minimist",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "7c707cae-b730-46eb-94c3-813a8857ed93",
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
                                        "id": "6eaca9bb-8cf3-4f8a-9915-5b3e1d3bec0a",
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
                                        "id": "176f6c35-d07c-4086-a8a8-d9bbe97eb53c",
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
                "parent_id": "902f9355-b7dc-aa3e-633e-b81c047e1f37",
                "child_id": "2d983190-e6a6-f81c-c404-275a6bff6f59",
                "id": "bfacef4b-211d-4742-87b9-8b13cbe34e11",
                "child": {
                    "id": "2d983190-e6a6-f81c-c404-275a6bff6f59",
                    "range": "^1.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "252f7899-5284-4456-a4a1-c6482dee40da",
                    "release": {
                        "id": "252f7899-5284-4456-a4a1-c6482dee40da",
                        "version": "1.1.1",
                        "package": {
                            "name": "user-home",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "37a10d91-acbd-788e-6477-ac59449847af",
                "child_id": "f2f2ae7b-8504-1e19-05d4-b28cdb3f0b6b",
                "id": "c54b0491-7708-46af-8d84-61f4ecdfbc3e",
                "child": {
                    "id": "f2f2ae7b-8504-1e19-05d4-b28cdb3f0b6b",
                    "range": "^0.3.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "5588bafd-5122-4988-877c-833d7d9188b7",
                    "release": {
                        "id": "5588bafd-5122-4988-877c-833d7d9188b7",
                        "version": "0.3.0",
                        "package": {
                            "name": "strip-ansi",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "37a10d91-acbd-788e-6477-ac59449847af",
                "child_id": "e79a807e-b70a-c2e0-ad1b-659ee6ebbd04",
                "id": "36311304-6249-44de-b3bc-10cc2b200c29",
                "child": {
                    "id": "e79a807e-b70a-c2e0-ad1b-659ee6ebbd04",
                    "range": "^1.1.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "6a5716e6-873a-4c28-bfd4-d15a5c1e3dc8",
                    "release": {
                        "id": "6a5716e6-873a-4c28-bfd4-d15a5c1e3dc8",
                        "version": "1.1.0",
                        "package": {
                            "name": "ansi-styles",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "37a10d91-acbd-788e-6477-ac59449847af",
                "child_id": "b2ae9581-9de8-c8a1-fa72-6194f839ffcf",
                "id": "14b4cb3b-f48b-46d7-bcc7-84eaf24cfb45",
                "child": {
                    "id": "b2ae9581-9de8-c8a1-fa72-6194f839ffcf",
                    "range": "^1.0.5",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "97bdc6c7-6351-49e6-b3ba-2a0270dd61f5",
                    "release": {
                        "id": "97bdc6c7-6351-49e6-b3ba-2a0270dd61f5",
                        "version": "1.0.5",
                        "package": {
                            "name": "escape-string-regexp",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "37a10d91-acbd-788e-6477-ac59449847af",
                "child_id": "7e52520f-aadb-85ee-8791-8b7e9d03f5be",
                "id": "2a4c129f-8d41-4b2e-b078-3f7ec4578e91",
                "child": {
                    "id": "7e52520f-aadb-85ee-8791-8b7e9d03f5be",
                    "range": "^0.1.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "281aae9d-ae9f-4d92-bacc-e966bb6567fa",
                    "release": {
                        "id": "281aae9d-ae9f-4d92-bacc-e966bb6567fa",
                        "version": "0.1.0",
                        "package": {
                            "name": "has-ansi",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "37a10d91-acbd-788e-6477-ac59449847af",
                "child_id": "1e75acec-8c60-d07b-6d7a-81ee0147e4a8",
                "id": "8bfa4077-69c1-43d8-9790-f1f6c7f3cc16",
                "child": {
                    "id": "1e75acec-8c60-d07b-6d7a-81ee0147e4a8",
                    "range": "^0.2.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "1cd3e844-e9ad-4d01-a0d3-349d71b9304c",
                    "release": {
                        "id": "1cd3e844-e9ad-4d01-a0d3-349d71b9304c",
                        "version": "0.2.0",
                        "package": {
                            "name": "supports-color",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "2d441d65-302d-c4db-3d2d-3431a738dcd1",
                "child_id": "af4ab454-42e9-a9ad-0ea0-137c89d0646e",
                "id": "8632669c-eb92-4526-85b8-c1aedc417e3d",
                "child": {
                    "id": "af4ab454-42e9-a9ad-0ea0-137c89d0646e",
                    "range": "~0.10.x",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "ae0e8bbe-7d81-4879-9a55-d37cc126970c",
                    "release": {
                        "id": "ae0e8bbe-7d81-4879-9a55-d37cc126970c",
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
                "parent_id": "2d441d65-302d-c4db-3d2d-3431a738dcd1",
                "child_id": "6b2bcc0a-19fb-9f0f-1617-78f9bb663f1f",
                "id": "7359450b-967e-4a94-9a8b-ed3543f71301",
                "child": {
                    "id": "6b2bcc0a-19fb-9f0f-1617-78f9bb663f1f",
                    "range": "^1.0.2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "9c8e6272-08f6-48e9-a9ab-6c0682318dec",
                    "release": {
                        "id": "9c8e6272-08f6-48e9-a9ab-6c0682318dec",
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
                "parent_id": "2d441d65-302d-c4db-3d2d-3431a738dcd1",
                "child_id": "48b522b9-45b0-0efb-9269-9de40666cee0",
                "id": "b9582be8-49df-4c99-b505-8733063dc6c9",
                "child": {
                    "id": "48b522b9-45b0-0efb-9269-9de40666cee0",
                    "range": "^2.0.3",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "47eeabb9-0f9c-42ac-933c-0e1fe5154350",
                    "release": {
                        "id": "47eeabb9-0f9c-42ac-933c-0e1fe5154350",
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
                "parent_id": "2d441d65-302d-c4db-3d2d-3431a738dcd1",
                "child_id": "221a168f-4302-d83b-8b4a-89480a85039e",
                "id": "9670092e-37e9-4542-ae50-500d51cba78f",
                "child": {
                    "id": "221a168f-4302-d83b-8b4a-89480a85039e",
                    "range": "0.0.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "f61977b1-b07b-4ada-9c74-3ca80da8f08e",
                    "release": {
                        "id": "f61977b1-b07b-4ada-9c74-3ca80da8f08e",
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
                "parent_id": "a66aeda3-63ac-7c2a-1086-e4d3ab880a7a",
                "child_id": "2d441d65-302d-c4db-3d2d-3431a738dcd1",
                "id": "5dece722-0ed4-4d43-99fb-422d8dd212cf",
                "child": {
                    "id": "2d441d65-302d-c4db-3d2d-3431a738dcd1",
                    "range": "^1.1.12",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "4054d042-b5d3-4cee-abc4-3e1cb11052c3",
                    "release": {
                        "id": "4054d042-b5d3-4cee-abc4-3e1cb11052c3",
                        "version": "1.1.14",
                        "package": {
                            "name": "readable-stream",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "a66aeda3-63ac-7c2a-1086-e4d3ab880a7a",
                "child_id": "10c7e988-1c3e-ff48-aba4-0d231f05490c",
                "id": "ccd11aa7-34b6-4e9e-896f-c96f44705188",
                "child": {
                    "id": "10c7e988-1c3e-ff48-aba4-0d231f05490c",
                    "range": "~0.2.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "26bc4b02-305f-47df-bc57-0bb949f24e67",
                    "release": {
                        "id": "26bc4b02-305f-47df-bc57-0bb949f24e67",
                        "version": "0.2.0",
                        "package": {
                            "name": "stream-counter",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "3575a45c-9f5c-6dca-e821-8c325d9a07d7",
                "child_id": "2e67fa7a-67b1-0f78-7e2b-e7cac7d5943c",
                "id": "f86945d3-4686-40f7-b2d1-0bfa152c4df4",
                "child": {
                    "id": "2e67fa7a-67b1-0f78-7e2b-e7cac7d5943c",
                    "range": "0.2.1",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "469be34f-48f6-4b0c-b0a5-7b4e4ca444a5",
                    "release": {
                        "id": "469be34f-48f6-4b0c-b0a5-7b4e4ca444a5",
                        "version": "0.2.1",
                        "package": {
                            "name": "bytes",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "eb365e40-3cf2-15c9-fbc0-4d1bc57ef75c",
                "child_id": "716919ab-b47b-76e9-a5f0-63901316e4eb",
                "id": "a8297c28-fd99-4419-a0b1-21ae029cd632",
                "child": {
                    "id": "716919ab-b47b-76e9-a5f0-63901316e4eb",
                    "range": "^5.1.2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "ba8ee851-4d69-47d7-b6bf-a1f45525bad8",
                    "release": {
                        "id": "ba8ee851-4d69-47d7-b6bf-a1f45525bad8",
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
                "parent_id": "eb365e40-3cf2-15c9-fbc0-4d1bc57ef75c",
                "child_id": "48b522b9-45b0-0efb-9269-9de40666cee0",
                "id": "e3184f64-95fe-4277-916f-16c39dde8eaf",
                "child": {
                    "id": "48b522b9-45b0-0efb-9269-9de40666cee0",
                    "range": "^2.0.3",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "47eeabb9-0f9c-42ac-933c-0e1fe5154350",
                    "release": {
                        "id": "47eeabb9-0f9c-42ac-933c-0e1fe5154350",
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
                "parent_id": "eb365e40-3cf2-15c9-fbc0-4d1bc57ef75c",
                "child_id": "202abac5-3c51-7713-c239-d76fd7b9f47d",
                "id": "b3737a8b-3c05-4185-88b6-5cb5c8fb09d9",
                "child": {
                    "id": "202abac5-3c51-7713-c239-d76fd7b9f47d",
                    "range": "^1.0.4",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "e13e8340-9cdd-4be2-beed-216bef2f0969",
                    "release": {
                        "id": "e13e8340-9cdd-4be2-beed-216bef2f0969",
                        "version": "1.1.1",
                        "package": {
                            "name": "is-arguments",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "eb365e40-3cf2-15c9-fbc0-4d1bc57ef75c",
                "child_id": "15338c04-a401-f991-f7ea-4f11fa2b3e8b",
                "id": "54ce3f36-f918-4049-9e6a-23ced1a14cd6",
                "child": {
                    "id": "15338c04-a401-f991-f7ea-4f11fa2b3e8b",
                    "range": "^1.1.2",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "8c43193a-7be7-4447-ac86-bc70980bb108",
                    "release": {
                        "id": "8c43193a-7be7-4447-ac86-bc70980bb108",
                        "version": "1.1.8",
                        "package": {
                            "name": "which-typed-array",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "eb365e40-3cf2-15c9-fbc0-4d1bc57ef75c",
                "child_id": "0ee9f8a2-15f3-c9af-1875-d721b9392fee",
                "id": "69d9ff55-a2e2-4327-bacf-28b98923bac9",
                "child": {
                    "id": "0ee9f8a2-15f3-c9af-1875-d721b9392fee",
                    "range": "^1.1.3",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "7b0bc294-2f89-49dc-819e-7c99238ccd40",
                    "release": {
                        "id": "7b0bc294-2f89-49dc-819e-7c99238ccd40",
                        "version": "1.1.9",
                        "package": {
                            "name": "is-typed-array",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "eb365e40-3cf2-15c9-fbc0-4d1bc57ef75c",
                "child_id": "08d85d3c-b207-ee23-4a73-19bdd0984ed7",
                "id": "36b04d44-130e-43e2-a5f8-a234a5d0ee99",
                "child": {
                    "id": "08d85d3c-b207-ee23-4a73-19bdd0984ed7",
                    "range": "^1.0.7",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "d50ae8b4-3012-48b8-98b5-ecf642983f2b",
                    "release": {
                        "id": "d50ae8b4-3012-48b8-98b5-ecf642983f2b",
                        "version": "1.0.10",
                        "package": {
                            "name": "is-generator-function",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "c2cf98fc-4dc0-eccc-418d-038eecdef672",
                "child_id": "e373c3fe-a39b-0171-f2f0-c71fa67c2fee",
                "id": "c4e8f759-6a61-4d63-bd05-04652da2832d",
                "child": {
                    "id": "e373c3fe-a39b-0171-f2f0-c71fa67c2fee",
                    "range": "~1.1",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "929c344d-fcab-413e-a1db-7efdb7852284",
                    "release": {
                        "id": "929c344d-fcab-413e-a1db-7efdb7852284",
                        "version": "1.1.3",
                        "package": {
                            "name": "samsam",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "af0b02f0-3760-ce75-2674-c70727599de4",
                "child_id": "e547507b-6f2a-b1e1-e860-1d75cf8cb26c",
                "id": "ad5ce03d-f312-4f0c-af7f-2c9b2b3f6377",
                "child": {
                    "id": "e547507b-6f2a-b1e1-e860-1d75cf8cb26c",
                    "range": "0.1.34",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "a9e0b5c5-af98-48d8-b7a6-a84b3acef2a6",
                    "release": {
                        "id": "a9e0b5c5-af98-48d8-b7a6-a84b3acef2a6",
                        "version": "0.1.34",
                        "package": {
                            "name": "source-map",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "af0b02f0-3760-ce75-2674-c70727599de4",
                "child_id": "c5979ee8-196d-a050-fbce-1628e58587f4",
                "id": "f6e3415f-5835-4998-919b-d5671f6153d9",
                "child": {
                    "id": "c5979ee8-196d-a050-fbce-1628e58587f4",
                    "range": "~0.2.6",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "f516129e-8b04-41d8-b881-638c24be8d40",
                    "release": {
                        "id": "f516129e-8b04-41d8-b881-638c24be8d40",
                        "version": "0.2.10",
                        "package": {
                            "name": "async",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "de2e897c-13bb-4e3a-b35a-872a3c39bfe3",
                                        "source_id": "GHSA-fwr7-v2mv-hh25",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": 7.8,
                                        "summary": "Prototype Pollution in async",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "2.0.0",
                                            "fixed": "2.6.4"
                                        },
                                        {
                                            "introduced": "3.0.0",
                                            "fixed": "3.2.2"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "af0b02f0-3760-ce75-2674-c70727599de4",
                "child_id": "37870035-7a4e-463b-4ed1-8a959cb553e7",
                "id": "f019950a-67f1-4141-9dae-e74834771b2a",
                "child": {
                    "id": "37870035-7a4e-463b-4ed1-8a959cb553e7",
                    "range": "~1.0.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "53aff80b-f916-48c8-95f8-e7a8cadb864d",
                    "release": {
                        "id": "53aff80b-f916-48c8-95f8-e7a8cadb864d",
                        "version": "1.0.2",
                        "package": {
                            "name": "uglify-to-browserify",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "af0b02f0-3760-ce75-2674-c70727599de4",
                "child_id": "176166a2-0039-4086-f415-14e9b165ced4",
                "id": "5ea5db89-12da-4db1-b081-6604603796f3",
                "child": {
                    "id": "176166a2-0039-4086-f415-14e9b165ced4",
                    "range": "~3.5.4",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "07aad3fb-e2a5-4a33-b5c7-7ad545cbcc88",
                    "release": {
                        "id": "07aad3fb-e2a5-4a33-b5c7-7ad545cbcc88",
                        "version": "3.5.4",
                        "package": {
                            "name": "yargs",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "bb05f340-95da-3540-3386-1e7169bed4ea",
                "child_id": "c1793751-0fa3-936f-92c2-0a5ed02ce4ac",
                "id": "1853aa84-8e7d-4e1e-8528-5c0a2a6565cc",
                "child": {
                    "id": "c1793751-0fa3-936f-92c2-0a5ed02ce4ac",
                    "range": "~0.3.5",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "759f2406-0918-4e59-a8c1-3272c715a57c",
                    "release": {
                        "id": "759f2406-0918-4e59-a8c1-3272c715a57c",
                        "version": "0.3.7",
                        "package": {
                            "name": "optimist",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "bb05f340-95da-3540-3386-1e7169bed4ea",
                "child_id": "0ed52d60-a024-85f0-17b6-49b3987c1ee1",
                "id": "6237e534-4441-41df-a299-6d3935809ccc",
                "child": {
                    "id": "0ed52d60-a024-85f0-17b6-49b3987c1ee1",
                    "range": "~0.1.7",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "bcf5f4d6-cbb0-472c-abc8-0b934a34a2db",
                    "release": {
                        "id": "bcf5f4d6-cbb0-472c-abc8-0b934a34a2db",
                        "version": "0.1.43",
                        "package": {
                            "name": "source-map",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "0680c4b5-3a38-51f7-d249-2144f1b2b9cc",
                "child_id": "9f58eb31-5c2f-d518-a257-613f9a3f7f37",
                "id": "da73abb8-1756-44c2-bc2f-75abe4b5f60f",
                "child": {
                    "id": "9f58eb31-5c2f-d518-a257-613f9a3f7f37",
                    "range": "~1",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "9ae225b9-09c1-4093-b715-1fb1e352320c",
                    "release": {
                        "id": "9ae225b9-09c1-4093-b715-1fb1e352320c",
                        "version": "1.0.1",
                        "package": {
                            "name": "is-promise",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "007ffe16-70a6-ea30-5c28-f0d1401a07e2",
                "child_id": "861f9389-12fb-3837-309e-c55994034f61",
                "id": "decbc09d-3bde-4e7e-b11c-b30630f203fa",
                "child": {
                    "id": "861f9389-12fb-3837-309e-c55994034f61",
                    "range": "1.0.5",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "27eb7d45-dbdd-4c59-a317-81a838946bf6",
                    "release": {
                        "id": "27eb7d45-dbdd-4c59-a317-81a838946bf6",
                        "version": "1.0.5",
                        "package": {
                            "name": "css-stringify",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "007ffe16-70a6-ea30-5c28-f0d1401a07e2",
                "child_id": "64496340-9e66-482a-b0b0-b809fffa3c5b",
                "id": "e5b4065d-f388-4045-ad95-453054d37916",
                "child": {
                    "id": "64496340-9e66-482a-b0b0-b809fffa3c5b",
                    "range": "1.0.4",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "0afe278e-d0d1-4c5d-87a9-59a559d5d1e3",
                    "release": {
                        "id": "0afe278e-d0d1-4c5d-87a9-59a559d5d1e3",
                        "version": "1.0.4",
                        "package": {
                            "name": "css-parse",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "340273ed-cccb-1497-21dd-ae7c3a564f3e",
                "child_id": "1a06b926-2e7a-4caf-34b8-a1355eb5f89f",
                "id": "c2d54bd2-3e1b-4da5-84c9-50e067c3b71a",
                "child": {
                    "id": "1a06b926-2e7a-4caf-34b8-a1355eb5f89f",
                    "range": ">=0.2.4",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "2be38901-d710-49f9-bcea-755cb2f2a11f",
                    "release": {
                        "id": "2be38901-d710-49f9-bcea-755cb2f2a11f",
                        "version": "5.1.0",
                        "package": {
                            "name": "minimatch",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "9ee1009d-38c5-43d3-b28b-874f0e8fc32f",
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
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "97c39eba-0003-df50-bac3-b4b361fc35e4",
                "child_id": "9e1dbe04-e794-9799-e4e3-34d9a67b7038",
                "id": "be842c71-d11f-421a-9aab-509b7023537a",
                "child": {
                    "id": "9e1dbe04-e794-9799-e4e3-34d9a67b7038",
                    "range": "^3.0.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "74d1e2e3-d7ec-4fc3-9a96-746139aaeba2",
                    "release": {
                        "id": "74d1e2e3-d7ec-4fc3-9a96-746139aaeba2",
                        "version": "3.0.0",
                        "package": {
                            "name": "foreachasync",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "7571dd15-a872-5819-9e47-1a614fbbac85",
                "child_id": "f9cc8aaa-e5eb-d0e6-0092-8384f8d1177d",
                "id": "a50755fe-e013-4b56-8f82-df29de9de15d",
                "child": {
                    "id": "f9cc8aaa-e5eb-d0e6-0092-8384f8d1177d",
                    "range": "~2.2.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "13ce85e4-dbb4-41bc-8639-1625dd1bde4f",
                    "release": {
                        "id": "13ce85e4-dbb4-41bc-8639-1625dd1bde4f",
                        "version": "2.2.8",
                        "package": {
                            "name": "rimraf",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "7571dd15-a872-5819-9e47-1a614fbbac85",
                "child_id": "cf086029-20a5-67ba-3a3e-a34477d4302a",
                "id": "2ad3c07e-5474-4ee8-b8ea-4c54f75102ee",
                "child": {
                    "id": "cf086029-20a5-67ba-3a3e-a34477d4302a",
                    "range": "~1.0.1",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "931b31a1-f921-4d55-a1ef-13a322728e1a",
                    "release": {
                        "id": "931b31a1-f921-4d55-a1ef-13a322728e1a",
                        "version": "1.0.1",
                        "package": {
                            "name": "jsonfile",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "7571dd15-a872-5819-9e47-1a614fbbac85",
                "child_id": "cd84ab0c-4e5d-424c-09ef-eb4b116a2d6e",
                "id": "063dc35b-ceba-4128-9289-77401d46e3cb",
                "child": {
                    "id": "cd84ab0c-4e5d-424c-09ef-eb4b116a2d6e",
                    "range": "~0.3.5",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "e27545fc-1ec0-4217-b01f-96cbe95177a3",
                    "release": {
                        "id": "e27545fc-1ec0-4217-b01f-96cbe95177a3",
                        "version": "0.3.5",
                        "package": {
                            "name": "mkdirp",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "7571dd15-a872-5819-9e47-1a614fbbac85",
                "child_id": "6be7785c-1ab1-fc71-57a3-a343ae9af9ff",
                "id": "a6c57a4a-2416-4330-bea0-9a7fb6be47f0",
                "child": {
                    "id": "6be7785c-1ab1-fc71-57a3-a343ae9af9ff",
                    "range": "~0.4.2",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "14e98a36-af49-4467-8606-8f5af1386c50",
                    "release": {
                        "id": "14e98a36-af49-4467-8606-8f5af1386c50",
                        "version": "0.4.2",
                        "package": {
                            "name": "ncp",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "a34ccaac-541f-c02c-0358-83543b11839d",
                "child_id": "94341ef1-3df6-92b1-d5f0-97b1f3d0cbd9",
                "id": "ee450811-86f2-48fc-a99f-22c6c7d24665",
                "child": {
                    "id": "94341ef1-3df6-92b1-d5f0-97b1f3d0cbd9",
                    "range": "^1.0.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "3680713e-0ade-4904-8269-ce7b52485a36",
                    "release": {
                        "id": "3680713e-0ade-4904-8269-ce7b52485a36",
                        "version": "1.0.0",
                        "package": {
                            "name": "shebang-regex",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "1b3341cf-9d91-e016-c21f-af4e62dd57b5",
                "child_id": "9da698ea-2814-ddb9-d493-ea3723e71007",
                "id": "5a1b01a8-47fe-4ee9-bae2-968f7f7bc06a",
                "child": {
                    "id": "9da698ea-2814-ddb9-d493-ea3723e71007",
                    "range": "^2.0.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "4699cd25-2541-466a-82e2-b8d92cdedfea",
                    "release": {
                        "id": "4699cd25-2541-466a-82e2-b8d92cdedfea",
                        "version": "2.0.0",
                        "package": {
                            "name": "isexe",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "5120e247-99ba-32b0-1463-f7a464516989",
                "child_id": "001e1efb-6ea7-bdd0-cd20-179e033503b7",
                "id": "63770e41-481a-40cf-a5f3-cf32973e98ba",
                "child": {
                    "id": "001e1efb-6ea7-bdd0-cd20-179e033503b7",
                    "range": "2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "bb74e822-ff83-4267-aaba-04dd389efb9a",
                    "release": {
                        "id": "bb74e822-ff83-4267-aaba-04dd389efb9a",
                        "version": "2.3.8",
                        "package": {
                            "name": "through",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "0396516d-3eb5-bd05-1bb8-a9c761384a4c",
                "child_id": "ff62d078-19dc-7d2a-9cf4-1a837e5eaeab",
                "id": "5e1eea38-c614-4ca8-9d52-ab1517478cdb",
                "child": {
                    "id": "ff62d078-19dc-7d2a-9cf4-1a837e5eaeab",
                    "range": "2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "f15e7e6e-1961-4181-9358-7a371e6737bc",
                    "release": {
                        "id": "f15e7e6e-1961-4181-9358-7a371e6737bc",
                        "version": "2.7.3",
                        "package": {
                            "name": "lru-cache",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "0396516d-3eb5-bd05-1bb8-a9c761384a4c",
                "child_id": "52e69c15-f8f1-5c5b-f4ec-2dcf8b83c5ad",
                "id": "469ce89a-e145-4931-ac38-35f958d66d22",
                "child": {
                    "id": "52e69c15-f8f1-5c5b-f4ec-2dcf8b83c5ad",
                    "range": "~1.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "121e67ad-f70a-4c02-9e9a-ffd12a32b4ca",
                    "release": {
                        "id": "121e67ad-f70a-4c02-9e9a-ffd12a32b4ca",
                        "version": "1.0.1",
                        "package": {
                            "name": "sigmund",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "064a6d33-e4aa-0444-c403-39f346c513a3",
                "child_id": "3e15ce52-b9e8-4dc2-9d6e-f575d48d6d73",
                "id": "b9c98a5d-837b-4f17-8230-c39f06c04be3",
                "child": {
                    "id": "3e15ce52-b9e8-4dc2-9d6e-f575d48d6d73",
                    "range": "~1.12.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "d19e6672-85c7-415c-8c87-155ffb480c6b",
                    "release": {
                        "id": "d19e6672-85c7-415c-8c87-155ffb480c6b",
                        "version": "1.12.0",
                        "package": {
                            "name": "mime-db",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "d6915a86-ef82-4fec-946a-46985e4604fe",
                "child_id": "f9a604d5-2001-9fc6-6799-21897184cf92",
                "id": "6d8ab3b3-6574-46d0-874e-6feb0d1c0140",
                "child": {
                    "id": "f9a604d5-2001-9fc6-6799-21897184cf92",
                    "range": "^4.1.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "e162da09-a436-4f93-afab-779487e68a0e",
                    "release": {
                        "id": "e162da09-a436-4f93-afab-779487e68a0e",
                        "version": "4.1.0",
                        "package": {
                            "name": "split2",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "53bd0c67-f282-93ab-aa52-ed150397e90b",
                "child_id": "cc11968b-f3b5-2f3b-a688-5d0a629e135c",
                "id": "e4091b21-bbc5-438a-8475-f956708909bb",
                "child": {
                    "id": "cc11968b-f3b5-2f3b-a688-5d0a629e135c",
                    "range": "^1.1.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "d65d7f40-5c3b-4ec9-a5bc-adf4e634cdce",
                    "release": {
                        "id": "d65d7f40-5c3b-4ec9-a5bc-adf4e634cdce",
                        "version": "1.2.0",
                        "package": {
                            "name": "postgres-interval",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "53bd0c67-f282-93ab-aa52-ed150397e90b",
                "child_id": "a0794aa8-6a2e-54ad-56dc-c3cc7218836b",
                "id": "91a5629b-1054-430b-90f3-7f1ba7cc9953",
                "child": {
                    "id": "a0794aa8-6a2e-54ad-56dc-c3cc7218836b",
                    "range": "~1.0.4",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "3d4209e0-2faa-426e-a4c3-04dbeaa8feb2",
                    "release": {
                        "id": "3d4209e0-2faa-426e-a4c3-04dbeaa8feb2",
                        "version": "1.0.7",
                        "package": {
                            "name": "postgres-date",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "53bd0c67-f282-93ab-aa52-ed150397e90b",
                "child_id": "768dc09e-2d15-4ba4-f255-e535ed910d1b",
                "id": "30022159-9452-4c4a-8bde-d56b31ebd4b6",
                "child": {
                    "id": "768dc09e-2d15-4ba4-f255-e535ed910d1b",
                    "range": "~2.0.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "1fda0207-69e9-4d95-b720-ee79383e9f6c",
                    "release": {
                        "id": "1fda0207-69e9-4d95-b720-ee79383e9f6c",
                        "version": "2.0.0",
                        "package": {
                            "name": "postgres-array",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "53bd0c67-f282-93ab-aa52-ed150397e90b",
                "child_id": "34a89a5e-cc6b-d980-468b-6207ee0a8719",
                "id": "65ed5636-4da0-40bf-b0c1-781c961de7e1",
                "child": {
                    "id": "34a89a5e-cc6b-d980-468b-6207ee0a8719",
                    "range": "~1.0.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "067426a0-8ae1-47a0-aefa-45051a553e35",
                    "release": {
                        "id": "067426a0-8ae1-47a0-aefa-45051a553e35",
                        "version": "1.0.0",
                        "package": {
                            "name": "postgres-bytea",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "53bd0c67-f282-93ab-aa52-ed150397e90b",
                "child_id": "0401f93b-c40d-9068-fd9b-4bc150e90ebb",
                "id": "20faaaf1-d379-4f14-a2f3-47846e60e1a2",
                "child": {
                    "id": "0401f93b-c40d-9068-fd9b-4bc150e90ebb",
                    "range": "1.0.1",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "f980a5df-87f8-4d20-af0c-dea44c1fff8e",
                    "release": {
                        "id": "f980a5df-87f8-4d20-af0c-dea44c1fff8e",
                        "version": "1.0.1",
                        "package": {
                            "name": "pg-int8",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "e8096a8e-9618-dbfc-a541-50d796ac0cd5",
                "child_id": "bd3c40dd-4dc8-11a5-5810-5a424a0e4542",
                "id": "f987ad33-2331-442e-b9ce-1c3ebdf85855",
                "child": {
                    "id": "bd3c40dd-4dc8-11a5-5810-5a424a0e4542",
                    "range": "3",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "2277bd8a-72a2-4e27-8e20-368fb36df97e",
                    "release": {
                        "id": "2277bd8a-72a2-4e27-8e20-368fb36df97e",
                        "version": "3.1.0",
                        "package": {
                            "name": "topojson-client",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "e8096a8e-9618-dbfc-a541-50d796ac0cd5",
                "child_id": "7a0711c0-b390-bd6c-1ec4-0a90052a6e1e",
                "id": "29b94e58-982d-4c06-be21-e802b856bf09",
                "child": {
                    "id": "7a0711c0-b390-bd6c-1ec4-0a90052a6e1e",
                    "range": "2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "800de5fb-d028-45db-b4b9-670e84177edf",
                    "release": {
                        "id": "800de5fb-d028-45db-b4b9-670e84177edf",
                        "version": "2.20.3",
                        "package": {
                            "name": "commander",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "40eeee12-141f-aea7-8dc3-650c2b372c88",
                "child_id": "7a0711c0-b390-bd6c-1ec4-0a90052a6e1e",
                "id": "2bc3c445-1877-4960-a980-28e236e9bcb6",
                "child": {
                    "id": "7a0711c0-b390-bd6c-1ec4-0a90052a6e1e",
                    "range": "2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "800de5fb-d028-45db-b4b9-670e84177edf",
                    "release": {
                        "id": "800de5fb-d028-45db-b4b9-670e84177edf",
                        "version": "2.20.3",
                        "package": {
                            "name": "commander",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "26ed383f-ee03-62e8-00f9-74c951608e66",
                "child_id": "7a0711c0-b390-bd6c-1ec4-0a90052a6e1e",
                "id": "3cc8b5b9-e784-46a0-9787-52cda6a6ad9d",
                "child": {
                    "id": "7a0711c0-b390-bd6c-1ec4-0a90052a6e1e",
                    "range": "2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "800de5fb-d028-45db-b4b9-670e84177edf",
                    "release": {
                        "id": "800de5fb-d028-45db-b4b9-670e84177edf",
                        "version": "2.20.3",
                        "package": {
                            "name": "commander",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "f5f42487-d5b5-3f85-3b2d-96cf155417ce",
                "child_id": "0db98bb1-e18c-c495-ebb8-1d8e33651f1d",
                "id": "0924b38f-22cc-4dd4-86e4-e87a7fb74e40",
                "child": {
                    "id": "0db98bb1-e18c-c495-ebb8-1d8e33651f1d",
                    "range": "~0.0.4",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "b29f7b73-02ba-48e2-a838-0e63d5c8b54b",
                    "release": {
                        "id": "b29f7b73-02ba-48e2-a838-0e63d5c8b54b",
                        "version": "0.0.8",
                        "package": {
                            "name": "mute-stream",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "c1793751-0fa3-936f-92c2-0a5ed02ce4ac",
                "child_id": "acf2a6c6-e051-e119-473a-9661a01735c8",
                "id": "6b84b46f-6db1-49aa-a08e-6da596397c37",
                "child": {
                    "id": "acf2a6c6-e051-e119-473a-9661a01735c8",
                    "range": "~0.0.2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "fc6b8d51-9adf-47f0-84c2-60df3b3d1274",
                    "release": {
                        "id": "fc6b8d51-9adf-47f0-84c2-60df3b3d1274",
                        "version": "0.0.3",
                        "package": {
                            "name": "wordwrap",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "2eea31c8-bc15-a4ce-7b5b-0223975397a8",
                "child_id": "c5979ee8-196d-a050-fbce-1628e58587f4",
                "id": "02e60666-d9be-4dc1-934f-800401845d5d",
                "child": {
                    "id": "c5979ee8-196d-a050-fbce-1628e58587f4",
                    "range": "~0.2.6",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "f516129e-8b04-41d8-b881-638c24be8d40",
                    "release": {
                        "id": "f516129e-8b04-41d8-b881-638c24be8d40",
                        "version": "0.2.10",
                        "package": {
                            "name": "async",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "de2e897c-13bb-4e3a-b35a-872a3c39bfe3",
                                        "source_id": "GHSA-fwr7-v2mv-hh25",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": 7.8,
                                        "summary": "Prototype Pollution in async",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "2.0.0",
                                            "fixed": "2.6.4"
                                        },
                                        {
                                            "introduced": "3.0.0",
                                            "fixed": "3.2.2"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "2eea31c8-bc15-a4ce-7b5b-0223975397a8",
                "child_id": "c1793751-0fa3-936f-92c2-0a5ed02ce4ac",
                "id": "4f7afd42-8b67-482b-a267-777a3fdf184f",
                "child": {
                    "id": "c1793751-0fa3-936f-92c2-0a5ed02ce4ac",
                    "range": "~0.3.5",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "759f2406-0918-4e59-a8c1-3272c715a57c",
                    "release": {
                        "id": "759f2406-0918-4e59-a8c1-3272c715a57c",
                        "version": "0.3.7",
                        "package": {
                            "name": "optimist",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "2eea31c8-bc15-a4ce-7b5b-0223975397a8",
                "child_id": "0ed52d60-a024-85f0-17b6-49b3987c1ee1",
                "id": "8640e8ab-4581-432a-be73-c1c0063fe1c2",
                "child": {
                    "id": "0ed52d60-a024-85f0-17b6-49b3987c1ee1",
                    "range": "~0.1.7",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "bcf5f4d6-cbb0-472c-abc8-0b934a34a2db",
                    "release": {
                        "id": "bcf5f4d6-cbb0-472c-abc8-0b934a34a2db",
                        "version": "0.1.43",
                        "package": {
                            "name": "source-map",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "f2f2ae7b-8504-1e19-05d4-b28cdb3f0b6b",
                "child_id": "151ef915-1d39-ae77-bcbe-71ee3016c621",
                "id": "cc034d8d-4edb-4f84-88f9-9aea6c6e403a",
                "child": {
                    "id": "151ef915-1d39-ae77-bcbe-71ee3016c621",
                    "range": "^0.2.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "78c26786-a688-474f-93fa-e723b4996e42",
                    "release": {
                        "id": "78c26786-a688-474f-93fa-e723b4996e42",
                        "version": "0.2.1",
                        "package": {
                            "name": "ansi-regex",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "fb1ed62a-bb13-401d-99c1-fb453ed44965",
                                        "source_id": "GHSA-93q8-gq69-wqmw",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": 7.5,
                                        "summary": "Inefficient Regular Expression Complexity in chalk/ansi-regex",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "3.0.0",
                                            "fixed": "3.0.1"
                                        },
                                        {
                                            "introduced": "4.0.0",
                                            "fixed": "4.1.1"
                                        },
                                        {
                                            "introduced": "5.0.0",
                                            "fixed": "5.0.1"
                                        },
                                        {
                                            "introduced": "6.0.0",
                                            "fixed": "6.0.1"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "7e52520f-aadb-85ee-8791-8b7e9d03f5be",
                "child_id": "151ef915-1d39-ae77-bcbe-71ee3016c621",
                "id": "1b253cee-475d-422e-adf4-b535d767ca8e",
                "child": {
                    "id": "151ef915-1d39-ae77-bcbe-71ee3016c621",
                    "range": "^0.2.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "78c26786-a688-474f-93fa-e723b4996e42",
                    "release": {
                        "id": "78c26786-a688-474f-93fa-e723b4996e42",
                        "version": "0.2.1",
                        "package": {
                            "name": "ansi-regex",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "fb1ed62a-bb13-401d-99c1-fb453ed44965",
                                        "source_id": "GHSA-93q8-gq69-wqmw",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": 7.5,
                                        "summary": "Inefficient Regular Expression Complexity in chalk/ansi-regex",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "3.0.0",
                                            "fixed": "3.0.1"
                                        },
                                        {
                                            "introduced": "4.0.0",
                                            "fixed": "4.1.1"
                                        },
                                        {
                                            "introduced": "5.0.0",
                                            "fixed": "5.0.1"
                                        },
                                        {
                                            "introduced": "6.0.0",
                                            "fixed": "6.0.1"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "e682f525-ce16-81cc-ae82-fde9c096d7d8",
                "child_id": "ed9e09ea-2520-efb6-9116-e1308de19b30",
                "id": "419d21b5-2169-48ef-aff2-54ddd578c9c1",
                "child": {
                    "id": "ed9e09ea-2520-efb6-9116-e1308de19b30",
                    "range": "~0.9.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "ddfa8a5b-f5c6-46e6-b57e-8ce2877f8384",
                    "release": {
                        "id": "ddfa8a5b-f5c6-46e6-b57e-8ce2877f8384",
                        "version": "0.9.2",
                        "package": {
                            "name": "async",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "de2e897c-13bb-4e3a-b35a-872a3c39bfe3",
                                        "source_id": "GHSA-fwr7-v2mv-hh25",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": 7.8,
                                        "summary": "Prototype Pollution in async",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "2.0.0",
                                            "fixed": "2.6.4"
                                        },
                                        {
                                            "introduced": "3.0.0",
                                            "fixed": "3.2.2"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "e682f525-ce16-81cc-ae82-fde9c096d7d8",
                "child_id": "70ed664e-0022-9811-95e4-463c094ea464",
                "id": "eb4360dd-dbe4-4531-acb7-d9d994bcf2c4",
                "child": {
                    "id": "70ed664e-0022-9811-95e4-463c094ea464",
                    "range": "~1.2.9",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "44e95430-4cbe-4df5-9170-0a8fa90ebf81",
                    "release": {
                        "id": "44e95430-4cbe-4df5-9170-0a8fa90ebf81",
                        "version": "1.2.11",
                        "package": {
                            "name": "mime",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "3e108104-0435-4123-a85b-6db0e6ea1403",
                                        "source_id": "GHSA-wrvr-8mpx-r7pp",
                                        "source": "ghsa",
                                        "severity_name": "Medium",
                                        "cvss_score": null,
                                        "summary": "mime Regular Expression Denial of Service when mime lookup performed on untrusted user input",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "1.4.1"
                                        },
                                        {
                                            "introduced": "2.0.0",
                                            "fixed": "2.0.3"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "e682f525-ce16-81cc-ae82-fde9c096d7d8",
                "child_id": "2a30d9ec-99fd-ccf3-50dc-cbc31ff8cac8",
                "id": "bd758adc-6027-4273-a459-c27b611dc3c4",
                "child": {
                    "id": "2a30d9ec-99fd-ccf3-50dc-cbc31ff8cac8",
                    "range": "~0.0.4",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "a6af1e98-41ea-4506-9892-5a7c03814ac9",
                    "release": {
                        "id": "a6af1e98-41ea-4506-9892-5a7c03814ac9",
                        "version": "0.0.7",
                        "package": {
                            "name": "combined-stream",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "ddd6ca21-5620-cbf0-9d8c-1009c6a69328",
                "child_id": "7201d154-a76c-030c-205e-7f2643bdf454",
                "id": "24709160-7ac3-42ae-99fa-7e55b22d5016",
                "child": {
                    "id": "7201d154-a76c-030c-205e-7f2643bdf454",
                    "range": "~1.0.26",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "72bfbc4b-5cc4-4b37-8172-4f1c46c474db",
                    "release": {
                        "id": "72bfbc4b-5cc4-4b37-8172-4f1c46c474db",
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
                "parent_id": "bfbb9c9f-9339-8c0e-0f82-d02db97a5645",
                "child_id": "f9d70c1f-70ca-321f-2759-276b2c4ef0bb",
                "id": "3bf03635-97c8-4f82-b232-bfc1414db388",
                "child": {
                    "id": "f9d70c1f-70ca-321f-2759-276b2c4ef0bb",
                    "range": "0.2.x",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "1187b58a-3f64-4a0e-b1af-a32853ca66d1",
                    "release": {
                        "id": "1187b58a-3f64-4a0e-b1af-a32853ca66d1",
                        "version": "0.2.4",
                        "package": {
                            "name": "sntp",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "bfbb9c9f-9339-8c0e-0f82-d02db97a5645",
                "child_id": "ac10a4bd-34b3-591a-ed93-e7d8302334ce",
                "id": "5d6ade49-cb40-41bd-a928-20e43fd0a5a9",
                "child": {
                    "id": "ac10a4bd-34b3-591a-ed93-e7d8302334ce",
                    "range": "0.2.x",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "e256c604-cd33-4497-8a65-881e2511b391",
                    "release": {
                        "id": "e256c604-cd33-4497-8a65-881e2511b391",
                        "version": "0.2.2",
                        "package": {
                            "name": "cryptiles",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "940c75af-ec3e-4846-884f-4e5c15fb2db7",
                                        "source_id": "GHSA-rq8g-5pc5-wrhr",
                                        "source": "ghsa",
                                        "severity_name": "Critical",
                                        "cvss_score": 9.8,
                                        "summary": "Insufficient Entropy in cryptiles",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "4.1.2"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "bfbb9c9f-9339-8c0e-0f82-d02db97a5645",
                "child_id": "96eccd8c-fe68-65c2-6df8-e21dbae3a252",
                "id": "58689aa0-b4d1-4933-8bdb-ffcd7eb39228",
                "child": {
                    "id": "96eccd8c-fe68-65c2-6df8-e21dbae3a252",
                    "range": "0.9.x",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "4537e6ad-86bf-4dab-8393-c0ed5ef2aebe",
                    "release": {
                        "id": "4537e6ad-86bf-4dab-8393-c0ed5ef2aebe",
                        "version": "0.9.1",
                        "package": {
                            "name": "hoek",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "9c7801be-7db9-46b6-b6fa-7e7af10e6576",
                                        "source_id": "GHSA-jp4x-w63m-7wgm",
                                        "source": "ghsa",
                                        "severity_name": "Medium",
                                        "cvss_score": null,
                                        "summary": "Prototype Pollution in hoek",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "4.2.1"
                                        },
                                        {
                                            "introduced": "5.0.0",
                                            "fixed": "5.0.3"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "bfbb9c9f-9339-8c0e-0f82-d02db97a5645",
                "child_id": "5ad3942c-4efb-8061-4996-ca2163fb2374",
                "id": "aef58f0b-c5ac-405f-af9a-205b34b639cd",
                "child": {
                    "id": "5ad3942c-4efb-8061-4996-ca2163fb2374",
                    "range": "0.4.x",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "cc1f0c32-c8f9-460e-a832-5ab436a8ee39",
                    "release": {
                        "id": "cc1f0c32-c8f9-460e-a832-5ab436a8ee39",
                        "version": "0.4.2",
                        "package": {
                            "name": "boom",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "725f6588-469e-b7a6-98ec-f8fb206eaa02",
                "child_id": "c2e20014-e6c5-859d-4d04-4f847f23c784",
                "id": "12968547-05c2-427f-8d82-96cb566a2643",
                "child": {
                    "id": "c2e20014-e6c5-859d-4d04-4f847f23c784",
                    "range": "^0.1.5",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "6978d517-5655-4df7-b8cc-d8771536379e",
                    "release": {
                        "id": "6978d517-5655-4df7-b8cc-d8771536379e",
                        "version": "0.1.5",
                        "package": {
                            "name": "assert-plus",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "725f6588-469e-b7a6-98ec-f8fb206eaa02",
                "child_id": "8cc30803-8dab-2d55-d683-ec8f0d960a3a",
                "id": "3704cbe8-9d04-4d3c-b71e-400ab45e465b",
                "child": {
                    "id": "8cc30803-8dab-2d55-d683-ec8f0d960a3a",
                    "range": "0.5.3",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "e5c3be59-5c63-435a-aa15-382394ec3fcf",
                    "release": {
                        "id": "e5c3be59-5c63-435a-aa15-382394ec3fcf",
                        "version": "0.5.3",
                        "package": {
                            "name": "ctype",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "725f6588-469e-b7a6-98ec-f8fb206eaa02",
                "child_id": "71816fcb-6202-367a-da9b-825f2bb64d9d",
                "id": "7f7eb646-6542-4813-b7a6-0dd7d8f216ec",
                "child": {
                    "id": "71816fcb-6202-367a-da9b-825f2bb64d9d",
                    "range": "0.1.11",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "b5432100-5190-411f-b394-a5b158d5cdcd",
                    "release": {
                        "id": "b5432100-5190-411f-b394-a5b158d5cdcd",
                        "version": "0.1.11",
                        "package": {
                            "name": "asn1",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "393040af-6926-d210-02a0-f5d97a8700d7",
                "child_id": "ebf9c2f8-5e1a-2c70-38bf-3322c7230e95",
                "id": "ff718fbd-a592-4598-9e26-ea9e8626789d",
                "child": {
                    "id": "ebf9c2f8-5e1a-2c70-38bf-3322c7230e95",
                    "range": "^1.1.28",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "0aa15216-f999-456c-bde3-578dcf447639",
                    "release": {
                        "id": "0aa15216-f999-456c-bde3-578dcf447639",
                        "version": "1.8.0",
                        "package": {
                            "name": "psl",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "393040af-6926-d210-02a0-f5d97a8700d7",
                "child_id": "6c4f37c4-622a-0d11-9d89-87df655e906b",
                "id": "0c48ac1e-1274-4b79-896c-f9861803d154",
                "child": {
                    "id": "6c4f37c4-622a-0d11-9d89-87df655e906b",
                    "range": "^0.1.2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "a3da923b-7a4c-4489-9ece-804d38e9b1bf",
                    "release": {
                        "id": "a3da923b-7a4c-4489-9ece-804d38e9b1bf",
                        "version": "0.1.2",
                        "package": {
                            "name": "universalify",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "393040af-6926-d210-02a0-f5d97a8700d7",
                "child_id": "3d5031ec-bcba-9ee3-b9f4-4fb03bd5c547",
                "id": "f419627e-1ffd-4f61-854d-993ec40e409e",
                "child": {
                    "id": "3d5031ec-bcba-9ee3-b9f4-4fb03bd5c547",
                    "range": ">=0.2.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "b8b18735-f344-4f49-9315-0353c1b5cb4b",
                    "release": {
                        "id": "b8b18735-f344-4f49-9315-0353c1b5cb4b",
                        "version": "2.1.1",
                        "package": {
                            "name": "punycode",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "c30e5cbe-48d1-d41f-6742-035418c04fa8",
                "child_id": "70d9033c-3e33-4cf8-cfde-8be74a3fe92c",
                "id": "fb7eb065-0326-4513-ac2f-4c01b7568829",
                "child": {
                    "id": "70d9033c-3e33-4cf8-cfde-8be74a3fe92c",
                    "range": "^1.1.7",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "e97430a3-ae1b-4930-8eaf-8b02d7e6301c",
                    "release": {
                        "id": "e97430a3-ae1b-4930-8eaf-8b02d7e6301c",
                        "version": "1.1.11",
                        "package": {
                            "name": "brace-expansion",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "febd8e4b-fd47-46e2-9cc5-2273a18c90c8",
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
                "parent_id": "3487915d-7521-2260-6bca-c6dc705e09e0",
                "child_id": "ff62d078-19dc-7d2a-9cf4-1a837e5eaeab",
                "id": "57ac9feb-35d5-4e4e-840c-bed6f9f0eae3",
                "child": {
                    "id": "ff62d078-19dc-7d2a-9cf4-1a837e5eaeab",
                    "range": "2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "f15e7e6e-1961-4181-9358-7a371e6737bc",
                    "release": {
                        "id": "f15e7e6e-1961-4181-9358-7a371e6737bc",
                        "version": "2.7.3",
                        "package": {
                            "name": "lru-cache",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "3487915d-7521-2260-6bca-c6dc705e09e0",
                "child_id": "52e69c15-f8f1-5c5b-f4ec-2dcf8b83c5ad",
                "id": "21d006ef-89d8-4f9c-bc14-cb34b41746c8",
                "child": {
                    "id": "52e69c15-f8f1-5c5b-f4ec-2dcf8b83c5ad",
                    "range": "~1.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "121e67ad-f70a-4c02-9e9a-ffd12a32b4ca",
                    "release": {
                        "id": "121e67ad-f70a-4c02-9e9a-ffd12a32b4ca",
                        "version": "1.0.1",
                        "package": {
                            "name": "sigmund",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "18210398-ef09-02c2-dd07-1a6bbc286082",
                "child_id": "9fc964ba-031c-b6f9-b223-af5988907929",
                "id": "669e3195-8978-45f9-b875-b7ec271fdd39",
                "child": {
                    "id": "9fc964ba-031c-b6f9-b223-af5988907929",
                    "range": "1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "708b6742-3cae-4980-8140-5b9dbb5d1a53",
                    "release": {
                        "id": "708b6742-3cae-4980-8140-5b9dbb5d1a53",
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
                "parent_id": "4d1c646c-59f7-930d-71cb-4fd66c6957e6",
                "child_id": "489fe3d0-fe10-aebd-dbef-8af96903c988",
                "id": "683c533d-d92e-4c9e-bfe8-864d470ec37b",
                "child": {
                    "id": "489fe3d0-fe10-aebd-dbef-8af96903c988",
                    "range": "^0.2.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "ef35bad5-2543-44b9-8c9c-5c0720217c01",
                    "release": {
                        "id": "ef35bad5-2543-44b9-8c9c-5c0720217c01",
                        "version": "0.2.2",
                        "package": {
                            "name": "strip-ansi",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "26af4568-f12e-e35f-6c78-3aaca2f206ee",
                "child_id": "e8974e46-2694-332b-0254-773a3885bde0",
                "id": "e58491a8-6788-4d43-8d45-b11b4db0c38f",
                "child": {
                    "id": "e8974e46-2694-332b-0254-773a3885bde0",
                    "range": "^3.1.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "4e30792d-1e9b-4162-a5b0-4ad82ed39477",
                    "release": {
                        "id": "4e30792d-1e9b-4162-a5b0-4ad82ed39477",
                        "version": "3.14.1",
                        "package": {
                            "name": "js-yaml",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "df9e1b64-eb6c-4d91-b78b-fbc2752ceabc",
                                        "source_id": "GHSA-2pr6-76vf-7546",
                                        "source": "ghsa",
                                        "severity_name": "Medium",
                                        "cvss_score": 5.9,
                                        "summary": "Denial of Service in js-yaml",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "3.13.0"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "1d8cb1db-b5bb-4488-8580-3e0af67ce56c",
                                        "source_id": "GHSA-8j8c-7jfh-h6hx",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": null,
                                        "summary": "Code Injection in js-yaml",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "3.13.1"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "06927a6c-f9be-412b-808b-ec18c5c7af22",
                                        "source_id": "GHSA-xxvw-45rp-3mj2",
                                        "source": "ghsa",
                                        "severity_name": null,
                                        "cvss_score": null,
                                        "summary": "Deserialization Code Execution in js-yaml",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "2.0.5"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "26af4568-f12e-e35f-6c78-3aaca2f206ee",
                "child_id": "d08c6198-d865-01fe-f64e-c5e733b8e719",
                "id": "ff70dee6-68ef-4407-abf9-070167bb8fd6",
                "child": {
                    "id": "d08c6198-d865-01fe-f64e-c5e733b8e719",
                    "range": "^0.1.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "0baadd4a-1faa-402f-bb20-0a815930f275",
                    "release": {
                        "id": "0baadd4a-1faa-402f-bb20-0a815930f275",
                        "version": "0.1.5",
                        "package": {
                            "name": "osenv",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "26af4568-f12e-e35f-6c78-3aaca2f206ee",
                "child_id": "ae4d2d55-b56a-58ee-c94e-2e1fa9462680",
                "id": "6453bedb-7d91-45c2-97eb-fddefe578596",
                "child": {
                    "id": "ae4d2d55-b56a-58ee-c94e-2e1fa9462680",
                    "range": "^0.5.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "baadfbde-755c-42f2-998e-0316d739646c",
                    "release": {
                        "id": "baadfbde-755c-42f2-998e-0316d739646c",
                        "version": "0.5.6",
                        "package": {
                            "name": "mkdirp",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "26af4568-f12e-e35f-6c78-3aaca2f206ee",
                "child_id": "68375cd1-e703-fd8a-43ea-404e5b758e4f",
                "id": "909d9ab8-53bb-4caf-927a-b7a5a21eb6d0",
                "child": {
                    "id": "68375cd1-e703-fd8a-43ea-404e5b758e4f",
                    "range": "^2.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "8bbf076a-575f-4152-b307-44b6f5d3d80d",
                    "release": {
                        "id": "8bbf076a-575f-4152-b307-44b6f5d3d80d",
                        "version": "2.1.1",
                        "package": {
                            "name": "object-assign",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "26af4568-f12e-e35f-6c78-3aaca2f206ee",
                "child_id": "3e2fb09c-1914-34ef-76db-5eca80e391ec",
                "id": "55f06549-ca59-445e-bfb7-7165e186859d",
                "child": {
                    "id": "3e2fb09c-1914-34ef-76db-5eca80e391ec",
                    "range": "^2.0.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "2f1572ba-67da-4566-8def-442df79d2ef8",
                    "release": {
                        "id": "2f1572ba-67da-4566-8def-442df79d2ef8",
                        "version": "2.0.3",
                        "package": {
                            "name": "uuid",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "26af4568-f12e-e35f-6c78-3aaca2f206ee",
                "child_id": "3508a35a-8454-6309-7bee-713c7312936e",
                "id": "33ce36c1-8186-4dcb-bf64-93f5a7d1d8f7",
                "child": {
                    "id": "3508a35a-8454-6309-7bee-713c7312936e",
                    "range": "^1.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "fcbdf4d0-946e-46b5-94ee-ce93cce97305",
                    "release": {
                        "id": "fcbdf4d0-946e-46b5-94ee-ce93cce97305",
                        "version": "1.0.1",
                        "package": {
                            "name": "xdg-basedir",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "26af4568-f12e-e35f-6c78-3aaca2f206ee",
                "child_id": "2d983190-e6a6-f81c-c404-275a6bff6f59",
                "id": "3b83e959-b904-4e96-9e0a-29ea9ed3dc7f",
                "child": {
                    "id": "2d983190-e6a6-f81c-c404-275a6bff6f59",
                    "range": "^1.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "252f7899-5284-4456-a4a1-c6482dee40da",
                    "release": {
                        "id": "252f7899-5284-4456-a4a1-c6482dee40da",
                        "version": "1.1.1",
                        "package": {
                            "name": "user-home",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "26af4568-f12e-e35f-6c78-3aaca2f206ee",
                "child_id": "05aad7ef-b65f-3e87-dac0-fb36c0bd093d",
                "id": "cdce6af0-090f-4fd9-b74d-b871d5d3ce24",
                "child": {
                    "id": "05aad7ef-b65f-3e87-dac0-fb36c0bd093d",
                    "range": "^3.0.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "f062020c-ca5f-46f2-8544-2d217bc1988b",
                    "release": {
                        "id": "f062020c-ca5f-46f2-8544-2d217bc1988b",
                        "version": "3.0.12",
                        "package": {
                            "name": "graceful-fs",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "1cd830cf-b8b5-e0e4-49d4-090253813e35",
                "child_id": "b67e647a-0093-333c-17e1-786ca5008ec6",
                "id": "60a8b66c-e16a-4b14-ad89-cad0d11cff5b",
                "child": {
                    "id": "b67e647a-0093-333c-17e1-786ca5008ec6",
                    "range": "~2.3.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "cb5e4e15-22dd-4094-9b0f-1f8ae03e2a29",
                    "release": {
                        "id": "cb5e4e15-22dd-4094-9b0f-1f8ae03e2a29",
                        "version": "2.3.2",
                        "package": {
                            "name": "semver",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "d32467a3-d773-4248-8959-296be4df611d",
                                        "source_id": "GHSA-x6fg-f45m-jf5q",
                                        "source": "ghsa",
                                        "severity_name": null,
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
                "parent_id": "16895655-49ab-4c34-d2b1-a823f5cff9d0",
                "child_id": "0325f082-c0ac-145f-5970-2f2448203703",
                "id": "b1e31023-a5ee-4d5f-9a16-bdc016823d24",
                "child": {
                    "id": "0325f082-c0ac-145f-5970-2f2448203703",
                    "range": "^0.2.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "48382408-09c9-425e-977e-5c231c127d1f",
                    "release": {
                        "id": "48382408-09c9-425e-977e-5c231c127d1f",
                        "version": "0.2.0",
                        "package": {
                            "name": "package-json",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "c3be9cef-4752-7967-add4-ae6cfc1dfe6f",
                "child_id": "ca4c030f-0dfa-b742-f743-3519848bbda5",
                "id": "9f3a296f-69ce-4d90-8842-086e8df9e439",
                "child": {
                    "id": "ca4c030f-0dfa-b742-f743-3519848bbda5",
                    "range": "^2.0.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "53a342c3-4da1-4994-8063-b724b80aa231",
                    "release": {
                        "id": "53a342c3-4da1-4994-8063-b724b80aa231",
                        "version": "2.0.1",
                        "package": {
                            "name": "strip-ansi",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "c3be9cef-4752-7967-add4-ae6cfc1dfe6f",
                "child_id": "85de69d1-d14d-aa28-47b5-03059bd59e3e",
                "id": "0b7d9cee-81e6-40f5-8bda-543f1bc2bbe4",
                "child": {
                    "id": "85de69d1-d14d-aa28-47b5-03059bd59e3e",
                    "range": "0.0.4",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "8ca72293-2354-4b73-96d0-dd40f773ca2b",
                    "release": {
                        "id": "8ca72293-2354-4b73-96d0-dd40f773ca2b",
                        "version": "0.0.4",
                        "package": {
                            "name": "mute-stream",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "845ce936-d0d8-0533-bd8f-3afe5af9e9b4",
                "child_id": "b2ae9581-9de8-c8a1-fa72-6194f839ffcf",
                "id": "4057ca46-d7fa-4294-87f5-7cb1b37505cb",
                "child": {
                    "id": "b2ae9581-9de8-c8a1-fa72-6194f839ffcf",
                    "range": "^1.0.5",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "97bdc6c7-6351-49e6-b3ba-2a0270dd61f5",
                    "release": {
                        "id": "97bdc6c7-6351-49e6-b3ba-2a0270dd61f5",
                        "version": "1.0.5",
                        "package": {
                            "name": "escape-string-regexp",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "845ce936-d0d8-0533-bd8f-3afe5af9e9b4",
                "child_id": "0c938475-e38d-1977-992b-be37c7fa9fbb",
                "id": "21e3f7a3-bc94-4109-a264-66d4005f8e35",
                "child": {
                    "id": "0c938475-e38d-1977-992b-be37c7fa9fbb",
                    "range": "^4.1.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "a6cbbbc0-738b-46c6-9c2d-679fb0e3a948",
                    "release": {
                        "id": "a6cbbbc0-738b-46c6-9c2d-679fb0e3a948",
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
                "parent_id": "4f559dc1-3ade-1d25-badc-c4fd69c916ce",
                "child_id": "f354c3a6-37a6-8891-b082-a01bb10250f0",
                "id": "3cdf6127-3486-49d5-8560-7f359ae1d72c",
                "child": {
                    "id": "f354c3a6-37a6-8891-b082-a01bb10250f0",
                    "range": "~0.3.8",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "755e53c9-e56d-4819-883c-86c009183687",
                    "release": {
                        "id": "755e53c9-e56d-4819-883c-86c009183687",
                        "version": "0.3.10",
                        "package": {
                            "name": "memoizee",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "4f559dc1-3ade-1d25-badc-c4fd69c916ce",
                "child_id": "7054b730-2fdd-20ee-34eb-167223a546c8",
                "id": "e63ce3c3-5f08-4387-aeb0-d41902a788ea",
                "child": {
                    "id": "7054b730-2fdd-20ee-34eb-167223a546c8",
                    "range": "0.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "1e4424b1-bae8-42b6-9340-bd315fbd9ac7",
                    "release": {
                        "id": "1e4424b1-bae8-42b6-9340-bd315fbd9ac7",
                        "version": "0.1.7",
                        "package": {
                            "name": "timers-ext",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "4f559dc1-3ade-1d25-badc-c4fd69c916ce",
                "child_id": "41b6cee6-7ea2-a259-1c34-21a4ac27ec9c",
                "id": "ab4c380c-af9c-4ae4-b7a4-f039e1373505",
                "child": {
                    "id": "41b6cee6-7ea2-a259-1c34-21a4ac27ec9c",
                    "range": "~0.10.6",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "32343700-7615-4411-a42c-b6cf126c91f1",
                    "release": {
                        "id": "32343700-7615-4411-a42c-b6cf126c91f1",
                        "version": "0.10.61",
                        "package": {
                            "name": "es5-ext",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "4f559dc1-3ade-1d25-badc-c4fd69c916ce",
                "child_id": "26ff2323-b012-f4bb-0092-f62303e66fcd",
                "id": "7e903df0-2203-47c9-9f7e-ee0e7af7c8ef",
                "child": {
                    "id": "26ff2323-b012-f4bb-0092-f62303e66fcd",
                    "range": "~0.1.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "ce61a9d1-f0f7-401f-b982-b937227501d8",
                    "release": {
                        "id": "ce61a9d1-f0f7-401f-b982-b937227501d8",
                        "version": "0.1.1",
                        "package": {
                            "name": "d",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "f716439d-d58c-b000-d977-877632ec39ec",
                "child_id": "7c991b46-c9a7-2183-3b3e-9f238b6954d2",
                "id": "7150108b-94c8-466e-86ac-60982a676526",
                "child": {
                    "id": "7c991b46-c9a7-2183-3b3e-9f238b6954d2",
                    "range": "^7.1.3",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "e9675c98-bcac-4259-951c-f1d8d3d34e57",
                    "release": {
                        "id": "e9675c98-bcac-4259-951c-f1d8d3d34e57",
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
                "parent_id": "b70333f5-9309-4e77-b8cc-6dfbdbaf4a82",
                "child_id": "1c5f62c7-1e13-9e32-155d-f5efaab5fcbe",
                "id": "3dea74fc-44c8-49c6-8b0b-072376a3dc13",
                "child": {
                    "id": "1c5f62c7-1e13-9e32-155d-f5efaab5fcbe",
                    "range": "^1.2.6",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "4ce43681-6619-4f96-b815-e64565c3fb83",
                    "release": {
                        "id": "4ce43681-6619-4f96-b815-e64565c3fb83",
                        "version": "1.2.6",
                        "package": {
                            "name": "minimist",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "7c707cae-b730-46eb-94c3-813a8857ed93",
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
                                        "id": "6eaca9bb-8cf3-4f8a-9915-5b3e1d3bec0a",
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
                                        "id": "176f6c35-d07c-4086-a8a8-d9bbe97eb53c",
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
                "parent_id": "ff62d72e-d04a-c7f7-5b3e-036dc8641908",
                "child_id": "6193d70d-30f6-c1a5-4f1d-5d83b67a85c4",
                "id": "681c09a1-3598-4246-808c-5c47fd46172f",
                "child": {
                    "id": "6193d70d-30f6-c1a5-4f1d-5d83b67a85c4",
                    "range": "~2.4.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "cc433bba-23d4-41ae-b3ab-71100c9c2999",
                    "release": {
                        "id": "cc433bba-23d4-41ae-b3ab-71100c9c2999",
                        "version": "2.4.1",
                        "package": {
                            "name": "lodash.isfunction",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "ff62d72e-d04a-c7f7-5b3e-036dc8641908",
                "child_id": "29c761f1-2bbb-ebf2-87dd-b096614acc91",
                "id": "d3566611-2abc-4464-8630-274936bcf124",
                "child": {
                    "id": "29c761f1-2bbb-ebf2-87dd-b096614acc91",
                    "range": "~2.4.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "01715553-8a16-44c3-ab9e-7b592be1e7bf",
                    "release": {
                        "id": "01715553-8a16-44c3-ab9e-7b592be1e7bf",
                        "version": "2.4.1",
                        "package": {
                            "name": "lodash.now",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "ff62d72e-d04a-c7f7-5b3e-036dc8641908",
                "child_id": "0efd0ce3-dd17-95a6-8abc-7ff846c5e655",
                "id": "2ab979df-760f-4250-abaf-313ca81868e3",
                "child": {
                    "id": "0efd0ce3-dd17-95a6-8abc-7ff846c5e655",
                    "range": "~2.4.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "ccf3b188-f68c-419a-9051-8c3056dea30d",
                    "release": {
                        "id": "ccf3b188-f68c-419a-9051-8c3056dea30d",
                        "version": "2.4.1",
                        "package": {
                            "name": "lodash.isobject",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "ef170009-bd35-f315-e792-025f828755a2",
                "child_id": "eec570d3-7764-dcc0-53bb-1de0ac79b52b",
                "id": "a55d39ee-4e62-4d62-abd2-84749c7d7b41",
                "child": {
                    "id": "eec570d3-7764-dcc0-53bb-1de0ac79b52b",
                    "range": "~1.2.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "98e332fc-70ac-4cdd-9083-f13af1158bc6",
                    "release": {
                        "id": "98e332fc-70ac-4cdd-9083-f13af1158bc6",
                        "version": "1.2.0",
                        "package": {
                            "name": "http-signature",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "ab478de8-4fa9-48e3-a126-a8d9aa63646a",
                                        "source_id": "GHSA-q257-vv4p-fg92",
                                        "source": "ghsa",
                                        "severity_name": "Low",
                                        "cvss_score": null,
                                        "summary": "Header Forgery in http-signature",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "0.10.0"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "ef170009-bd35-f315-e792-025f828755a2",
                "child_id": "e50a7486-5717-0377-21fc-0cac97db91a9",
                "id": "6cef2ec0-f575-414f-ad93-1bf7cce92cda",
                "child": {
                    "id": "e50a7486-5717-0377-21fc-0cac97db91a9",
                    "range": "^3.3.2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "e661ec7b-141b-44ef-9549-ddb3b38354d6",
                    "release": {
                        "id": "e661ec7b-141b-44ef-9549-ddb3b38354d6",
                        "version": "3.4.0",
                        "package": {
                            "name": "uuid",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "ef170009-bd35-f315-e792-025f828755a2",
                "child_id": "c82d6598-2264-34db-23c7-d5f2c9a90d63",
                "id": "a94de30e-bcd6-4dab-a9bb-f38bed4a05a0",
                "child": {
                    "id": "c82d6598-2264-34db-23c7-d5f2c9a90d63",
                    "range": "~3.0.2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "c36b92d8-baca-48a7-915b-dbd296aa413a",
                    "release": {
                        "id": "c36b92d8-baca-48a7-915b-dbd296aa413a",
                        "version": "3.0.2",
                        "package": {
                            "name": "extend",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "851ebfe2-ff32-491f-8708-ab5dd67e7149",
                                        "source_id": "GHSA-qrmc-fj45-qfc2",
                                        "source": "ghsa",
                                        "severity_name": "Medium",
                                        "cvss_score": null,
                                        "summary": "Prototype Pollution in extend",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "2.0.2"
                                        },
                                        {
                                            "introduced": "3.0.0",
                                            "fixed": "3.0.2"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "ef170009-bd35-f315-e792-025f828755a2",
                "child_id": "c6b49008-f946-e103-fcb4-216516fea5dd",
                "id": "b5f21d56-3586-40a0-adb2-4a75aee3792e",
                "child": {
                    "id": "c6b49008-f946-e103-fcb4-216516fea5dd",
                    "range": "~0.7.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "1d78548c-a7cd-4bdc-b7e6-8027bbf1d079",
                    "release": {
                        "id": "1d78548c-a7cd-4bdc-b7e6-8027bbf1d079",
                        "version": "0.7.0",
                        "package": {
                            "name": "aws-sign2",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "ef170009-bd35-f315-e792-025f828755a2",
                "child_id": "c49b9c09-f232-0454-f80b-37ac0066e2ee",
                "id": "1a8ab64b-b9ba-4716-9d33-799b9c16bf94",
                "child": {
                    "id": "c49b9c09-f232-0454-f80b-37ac0066e2ee",
                    "range": "~2.3.2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "2ad02e51-689f-4812-ba11-d72a23b2c47b",
                    "release": {
                        "id": "2ad02e51-689f-4812-ba11-d72a23b2c47b",
                        "version": "2.3.3",
                        "package": {
                            "name": "form-data",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "ef170009-bd35-f315-e792-025f828755a2",
                "child_id": "c38fab8d-a6f8-062c-f201-d611670bd1f1",
                "id": "e9e30458-0db9-4598-9744-2b82419f71c6",
                "child": {
                    "id": "c38fab8d-a6f8-062c-f201-d611670bd1f1",
                    "range": "~1.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "5025ec47-39e7-443f-bce5-9e8f9d050d5b",
                    "release": {
                        "id": "5025ec47-39e7-443f-bce5-9e8f9d050d5b",
                        "version": "1.0.0",
                        "package": {
                            "name": "is-typedarray",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "ef170009-bd35-f315-e792-025f828755a2",
                "child_id": "b99185e5-3bc2-b2e7-acf7-2e47658fd23d",
                "id": "0b4430d8-93bd-4af9-a1ac-3453b7c06582",
                "child": {
                    "id": "b99185e5-3bc2-b2e7-acf7-2e47658fd23d",
                    "range": "~1.0.6",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "4c97021b-3cae-4366-aaa9-8e8cd56f53a2",
                    "release": {
                        "id": "4c97021b-3cae-4366-aaa9-8e8cd56f53a2",
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
                "parent_id": "ef170009-bd35-f315-e792-025f828755a2",
                "child_id": "9a29721c-b83b-eff2-fe78-3d4861ab4bdf",
                "id": "99b758cb-353a-45e9-a596-c35a5d07583a",
                "child": {
                    "id": "9a29721c-b83b-eff2-fe78-3d4861ab4bdf",
                    "range": "~5.1.3",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "82433c30-ee52-4744-b02f-b615f6b71514",
                    "release": {
                        "id": "82433c30-ee52-4744-b02f-b615f6b71514",
                        "version": "5.1.5",
                        "package": {
                            "name": "har-validator",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "ef170009-bd35-f315-e792-025f828755a2",
                "child_id": "965c2f1e-5802-bbf8-5064-34daff90f492",
                "id": "f58cedd4-0cc0-45f2-b728-9030cf710732",
                "child": {
                    "id": "965c2f1e-5802-bbf8-5064-34daff90f492",
                    "range": "~0.1.2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "99589ca6-cebd-4d85-8489-906e9a3a81da",
                    "release": {
                        "id": "99589ca6-cebd-4d85-8489-906e9a3a81da",
                        "version": "0.1.2",
                        "package": {
                            "name": "isstream",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "ef170009-bd35-f315-e792-025f828755a2",
                "child_id": "716919ab-b47b-76e9-a5f0-63901316e4eb",
                "id": "c2d1d159-90da-41a6-ae16-d5c4fddc729b",
                "child": {
                    "id": "716919ab-b47b-76e9-a5f0-63901316e4eb",
                    "range": "^5.1.2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "ba8ee851-4d69-47d7-b6bf-a1f45525bad8",
                    "release": {
                        "id": "ba8ee851-4d69-47d7-b6bf-a1f45525bad8",
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
                "parent_id": "ef170009-bd35-f315-e792-025f828755a2",
                "child_id": "6dc3ed6a-319a-6332-320f-2ede24ea9659",
                "id": "85251ad1-79e7-46a4-a7c3-2e7489c4a7c6",
                "child": {
                    "id": "6dc3ed6a-319a-6332-320f-2ede24ea9659",
                    "range": "~0.9.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "5cbb76f0-1c42-4b8c-97e9-66753dcbc574",
                    "release": {
                        "id": "5cbb76f0-1c42-4b8c-97e9-66753dcbc574",
                        "version": "0.9.0",
                        "package": {
                            "name": "oauth-sign",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "ef170009-bd35-f315-e792-025f828755a2",
                "child_id": "68fff1b5-b2bf-940e-1344-64dc74df502e",
                "id": "31aa7ac9-c6e4-467c-a69b-075a2b2347d2",
                "child": {
                    "id": "68fff1b5-b2bf-940e-1344-64dc74df502e",
                    "range": "~5.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "85396bf8-a54f-48e5-9464-221cab2c6704",
                    "release": {
                        "id": "85396bf8-a54f-48e5-9464-221cab2c6704",
                        "version": "5.0.1",
                        "package": {
                            "name": "json-stringify-safe",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "ef170009-bd35-f315-e792-025f828755a2",
                "child_id": "57255ecb-791a-55bd-ee86-c4bad8ea9c85",
                "id": "d0edd0f5-cb2a-4ea9-a242-ae13c06460b5",
                "child": {
                    "id": "57255ecb-791a-55bd-ee86-c4bad8ea9c85",
                    "range": "~2.5.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "7192d3ef-6bef-4c0b-8ced-5b7e76db681b",
                    "release": {
                        "id": "7192d3ef-6bef-4c0b-8ced-5b7e76db681b",
                        "version": "2.5.0",
                        "package": {
                            "name": "tough-cookie",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "685920ef-2793-4f1d-bf45-d975efff1344",
                                        "source_id": "GHSA-g7q5-pjjr-gqvp",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": 7.5,
                                        "summary": "Regular Expression Denial of Service in tough-cookie",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "2.3.3"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "10a2d39a-dc2f-492b-a36f-2c55a81cbf31",
                                        "source_id": "GHSA-qhv9-728r-6jqg",
                                        "source": "ghsa",
                                        "severity_name": "Medium",
                                        "cvss_score": 5.3,
                                        "summary": "ReDoS via long string of semicolons in tough-cookie",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "2.3.0"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "ef170009-bd35-f315-e792-025f828755a2",
                "child_id": "530b04d3-75f5-f5d3-839a-bf421be423ea",
                "id": "62d7f0b1-4ea2-4c09-b7e1-ed86558259ce",
                "child": {
                    "id": "530b04d3-75f5-f5d3-839a-bf421be423ea",
                    "range": "^2.1.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "9237c770-8bcb-4e2f-ae3f-791d53552966",
                    "release": {
                        "id": "9237c770-8bcb-4e2f-ae3f-791d53552966",
                        "version": "2.1.0",
                        "package": {
                            "name": "performance-now",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "ef170009-bd35-f315-e792-025f828755a2",
                "child_id": "495acb4b-f274-46a0-823e-3b94ac953a13",
                "id": "a34e1a0e-007f-4ef1-bdab-fcac50aa1877",
                "child": {
                    "id": "495acb4b-f274-46a0-823e-3b94ac953a13",
                    "range": "~0.12.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "ce999440-3d7f-4e9a-96ed-292b960883ad",
                    "release": {
                        "id": "ce999440-3d7f-4e9a-96ed-292b960883ad",
                        "version": "0.12.0",
                        "package": {
                            "name": "caseless",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "ef170009-bd35-f315-e792-025f828755a2",
                "child_id": "3c6dbe7d-9027-bd13-b23b-d58633b91f40",
                "id": "d309cfb8-a517-46d3-8e35-2ee18abbf5bd",
                "child": {
                    "id": "3c6dbe7d-9027-bd13-b23b-d58633b91f40",
                    "range": "~2.1.19",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "e22b5cdb-ead1-44d7-9dd4-53ecee75117b",
                    "release": {
                        "id": "e22b5cdb-ead1-44d7-9dd4-53ecee75117b",
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
                "parent_id": "ef170009-bd35-f315-e792-025f828755a2",
                "child_id": "25287ce5-daae-3c44-7a5e-da6438200b19",
                "id": "980a040e-935b-454d-ad61-4ae87c2c8dcd",
                "child": {
                    "id": "25287ce5-daae-3c44-7a5e-da6438200b19",
                    "range": "^1.8.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "e4d33ada-ec6a-472d-b823-73d99cb7d16f",
                    "release": {
                        "id": "e4d33ada-ec6a-472d-b823-73d99cb7d16f",
                        "version": "1.11.0",
                        "package": {
                            "name": "aws4",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "ef170009-bd35-f315-e792-025f828755a2",
                "child_id": "1c7ee109-aa7f-5af9-75ac-0c216eacd756",
                "id": "82143520-4a9e-439c-adca-98de843b5312",
                "child": {
                    "id": "1c7ee109-aa7f-5af9-75ac-0c216eacd756",
                    "range": "^0.6.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "85520be6-4aca-4ef0-80d3-a96546cbb5d9",
                    "release": {
                        "id": "85520be6-4aca-4ef0-80d3-a96546cbb5d9",
                        "version": "0.6.0",
                        "package": {
                            "name": "tunnel-agent",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "495910d2-4f10-4c26-877c-4523d7ca0d5d",
                                        "source_id": "GHSA-xc7v-wxcw-j472",
                                        "source": "ghsa",
                                        "severity_name": "Medium",
                                        "cvss_score": null,
                                        "summary": "Memory Exposure in tunnel-agent",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "0.6.0"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "ef170009-bd35-f315-e792-025f828755a2",
                "child_id": "13483090-98b9-e2ee-49f9-efbf7693fbb3",
                "id": "5b9ce99d-5323-4db7-8266-99011cc6d4fb",
                "child": {
                    "id": "13483090-98b9-e2ee-49f9-efbf7693fbb3",
                    "range": "~0.6.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "867675b4-c9eb-4edf-adf2-824f94b71e60",
                    "release": {
                        "id": "867675b4-c9eb-4edf-adf2-824f94b71e60",
                        "version": "0.6.1",
                        "package": {
                            "name": "forever-agent",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "ef170009-bd35-f315-e792-025f828755a2",
                "child_id": "04bd3c39-93e6-65ca-461b-628d9d952c7e",
                "id": "e171bfd9-334d-4304-80ae-398b707697f0",
                "child": {
                    "id": "04bd3c39-93e6-65ca-461b-628d9d952c7e",
                    "range": "~6.5.2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "78a92cdf-11d6-4fca-a109-10dc694fdb24",
                    "release": {
                        "id": "78a92cdf-11d6-4fca-a109-10dc694fdb24",
                        "version": "6.5.3",
                        "package": {
                            "name": "qs",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "e9050ca8-e5b7-4ed2-b88e-01235da0c165",
                                        "source_id": "GHSA-jjv7-qpx3-h62q",
                                        "source": "ghsa",
                                        "severity_name": null,
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
                                        "id": "282e73dc-75b0-47f6-a65c-863c71ad224a",
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
                                        "id": "36560865-327c-4393-b0a5-1637f16f235f",
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
                                },
                                {
                                    "vulnerability": {
                                        "id": "7d32681a-1370-4d06-a023-803106111dac",
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
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "edd10efd-a1e1-24d6-9d97-97272635356e",
                "child_id": "c3be9cef-4752-7967-add4-ae6cfc1dfe6f",
                "id": "54dc3e80-c706-49bf-b746-d19e4d10bf6c",
                "child": {
                    "id": "c3be9cef-4752-7967-add4-ae6cfc1dfe6f",
                    "range": "~0.1.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "455a2c93-2121-4e1f-a0e0-daf7f8cbdf8e",
                    "release": {
                        "id": "455a2c93-2121-4e1f-a0e0-daf7f8cbdf8e",
                        "version": "0.1.1",
                        "package": {
                            "name": "readline2",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "edd10efd-a1e1-24d6-9d97-97272635356e",
                "child_id": "b04bf441-4fce-5dd6-6d63-72bfa17372ba",
                "id": "d2027471-c635-42da-bb33-e00acdca9ac2",
                "child": {
                    "id": "b04bf441-4fce-5dd6-6d63-72bfa17372ba",
                    "range": "~2.4.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "2b29afdf-6ff4-40c3-972e-27d726a04ab9",
                    "release": {
                        "id": "2b29afdf-6ff4-40c3-972e-27d726a04ab9",
                        "version": "2.4.2",
                        "package": {
                            "name": "lodash",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "ec3a4329-493a-432c-b340-44eb59a7f111",
                                        "source_id": "GHSA-jf85-cpcp-j695",
                                        "source": "ghsa",
                                        "severity_name": "Critical",
                                        "cvss_score": 9.1,
                                        "summary": "Prototype Pollution in lodash",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "4.17.12"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "9cb1d5ac-9802-42de-8f74-7ee219eb30ae",
                                        "source_id": "GHSA-4xc9-xhrj-v574",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": null,
                                        "summary": "Prototype Pollution in lodash",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "4.17.11"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "4d4be38d-1e7f-41d3-8a43-ec1ff19dfe5c",
                                        "source_id": "GHSA-x5rq-j2xg-h7qm",
                                        "source": "ghsa",
                                        "severity_name": "Medium",
                                        "cvss_score": null,
                                        "summary": "Regular Expression Denial of Service (ReDoS) in lodash",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "4.17.11"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "4565e95f-8f85-4374-a638-8556e20430de",
                                        "source_id": "GHSA-fvqr-27wr-82fm",
                                        "source": "ghsa",
                                        "severity_name": "Low",
                                        "cvss_score": null,
                                        "summary": "Prototype Pollution in lodash",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "4.17.5"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "ddbcb8d9-a3fe-4e43-b88a-8498b45c2f59",
                                        "source_id": "GHSA-35jh-r3h4-6jhm",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": 7.2,
                                        "summary": "Command Injection in lodash",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "4.17.21"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "7f704fd4-a981-451e-bd29-2fb74a296b5f",
                                        "source_id": "GHSA-p6mc-m468-83gw",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": 7.4,
                                        "summary": "Prototype Pollution in lodash",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "4.17.20"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "649a016e-2205-428e-95e7-41d4e2511ffd",
                                        "source_id": "GHSA-8p5q-j9m2-g8wr",
                                        "source": "ghsa",
                                        "severity_name": "Low",
                                        "cvss_score": 9.8,
                                        "summary": "Withdrawn: Arbitrary code execution in lodash",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": null
                                        },
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": null
                                        },
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": null
                                        },
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": null
                                        },
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": null
                                        },
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": null
                                        },
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": null
                                        },
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": null
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "3c05bb46-4b73-4863-a45e-e6ea8c45379b",
                                        "source_id": "GHSA-29mw-wpgm-hmr9",
                                        "source": "ghsa",
                                        "severity_name": "Medium",
                                        "cvss_score": 5.3,
                                        "summary": "Regular Expression Denial of Service (ReDoS) in lodash",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "4.17.21"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "edd10efd-a1e1-24d6-9d97-97272635356e",
                "child_id": "85de69d1-d14d-aa28-47b5-03059bd59e3e",
                "id": "6e3f4dfd-d1b6-47e5-a7e3-2fd953a8c001",
                "child": {
                    "id": "85de69d1-d14d-aa28-47b5-03059bd59e3e",
                    "range": "0.0.4",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "8ca72293-2354-4b73-96d0-dd40f773ca2b",
                    "release": {
                        "id": "8ca72293-2354-4b73-96d0-dd40f773ca2b",
                        "version": "0.0.4",
                        "package": {
                            "name": "mute-stream",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "edd10efd-a1e1-24d6-9d97-97272635356e",
                "child_id": "4f559dc1-3ade-1d25-badc-c4fd69c916ce",
                "id": "ca8f9d1e-611a-4da6-b0a5-945aec372fcd",
                "child": {
                    "id": "4f559dc1-3ade-1d25-badc-c4fd69c916ce",
                    "range": "~0.3.2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "27f91a55-54e0-40b5-a698-6e6e6ed69c54",
                    "release": {
                        "id": "27f91a55-54e0-40b5-a698-6e6e6ed69c54",
                        "version": "0.3.3",
                        "package": {
                            "name": "cli-color",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "edd10efd-a1e1-24d6-9d97-97272635356e",
                "child_id": "37a10d91-acbd-788e-6477-ac59449847af",
                "id": "a0b79b44-3746-42e5-839e-3f53964764d1",
                "child": {
                    "id": "37a10d91-acbd-788e-6477-ac59449847af",
                    "range": "~0.5.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "c6e6fb9a-329b-441c-879d-e1364d7203a9",
                    "release": {
                        "id": "c6e6fb9a-329b-441c-879d-e1364d7203a9",
                        "version": "0.5.1",
                        "package": {
                            "name": "chalk",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "edd10efd-a1e1-24d6-9d97-97272635356e",
                "child_id": "356157e5-5a68-81c2-b9d1-dafd8895580b",
                "id": "c58f1e7d-1ff0-437f-a265-3c33cb594ed6",
                "child": {
                    "id": "356157e5-5a68-81c2-b9d1-dafd8895580b",
                    "range": "^2.2.27",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "8ab49c8c-048a-44b8-ad7e-b008dd62990d",
                    "release": {
                        "id": "8ab49c8c-048a-44b8-ad7e-b008dd62990d",
                        "version": "2.5.3",
                        "package": {
                            "name": "rx",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "edd10efd-a1e1-24d6-9d97-97272635356e",
                "child_id": "001e1efb-6ea7-bdd0-cd20-179e033503b7",
                "id": "eb2d62d8-d7a9-48ac-87bb-4fa6d0acd1ff",
                "child": {
                    "id": "001e1efb-6ea7-bdd0-cd20-179e033503b7",
                    "range": "2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "bb74e822-ff83-4267-aaba-04dd389efb9a",
                    "release": {
                        "id": "bb74e822-ff83-4267-aaba-04dd389efb9a",
                        "version": "2.3.8",
                        "package": {
                            "name": "through",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "b31da7a6-6a88-c0cc-de9a-16b0fdc8d603",
                "child_id": "3d5031ec-bcba-9ee3-b9f4-4fb03bd5c547",
                "id": "b8ff3748-eeed-4070-a15a-873c68c3fceb",
                "child": {
                    "id": "3d5031ec-bcba-9ee3-b9f4-4fb03bd5c547",
                    "range": ">=0.2.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "b8b18735-f344-4f49-9315-0353c1b5cb4b",
                    "release": {
                        "id": "b8b18735-f344-4f49-9315-0353c1b5cb4b",
                        "version": "2.1.1",
                        "package": {
                            "name": "punycode",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "38005c83-2172-7ad4-14a2-9569676361fe",
                "child_id": "6d84e523-76da-8c3a-4677-b9bb27bce270",
                "id": "7b6f56fd-909d-441d-ba94-4a4a2b6358ff",
                "child": {
                    "id": "6d84e523-76da-8c3a-4677-b9bb27bce270",
                    "range": "^1.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "5b664d7a-8faa-4c93-b263-4231d34a90d8",
                    "release": {
                        "id": "5b664d7a-8faa-4c93-b263-4231d34a90d8",
                        "version": "1.1.0",
                        "package": {
                            "name": "osx-release",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "38005c83-2172-7ad4-14a2-9569676361fe",
                "child_id": "60624c77-5ea5-896b-605a-e9a837647157",
                "id": "0fa8fd2c-ea2a-43f5-aef7-38e8faf42596",
                "child": {
                    "id": "60624c77-5ea5-896b-605a-e9a837647157",
                    "range": "^1.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "75b9d570-4b87-4cc4-baa8-c4000585185f",
                    "release": {
                        "id": "75b9d570-4b87-4cc4-baa8-c4000585185f",
                        "version": "1.1.1",
                        "package": {
                            "name": "win-release",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "fea6d467-587b-a299-11bb-fc58f2d25a87",
                "child_id": "ddd6ca21-5620-cbf0-9d8c-1009c6a69328",
                "id": "0e94d7b5-d4e0-40a8-96ab-3cdfd71c25df",
                "child": {
                    "id": "ddd6ca21-5620-cbf0-9d8c-1009c6a69328",
                    "range": "^0.9.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "0593a916-853f-4680-816c-d828843cdb1f",
                    "release": {
                        "id": "0593a916-853f-4680-816c-d828843cdb1f",
                        "version": "0.9.5",
                        "package": {
                            "name": "bl",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "ae1dcb18-038f-483c-acdc-937136451e75",
                                        "source_id": "GHSA-wrw9-m778-g6mc",
                                        "source": "ghsa",
                                        "severity_name": "Medium",
                                        "cvss_score": null,
                                        "summary": "Memory Exposure in bl",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "0.9.5"
                                        },
                                        {
                                            "introduced": "1.0.0",
                                            "fixed": "1.0.1"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "09e7b740-ab2a-4bc7-bebb-71f0e6fcfceb",
                                        "source_id": "GHSA-pp7h-53gx-mx7r",
                                        "source": "ghsa",
                                        "severity_name": "Medium",
                                        "cvss_score": 6.5,
                                        "summary": "Remote Memory Exposure in bl",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "1.2.3"
                                        },
                                        {
                                            "introduced": "2.0.0",
                                            "fixed": "2.2.1"
                                        },
                                        {
                                            "introduced": "3.0.0",
                                            "fixed": "3.0.1"
                                        },
                                        {
                                            "introduced": "4.0.0",
                                            "fixed": "4.0.3"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "fea6d467-587b-a299-11bb-fc58f2d25a87",
                "child_id": "ce0840b6-34d4-332b-b9f4-87ca3cf298bd",
                "id": "4b29433b-78c1-48b9-8581-e863643d8610",
                "child": {
                    "id": "ce0840b6-34d4-332b-b9f4-87ca3cf298bd",
                    "range": "~1.0.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "6040d63a-50a1-4317-b297-d6351a661382",
                    "release": {
                        "id": "6040d63a-50a1-4317-b297-d6351a661382",
                        "version": "1.0.2",
                        "package": {
                            "name": "mime-types",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "fea6d467-587b-a299-11bb-fc58f2d25a87",
                "child_id": "cca8de58-59b0-288d-05b8-681d84251a85",
                "id": "31a620f2-c1c1-4fdd-8151-c459d489b27c",
                "child": {
                    "id": "cca8de58-59b0-288d-05b8-681d84251a85",
                    "range": "~0.5.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "3705ea1d-2d72-418a-916e-1f1edd45b8bf",
                    "release": {
                        "id": "3705ea1d-2d72-418a-916e-1f1edd45b8bf",
                        "version": "0.5.2",
                        "package": {
                            "name": "forever-agent",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "fea6d467-587b-a299-11bb-fc58f2d25a87",
                "child_id": "bfbb9c9f-9339-8c0e-0f82-d02db97a5645",
                "id": "9a4703a9-b719-443a-946d-de2b2c074f92",
                "child": {
                    "id": "bfbb9c9f-9339-8c0e-0f82-d02db97a5645",
                    "range": "1.1.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "574c8eea-b602-4850-9041-1ba6d65511b2",
                    "release": {
                        "id": "574c8eea-b602-4850-9041-1ba6d65511b2",
                        "version": "1.1.1",
                        "package": {
                            "name": "hawk",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "4166263d-578e-4019-98e2-6b01d33546e6",
                                        "source_id": "GHSA-44pw-h2cw-w3vq",
                                        "source": "ghsa",
                                        "severity_name": null,
                                        "cvss_score": 7.4,
                                        "summary": "Uncontrolled Resource Consumption in Hawk",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "9.0.1"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "7c184ac0-d271-4c01-8342-781e7fded388",
                                        "source_id": "GHSA-jcpv-g9rr-qxrc",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": 7.5,
                                        "summary": "Regular Expression Denial of Service in hawk",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "3.1.3"
                                        },
                                        {
                                            "introduced": "4.0.0",
                                            "fixed": "4.1.1"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "fea6d467-587b-a299-11bb-fc58f2d25a87",
                "child_id": "bb60001e-f7d0-fe58-d6cd-5cacd40129fb",
                "id": "9fd455c5-8ada-4353-9a3c-bd23116af574",
                "child": {
                    "id": "bb60001e-f7d0-fe58-d6cd-5cacd40129fb",
                    "range": "~1.4.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "4bcacd42-d242-461e-ba34-617b1f59bdbb",
                    "release": {
                        "id": "4bcacd42-d242-461e-ba34-617b1f59bdbb",
                        "version": "1.4.8",
                        "package": {
                            "name": "node-uuid",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "81eb7c7f-6b41-466c-9460-1d5895e97379",
                                        "source_id": "GHSA-265q-28rp-chq5",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": 7.5,
                                        "summary": "Insecure Entropy Source - Math.random() in node-uuid",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "1.4.4"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "fea6d467-587b-a299-11bb-fc58f2d25a87",
                "child_id": "883c485b-ae67-254e-feb0-c69042f2fc5a",
                "id": "08f62f5c-bff4-4601-a40c-a86b717b09af",
                "child": {
                    "id": "883c485b-ae67-254e-feb0-c69042f2fc5a",
                    "range": "~0.2.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "5369d9ce-fdba-4b35-a1ef-68b3989b3412",
                    "release": {
                        "id": "5369d9ce-fdba-4b35-a1ef-68b3989b3412",
                        "version": "0.2.0",
                        "package": {
                            "name": "form-data",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "fea6d467-587b-a299-11bb-fc58f2d25a87",
                "child_id": "725f6588-469e-b7a6-98ec-f8fb206eaa02",
                "id": "6a574ae8-8bd9-45ff-a57c-59ce6fee700c",
                "child": {
                    "id": "725f6588-469e-b7a6-98ec-f8fb206eaa02",
                    "range": "~0.10.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "afa9d936-3b1f-4985-a78e-96050a14e205",
                    "release": {
                        "id": "afa9d936-3b1f-4985-a78e-96050a14e205",
                        "version": "0.10.1",
                        "package": {
                            "name": "http-signature",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "ab478de8-4fa9-48e3-a126-a8d9aa63646a",
                                        "source_id": "GHSA-q257-vv4p-fg92",
                                        "source": "ghsa",
                                        "severity_name": "Low",
                                        "cvss_score": null,
                                        "summary": "Header Forgery in http-signature",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "0.10.0"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "fea6d467-587b-a299-11bb-fc58f2d25a87",
                "child_id": "6f62d8b0-5740-5df4-bde9-93849cdcd225",
                "id": "c0f19486-9c24-479b-87ad-9521c2a44877",
                "child": {
                    "id": "6f62d8b0-5740-5df4-bde9-93849cdcd225",
                    "range": "~0.5.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "62fea90f-5d6a-4db7-b8f1-bc0ad063e561",
                    "release": {
                        "id": "62fea90f-5d6a-4db7-b8f1-bc0ad063e561",
                        "version": "0.5.0",
                        "package": {
                            "name": "oauth-sign",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "fea6d467-587b-a299-11bb-fc58f2d25a87",
                "child_id": "68fff1b5-b2bf-940e-1344-64dc74df502e",
                "id": "7b0dda82-7213-401c-9520-f5b791569df5",
                "child": {
                    "id": "68fff1b5-b2bf-940e-1344-64dc74df502e",
                    "range": "~5.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "85396bf8-a54f-48e5-9464-221cab2c6704",
                    "release": {
                        "id": "85396bf8-a54f-48e5-9464-221cab2c6704",
                        "version": "5.0.1",
                        "package": {
                            "name": "json-stringify-safe",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "fea6d467-587b-a299-11bb-fc58f2d25a87",
                "child_id": "41c2e95c-ec5f-390d-0027-9603c0e8d9ed",
                "id": "a668f677-63ce-4fb9-b90f-c1055805b4a8",
                "child": {
                    "id": "41c2e95c-ec5f-390d-0027-9603c0e8d9ed",
                    "range": "~0.4.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "3788161d-6d11-4ead-9ac2-4b2560d2fc4f",
                    "release": {
                        "id": "3788161d-6d11-4ead-9ac2-4b2560d2fc4f",
                        "version": "0.4.3",
                        "package": {
                            "name": "tunnel-agent",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "495910d2-4f10-4c26-877c-4523d7ca0d5d",
                                        "source_id": "GHSA-xc7v-wxcw-j472",
                                        "source": "ghsa",
                                        "severity_name": "Medium",
                                        "cvss_score": null,
                                        "summary": "Memory Exposure in tunnel-agent",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "0.6.0"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "fea6d467-587b-a299-11bb-fc58f2d25a87",
                "child_id": "393040af-6926-d210-02a0-f5d97a8700d7",
                "id": "18936a49-32eb-4eac-ab7f-b782062b972e",
                "child": {
                    "id": "393040af-6926-d210-02a0-f5d97a8700d7",
                    "range": ">=0.12.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "2e10d6fe-a406-4969-b59d-407560cfaf54",
                    "release": {
                        "id": "2e10d6fe-a406-4969-b59d-407560cfaf54",
                        "version": "4.0.0",
                        "package": {
                            "name": "tough-cookie",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "685920ef-2793-4f1d-bf45-d975efff1344",
                                        "source_id": "GHSA-g7q5-pjjr-gqvp",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": 7.5,
                                        "summary": "Regular Expression Denial of Service in tough-cookie",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "2.3.3"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "10a2d39a-dc2f-492b-a36f-2c55a81cbf31",
                                        "source_id": "GHSA-qhv9-728r-6jqg",
                                        "source": "ghsa",
                                        "severity_name": "Medium",
                                        "cvss_score": 5.3,
                                        "summary": "ReDoS via long string of semicolons in tough-cookie",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "2.3.0"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "fea6d467-587b-a299-11bb-fc58f2d25a87",
                "child_id": "2a30d9ec-99fd-ccf3-50dc-cbc31ff8cac8",
                "id": "3480252f-e96a-4f22-8c2e-bb66bfa00a4f",
                "child": {
                    "id": "2a30d9ec-99fd-ccf3-50dc-cbc31ff8cac8",
                    "range": "~0.0.4",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "a6af1e98-41ea-4506-9892-5a7c03814ac9",
                    "release": {
                        "id": "a6af1e98-41ea-4506-9892-5a7c03814ac9",
                        "version": "0.0.7",
                        "package": {
                            "name": "combined-stream",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "fea6d467-587b-a299-11bb-fc58f2d25a87",
                "child_id": "231528ba-bf6f-bddf-a389-a669ad961be7",
                "id": "cd127e33-cbe5-4876-b94d-cdb39af198d7",
                "child": {
                    "id": "231528ba-bf6f-bddf-a389-a669ad961be7",
                    "range": "~2.3.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "158fde0d-0059-4997-9808-4b3ec893558f",
                    "release": {
                        "id": "158fde0d-0059-4997-9808-4b3ec893558f",
                        "version": "2.3.3",
                        "package": {
                            "name": "qs",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "e9050ca8-e5b7-4ed2-b88e-01235da0c165",
                                        "source_id": "GHSA-jjv7-qpx3-h62q",
                                        "source": "ghsa",
                                        "severity_name": null,
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
                                        "id": "282e73dc-75b0-47f6-a65c-863c71ad224a",
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
                                        "id": "36560865-327c-4393-b0a5-1637f16f235f",
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
                                },
                                {
                                    "vulnerability": {
                                        "id": "7d32681a-1370-4d06-a023-803106111dac",
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
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "fea6d467-587b-a299-11bb-fc58f2d25a87",
                "child_id": "204dca54-b106-17a0-a811-1f2c56a6b89c",
                "id": "6bd06c11-18f5-4ac2-ae7a-404cf06a9d8c",
                "child": {
                    "id": "204dca54-b106-17a0-a811-1f2c56a6b89c",
                    "range": "~0.5.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "d3c06d3f-405c-440d-a15a-7b9234e32c5c",
                    "release": {
                        "id": "d3c06d3f-405c-440d-a15a-7b9234e32c5c",
                        "version": "0.5.0",
                        "package": {
                            "name": "aws-sign2",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "fea6d467-587b-a299-11bb-fc58f2d25a87",
                "child_id": "0857cba3-33eb-6859-183d-75b923f7f91f",
                "id": "09a14ead-f5bc-463c-9d8c-0e6dea9bf447",
                "child": {
                    "id": "0857cba3-33eb-6859-183d-75b923f7f91f",
                    "range": "~0.8.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "2d8a8d30-fee5-4365-977a-973363be55f5",
                    "release": {
                        "id": "2d8a8d30-fee5-4365-977a-973363be55f5",
                        "version": "0.8.0",
                        "package": {
                            "name": "caseless",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "fea6d467-587b-a299-11bb-fc58f2d25a87",
                "child_id": "04722eb2-aaa7-d050-8fcc-a3bc2a5f4176",
                "id": "f66b7fd5-c2e1-48bb-a866-0c69279eb994",
                "child": {
                    "id": "04722eb2-aaa7-d050-8fcc-a3bc2a5f4176",
                    "range": "~0.0.4",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "3a574489-400b-4b51-ab09-b5c16d8d833f",
                    "release": {
                        "id": "3a574489-400b-4b51-ab09-b5c16d8d833f",
                        "version": "0.0.6",
                        "package": {
                            "name": "stringstream",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "6e5c72f1-a35a-4a61-9d9d-7720cfdd203b",
                                        "source_id": "GHSA-mf6x-7mm4-x2g7",
                                        "source": "ghsa",
                                        "severity_name": "Medium",
                                        "cvss_score": null,
                                        "summary": "Out-of-bounds Read in stringstream",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "0.0.6"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "2d690170-9b39-4bd6-bafe-8f49853c5596",
                                        "source_id": "GHSA-qpw2-xchm-655q",
                                        "source": "ghsa",
                                        "severity_name": "Medium",
                                        "cvss_score": 6.5,
                                        "summary": "Out-of-Bounds read in stringstream",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "0.0.6"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "70e7326c-ae26-a8d6-2231-45721a77b4da",
                "child_id": "99e43580-5895-19ec-1d8c-a4033ab7b2ad",
                "id": "0cbaa233-507a-4ecd-8d85-60ef40024a83",
                "child": {
                    "id": "99e43580-5895-19ec-1d8c-a4033ab7b2ad",
                    "range": "~0.6.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "3d621dfc-510c-4794-a895-cc730c28cf0d",
                    "release": {
                        "id": "3d621dfc-510c-4794-a895-cc730c28cf0d",
                        "version": "0.6.1",
                        "package": {
                            "name": "retry",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "90f228be-fc69-8d97-674f-724b909c2909",
                "child_id": "bf32b52e-e0a5-c272-62bf-7d5d238228ae",
                "id": "d6c280b4-d342-41cd-aa4e-08db0a9e88d9",
                "child": {
                    "id": "bf32b52e-e0a5-c272-62bf-7d5d238228ae",
                    "range": "~1.0.4",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "3fe5e23d-442f-41c6-b7b7-e32bc779db1f",
                    "release": {
                        "id": "3fe5e23d-442f-41c6-b7b7-e32bc779db1f",
                        "version": "1.0.4",
                        "package": {
                            "name": "esprima",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "8fdf28b6-e957-8a16-fb3b-87307fbc6d82",
                "child_id": "dc6f4a62-b33f-bb28-adca-47e16f9d4eb0",
                "id": "7262b0d3-b9ac-4e23-b974-e7270aa82120",
                "child": {
                    "id": "dc6f4a62-b33f-bb28-adca-47e16f9d4eb0",
                    "range": "~0.0.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "5595ef84-9555-4a80-8137-c55154471862",
                    "release": {
                        "id": "5595ef84-9555-4a80-8137-c55154471862",
                        "version": "0.0.10",
                        "package": {
                            "name": "minimist",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "7c707cae-b730-46eb-94c3-813a8857ed93",
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
                                        "id": "6eaca9bb-8cf3-4f8a-9915-5b3e1d3bec0a",
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
                                        "id": "176f6c35-d07c-4086-a8a8-d9bbe97eb53c",
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
                "parent_id": "8fdf28b6-e957-8a16-fb3b-87307fbc6d82",
                "child_id": "acf2a6c6-e051-e119-473a-9661a01735c8",
                "id": "cd6d2f25-28fd-4884-a82d-6351ea38f29d",
                "child": {
                    "id": "acf2a6c6-e051-e119-473a-9661a01735c8",
                    "range": "~0.0.2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "fc6b8d51-9adf-47f0-84c2-60df3b3d1274",
                    "release": {
                        "id": "fc6b8d51-9adf-47f0-84c2-60df3b3d1274",
                        "version": "0.0.3",
                        "package": {
                            "name": "wordwrap",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "37cdc31d-370e-9bbc-7e0b-725b88e82ed9",
                "child_id": "ec29fa5a-3cf0-868a-fdff-9d0c46711588",
                "id": "25e02a5e-b982-44b6-adf7-35b735f76927",
                "child": {
                    "id": "ec29fa5a-3cf0-868a-fdff-9d0c46711588",
                    "range": "~1.2.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "fb05ecc1-59df-49a4-ab58-186d77e97393",
                    "release": {
                        "id": "fb05ecc1-59df-49a4-ab58-186d77e97393",
                        "version": "1.2.0",
                        "package": {
                            "name": "once",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "37cdc31d-370e-9bbc-7e0b-725b88e82ed9",
                "child_id": "c40afeb9-eb74-0806-7804-96d0ea7d2b54",
                "id": "e336f30a-40f6-4ee7-a504-f431e83ef479",
                "child": {
                    "id": "c40afeb9-eb74-0806-7804-96d0ea7d2b54",
                    "range": "~1.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "a4b3690e-9fe7-4369-a073-2cc2e8903011",
                    "release": {
                        "id": "a4b3690e-9fe7-4369-a073-2cc2e8903011",
                        "version": "1.0.0",
                        "package": {
                            "name": "end-of-stream",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "299689de-3f7b-e5b4-1bd4-47291fb03394",
                "child_id": "fdb691d4-7c95-981d-64e3-70c1cefe606a",
                "id": "6af8f5c1-5c52-4135-b0ca-a2e3ca9b8860",
                "child": {
                    "id": "fdb691d4-7c95-981d-64e3-70c1cefe606a",
                    "range": "^4.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "fbc2ba70-7c1d-4a97-b0ca-5a79595704ff",
                    "release": {
                        "id": "fbc2ba70-7c1d-4a97-b0ca-5a79595704ff",
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
                "parent_id": "299689de-3f7b-e5b4-1bd4-47291fb03394",
                "child_id": "ddd6ca21-5620-cbf0-9d8c-1009c6a69328",
                "id": "c7c8148f-1c9a-45b7-901f-72b6d63efd07",
                "child": {
                    "id": "ddd6ca21-5620-cbf0-9d8c-1009c6a69328",
                    "range": "^0.9.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "0593a916-853f-4680-816c-d828843cdb1f",
                    "release": {
                        "id": "0593a916-853f-4680-816c-d828843cdb1f",
                        "version": "0.9.5",
                        "package": {
                            "name": "bl",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "ae1dcb18-038f-483c-acdc-937136451e75",
                                        "source_id": "GHSA-wrw9-m778-g6mc",
                                        "source": "ghsa",
                                        "severity_name": "Medium",
                                        "cvss_score": null,
                                        "summary": "Memory Exposure in bl",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "0.9.5"
                                        },
                                        {
                                            "introduced": "1.0.0",
                                            "fixed": "1.0.1"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "09e7b740-ab2a-4bc7-bebb-71f0e6fcfceb",
                                        "source_id": "GHSA-pp7h-53gx-mx7r",
                                        "source": "ghsa",
                                        "severity_name": "Medium",
                                        "cvss_score": 6.5,
                                        "summary": "Remote Memory Exposure in bl",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "1.2.3"
                                        },
                                        {
                                            "introduced": "2.0.0",
                                            "fixed": "2.2.1"
                                        },
                                        {
                                            "introduced": "3.0.0",
                                            "fixed": "3.0.1"
                                        },
                                        {
                                            "introduced": "4.0.0",
                                            "fixed": "4.0.3"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "299689de-3f7b-e5b4-1bd4-47291fb03394",
                "child_id": "2d441d65-302d-c4db-3d2d-3431a738dcd1",
                "id": "abe3daf4-98ba-437c-8bea-e1c28390a12d",
                "child": {
                    "id": "2d441d65-302d-c4db-3d2d-3431a738dcd1",
                    "range": "^1.1.12",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "4054d042-b5d3-4cee-abc4-3e1cb11052c3",
                    "release": {
                        "id": "4054d042-b5d3-4cee-abc4-3e1cb11052c3",
                        "version": "1.1.14",
                        "package": {
                            "name": "readable-stream",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "299689de-3f7b-e5b4-1bd4-47291fb03394",
                "child_id": "03f75e65-725b-751a-67e9-c17fb40196c3",
                "id": "58ce9b31-639c-4f94-9b75-5a95489e0cb7",
                "child": {
                    "id": "03f75e65-725b-751a-67e9-c17fb40196c3",
                    "range": "^1.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "cca296d5-95ac-44c0-8d3e-0f63d54876c6",
                    "release": {
                        "id": "cca296d5-95ac-44c0-8d3e-0f63d54876c6",
                        "version": "1.4.4",
                        "package": {
                            "name": "end-of-stream",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "ec38ba7f-55a5-bd8d-8b93-ebf88d167475",
                "child_id": "5be041b1-e009-68d3-6193-6bb3d5b64b59",
                "id": "5e2b578f-bf06-4db5-bd1c-185344a3ddaa",
                "child": {
                    "id": "5be041b1-e009-68d3-6193-6bb3d5b64b59",
                    "range": "1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "06c99d8e-8760-450c-b69f-cb98f932d2a7",
                    "release": {
                        "id": "06c99d8e-8760-450c-b69f-cb98f932d2a7",
                        "version": "1.1.1",
                        "package": {
                            "name": "abbrev",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "84067b1c-d81a-3aba-7d86-41c0dc01b78f",
                "child_id": "5463d1bc-678d-edc7-ea68-0f2ba4a0d7a4",
                "id": "8c575c02-4f77-45b6-870f-a57bac81e473",
                "child": {
                    "id": "5463d1bc-678d-edc7-ea68-0f2ba4a0d7a4",
                    "range": "~1.0.10",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "cb94fcb1-938e-4528-99a0-2d12bcc9fa9e",
                    "release": {
                        "id": "cb94fcb1-938e-4528-99a0-2d12bcc9fa9e",
                        "version": "1.0.10",
                        "package": {
                            "name": "nopt",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "7c22422c-4cb2-80f1-919c-19d504b535eb",
                "child_id": "f7de74cb-bb0b-3f7a-9658-db96a9833ece",
                "id": "4c028ddb-7749-4a33-a790-d4cbc37f702b",
                "child": {
                    "id": "f7de74cb-bb0b-3f7a-9658-db96a9833ece",
                    "range": "^1.1.3",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "6e3278e4-07de-465f-8af3-fb5f7c0b6c21",
                    "release": {
                        "id": "6e3278e4-07de-465f-8af3-fb5f7c0b6c21",
                        "version": "1.1.6",
                        "package": {
                            "name": "natives",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "08266d5a-6695-b489-068e-30005203778e",
                "child_id": "a9b2177a-50ab-573c-7028-b350fb0163b0",
                "id": "66c9b0d5-3d93-4e05-a211-03a056aec824",
                "child": {
                    "id": "a9b2177a-50ab-573c-7028-b350fb0163b0",
                    "range": "~0.1.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "57424c41-b4bd-4ff2-9799-b4c38b99f60b",
                    "release": {
                        "id": "57424c41-b4bd-4ff2-9799-b4c38b99f60b",
                        "version": "0.1.1",
                        "package": {
                            "name": "buffers",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "08266d5a-6695-b489-068e-30005203778e",
                "child_id": "4c299eee-37de-7428-6d4a-e1a2af70d10e",
                "id": "471cb286-d63b-43a6-aedd-0bc9a24eaaae",
                "child": {
                    "id": "4c299eee-37de-7428-6d4a-e1a2af70d10e",
                    "range": "~0.1.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "dfdaee68-d08b-4c26-ba6d-8f7ba10ba28a",
                    "release": {
                        "id": "dfdaee68-d08b-4c26-ba6d-8f7ba10ba28a",
                        "version": "0.1.0",
                        "package": {
                            "name": "chainsaw",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "2ec79080-7b01-7611-424a-104cc1605660",
                "child_id": "de55867c-2354-3186-9505-d3878f83659f",
                "id": "e9e58f78-45f9-492d-8784-041d9f6ef046",
                "child": {
                    "id": "de55867c-2354-3186-9505-d3878f83659f",
                    "range": "~3.2.9",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "50a638c7-6970-42c6-a3f6-789d79676f10",
                    "release": {
                        "id": "50a638c7-6970-42c6-a3f6-789d79676f10",
                        "version": "3.2.11",
                        "package": {
                            "name": "glob",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "2ec79080-7b01-7611-424a-104cc1605660",
                "child_id": "b04bf441-4fce-5dd6-6d63-72bfa17372ba",
                "id": "927d32e9-b33e-484e-9556-3f0f4a8a9b6c",
                "child": {
                    "id": "b04bf441-4fce-5dd6-6d63-72bfa17372ba",
                    "range": "~2.4.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "2b29afdf-6ff4-40c3-972e-27d726a04ab9",
                    "release": {
                        "id": "2b29afdf-6ff4-40c3-972e-27d726a04ab9",
                        "version": "2.4.2",
                        "package": {
                            "name": "lodash",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "ec3a4329-493a-432c-b340-44eb59a7f111",
                                        "source_id": "GHSA-jf85-cpcp-j695",
                                        "source": "ghsa",
                                        "severity_name": "Critical",
                                        "cvss_score": 9.1,
                                        "summary": "Prototype Pollution in lodash",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "4.17.12"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "9cb1d5ac-9802-42de-8f74-7ee219eb30ae",
                                        "source_id": "GHSA-4xc9-xhrj-v574",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": null,
                                        "summary": "Prototype Pollution in lodash",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "4.17.11"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "4d4be38d-1e7f-41d3-8a43-ec1ff19dfe5c",
                                        "source_id": "GHSA-x5rq-j2xg-h7qm",
                                        "source": "ghsa",
                                        "severity_name": "Medium",
                                        "cvss_score": null,
                                        "summary": "Regular Expression Denial of Service (ReDoS) in lodash",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "4.17.11"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "4565e95f-8f85-4374-a638-8556e20430de",
                                        "source_id": "GHSA-fvqr-27wr-82fm",
                                        "source": "ghsa",
                                        "severity_name": "Low",
                                        "cvss_score": null,
                                        "summary": "Prototype Pollution in lodash",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "4.17.5"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "ddbcb8d9-a3fe-4e43-b88a-8498b45c2f59",
                                        "source_id": "GHSA-35jh-r3h4-6jhm",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": 7.2,
                                        "summary": "Command Injection in lodash",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "4.17.21"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "7f704fd4-a981-451e-bd29-2fb74a296b5f",
                                        "source_id": "GHSA-p6mc-m468-83gw",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": 7.4,
                                        "summary": "Prototype Pollution in lodash",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "4.17.20"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "649a016e-2205-428e-95e7-41d4e2511ffd",
                                        "source_id": "GHSA-8p5q-j9m2-g8wr",
                                        "source": "ghsa",
                                        "severity_name": "Low",
                                        "cvss_score": 9.8,
                                        "summary": "Withdrawn: Arbitrary code execution in lodash",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": null
                                        },
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": null
                                        },
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": null
                                        },
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": null
                                        },
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": null
                                        },
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": null
                                        },
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": null
                                        },
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": null
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "3c05bb46-4b73-4863-a45e-e6ea8c45379b",
                                        "source_id": "GHSA-29mw-wpgm-hmr9",
                                        "source": "ghsa",
                                        "severity_name": "Medium",
                                        "cvss_score": 5.3,
                                        "summary": "Regular Expression Denial of Service (ReDoS) in lodash",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "4.17.21"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "10c7e988-1c3e-ff48-aba4-0d231f05490c",
                "child_id": "2d441d65-302d-c4db-3d2d-3431a738dcd1",
                "id": "f4dd09a2-598f-4d55-a486-a4d4413a6d98",
                "child": {
                    "id": "2d441d65-302d-c4db-3d2d-3431a738dcd1",
                    "range": "^1.1.12",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "4054d042-b5d3-4cee-abc4-3e1cb11052c3",
                    "release": {
                        "id": "4054d042-b5d3-4cee-abc4-3e1cb11052c3",
                        "version": "1.1.14",
                        "package": {
                            "name": "readable-stream",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "202abac5-3c51-7713-c239-d76fd7b9f47d",
                "child_id": "d3bbaf46-5566-3d34-d798-b79a76fb20ff",
                "id": "8b092934-f5e6-45b3-981b-8f1a12a0ab3f",
                "child": {
                    "id": "d3bbaf46-5566-3d34-d798-b79a76fb20ff",
                    "range": "^1.0.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "83ffaa65-3412-4bdc-8164-066fcb18b569",
                    "release": {
                        "id": "83ffaa65-3412-4bdc-8164-066fcb18b569",
                        "version": "1.0.0",
                        "package": {
                            "name": "has-tostringtag",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "202abac5-3c51-7713-c239-d76fd7b9f47d",
                "child_id": "8279937e-18c7-f64d-1638-30d529329e55",
                "id": "3b1aa2d6-55ae-4de8-875c-394ec23db540",
                "child": {
                    "id": "8279937e-18c7-f64d-1638-30d529329e55",
                    "range": "^1.0.2",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "e790ff1a-66f6-4939-9623-89e4a4fcefcf",
                    "release": {
                        "id": "e790ff1a-66f6-4939-9623-89e4a4fcefcf",
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
                "parent_id": "15338c04-a401-f991-f7ea-4f11fa2b3e8b",
                "child_id": "d3bbaf46-5566-3d34-d798-b79a76fb20ff",
                "id": "b59a4533-a4f8-4685-b0a6-d6091cf9ead7",
                "child": {
                    "id": "d3bbaf46-5566-3d34-d798-b79a76fb20ff",
                    "range": "^1.0.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "83ffaa65-3412-4bdc-8164-066fcb18b569",
                    "release": {
                        "id": "83ffaa65-3412-4bdc-8164-066fcb18b569",
                        "version": "1.0.0",
                        "package": {
                            "name": "has-tostringtag",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "15338c04-a401-f991-f7ea-4f11fa2b3e8b",
                "child_id": "c5a7f7fe-3b99-ea1d-95f0-fd1077eb3ddf",
                "id": "894d7c6c-ba7d-441f-9707-e1ff2e14e4d6",
                "child": {
                    "id": "c5a7f7fe-3b99-ea1d-95f0-fd1077eb3ddf",
                    "range": "^0.3.3",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "3ba5c8d0-dc50-4c12-8a64-d7ea2d1d0a66",
                    "release": {
                        "id": "3ba5c8d0-dc50-4c12-8a64-d7ea2d1d0a66",
                        "version": "0.3.3",
                        "package": {
                            "name": "for-each",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "15338c04-a401-f991-f7ea-4f11fa2b3e8b",
                "child_id": "8279937e-18c7-f64d-1638-30d529329e55",
                "id": "642c68bc-357d-4acb-919b-379a7f8f4f8f",
                "child": {
                    "id": "8279937e-18c7-f64d-1638-30d529329e55",
                    "range": "^1.0.2",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "e790ff1a-66f6-4939-9623-89e4a4fcefcf",
                    "release": {
                        "id": "e790ff1a-66f6-4939-9623-89e4a4fcefcf",
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
                "parent_id": "15338c04-a401-f991-f7ea-4f11fa2b3e8b",
                "child_id": "379ab81d-4671-561f-0f66-28c8181b4a69",
                "id": "19538f67-8c1f-4d78-88a8-0c81cd355c05",
                "child": {
                    "id": "379ab81d-4671-561f-0f66-28c8181b4a69",
                    "range": "^1.0.5",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "109cec36-e5f9-448b-a850-ec0bdb964aa8",
                    "release": {
                        "id": "109cec36-e5f9-448b-a850-ec0bdb964aa8",
                        "version": "1.0.5",
                        "package": {
                            "name": "available-typed-arrays",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "15338c04-a401-f991-f7ea-4f11fa2b3e8b",
                "child_id": "3210327a-ad95-d474-636b-025d3547f0fa",
                "id": "f40f0146-4805-4087-ad55-599065d3d44f",
                "child": {
                    "id": "3210327a-ad95-d474-636b-025d3547f0fa",
                    "range": "^1.20.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "c61412fa-1416-432b-af90-d6f314c3d34c",
                    "release": {
                        "id": "c61412fa-1416-432b-af90-d6f314c3d34c",
                        "version": "1.20.1",
                        "package": {
                            "name": "es-abstract",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "15338c04-a401-f991-f7ea-4f11fa2b3e8b",
                "child_id": "0ee9f8a2-15f3-c9af-1875-d721b9392fee",
                "id": "c6c47f45-d3ff-4ea8-a9b8-f683e9675d36",
                "child": {
                    "id": "0ee9f8a2-15f3-c9af-1875-d721b9392fee",
                    "range": "^1.1.3",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "7b0bc294-2f89-49dc-819e-7c99238ccd40",
                    "release": {
                        "id": "7b0bc294-2f89-49dc-819e-7c99238ccd40",
                        "version": "1.1.9",
                        "package": {
                            "name": "is-typed-array",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "0ee9f8a2-15f3-c9af-1875-d721b9392fee",
                "child_id": "d3bbaf46-5566-3d34-d798-b79a76fb20ff",
                "id": "b4805945-b5da-41a2-9b56-17d2c9d4958d",
                "child": {
                    "id": "d3bbaf46-5566-3d34-d798-b79a76fb20ff",
                    "range": "^1.0.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "83ffaa65-3412-4bdc-8164-066fcb18b569",
                    "release": {
                        "id": "83ffaa65-3412-4bdc-8164-066fcb18b569",
                        "version": "1.0.0",
                        "package": {
                            "name": "has-tostringtag",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "0ee9f8a2-15f3-c9af-1875-d721b9392fee",
                "child_id": "c5a7f7fe-3b99-ea1d-95f0-fd1077eb3ddf",
                "id": "f9b7a12a-3a81-491c-8de9-ae245f7f10e5",
                "child": {
                    "id": "c5a7f7fe-3b99-ea1d-95f0-fd1077eb3ddf",
                    "range": "^0.3.3",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "3ba5c8d0-dc50-4c12-8a64-d7ea2d1d0a66",
                    "release": {
                        "id": "3ba5c8d0-dc50-4c12-8a64-d7ea2d1d0a66",
                        "version": "0.3.3",
                        "package": {
                            "name": "for-each",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "0ee9f8a2-15f3-c9af-1875-d721b9392fee",
                "child_id": "8279937e-18c7-f64d-1638-30d529329e55",
                "id": "3f47fe49-66d9-41a6-b753-18d260515a51",
                "child": {
                    "id": "8279937e-18c7-f64d-1638-30d529329e55",
                    "range": "^1.0.2",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "e790ff1a-66f6-4939-9623-89e4a4fcefcf",
                    "release": {
                        "id": "e790ff1a-66f6-4939-9623-89e4a4fcefcf",
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
                "parent_id": "0ee9f8a2-15f3-c9af-1875-d721b9392fee",
                "child_id": "379ab81d-4671-561f-0f66-28c8181b4a69",
                "id": "b61e317e-b587-4207-b451-695c5d07720f",
                "child": {
                    "id": "379ab81d-4671-561f-0f66-28c8181b4a69",
                    "range": "^1.0.5",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "109cec36-e5f9-448b-a850-ec0bdb964aa8",
                    "release": {
                        "id": "109cec36-e5f9-448b-a850-ec0bdb964aa8",
                        "version": "1.0.5",
                        "package": {
                            "name": "available-typed-arrays",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "0ee9f8a2-15f3-c9af-1875-d721b9392fee",
                "child_id": "3210327a-ad95-d474-636b-025d3547f0fa",
                "id": "bca6e095-e970-4eed-98c9-024e60b1e958",
                "child": {
                    "id": "3210327a-ad95-d474-636b-025d3547f0fa",
                    "range": "^1.20.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "c61412fa-1416-432b-af90-d6f314c3d34c",
                    "release": {
                        "id": "c61412fa-1416-432b-af90-d6f314c3d34c",
                        "version": "1.20.1",
                        "package": {
                            "name": "es-abstract",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "08d85d3c-b207-ee23-4a73-19bdd0984ed7",
                "child_id": "d3bbaf46-5566-3d34-d798-b79a76fb20ff",
                "id": "5d5ec8b2-762f-40b7-a93e-245474271ba7",
                "child": {
                    "id": "d3bbaf46-5566-3d34-d798-b79a76fb20ff",
                    "range": "^1.0.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "83ffaa65-3412-4bdc-8164-066fcb18b569",
                    "release": {
                        "id": "83ffaa65-3412-4bdc-8164-066fcb18b569",
                        "version": "1.0.0",
                        "package": {
                            "name": "has-tostringtag",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "e547507b-6f2a-b1e1-e860-1d75cf8cb26c",
                "child_id": "b51b3bf4-d9ce-de4b-f003-d4abd92f2e44",
                "id": "6dd6d3eb-ce16-49ae-ac10-ed3616a36aec",
                "child": {
                    "id": "b51b3bf4-d9ce-de4b-f003-d4abd92f2e44",
                    "range": ">=0.0.4",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "30bdad23-fa04-4abe-b2c8-320bda4d9b20",
                    "release": {
                        "id": "30bdad23-fa04-4abe-b2c8-320bda4d9b20",
                        "version": "1.0.1",
                        "package": {
                            "name": "amdefine",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "176166a2-0039-4086-f415-14e9b165ced4",
                "child_id": "e7ef242e-0073-e909-3db8-594b56a4864f",
                "id": "c382acea-19f8-48b8-bb93-65bb0372e0f6",
                "child": {
                    "id": "e7ef242e-0073-e909-3db8-594b56a4864f",
                    "range": "0.0.2",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "b65d3c47-2929-4002-a02a-57c8bb298e35",
                    "release": {
                        "id": "b65d3c47-2929-4002-a02a-57c8bb298e35",
                        "version": "0.0.2",
                        "package": {
                            "name": "wordwrap",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "176166a2-0039-4086-f415-14e9b165ced4",
                "child_id": "d627a38e-097f-523d-c4c8-3a1381e3cb66",
                "id": "f00ccf49-c723-4cba-bd7d-f886e3f9b4d1",
                "child": {
                    "id": "d627a38e-097f-523d-c4c8-3a1381e3cb66",
                    "range": "^1.0.2",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "10c1a231-dea7-486c-9fd3-a3aae28ad5f6",
                    "release": {
                        "id": "10c1a231-dea7-486c-9fd3-a3aae28ad5f6",
                        "version": "1.2.1",
                        "package": {
                            "name": "camelcase",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "176166a2-0039-4086-f415-14e9b165ced4",
                "child_id": "70690ab1-25da-9f8f-baa7-41950307d86a",
                "id": "287f0fb0-b2fc-4bc1-b9b9-24d5bf739c18",
                "child": {
                    "id": "70690ab1-25da-9f8f-baa7-41950307d86a",
                    "range": "0.1.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "1022595b-739c-4106-aea1-a31dcefb11a2",
                    "release": {
                        "id": "1022595b-739c-4106-aea1-a31dcefb11a2",
                        "version": "0.1.0",
                        "package": {
                            "name": "window-size",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "176166a2-0039-4086-f415-14e9b165ced4",
                "child_id": "6b331caa-e5ef-4381-ee2d-c05c0507e2c1",
                "id": "c426f7b8-2cd6-46f2-a835-35ce839aa5b5",
                "child": {
                    "id": "6b331caa-e5ef-4381-ee2d-c05c0507e2c1",
                    "range": "^1.0.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "39f3fa2c-145b-47fc-8a14-cd85e1d21f75",
                    "release": {
                        "id": "39f3fa2c-145b-47fc-8a14-cd85e1d21f75",
                        "version": "1.2.0",
                        "package": {
                            "name": "decamelize",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "549e6a97-23d6-4415-a1aa-3c70a04cc509",
                                        "source_id": "GHSA-q5c4-39f5-m68j",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": null,
                                        "summary": "Regular Expression Denial of Service in decamelize",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "1.1.0",
                                            "fixed": "1.1.2"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "0ed52d60-a024-85f0-17b6-49b3987c1ee1",
                "child_id": "b51b3bf4-d9ce-de4b-f003-d4abd92f2e44",
                "id": "96220e22-5906-42e3-b90d-24814fea9a80",
                "child": {
                    "id": "b51b3bf4-d9ce-de4b-f003-d4abd92f2e44",
                    "range": ">=0.0.4",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "30bdad23-fa04-4abe-b2c8-320bda4d9b20",
                    "release": {
                        "id": "30bdad23-fa04-4abe-b2c8-320bda4d9b20",
                        "version": "1.0.1",
                        "package": {
                            "name": "amdefine",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "1a06b926-2e7a-4caf-34b8-a1355eb5f89f",
                "child_id": "faeee5c9-1e4e-b9d4-c78b-41af3f6a448d",
                "id": "f367dd42-f996-4bea-95ff-64661d9a42d9",
                "child": {
                    "id": "faeee5c9-1e4e-b9d4-c78b-41af3f6a448d",
                    "range": "^2.0.1",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "919417ff-4b89-40ce-9ec5-b75401221342",
                    "release": {
                        "id": "919417ff-4b89-40ce-9ec5-b75401221342",
                        "version": "2.0.1",
                        "package": {
                            "name": "brace-expansion",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "febd8e4b-fd47-46e2-9cc5-2273a18c90c8",
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
                "parent_id": "cc11968b-f3b5-2f3b-a688-5d0a629e135c",
                "child_id": "fdb691d4-7c95-981d-64e3-70c1cefe606a",
                "id": "b0714f4e-75de-41e2-ab81-83e098e2979f",
                "child": {
                    "id": "fdb691d4-7c95-981d-64e3-70c1cefe606a",
                    "range": "^4.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "fbc2ba70-7c1d-4a97-b0ca-5a79595704ff",
                    "release": {
                        "id": "fbc2ba70-7c1d-4a97-b0ca-5a79595704ff",
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
                "parent_id": "bd3c40dd-4dc8-11a5-5810-5a424a0e4542",
                "child_id": "7a0711c0-b390-bd6c-1ec4-0a90052a6e1e",
                "id": "34c45498-89af-45fd-9472-803980c169aa",
                "child": {
                    "id": "7a0711c0-b390-bd6c-1ec4-0a90052a6e1e",
                    "range": "2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "800de5fb-d028-45db-b4b9-670e84177edf",
                    "release": {
                        "id": "800de5fb-d028-45db-b4b9-670e84177edf",
                        "version": "2.20.3",
                        "package": {
                            "name": "commander",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "2a30d9ec-99fd-ccf3-50dc-cbc31ff8cac8",
                "child_id": "82f23f05-e644-78fd-2bbe-3af5acd187bc",
                "id": "d1871cc6-f943-47f4-8cbd-3144e4e4e078",
                "child": {
                    "id": "82f23f05-e644-78fd-2bbe-3af5acd187bc",
                    "range": "0.0.5",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "e29aae8d-2554-4757-af5b-5c7013a0580e",
                    "release": {
                        "id": "e29aae8d-2554-4757-af5b-5c7013a0580e",
                        "version": "0.0.5",
                        "package": {
                            "name": "delayed-stream",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "7201d154-a76c-030c-205e-7f2643bdf454",
                "child_id": "af4ab454-42e9-a9ad-0ea0-137c89d0646e",
                "id": "60484323-b893-4c6a-a117-3d53b13f49e0",
                "child": {
                    "id": "af4ab454-42e9-a9ad-0ea0-137c89d0646e",
                    "range": "~0.10.x",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "ae0e8bbe-7d81-4879-9a55-d37cc126970c",
                    "release": {
                        "id": "ae0e8bbe-7d81-4879-9a55-d37cc126970c",
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
                "parent_id": "7201d154-a76c-030c-205e-7f2643bdf454",
                "child_id": "6b2bcc0a-19fb-9f0f-1617-78f9bb663f1f",
                "id": "b1f54446-7dfb-42d0-9b06-df78b4413db0",
                "child": {
                    "id": "6b2bcc0a-19fb-9f0f-1617-78f9bb663f1f",
                    "range": "^1.0.2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "9c8e6272-08f6-48e9-a9ab-6c0682318dec",
                    "release": {
                        "id": "9c8e6272-08f6-48e9-a9ab-6c0682318dec",
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
                "parent_id": "7201d154-a76c-030c-205e-7f2643bdf454",
                "child_id": "48b522b9-45b0-0efb-9269-9de40666cee0",
                "id": "3c83f09b-2d53-4db2-a1d9-e3d2d06e14e9",
                "child": {
                    "id": "48b522b9-45b0-0efb-9269-9de40666cee0",
                    "range": "^2.0.3",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "47eeabb9-0f9c-42ac-933c-0e1fe5154350",
                    "release": {
                        "id": "47eeabb9-0f9c-42ac-933c-0e1fe5154350",
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
                "parent_id": "7201d154-a76c-030c-205e-7f2643bdf454",
                "child_id": "221a168f-4302-d83b-8b4a-89480a85039e",
                "id": "ba8a8d8c-4852-49d8-b8e7-0786d37fefcc",
                "child": {
                    "id": "221a168f-4302-d83b-8b4a-89480a85039e",
                    "range": "0.0.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "f61977b1-b07b-4ada-9c74-3ca80da8f08e",
                    "release": {
                        "id": "f61977b1-b07b-4ada-9c74-3ca80da8f08e",
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
                "parent_id": "f9d70c1f-70ca-321f-2759-276b2c4ef0bb",
                "child_id": "96eccd8c-fe68-65c2-6df8-e21dbae3a252",
                "id": "cacbc9e7-ff47-40d4-89a4-f966fd5fa6e4",
                "child": {
                    "id": "96eccd8c-fe68-65c2-6df8-e21dbae3a252",
                    "range": "0.9.x",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "4537e6ad-86bf-4dab-8393-c0ed5ef2aebe",
                    "release": {
                        "id": "4537e6ad-86bf-4dab-8393-c0ed5ef2aebe",
                        "version": "0.9.1",
                        "package": {
                            "name": "hoek",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "9c7801be-7db9-46b6-b6fa-7e7af10e6576",
                                        "source_id": "GHSA-jp4x-w63m-7wgm",
                                        "source": "ghsa",
                                        "severity_name": "Medium",
                                        "cvss_score": null,
                                        "summary": "Prototype Pollution in hoek",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "4.2.1"
                                        },
                                        {
                                            "introduced": "5.0.0",
                                            "fixed": "5.0.3"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "ac10a4bd-34b3-591a-ed93-e7d8302334ce",
                "child_id": "5ad3942c-4efb-8061-4996-ca2163fb2374",
                "id": "35fdcfff-07e7-4648-83c4-00165dc3c588",
                "child": {
                    "id": "5ad3942c-4efb-8061-4996-ca2163fb2374",
                    "range": "0.4.x",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "cc1f0c32-c8f9-460e-a832-5ab436a8ee39",
                    "release": {
                        "id": "cc1f0c32-c8f9-460e-a832-5ab436a8ee39",
                        "version": "0.4.2",
                        "package": {
                            "name": "boom",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "5ad3942c-4efb-8061-4996-ca2163fb2374",
                "child_id": "96eccd8c-fe68-65c2-6df8-e21dbae3a252",
                "id": "a4da1e38-518d-4941-82a0-ddc18ec95808",
                "child": {
                    "id": "96eccd8c-fe68-65c2-6df8-e21dbae3a252",
                    "range": "0.9.x",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "4537e6ad-86bf-4dab-8393-c0ed5ef2aebe",
                    "release": {
                        "id": "4537e6ad-86bf-4dab-8393-c0ed5ef2aebe",
                        "version": "0.9.1",
                        "package": {
                            "name": "hoek",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "9c7801be-7db9-46b6-b6fa-7e7af10e6576",
                                        "source_id": "GHSA-jp4x-w63m-7wgm",
                                        "source": "ghsa",
                                        "severity_name": "Medium",
                                        "cvss_score": null,
                                        "summary": "Prototype Pollution in hoek",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "4.2.1"
                                        },
                                        {
                                            "introduced": "5.0.0",
                                            "fixed": "5.0.3"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "70d9033c-3e33-4cf8-cfde-8be74a3fe92c",
                "child_id": "842b2204-f8f3-f641-3432-c2117bd761e7",
                "id": "dc490886-02a2-4bc3-a4ce-5dcd9ddfe99f",
                "child": {
                    "id": "842b2204-f8f3-f641-3432-c2117bd761e7",
                    "range": "0.0.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "a6a873b1-541a-4899-9d72-aff3b0c33b16",
                    "release": {
                        "id": "a6a873b1-541a-4899-9d72-aff3b0c33b16",
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
                "parent_id": "70d9033c-3e33-4cf8-cfde-8be74a3fe92c",
                "child_id": "6d0f2022-987d-b69a-9356-ed23faa0e3cb",
                "id": "73539bf4-4580-4e02-851e-1c85637f2257",
                "child": {
                    "id": "6d0f2022-987d-b69a-9356-ed23faa0e3cb",
                    "range": "^1.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "171b30f5-5c7f-47e7-ad2e-b4f4020d8678",
                    "release": {
                        "id": "171b30f5-5c7f-47e7-ad2e-b4f4020d8678",
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
                "parent_id": "489fe3d0-fe10-aebd-dbef-8af96903c988",
                "child_id": "c0ce003e-fd5c-63f7-0db9-dc06e10eca84",
                "id": "7af652c3-678b-4487-bc7a-e45927b25576",
                "child": {
                    "id": "c0ce003e-fd5c-63f7-0db9-dc06e10eca84",
                    "range": "^0.1.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "bd67da73-3fd1-4318-8119-f3de642f188b",
                    "release": {
                        "id": "bd67da73-3fd1-4318-8119-f3de642f188b",
                        "version": "0.1.0",
                        "package": {
                            "name": "ansi-regex",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "fb1ed62a-bb13-401d-99c1-fb453ed44965",
                                        "source_id": "GHSA-93q8-gq69-wqmw",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": 7.5,
                                        "summary": "Inefficient Regular Expression Complexity in chalk/ansi-regex",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "3.0.0",
                                            "fixed": "3.0.1"
                                        },
                                        {
                                            "introduced": "4.0.0",
                                            "fixed": "4.1.1"
                                        },
                                        {
                                            "introduced": "5.0.0",
                                            "fixed": "5.0.1"
                                        },
                                        {
                                            "introduced": "6.0.0",
                                            "fixed": "6.0.1"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "e8974e46-2694-332b-0254-773a3885bde0",
                "child_id": "da681ac2-5de3-7c3f-2d56-175192ca49c3",
                "id": "0f988dc0-80e8-48d8-a031-d272318f40b2",
                "child": {
                    "id": "da681ac2-5de3-7c3f-2d56-175192ca49c3",
                    "range": "^4.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "5ba6f14d-2862-4175-885f-b5681a7d08cf",
                    "release": {
                        "id": "5ba6f14d-2862-4175-885f-b5681a7d08cf",
                        "version": "4.0.1",
                        "package": {
                            "name": "esprima",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "e8974e46-2694-332b-0254-773a3885bde0",
                "child_id": "1a6e44b3-7eb5-5234-67c1-c2ff34145ac4",
                "id": "5fac24ed-0381-41ed-9014-ed99bf15c044",
                "child": {
                    "id": "1a6e44b3-7eb5-5234-67c1-c2ff34145ac4",
                    "range": "^1.0.7",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "053f8bd6-1fa6-45de-bcee-cc10a3e047d7",
                    "release": {
                        "id": "053f8bd6-1fa6-45de-bcee-cc10a3e047d7",
                        "version": "1.0.10",
                        "package": {
                            "name": "argparse",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "d08c6198-d865-01fe-f64e-c5e733b8e719",
                "child_id": "b3d7c9da-a17b-c850-1fa6-4a6d6eb0b5c8",
                "id": "5e331a32-53fa-479b-929f-1731763d1497",
                "child": {
                    "id": "b3d7c9da-a17b-c850-1fa6-4a6d6eb0b5c8",
                    "range": "^1.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "99aff3fc-3c21-439d-87f3-2ab622cfbb89",
                    "release": {
                        "id": "99aff3fc-3c21-439d-87f3-2ab622cfbb89",
                        "version": "1.0.2",
                        "package": {
                            "name": "os-tmpdir",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "d08c6198-d865-01fe-f64e-c5e733b8e719",
                "child_id": "69ca4506-592e-d528-4958-1c6cfd12974e",
                "id": "efc80eaf-cf26-414b-83fe-001ef101e361",
                "child": {
                    "id": "69ca4506-592e-d528-4958-1c6cfd12974e",
                    "range": "^1.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "bbcbafc3-91b2-4ff2-9a97-5e118169fd15",
                    "release": {
                        "id": "bbcbafc3-91b2-4ff2-9a97-5e118169fd15",
                        "version": "1.0.2",
                        "package": {
                            "name": "os-homedir",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "3508a35a-8454-6309-7bee-713c7312936e",
                "child_id": "2d983190-e6a6-f81c-c404-275a6bff6f59",
                "id": "b49c2ff9-0fbd-4800-8b5e-dee7275eb3ee",
                "child": {
                    "id": "2d983190-e6a6-f81c-c404-275a6bff6f59",
                    "range": "^1.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "252f7899-5284-4456-a4a1-c6482dee40da",
                    "release": {
                        "id": "252f7899-5284-4456-a4a1-c6482dee40da",
                        "version": "1.1.1",
                        "package": {
                            "name": "user-home",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "05aad7ef-b65f-3e87-dac0-fb36c0bd093d",
                "child_id": "f7de74cb-bb0b-3f7a-9658-db96a9833ece",
                "id": "c5608189-79b3-4aaa-8d1b-7cbae7983a88",
                "child": {
                    "id": "f7de74cb-bb0b-3f7a-9658-db96a9833ece",
                    "range": "^1.1.3",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "6e3278e4-07de-465f-8af3-fb5f7c0b6c21",
                    "release": {
                        "id": "6e3278e4-07de-465f-8af3-fb5f7c0b6c21",
                        "version": "1.1.6",
                        "package": {
                            "name": "natives",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "0325f082-c0ac-145f-5970-2f2448203703",
                "child_id": "e5e63a5a-11db-7b15-3592-d6a522562acc",
                "id": "6b5043c7-2164-4760-87a2-8f36f88555b3",
                "child": {
                    "id": "e5e63a5a-11db-7b15-3592-d6a522562acc",
                    "range": "^0.1.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "0cfaf763-412e-4fb7-bffe-413ea2a02e76",
                    "release": {
                        "id": "0cfaf763-412e-4fb7-bffe-413ea2a02e76",
                        "version": "0.1.1",
                        "package": {
                            "name": "registry-url",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "0325f082-c0ac-145f-5970-2f2448203703",
                "child_id": "7869781d-3285-931f-57b5-7d977a370350",
                "id": "3907e094-a867-43b6-bdf2-d5cab0e0077c",
                "child": {
                    "id": "7869781d-3285-931f-57b5-7d977a370350",
                    "range": "^0.3.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "7e96142f-4f64-4c84-8a08-d7db5cbdda75",
                    "release": {
                        "id": "7e96142f-4f64-4c84-8a08-d7db5cbdda75",
                        "version": "0.3.0",
                        "package": {
                            "name": "got",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "3f230aa1-7504-422b-906e-103c5fbf69d8",
                                        "source_id": "GHSA-pfrx-2q88-qq97",
                                        "source": "ghsa",
                                        "severity_name": null,
                                        "cvss_score": null,
                                        "summary": "Got allows a redirect to a UNIX socket",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "11.8.5"
                                        },
                                        {
                                            "introduced": "12.0.0",
                                            "fixed": "12.1.0"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "ca4c030f-0dfa-b742-f743-3519848bbda5",
                "child_id": "2e1cd3a6-2571-7e8f-0641-78eefd8168da",
                "id": "c3a6c319-55aa-43f6-8109-4ce66665b6e7",
                "child": {
                    "id": "2e1cd3a6-2571-7e8f-0641-78eefd8168da",
                    "range": "^1.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "b90ce026-bafd-4829-8f64-48da2336caec",
                    "release": {
                        "id": "b90ce026-bafd-4829-8f64-48da2336caec",
                        "version": "1.1.1",
                        "package": {
                            "name": "ansi-regex",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "fb1ed62a-bb13-401d-99c1-fb453ed44965",
                                        "source_id": "GHSA-93q8-gq69-wqmw",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": 7.5,
                                        "summary": "Inefficient Regular Expression Complexity in chalk/ansi-regex",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "3.0.0",
                                            "fixed": "3.0.1"
                                        },
                                        {
                                            "introduced": "4.0.0",
                                            "fixed": "4.1.1"
                                        },
                                        {
                                            "introduced": "5.0.0",
                                            "fixed": "5.0.1"
                                        },
                                        {
                                            "introduced": "6.0.0",
                                            "fixed": "6.0.1"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "f354c3a6-37a6-8891-b082-a01bb10250f0",
                "child_id": "7b079052-324b-3b82-3429-12d3f983696d",
                "id": "272fa120-9655-4576-9b3d-b0989b5a9e03",
                "child": {
                    "id": "7b079052-324b-3b82-3429-12d3f983696d",
                    "range": "~0.1.4",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "5eed79c3-41b2-44aa-8572-e9a3497e13c3",
                    "release": {
                        "id": "5eed79c3-41b2-44aa-8572-e9a3497e13c3",
                        "version": "0.1.4",
                        "package": {
                            "name": "es6-weak-map",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "f354c3a6-37a6-8891-b082-a01bb10250f0",
                "child_id": "738e20c8-d5aa-95af-d4e0-1a3f63074438",
                "id": "302ebc3f-cc5c-4c3d-bcb0-6147bcf753a7",
                "child": {
                    "id": "738e20c8-d5aa-95af-d4e0-1a3f63074438",
                    "range": "0.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "631dc0f3-2ded-4d75-ba62-9710f96bcbac",
                    "release": {
                        "id": "631dc0f3-2ded-4d75-ba62-9710f96bcbac",
                        "version": "0.1.0",
                        "package": {
                            "name": "lru-queue",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "f354c3a6-37a6-8891-b082-a01bb10250f0",
                "child_id": "7054b730-2fdd-20ee-34eb-167223a546c8",
                "id": "f6082267-eaef-4024-90bc-158a38a8aac2",
                "child": {
                    "id": "7054b730-2fdd-20ee-34eb-167223a546c8",
                    "range": "0.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "1e4424b1-bae8-42b6-9340-bd315fbd9ac7",
                    "release": {
                        "id": "1e4424b1-bae8-42b6-9340-bd315fbd9ac7",
                        "version": "0.1.7",
                        "package": {
                            "name": "timers-ext",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "f354c3a6-37a6-8891-b082-a01bb10250f0",
                "child_id": "6fc24f22-a3a6-acb0-cbc6-292bf3021c4e",
                "id": "38d86274-06a9-4f94-ae45-01ea869eec00",
                "child": {
                    "id": "6fc24f22-a3a6-acb0-cbc6-292bf3021c4e",
                    "range": "~0.3.4",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "3a0d3dfe-d596-4aff-a678-90c366685d0f",
                    "release": {
                        "id": "3a0d3dfe-d596-4aff-a678-90c366685d0f",
                        "version": "0.3.5",
                        "package": {
                            "name": "event-emitter",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "f354c3a6-37a6-8891-b082-a01bb10250f0",
                "child_id": "41b6cee6-7ea2-a259-1c34-21a4ac27ec9c",
                "id": "0e39a416-341a-4468-9250-ef4a7dc09ba8",
                "child": {
                    "id": "41b6cee6-7ea2-a259-1c34-21a4ac27ec9c",
                    "range": "~0.10.6",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "32343700-7615-4411-a42c-b6cf126c91f1",
                    "release": {
                        "id": "32343700-7615-4411-a42c-b6cf126c91f1",
                        "version": "0.10.61",
                        "package": {
                            "name": "es5-ext",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "f354c3a6-37a6-8891-b082-a01bb10250f0",
                "child_id": "26ff2323-b012-f4bb-0092-f62303e66fcd",
                "id": "ad67fd27-87a0-435f-bf30-68b0dedce117",
                "child": {
                    "id": "26ff2323-b012-f4bb-0092-f62303e66fcd",
                    "range": "~0.1.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "ce61a9d1-f0f7-401f-b982-b937227501d8",
                    "release": {
                        "id": "ce61a9d1-f0f7-401f-b982-b937227501d8",
                        "version": "0.1.1",
                        "package": {
                            "name": "d",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "f354c3a6-37a6-8891-b082-a01bb10250f0",
                "child_id": "00a79da5-039a-3923-6ac7-6dfc23fc55eb",
                "id": "8bfcd850-4bcd-4076-8d25-c0e31938a5cb",
                "child": {
                    "id": "00a79da5-039a-3923-6ac7-6dfc23fc55eb",
                    "range": "~0.2.2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "5f91f1a9-5f93-4694-b722-38a85970b85c",
                    "release": {
                        "id": "5f91f1a9-5f93-4694-b722-38a85970b85c",
                        "version": "0.2.2",
                        "package": {
                            "name": "next-tick",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "7054b730-2fdd-20ee-34eb-167223a546c8",
                "child_id": "41b6cee6-7ea2-a259-1c34-21a4ac27ec9c",
                "id": "0bde553d-d85f-4d74-8637-bfb92208e09a",
                "child": {
                    "id": "41b6cee6-7ea2-a259-1c34-21a4ac27ec9c",
                    "range": "~0.10.6",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "32343700-7615-4411-a42c-b6cf126c91f1",
                    "release": {
                        "id": "32343700-7615-4411-a42c-b6cf126c91f1",
                        "version": "0.10.61",
                        "package": {
                            "name": "es5-ext",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "7054b730-2fdd-20ee-34eb-167223a546c8",
                "child_id": "34a53dd6-7e8d-567d-797c-6589f97661da",
                "id": "90399594-2b89-408a-89a6-9f08100c4373",
                "child": {
                    "id": "34a53dd6-7e8d-567d-797c-6589f97661da",
                    "range": "^1.1.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "8952192a-3f2a-4c77-aac6-3035347d4d51",
                    "release": {
                        "id": "8952192a-3f2a-4c77-aac6-3035347d4d51",
                        "version": "1.1.0",
                        "package": {
                            "name": "next-tick",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "41b6cee6-7ea2-a259-1c34-21a4ac27ec9c",
                "child_id": "6e8245d5-7db6-a725-227b-cab22fb5334d",
                "id": "8b2daea0-d90c-4ba7-a602-1118b4ca5971",
                "child": {
                    "id": "6e8245d5-7db6-a725-227b-cab22fb5334d",
                    "range": "^2.0.3",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "86271e5b-f6a1-4664-862d-1b1a5f878039",
                    "release": {
                        "id": "86271e5b-f6a1-4664-862d-1b1a5f878039",
                        "version": "2.0.3",
                        "package": {
                            "name": "es6-iterator",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "41b6cee6-7ea2-a259-1c34-21a4ac27ec9c",
                "child_id": "3b39c717-03e9-a42f-85f8-a689d6076792",
                "id": "94ff068b-7039-4467-90e7-cb23b43ab2d3",
                "child": {
                    "id": "3b39c717-03e9-a42f-85f8-a689d6076792",
                    "range": "^3.1.3",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "ede0fcaa-5528-4a35-9084-8502491ff1bd",
                    "release": {
                        "id": "ede0fcaa-5528-4a35-9084-8502491ff1bd",
                        "version": "3.1.3",
                        "package": {
                            "name": "es6-symbol",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "41b6cee6-7ea2-a259-1c34-21a4ac27ec9c",
                "child_id": "34a53dd6-7e8d-567d-797c-6589f97661da",
                "id": "044ed9a5-f1f4-4a47-ab1a-c42dbb537e6f",
                "child": {
                    "id": "34a53dd6-7e8d-567d-797c-6589f97661da",
                    "range": "^1.1.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "8952192a-3f2a-4c77-aac6-3035347d4d51",
                    "release": {
                        "id": "8952192a-3f2a-4c77-aac6-3035347d4d51",
                        "version": "1.1.0",
                        "package": {
                            "name": "next-tick",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "26ff2323-b012-f4bb-0092-f62303e66fcd",
                "child_id": "41b6cee6-7ea2-a259-1c34-21a4ac27ec9c",
                "id": "dee7ade2-6343-43ad-998c-5aa435c1d99c",
                "child": {
                    "id": "41b6cee6-7ea2-a259-1c34-21a4ac27ec9c",
                    "range": "~0.10.6",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "32343700-7615-4411-a42c-b6cf126c91f1",
                    "release": {
                        "id": "32343700-7615-4411-a42c-b6cf126c91f1",
                        "version": "0.10.61",
                        "package": {
                            "name": "es5-ext",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "7c991b46-c9a7-2183-3b3e-9f238b6954d2",
                "child_id": "f10a4c97-f777-53f3-705b-62d04457e1b0",
                "id": "86212052-1a73-443a-8cc2-6e93c74e6266",
                "child": {
                    "id": "f10a4c97-f777-53f3-705b-62d04457e1b0",
                    "range": "^1.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "bd5ca19a-5166-4c24-989a-38f751968bfa",
                    "release": {
                        "id": "bd5ca19a-5166-4c24-989a-38f751968bfa",
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
                "parent_id": "7c991b46-c9a7-2183-3b3e-9f238b6954d2",
                "child_id": "c30e5cbe-48d1-d41f-6742-035418c04fa8",
                "id": "0290addc-d3f1-4ffe-88b5-943783a44254",
                "child": {
                    "id": "c30e5cbe-48d1-d41f-6742-035418c04fa8",
                    "range": "^3.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "ff59a40d-fed9-4e6d-beef-d3fc0dbced94",
                    "release": {
                        "id": "ff59a40d-fed9-4e6d-beef-d3fc0dbced94",
                        "version": "3.1.2",
                        "package": {
                            "name": "minimatch",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "9ee1009d-38c5-43d3-b28b-874f0e8fc32f",
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
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "7c991b46-c9a7-2183-3b3e-9f238b6954d2",
                "child_id": "48b522b9-45b0-0efb-9269-9de40666cee0",
                "id": "926d465c-a744-424f-8dd6-abb8c21926ea",
                "child": {
                    "id": "48b522b9-45b0-0efb-9269-9de40666cee0",
                    "range": "^2.0.3",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "47eeabb9-0f9c-42ac-933c-0e1fe5154350",
                    "release": {
                        "id": "47eeabb9-0f9c-42ac-933c-0e1fe5154350",
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
                "parent_id": "7c991b46-c9a7-2183-3b3e-9f238b6954d2",
                "child_id": "37084daf-ea32-0e62-520c-267f6f63ee93",
                "id": "02b77d56-cd3a-4318-9148-1640b380282f",
                "child": {
                    "id": "37084daf-ea32-0e62-520c-267f6f63ee93",
                    "range": "^1.0.4",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "c80e6a5d-5328-4cbd-987b-214a616316cb",
                    "release": {
                        "id": "c80e6a5d-5328-4cbd-987b-214a616316cb",
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
                "parent_id": "7c991b46-c9a7-2183-3b3e-9f238b6954d2",
                "child_id": "18210398-ef09-02c2-dd07-1a6bbc286082",
                "id": "baeeeac4-4184-40b8-a43e-cfdd593edd02",
                "child": {
                    "id": "18210398-ef09-02c2-dd07-1a6bbc286082",
                    "range": "^1.4.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "952d0b9c-55c8-4e92-839d-fabb0382b93c",
                    "release": {
                        "id": "952d0b9c-55c8-4e92-839d-fabb0382b93c",
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
                "parent_id": "7c991b46-c9a7-2183-3b3e-9f238b6954d2",
                "child_id": "0a6d449c-f155-941b-caae-7b9a83092cd0",
                "id": "f1fc4863-1c4b-46ed-925e-3eb971f94297",
                "child": {
                    "id": "0a6d449c-f155-941b-caae-7b9a83092cd0",
                    "range": "^1.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "38423657-f0b7-4d39-8279-2921ecbab78d",
                    "release": {
                        "id": "38423657-f0b7-4d39-8279-2921ecbab78d",
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
                "parent_id": "29c761f1-2bbb-ebf2-87dd-b096614acc91",
                "child_id": "ac83b585-653a-a8a8-a048-534c2a1d0e13",
                "id": "bfda9a8d-acd1-42d4-a205-f2505a325265",
                "child": {
                    "id": "ac83b585-653a-a8a8-a048-534c2a1d0e13",
                    "range": "~2.4.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "ceb42eb5-4dde-41d8-a47d-6c975d9683aa",
                    "release": {
                        "id": "ceb42eb5-4dde-41d8-a47d-6c975d9683aa",
                        "version": "2.4.1",
                        "package": {
                            "name": "lodash._isnative",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "0efd0ce3-dd17-95a6-8abc-7ff846c5e655",
                "child_id": "7c3e671c-2774-17ff-68ff-d725cc7404db",
                "id": "6b8286f6-9dd5-4478-bb5d-d73e1253bd2e",
                "child": {
                    "id": "7c3e671c-2774-17ff-68ff-d725cc7404db",
                    "range": "~2.4.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "c89c2370-ca1c-4ae1-b179-eca09211e157",
                    "release": {
                        "id": "c89c2370-ca1c-4ae1-b179-eca09211e157",
                        "version": "2.4.1",
                        "package": {
                            "name": "lodash._objecttypes",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "eec570d3-7764-dcc0-53bb-1de0ac79b52b",
                "child_id": "fb573657-08b3-0c79-966f-de1c5854e449",
                "id": "22aac58d-a532-4092-98ca-0eab4d98148e",
                "child": {
                    "id": "fb573657-08b3-0c79-966f-de1c5854e449",
                    "range": "^1.7.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "ed61ceeb-69b3-4fa2-9791-3525b207be16",
                    "release": {
                        "id": "ed61ceeb-69b3-4fa2-9791-3525b207be16",
                        "version": "1.17.0",
                        "package": {
                            "name": "sshpk",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "212e5f1c-0f60-4af3-b8e3-d4d89353e808",
                                        "source_id": "GHSA-2m39-62fm-q8r3",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": null,
                                        "summary": "Regular Expression Denial of Service in sshpk",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "1.13.2"
                                        }
                                    ]
                                },
                                {
                                    "vulnerability": {
                                        "id": "5fd0eaf8-e345-4d18-b704-794276025495",
                                        "source_id": "GHSA-wx84-69jh-jjp2",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": null,
                                        "summary": "Withdrawn",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "1.13.2"
                                        },
                                        {
                                            "introduced": "1.14.0",
                                            "fixed": "1.14.1"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "eec570d3-7764-dcc0-53bb-1de0ac79b52b",
                "child_id": "5cd13594-236b-3745-b6da-230c776cc993",
                "id": "49bf3abb-dd52-42ca-b671-f41a7dae7b15",
                "child": {
                    "id": "5cd13594-236b-3745-b6da-230c776cc993",
                    "range": "^1.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "7cded6f4-9988-4c84-a132-547d426f0958",
                    "release": {
                        "id": "7cded6f4-9988-4c84-a132-547d426f0958",
                        "version": "1.0.0",
                        "package": {
                            "name": "assert-plus",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "eec570d3-7764-dcc0-53bb-1de0ac79b52b",
                "child_id": "307bcc29-9ee8-35f6-20c4-9f09c2f8c62e",
                "id": "157356ab-87b3-4fc2-b2ba-7a68319e0e1d",
                "child": {
                    "id": "307bcc29-9ee8-35f6-20c4-9f09c2f8c62e",
                    "range": "^1.2.2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "236bc952-d926-4aec-864c-0fce1d7aa38a",
                    "release": {
                        "id": "236bc952-d926-4aec-864c-0fce1d7aa38a",
                        "version": "1.4.2",
                        "package": {
                            "name": "jsprim",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "c49b9c09-f232-0454-f80b-37ac0066e2ee",
                "child_id": "c9ec3ab9-9e15-396b-0b89-5776aacd8290",
                "id": "f024853a-4892-411d-ba47-eb3d92277b98",
                "child": {
                    "id": "c9ec3ab9-9e15-396b-0b89-5776aacd8290",
                    "range": "^0.4.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "90896b53-d08b-4cc3-af19-450b51c53130",
                    "release": {
                        "id": "90896b53-d08b-4cc3-af19-450b51c53130",
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
                "parent_id": "c49b9c09-f232-0454-f80b-37ac0066e2ee",
                "child_id": "b99185e5-3bc2-b2e7-acf7-2e47658fd23d",
                "id": "001b08f2-fd12-48c0-a760-524eca89f695",
                "child": {
                    "id": "b99185e5-3bc2-b2e7-acf7-2e47658fd23d",
                    "range": "~1.0.6",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "4c97021b-3cae-4366-aaa9-8e8cd56f53a2",
                    "release": {
                        "id": "4c97021b-3cae-4366-aaa9-8e8cd56f53a2",
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
                "parent_id": "c49b9c09-f232-0454-f80b-37ac0066e2ee",
                "child_id": "3c6dbe7d-9027-bd13-b23b-d58633b91f40",
                "id": "5f5da01d-8dde-49cf-ba1e-9a1f4fae4315",
                "child": {
                    "id": "3c6dbe7d-9027-bd13-b23b-d58633b91f40",
                    "range": "~2.1.19",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "e22b5cdb-ead1-44d7-9dd4-53ecee75117b",
                    "release": {
                        "id": "e22b5cdb-ead1-44d7-9dd4-53ecee75117b",
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
                "parent_id": "b99185e5-3bc2-b2e7-acf7-2e47658fd23d",
                "child_id": "6d0e6063-5dfa-350b-7134-0b39ae6a2c14",
                "id": "8de73bdc-ecb1-4215-9ca0-b76434ee03c1",
                "child": {
                    "id": "6d0e6063-5dfa-350b-7134-0b39ae6a2c14",
                    "range": "~1.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "20e65122-a9d8-4103-a933-3e58c62ad519",
                    "release": {
                        "id": "20e65122-a9d8-4103-a933-3e58c62ad519",
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
                "parent_id": "9a29721c-b83b-eff2-fe78-3d4861ab4bdf",
                "child_id": "e67c6555-b6f9-355e-e5aa-96fa4871fc9b",
                "id": "27e3563a-50c3-4955-bf9d-22196d2803a8",
                "child": {
                    "id": "e67c6555-b6f9-355e-e5aa-96fa4871fc9b",
                    "range": "^2.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "5677d566-ac8e-40d3-a1df-25394402fa30",
                    "release": {
                        "id": "5677d566-ac8e-40d3-a1df-25394402fa30",
                        "version": "2.0.0",
                        "package": {
                            "name": "har-schema",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "9a29721c-b83b-eff2-fe78-3d4861ab4bdf",
                "child_id": "06d283ca-b565-f662-98ec-a22c9637ff62",
                "id": "4152a29f-f9f1-4afe-93e4-c2b23c4701e4",
                "child": {
                    "id": "06d283ca-b565-f662-98ec-a22c9637ff62",
                    "range": "^6.12.3",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "c2d7e0fb-fae6-4679-9ad1-0cdf8c83513d",
                    "release": {
                        "id": "c2d7e0fb-fae6-4679-9ad1-0cdf8c83513d",
                        "version": "6.12.6",
                        "package": {
                            "name": "ajv",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "4c1a4f47-c69b-45bc-a7a4-b1642df2769f",
                                        "source_id": "GHSA-v88g-cgmw-v5xw",
                                        "source": "ghsa",
                                        "severity_name": "Medium",
                                        "cvss_score": 5.6,
                                        "summary": "Prototype Pollution in Ajv",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "6.12.3"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "57255ecb-791a-55bd-ee86-c4bad8ea9c85",
                "child_id": "ebf9c2f8-5e1a-2c70-38bf-3322c7230e95",
                "id": "5794f377-83cc-4e81-a87c-f5f00f7ef424",
                "child": {
                    "id": "ebf9c2f8-5e1a-2c70-38bf-3322c7230e95",
                    "range": "^1.1.28",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "0aa15216-f999-456c-bde3-578dcf447639",
                    "release": {
                        "id": "0aa15216-f999-456c-bde3-578dcf447639",
                        "version": "1.8.0",
                        "package": {
                            "name": "psl",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "57255ecb-791a-55bd-ee86-c4bad8ea9c85",
                "child_id": "3d5031ec-bcba-9ee3-b9f4-4fb03bd5c547",
                "id": "9f85540a-2366-4dcb-92d0-caf5f4ac7f6d",
                "child": {
                    "id": "3d5031ec-bcba-9ee3-b9f4-4fb03bd5c547",
                    "range": ">=0.2.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "b8b18735-f344-4f49-9315-0353c1b5cb4b",
                    "release": {
                        "id": "b8b18735-f344-4f49-9315-0353c1b5cb4b",
                        "version": "2.1.1",
                        "package": {
                            "name": "punycode",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "3c6dbe7d-9027-bd13-b23b-d58633b91f40",
                "child_id": "e94a4f59-8978-47dc-0e79-d53acb075906",
                "id": "e112c786-e096-4e49-a675-047f9cb0ef81",
                "child": {
                    "id": "e94a4f59-8978-47dc-0e79-d53acb075906",
                    "range": "1.52.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "d83ce926-851d-44c6-8f33-a852f1c1c93a",
                    "release": {
                        "id": "d83ce926-851d-44c6-8f33-a852f1c1c93a",
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
                "parent_id": "1c7ee109-aa7f-5af9-75ac-0c216eacd756",
                "child_id": "716919ab-b47b-76e9-a5f0-63901316e4eb",
                "id": "06b35cb2-3fca-44fe-9fd8-f4d7170bdba1",
                "child": {
                    "id": "716919ab-b47b-76e9-a5f0-63901316e4eb",
                    "range": "^5.1.2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "ba8ee851-4d69-47d7-b6bf-a1f45525bad8",
                    "release": {
                        "id": "ba8ee851-4d69-47d7-b6bf-a1f45525bad8",
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
                "parent_id": "6d84e523-76da-8c3a-4677-b9bb27bce270",
                "child_id": "1f8995a8-93d1-c50d-1538-54a266e5bfa9",
                "id": "e45f50dc-1c6d-4a07-aa06-a64baca1ae26",
                "child": {
                    "id": "1f8995a8-93d1-c50d-1538-54a266e5bfa9",
                    "range": "^1.1.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "4ce43681-6619-4f96-b815-e64565c3fb83",
                    "release": {
                        "id": "4ce43681-6619-4f96-b815-e64565c3fb83",
                        "version": "1.2.6",
                        "package": {
                            "name": "minimist",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "7c707cae-b730-46eb-94c3-813a8857ed93",
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
                                        "id": "6eaca9bb-8cf3-4f8a-9915-5b3e1d3bec0a",
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
                                        "id": "176f6c35-d07c-4086-a8a8-d9bbe97eb53c",
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
                "parent_id": "60624c77-5ea5-896b-605a-e9a837647157",
                "child_id": "d8bb3947-be8e-478b-a9ee-ca8f4c15028c",
                "id": "1bc7b12d-69bd-4f9d-a7d7-4e8c08c8b473",
                "child": {
                    "id": "d8bb3947-be8e-478b-a9ee-ca8f4c15028c",
                    "range": "^5.0.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "1dbc6e6d-4cbd-4718-8ce0-bd0305430b2e",
                    "release": {
                        "id": "1dbc6e6d-4cbd-4718-8ce0-bd0305430b2e",
                        "version": "5.7.1",
                        "package": {
                            "name": "semver",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "d32467a3-d773-4248-8959-296be4df611d",
                                        "source_id": "GHSA-x6fg-f45m-jf5q",
                                        "source": "ghsa",
                                        "severity_name": null,
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
                "parent_id": "883c485b-ae67-254e-feb0-c69042f2fc5a",
                "child_id": "f8dcb8d9-603c-087c-5953-d9fe09e65845",
                "id": "68f0e6c2-5e95-43bc-874b-04f50faffb88",
                "child": {
                    "id": "f8dcb8d9-603c-087c-5953-d9fe09e65845",
                    "range": "~2.0.3",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "fffc345c-4016-4653-bf3c-c27ae85d69be",
                    "release": {
                        "id": "fffc345c-4016-4653-bf3c-c27ae85d69be",
                        "version": "2.0.14",
                        "package": {
                            "name": "mime-types",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "883c485b-ae67-254e-feb0-c69042f2fc5a",
                "child_id": "ed9e09ea-2520-efb6-9116-e1308de19b30",
                "id": "6e799cab-51d8-418e-a2d3-cac44ce72e2e",
                "child": {
                    "id": "ed9e09ea-2520-efb6-9116-e1308de19b30",
                    "range": "~0.9.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "ddfa8a5b-f5c6-46e6-b57e-8ce2877f8384",
                    "release": {
                        "id": "ddfa8a5b-f5c6-46e6-b57e-8ce2877f8384",
                        "version": "0.9.2",
                        "package": {
                            "name": "async",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "de2e897c-13bb-4e3a-b35a-872a3c39bfe3",
                                        "source_id": "GHSA-fwr7-v2mv-hh25",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": 7.8,
                                        "summary": "Prototype Pollution in async",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "2.0.0",
                                            "fixed": "2.6.4"
                                        },
                                        {
                                            "introduced": "3.0.0",
                                            "fixed": "3.2.2"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "883c485b-ae67-254e-feb0-c69042f2fc5a",
                "child_id": "2a30d9ec-99fd-ccf3-50dc-cbc31ff8cac8",
                "id": "58225c5f-27ec-4744-bc2c-33e92b2c88e3",
                "child": {
                    "id": "2a30d9ec-99fd-ccf3-50dc-cbc31ff8cac8",
                    "range": "~0.0.4",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "a6af1e98-41ea-4506-9892-5a7c03814ac9",
                    "release": {
                        "id": "a6af1e98-41ea-4506-9892-5a7c03814ac9",
                        "version": "0.0.7",
                        "package": {
                            "name": "combined-stream",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "c40afeb9-eb74-0806-7804-96d0ea7d2b54",
                "child_id": "275b3ddc-54e6-aa55-566b-c195a07d02a1",
                "id": "bdb2eb83-3a72-4c7f-9904-e20a4edd0ed6",
                "child": {
                    "id": "275b3ddc-54e6-aa55-566b-c195a07d02a1",
                    "range": "~1.3.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "603cba83-295c-4081-bdda-e5ec872943f8",
                    "release": {
                        "id": "603cba83-295c-4081-bdda-e5ec872943f8",
                        "version": "1.3.3",
                        "package": {
                            "name": "once",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "03f75e65-725b-751a-67e9-c17fb40196c3",
                "child_id": "18210398-ef09-02c2-dd07-1a6bbc286082",
                "id": "3e26aaa0-b791-4ad8-9c1a-9e479ba1182f",
                "child": {
                    "id": "18210398-ef09-02c2-dd07-1a6bbc286082",
                    "range": "^1.4.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "952d0b9c-55c8-4e92-839d-fabb0382b93c",
                    "release": {
                        "id": "952d0b9c-55c8-4e92-839d-fabb0382b93c",
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
                "parent_id": "5463d1bc-678d-edc7-ea68-0f2ba4a0d7a4",
                "child_id": "5be041b1-e009-68d3-6193-6bb3d5b64b59",
                "id": "1a42212a-5da6-41f4-a18d-714b0d3e4018",
                "child": {
                    "id": "5be041b1-e009-68d3-6193-6bb3d5b64b59",
                    "range": "1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "06c99d8e-8760-450c-b69f-cb98f932d2a7",
                    "release": {
                        "id": "06c99d8e-8760-450c-b69f-cb98f932d2a7",
                        "version": "1.1.1",
                        "package": {
                            "name": "abbrev",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "4c299eee-37de-7428-6d4a-e1a2af70d10e",
                "child_id": "9d6755dd-d3f0-f2db-985a-99deea056f2c",
                "id": "4ef6aa90-fd7f-4698-adab-2e1f07019347",
                "child": {
                    "id": "9d6755dd-d3f0-f2db-985a-99deea056f2c",
                    "range": ">=0.3.0 <0.4",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "35763c96-4c7f-43ef-b7b3-331cdd61aa03",
                    "release": {
                        "id": "35763c96-4c7f-43ef-b7b3-331cdd61aa03",
                        "version": "0.3.9",
                        "package": {
                            "name": "traverse",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "de55867c-2354-3186-9505-d3878f83659f",
                "child_id": "dc8a9714-119e-b407-e0ec-4073b0f40446",
                "id": "95b4fd7c-226a-42a5-9948-dbc07ae97404",
                "child": {
                    "id": "dc8a9714-119e-b407-e0ec-4073b0f40446",
                    "range": "0.3",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "c3b6cc56-ebd8-4d06-8508-534fbc0fae83",
                    "release": {
                        "id": "c3b6cc56-ebd8-4d06-8508-534fbc0fae83",
                        "version": "0.3.0",
                        "package": {
                            "name": "minimatch",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "9ee1009d-38c5-43d3-b28b-874f0e8fc32f",
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
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "de55867c-2354-3186-9505-d3878f83659f",
                "child_id": "48b522b9-45b0-0efb-9269-9de40666cee0",
                "id": "70ee7608-e044-4aa8-808d-855a9a40e185",
                "child": {
                    "id": "48b522b9-45b0-0efb-9269-9de40666cee0",
                    "range": "^2.0.3",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "47eeabb9-0f9c-42ac-933c-0e1fe5154350",
                    "release": {
                        "id": "47eeabb9-0f9c-42ac-933c-0e1fe5154350",
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
                "parent_id": "d3bbaf46-5566-3d34-d798-b79a76fb20ff",
                "child_id": "82fb7d93-be69-6f6a-e4f1-1056f2ba7a4e",
                "id": "f1fa90f3-8ccf-429e-b955-2bec090c0981",
                "child": {
                    "id": "82fb7d93-be69-6f6a-e4f1-1056f2ba7a4e",
                    "range": "^1.0.3",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "6dfd68d4-47a1-4a89-aa51-703866ab1308",
                    "release": {
                        "id": "6dfd68d4-47a1-4a89-aa51-703866ab1308",
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
                "parent_id": "8279937e-18c7-f64d-1638-30d529329e55",
                "child_id": "e33a5b3b-880e-714a-c4bd-190a49a67f12",
                "id": "6dc39ec2-d63d-4fe0-be0f-caaa8f49848c",
                "child": {
                    "id": "e33a5b3b-880e-714a-c4bd-190a49a67f12",
                    "range": "^1.1.1",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "ac9fd55c-7f8e-45c6-82b3-faa6fd56085d",
                    "release": {
                        "id": "ac9fd55c-7f8e-45c6-82b3-faa6fd56085d",
                        "version": "1.1.1",
                        "package": {
                            "name": "get-intrinsic",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "8279937e-18c7-f64d-1638-30d529329e55",
                "child_id": "8653054c-b253-b938-adc0-120371f060c6",
                "id": "c4e89d7b-4009-44d0-a950-d225f5f3753f",
                "child": {
                    "id": "8653054c-b253-b938-adc0-120371f060c6",
                    "range": "^1.1.1",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "f3b4cb0e-627a-4cb1-9d8d-c7f1cd524534",
                    "release": {
                        "id": "f3b4cb0e-627a-4cb1-9d8d-c7f1cd524534",
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
                "parent_id": "c5a7f7fe-3b99-ea1d-95f0-fd1077eb3ddf",
                "child_id": "e0fa360c-32f6-3ee7-9c95-59240b86bd1f",
                "id": "e0111dcb-1d0d-4faf-b62b-f10728e1a969",
                "child": {
                    "id": "e0fa360c-32f6-3ee7-9c95-59240b86bd1f",
                    "range": "^1.2.4",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "c4a8a1cc-1780-4c03-b3d2-c536289bcd46",
                    "release": {
                        "id": "c4a8a1cc-1780-4c03-b3d2-c536289bcd46",
                        "version": "1.2.4",
                        "package": {
                            "name": "is-callable",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "3210327a-ad95-d474-636b-025d3547f0fa",
                "child_id": "ff5867e5-d679-0457-19fb-13c4c8e7a1ae",
                "id": "30ffb36d-fa02-4797-801d-5c34888eb3fa",
                "child": {
                    "id": "ff5867e5-d679-0457-19fb-13c4c8e7a1ae",
                    "range": "^1.0.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "1d72f49c-7987-4b6b-8f1a-29fe3b578413",
                    "release": {
                        "id": "1d72f49c-7987-4b6b-8f1a-29fe3b578413",
                        "version": "1.0.0",
                        "package": {
                            "name": "has-property-descriptors",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "3210327a-ad95-d474-636b-025d3547f0fa",
                "child_id": "fc491d16-39d4-f13c-53dc-ba42d21845c3",
                "id": "a6cc2419-f86a-4a13-b6f5-6cd1ea5b0f74",
                "child": {
                    "id": "fc491d16-39d4-f13c-53dc-ba42d21845c3",
                    "range": "^4.1.2",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "2cffa5eb-de93-4147-896b-f1d7acdd6a33",
                    "release": {
                        "id": "2cffa5eb-de93-4147-896b-f1d7acdd6a33",
                        "version": "4.1.2",
                        "package": {
                            "name": "object.assign",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "3210327a-ad95-d474-636b-025d3547f0fa",
                "child_id": "fb4d98d7-4a49-675f-4d4e-4bf1a1a30e6b",
                "id": "1a69ae63-3779-4c05-acd3-0f4566175936",
                "child": {
                    "id": "fb4d98d7-4a49-675f-4d4e-4bf1a1a30e6b",
                    "range": "^1.12.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "d3d8d0c6-eb90-4b18-95e4-b706b978c9e4",
                    "release": {
                        "id": "d3d8d0c6-eb90-4b18-95e4-b706b978c9e4",
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
                "parent_id": "3210327a-ad95-d474-636b-025d3547f0fa",
                "child_id": "faf1df2e-aedf-1368-2870-afdded73108d",
                "id": "3e573541-25f2-4d76-88c5-f12dc95aef65",
                "child": {
                    "id": "faf1df2e-aedf-1368-2870-afdded73108d",
                    "range": "^1.0.7",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "f74118cb-fe25-4fb8-ae71-c7e1d7645826",
                    "release": {
                        "id": "f74118cb-fe25-4fb8-ae71-c7e1d7645826",
                        "version": "1.0.7",
                        "package": {
                            "name": "is-string",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "3210327a-ad95-d474-636b-025d3547f0fa",
                "child_id": "f4a353a1-327d-67e3-e350-670bc2b05d97",
                "id": "5526b42d-302f-45d7-9c42-bfa4ddd57aee",
                "child": {
                    "id": "f4a353a1-327d-67e3-e350-670bc2b05d97",
                    "range": "^1.0.2",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "6542b2eb-f2bc-439b-b7bf-6aeaf63ffab8",
                    "release": {
                        "id": "6542b2eb-f2bc-439b-b7bf-6aeaf63ffab8",
                        "version": "1.0.2",
                        "package": {
                            "name": "is-shared-array-buffer",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "3210327a-ad95-d474-636b-025d3547f0fa",
                "child_id": "f0cc5bb2-984d-8c6d-2338-634c921177d1",
                "id": "61c6a427-e067-4c82-90e1-ba25d15a66c3",
                "child": {
                    "id": "f0cc5bb2-984d-8c6d-2338-634c921177d1",
                    "range": "^1.1.5",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "f1cf9a55-8f5d-43b2-8d9c-81c90a4d71ee",
                    "release": {
                        "id": "f1cf9a55-8f5d-43b2-8d9c-81c90a4d71ee",
                        "version": "1.1.5",
                        "package": {
                            "name": "function.prototype.name",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "3210327a-ad95-d474-636b-025d3547f0fa",
                "child_id": "e55bfc7f-e55a-b941-3939-e52aee7bc956",
                "id": "cc0a48fc-c431-41ce-997f-0e4c5263b48f",
                "child": {
                    "id": "e55bfc7f-e55a-b941-3939-e52aee7bc956",
                    "range": "^1.0.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "8422f66b-00b1-4a18-a228-a88be901a7af",
                    "release": {
                        "id": "8422f66b-00b1-4a18-a228-a88be901a7af",
                        "version": "1.0.0",
                        "package": {
                            "name": "get-symbol-description",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "3210327a-ad95-d474-636b-025d3547f0fa",
                "child_id": "e37cd4a3-6397-b548-c81f-36cb310d1858",
                "id": "0503872a-6722-4bc5-887f-585518cb056f",
                "child": {
                    "id": "e37cd4a3-6397-b548-c81f-36cb310d1858",
                    "range": "^1.0.5",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "69a5f61c-973a-4b3c-956a-a57604ba3c44",
                    "release": {
                        "id": "69a5f61c-973a-4b3c-956a-a57604ba3c44",
                        "version": "1.0.5",
                        "package": {
                            "name": "string.prototype.trimend",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "3210327a-ad95-d474-636b-025d3547f0fa",
                "child_id": "e33a5b3b-880e-714a-c4bd-190a49a67f12",
                "id": "8147ab8d-e8cd-4817-bfb5-421b9aa23bb1",
                "child": {
                    "id": "e33a5b3b-880e-714a-c4bd-190a49a67f12",
                    "range": "^1.1.1",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "ac9fd55c-7f8e-45c6-82b3-faa6fd56085d",
                    "release": {
                        "id": "ac9fd55c-7f8e-45c6-82b3-faa6fd56085d",
                        "version": "1.1.1",
                        "package": {
                            "name": "get-intrinsic",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "3210327a-ad95-d474-636b-025d3547f0fa",
                "child_id": "e11790a3-1fde-f0bb-ed12-357c98d34644",
                "id": "ba23c7a9-faaa-4032-9a51-e6e05888bf91",
                "child": {
                    "id": "e11790a3-1fde-f0bb-ed12-357c98d34644",
                    "range": "^1.0.2",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "5370e701-e986-44e9-a9a3-fb2f36eefba1",
                    "release": {
                        "id": "5370e701-e986-44e9-a9a3-fb2f36eefba1",
                        "version": "1.0.2",
                        "package": {
                            "name": "is-weakref",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "3210327a-ad95-d474-636b-025d3547f0fa",
                "child_id": "e0fa360c-32f6-3ee7-9c95-59240b86bd1f",
                "id": "6a5d32bf-5c59-4d4e-bb4b-3e690fcb35d8",
                "child": {
                    "id": "e0fa360c-32f6-3ee7-9c95-59240b86bd1f",
                    "range": "^1.2.4",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "c4a8a1cc-1780-4c03-b3d2-c536289bcd46",
                    "release": {
                        "id": "c4a8a1cc-1780-4c03-b3d2-c536289bcd46",
                        "version": "1.2.4",
                        "package": {
                            "name": "is-callable",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "3210327a-ad95-d474-636b-025d3547f0fa",
                "child_id": "d6fade40-b554-2b9d-d471-c23db166e797",
                "id": "d37f3dce-174b-482c-b532-7391eb4a52ff",
                "child": {
                    "id": "d6fade40-b554-2b9d-d471-c23db166e797",
                    "range": "^1.4.3",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "63369a09-f165-4a3b-a71a-98ab7ab557df",
                    "release": {
                        "id": "63369a09-f165-4a3b-a71a-98ab7ab557df",
                        "version": "1.4.3",
                        "package": {
                            "name": "regexp.prototype.flags",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "3210327a-ad95-d474-636b-025d3547f0fa",
                "child_id": "9e34647c-828c-7262-431f-66447d06e359",
                "id": "1281d35f-0ce1-44d4-a19b-b8b715b47d4c",
                "child": {
                    "id": "9e34647c-828c-7262-431f-66447d06e359",
                    "range": "^1.0.2",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "9ec528a0-2a81-4772-a2c0-5c863f0a43eb",
                    "release": {
                        "id": "9ec528a0-2a81-4772-a2c0-5c863f0a43eb",
                        "version": "1.0.2",
                        "package": {
                            "name": "unbox-primitive",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "3210327a-ad95-d474-636b-025d3547f0fa",
                "child_id": "8653054c-b253-b938-adc0-120371f060c6",
                "id": "7468db85-d20e-42b1-873d-55156956cf07",
                "child": {
                    "id": "8653054c-b253-b938-adc0-120371f060c6",
                    "range": "^1.1.1",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "f3b4cb0e-627a-4cb1-9d8d-c7f1cd524534",
                    "release": {
                        "id": "f3b4cb0e-627a-4cb1-9d8d-c7f1cd524534",
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
                "parent_id": "3210327a-ad95-d474-636b-025d3547f0fa",
                "child_id": "82fb7d93-be69-6f6a-e4f1-1056f2ba7a4e",
                "id": "9c7be8c3-95da-4341-a434-ebf9a796b311",
                "child": {
                    "id": "82fb7d93-be69-6f6a-e4f1-1056f2ba7a4e",
                    "range": "^1.0.3",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "6dfd68d4-47a1-4a89-aa51-703866ab1308",
                    "release": {
                        "id": "6dfd68d4-47a1-4a89-aa51-703866ab1308",
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
                "parent_id": "3210327a-ad95-d474-636b-025d3547f0fa",
                "child_id": "8279937e-18c7-f64d-1638-30d529329e55",
                "id": "58685400-c8ef-4d02-b31d-b6b721132f8d",
                "child": {
                    "id": "8279937e-18c7-f64d-1638-30d529329e55",
                    "range": "^1.0.2",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "e790ff1a-66f6-4939-9623-89e4a4fcefcf",
                    "release": {
                        "id": "e790ff1a-66f6-4939-9623-89e4a4fcefcf",
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
                "parent_id": "3210327a-ad95-d474-636b-025d3547f0fa",
                "child_id": "7324b616-3e5c-0b55-a8ad-b86939f40ece",
                "id": "e5a658b1-f5ea-48e3-ae32-e228cda118ce",
                "child": {
                    "id": "7324b616-3e5c-0b55-a8ad-b86939f40ece",
                    "range": "^1.2.1",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "dc7ad9b4-a428-426c-9173-1d3ce9a227b1",
                    "release": {
                        "id": "dc7ad9b4-a428-426c-9173-1d3ce9a227b1",
                        "version": "1.2.1",
                        "package": {
                            "name": "es-to-primitive",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "3210327a-ad95-d474-636b-025d3547f0fa",
                "child_id": "68a29834-98db-e1b0-2280-7de6cef44d8a",
                "id": "1d5e363d-a07c-4608-b121-a6ae94df884a",
                "child": {
                    "id": "68a29834-98db-e1b0-2280-7de6cef44d8a",
                    "range": "^1.0.3",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "7d5c8481-43e3-47c1-a6f5-b66de5e34e5e",
                    "release": {
                        "id": "7d5c8481-43e3-47c1-a6f5-b66de5e34e5e",
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
                "parent_id": "3210327a-ad95-d474-636b-025d3547f0fa",
                "child_id": "34d2338b-46f0-de7f-0b3a-6676e7413e40",
                "id": "1de6a84f-b0fd-47d7-a7b6-1c2e2f2a23b7",
                "child": {
                    "id": "34d2338b-46f0-de7f-0b3a-6676e7413e40",
                    "range": "^1.1.4",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "574ec57b-45de-4762-861c-70be09f8f0c0",
                    "release": {
                        "id": "574ec57b-45de-4762-861c-70be09f8f0c0",
                        "version": "1.1.4",
                        "package": {
                            "name": "is-regex",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "3210327a-ad95-d474-636b-025d3547f0fa",
                "child_id": "30d3f126-8319-cab3-d905-820c2efd4ad9",
                "id": "fdd487dc-63cc-415e-931f-d87f8efd3a5a",
                "child": {
                    "id": "30d3f126-8319-cab3-d905-820c2efd4ad9",
                    "range": "^1.0.5",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "6a2ae8c9-f741-4fc0-9246-92ab3bffa83b",
                    "release": {
                        "id": "6a2ae8c9-f741-4fc0-9246-92ab3bffa83b",
                        "version": "1.0.5",
                        "package": {
                            "name": "string.prototype.trimstart",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "3210327a-ad95-d474-636b-025d3547f0fa",
                "child_id": "25830494-e1dc-06c8-73eb-a56f67251895",
                "id": "3d3c9e3f-6313-4a67-b9b5-4c5f7b7167c9",
                "child": {
                    "id": "25830494-e1dc-06c8-73eb-a56f67251895",
                    "range": "^2.0.2",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "aabfc2d0-8edb-4fb8-acf0-65f0cbd3bfa3",
                    "release": {
                        "id": "aabfc2d0-8edb-4fb8-acf0-65f0cbd3bfa3",
                        "version": "2.0.2",
                        "package": {
                            "name": "is-negative-zero",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "3210327a-ad95-d474-636b-025d3547f0fa",
                "child_id": "15419174-def2-28ae-aef8-628de3ca2d12",
                "id": "c1fe6242-62dd-40d5-a0cf-09e9273d1edf",
                "child": {
                    "id": "15419174-def2-28ae-aef8-628de3ca2d12",
                    "range": "^1.0.3",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "6fc968c5-7bf8-4ba8-9fc9-5bd8a5d98def",
                    "release": {
                        "id": "6fc968c5-7bf8-4ba8-9fc9-5bd8a5d98def",
                        "version": "1.0.3",
                        "package": {
                            "name": "internal-slot",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "3210327a-ad95-d474-636b-025d3547f0fa",
                "child_id": "075177d2-bc44-8a39-f3fb-200c7bdd35fa",
                "id": "81cad0cc-24ae-4e06-941d-efe7f64e0c9e",
                "child": {
                    "id": "075177d2-bc44-8a39-f3fb-200c7bdd35fa",
                    "range": "^1.1.1",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "e1fdc48f-114b-42c8-b90c-479ee772a1c6",
                    "release": {
                        "id": "e1fdc48f-114b-42c8-b90c-479ee772a1c6",
                        "version": "1.1.1",
                        "package": {
                            "name": "object-keys",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "faeee5c9-1e4e-b9d4-c78b-41af3f6a448d",
                "child_id": "6d0f2022-987d-b69a-9356-ed23faa0e3cb",
                "id": "57307a4b-c30b-419e-8975-972e0396b75a",
                "child": {
                    "id": "6d0f2022-987d-b69a-9356-ed23faa0e3cb",
                    "range": "^1.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "171b30f5-5c7f-47e7-ad2e-b4f4020d8678",
                    "release": {
                        "id": "171b30f5-5c7f-47e7-ad2e-b4f4020d8678",
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
                "parent_id": "1a6e44b3-7eb5-5234-67c1-c2ff34145ac4",
                "child_id": "4c51a793-3ed6-b450-aab9-8ee4dd73fe06",
                "id": "935c5829-a2db-47d0-a291-60cae62ed8a5",
                "child": {
                    "id": "4c51a793-3ed6-b450-aab9-8ee4dd73fe06",
                    "range": "~1.0.2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "667a980b-083a-46cf-a98d-3dc2ab46efbf",
                    "release": {
                        "id": "667a980b-083a-46cf-a98d-3dc2ab46efbf",
                        "version": "1.0.3",
                        "package": {
                            "name": "sprintf-js",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "e5e63a5a-11db-7b15-3592-d6a522562acc",
                "child_id": "1b251bd4-843c-231c-51c3-568bbb438395",
                "id": "fe2da284-de2f-4891-a945-5538f3ba4beb",
                "child": {
                    "id": "1b251bd4-843c-231c-51c3-568bbb438395",
                    "range": "^2.0.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "cc586f52-44b0-4ad4-9678-377fa6fa4663",
                    "release": {
                        "id": "cc586f52-44b0-4ad4-9678-377fa6fa4663",
                        "version": "2.1.3",
                        "package": {
                            "name": "npmconf",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "0f8c6aeb-e80d-4ad6-b730-976d32aaebb6",
                                        "source_id": "GHSA-57cf-349j-352g",
                                        "source": "ghsa",
                                        "severity_name": "Medium",
                                        "cvss_score": null,
                                        "summary": "Out-of-bounds Read in npmconf",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "2.1.3"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "7869781d-3285-931f-57b5-7d977a370350",
                "child_id": "abfbc1dc-d44d-6c7a-2c08-286b3abf4b18",
                "id": "a3c9aefe-05ef-4c59-a7ed-40b682f5e4ce",
                "child": {
                    "id": "abfbc1dc-d44d-6c7a-2c08-286b3abf4b18",
                    "range": "^0.3.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "b4d0fbb9-b8b1-4b0f-a731-8c06612036d2",
                    "release": {
                        "id": "b4d0fbb9-b8b1-4b0f-a731-8c06612036d2",
                        "version": "0.3.1",
                        "package": {
                            "name": "object-assign",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "7b079052-324b-3b82-3429-12d3f983696d",
                "child_id": "a2de94a0-82ff-6cb9-fbee-44a5376a2b40",
                "id": "a39317b0-4ac8-4f77-9009-b76528affd5f",
                "child": {
                    "id": "a2de94a0-82ff-6cb9-fbee-44a5376a2b40",
                    "range": "~0.1.3",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "a8ab5d75-1f7a-47b1-b014-13772e4f0af8",
                    "release": {
                        "id": "a8ab5d75-1f7a-47b1-b014-13772e4f0af8",
                        "version": "0.1.3",
                        "package": {
                            "name": "es6-iterator",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "7b079052-324b-3b82-3429-12d3f983696d",
                "child_id": "81d4f145-f02f-e590-8f9a-ce8cde553daf",
                "id": "286e48ff-0ba8-4f43-97af-b6d8ab3a6b0b",
                "child": {
                    "id": "81d4f145-f02f-e590-8f9a-ce8cde553daf",
                    "range": "~2.0.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "30944671-2d2b-4c74-b935-6d86b125028a",
                    "release": {
                        "id": "30944671-2d2b-4c74-b935-6d86b125028a",
                        "version": "2.0.1",
                        "package": {
                            "name": "es6-symbol",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "7b079052-324b-3b82-3429-12d3f983696d",
                "child_id": "41b6cee6-7ea2-a259-1c34-21a4ac27ec9c",
                "id": "84f8a3f3-c1f0-4b5f-86fd-4baaae7c9b00",
                "child": {
                    "id": "41b6cee6-7ea2-a259-1c34-21a4ac27ec9c",
                    "range": "~0.10.6",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "32343700-7615-4411-a42c-b6cf126c91f1",
                    "release": {
                        "id": "32343700-7615-4411-a42c-b6cf126c91f1",
                        "version": "0.10.61",
                        "package": {
                            "name": "es5-ext",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "7b079052-324b-3b82-3429-12d3f983696d",
                "child_id": "26ff2323-b012-f4bb-0092-f62303e66fcd",
                "id": "7c07ccc9-4660-489a-9b22-9ecc652cbb31",
                "child": {
                    "id": "26ff2323-b012-f4bb-0092-f62303e66fcd",
                    "range": "~0.1.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "ce61a9d1-f0f7-401f-b982-b937227501d8",
                    "release": {
                        "id": "ce61a9d1-f0f7-401f-b982-b937227501d8",
                        "version": "0.1.1",
                        "package": {
                            "name": "d",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "738e20c8-d5aa-95af-d4e0-1a3f63074438",
                "child_id": "41b6cee6-7ea2-a259-1c34-21a4ac27ec9c",
                "id": "815de8c7-57a6-47ef-805c-18eeaee166f3",
                "child": {
                    "id": "41b6cee6-7ea2-a259-1c34-21a4ac27ec9c",
                    "range": "~0.10.6",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "32343700-7615-4411-a42c-b6cf126c91f1",
                    "release": {
                        "id": "32343700-7615-4411-a42c-b6cf126c91f1",
                        "version": "0.10.61",
                        "package": {
                            "name": "es5-ext",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "6fc24f22-a3a6-acb0-cbc6-292bf3021c4e",
                "child_id": "fb73671a-f694-89b5-a120-283cf8b4ab42",
                "id": "5e6df137-1ba5-482c-a499-6a2c4597e62b",
                "child": {
                    "id": "fb73671a-f694-89b5-a120-283cf8b4ab42",
                    "range": "1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "59912bf1-f5e9-454b-9998-57e8fd53cfb6",
                    "release": {
                        "id": "59912bf1-f5e9-454b-9998-57e8fd53cfb6",
                        "version": "1.0.1",
                        "package": {
                            "name": "d",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "6fc24f22-a3a6-acb0-cbc6-292bf3021c4e",
                "child_id": "41b6cee6-7ea2-a259-1c34-21a4ac27ec9c",
                "id": "2ec41a8e-4f93-4a30-8a97-48cf1c540040",
                "child": {
                    "id": "41b6cee6-7ea2-a259-1c34-21a4ac27ec9c",
                    "range": "~0.10.6",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "32343700-7615-4411-a42c-b6cf126c91f1",
                    "release": {
                        "id": "32343700-7615-4411-a42c-b6cf126c91f1",
                        "version": "0.10.61",
                        "package": {
                            "name": "es5-ext",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "6e8245d5-7db6-a725-227b-cab22fb5334d",
                "child_id": "ce933983-1fac-662e-0e12-e2c4b8ea2b0a",
                "id": "b9acef13-1971-4c97-9870-cafa8f160f8a",
                "child": {
                    "id": "ce933983-1fac-662e-0e12-e2c4b8ea2b0a",
                    "range": "^3.1.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "ede0fcaa-5528-4a35-9084-8502491ff1bd",
                    "release": {
                        "id": "ede0fcaa-5528-4a35-9084-8502491ff1bd",
                        "version": "3.1.3",
                        "package": {
                            "name": "es6-symbol",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "6e8245d5-7db6-a725-227b-cab22fb5334d",
                "child_id": "b7c66d0f-6cc2-a67e-be56-55234d74c874",
                "id": "d696fb84-be7f-4362-9550-8aa487ba4ac9",
                "child": {
                    "id": "b7c66d0f-6cc2-a67e-be56-55234d74c874",
                    "range": "^0.10.35",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "32343700-7615-4411-a42c-b6cf126c91f1",
                    "release": {
                        "id": "32343700-7615-4411-a42c-b6cf126c91f1",
                        "version": "0.10.61",
                        "package": {
                            "name": "es5-ext",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "6e8245d5-7db6-a725-227b-cab22fb5334d",
                "child_id": "025b2ca6-6a0c-4162-a71d-fff2f997c3a7",
                "id": "f185be70-593b-42ae-a4e8-e30af7edff42",
                "child": {
                    "id": "025b2ca6-6a0c-4162-a71d-fff2f997c3a7",
                    "range": "1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "59912bf1-f5e9-454b-9998-57e8fd53cfb6",
                    "release": {
                        "id": "59912bf1-f5e9-454b-9998-57e8fd53cfb6",
                        "version": "1.0.1",
                        "package": {
                            "name": "d",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "3b39c717-03e9-a42f-85f8-a689d6076792",
                "child_id": "67af9a72-e109-7b07-79c9-b81c524c7a28",
                "id": "da8f5987-2fda-4a78-b10d-f126545006e9",
                "child": {
                    "id": "67af9a72-e109-7b07-79c9-b81c524c7a28",
                    "range": "^1.0.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "59912bf1-f5e9-454b-9998-57e8fd53cfb6",
                    "release": {
                        "id": "59912bf1-f5e9-454b-9998-57e8fd53cfb6",
                        "version": "1.0.1",
                        "package": {
                            "name": "d",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "3b39c717-03e9-a42f-85f8-a689d6076792",
                "child_id": "307058d5-d072-c6ea-d13b-fe26e59d8cd8",
                "id": "a824a1fe-7244-41bc-8c17-9626ca29496a",
                "child": {
                    "id": "307058d5-d072-c6ea-d13b-fe26e59d8cd8",
                    "range": "^1.1.2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "ce506823-053c-496f-8f13-6592ccac9348",
                    "release": {
                        "id": "ce506823-053c-496f-8f13-6592ccac9348",
                        "version": "1.6.0",
                        "package": {
                            "name": "ext",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "37084daf-ea32-0e62-520c-267f6f63ee93",
                "child_id": "9fc964ba-031c-b6f9-b223-af5988907929",
                "id": "feb81ddf-2dbd-4b72-af47-00a5b9c6d8c1",
                "child": {
                    "id": "9fc964ba-031c-b6f9-b223-af5988907929",
                    "range": "1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "708b6742-3cae-4980-8140-5b9dbb5d1a53",
                    "release": {
                        "id": "708b6742-3cae-4980-8140-5b9dbb5d1a53",
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
                "parent_id": "37084daf-ea32-0e62-520c-267f6f63ee93",
                "child_id": "18210398-ef09-02c2-dd07-1a6bbc286082",
                "id": "68f912c3-8724-42bc-9a0d-4aa03a18bcbd",
                "child": {
                    "id": "18210398-ef09-02c2-dd07-1a6bbc286082",
                    "range": "^1.4.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "952d0b9c-55c8-4e92-839d-fabb0382b93c",
                    "release": {
                        "id": "952d0b9c-55c8-4e92-839d-fabb0382b93c",
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
                "parent_id": "fb573657-08b3-0c79-966f-de1c5854e449",
                "child_id": "d4124e53-95e8-45a5-b888-335006073f1a",
                "id": "72057eae-eead-46ac-8e7e-f5eb9ad14190",
                "child": {
                    "id": "d4124e53-95e8-45a5-b888-335006073f1a",
                    "range": "~0.2.3",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "59dc65cd-79de-46f1-a75d-8d3a09195e56",
                    "release": {
                        "id": "59dc65cd-79de-46f1-a75d-8d3a09195e56",
                        "version": "0.2.6",
                        "package": {
                            "name": "asn1",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "fb573657-08b3-0c79-966f-de1c5854e449",
                "child_id": "d39fdbe4-b054-e593-f22d-2370a7056651",
                "id": "874dd331-ab97-48d9-a89b-93eda34a6cf4",
                "child": {
                    "id": "d39fdbe4-b054-e593-f22d-2370a7056651",
                    "range": "^1.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "527086cf-cdaf-4a86-a297-de04fee80eaf",
                    "release": {
                        "id": "527086cf-cdaf-4a86-a297-de04fee80eaf",
                        "version": "1.0.2",
                        "package": {
                            "name": "bcrypt-pbkdf",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "fb573657-08b3-0c79-966f-de1c5854e449",
                "child_id": "c159377a-ae9c-205a-705e-a09c1590b24a",
                "id": "291e1b05-3efb-4086-b616-3f4e448713f8",
                "child": {
                    "id": "c159377a-ae9c-205a-705e-a09c1590b24a",
                    "range": "^1.12.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "e81a515e-0260-4757-b71e-1914775530fc",
                    "release": {
                        "id": "e81a515e-0260-4757-b71e-1914775530fc",
                        "version": "1.14.1",
                        "package": {
                            "name": "dashdash",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "fb573657-08b3-0c79-966f-de1c5854e449",
                "child_id": "97789db0-1829-0fc9-0cee-5c45dd5fc495",
                "id": "20f8e014-5e0e-45c6-986d-123c4bf4e0c6",
                "child": {
                    "id": "97789db0-1829-0fc9-0cee-5c45dd5fc495",
                    "range": "^2.0.2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "15679d7c-382b-4225-8381-442d453b71f9",
                    "release": {
                        "id": "15679d7c-382b-4225-8381-442d453b71f9",
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
                "parent_id": "fb573657-08b3-0c79-966f-de1c5854e449",
                "child_id": "5cd13594-236b-3745-b6da-230c776cc993",
                "id": "6aed028c-4402-45a6-b877-16e44846cf0f",
                "child": {
                    "id": "5cd13594-236b-3745-b6da-230c776cc993",
                    "range": "^1.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "7cded6f4-9988-4c84-a132-547d426f0958",
                    "release": {
                        "id": "7cded6f4-9988-4c84-a132-547d426f0958",
                        "version": "1.0.0",
                        "package": {
                            "name": "assert-plus",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "fb573657-08b3-0c79-966f-de1c5854e449",
                "child_id": "5a39475a-bad8-c1de-3698-7d28ed408725",
                "id": "8f2c4435-7129-4556-8406-17c3f5f4629f",
                "child": {
                    "id": "5a39475a-bad8-c1de-3698-7d28ed408725",
                    "range": "~0.14.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "3aaec921-44da-412b-9a2b-2c0548e0651c",
                    "release": {
                        "id": "3aaec921-44da-412b-9a2b-2c0548e0651c",
                        "version": "0.14.5",
                        "package": {
                            "name": "tweetnacl",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "fb573657-08b3-0c79-966f-de1c5854e449",
                "child_id": "3edb66ce-cd4f-5052-e73e-6c62a3cfe2f5",
                "id": "c32c90cd-0010-4e62-9816-8f2ce5bf4b25",
                "child": {
                    "id": "3edb66ce-cd4f-5052-e73e-6c62a3cfe2f5",
                    "range": "^0.1.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "0b415470-b089-41bb-baee-c9a0f59991e2",
                    "release": {
                        "id": "0b415470-b089-41bb-baee-c9a0f59991e2",
                        "version": "0.1.7",
                        "package": {
                            "name": "getpass",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "fb573657-08b3-0c79-966f-de1c5854e449",
                "child_id": "33fd8a13-a34d-2464-355c-3aea7006f588",
                "id": "27327116-573d-4265-94a7-4c2292581948",
                "child": {
                    "id": "33fd8a13-a34d-2464-355c-3aea7006f588",
                    "range": "~0.1.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "450445a1-d24d-4194-87a8-d340de00541a",
                    "release": {
                        "id": "450445a1-d24d-4194-87a8-d340de00541a",
                        "version": "0.1.2",
                        "package": {
                            "name": "ecc-jsbn",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "fb573657-08b3-0c79-966f-de1c5854e449",
                "child_id": "14e96705-eaa3-aea8-9b74-19e9690ff233",
                "id": "fd156162-ae2c-406d-9ce2-11e8980d345a",
                "child": {
                    "id": "14e96705-eaa3-aea8-9b74-19e9690ff233",
                    "range": "~0.1.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "8405d021-961e-4119-aa19-5873855ef373",
                    "release": {
                        "id": "8405d021-961e-4119-aa19-5873855ef373",
                        "version": "0.1.1",
                        "package": {
                            "name": "jsbn",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "307bcc29-9ee8-35f6-20c4-9f09c2f8c62e",
                "child_id": "dbfdbdb6-58e6-15d3-92cf-4db845ac67ce",
                "id": "36a2a278-ffc3-4d43-a2e0-6d864b1d8fe8",
                "child": {
                    "id": "dbfdbdb6-58e6-15d3-92cf-4db845ac67ce",
                    "range": "1.10.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "1b5dde46-91a1-4e99-a47a-47d94e38a064",
                    "release": {
                        "id": "1b5dde46-91a1-4e99-a47a-47d94e38a064",
                        "version": "1.10.0",
                        "package": {
                            "name": "verror",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "307bcc29-9ee8-35f6-20c4-9f09c2f8c62e",
                "child_id": "5eeb78d5-8213-ca14-005b-74ac2381f390",
                "id": "9e090b62-2768-448d-9e76-2798ed3ee22f",
                "child": {
                    "id": "5eeb78d5-8213-ca14-005b-74ac2381f390",
                    "range": "1.3.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "6546d891-88c6-46a5-bd0f-705b06a8f45e",
                    "release": {
                        "id": "6546d891-88c6-46a5-bd0f-705b06a8f45e",
                        "version": "1.3.0",
                        "package": {
                            "name": "extsprintf",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "307bcc29-9ee8-35f6-20c4-9f09c2f8c62e",
                "child_id": "5cd13594-236b-3745-b6da-230c776cc993",
                "id": "2a97a1e0-ab33-473b-b311-6294e0664e88",
                "child": {
                    "id": "5cd13594-236b-3745-b6da-230c776cc993",
                    "range": "^1.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "7cded6f4-9988-4c84-a132-547d426f0958",
                    "release": {
                        "id": "7cded6f4-9988-4c84-a132-547d426f0958",
                        "version": "1.0.0",
                        "package": {
                            "name": "assert-plus",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "307bcc29-9ee8-35f6-20c4-9f09c2f8c62e",
                "child_id": "4e3f21ce-bcfb-42f1-252f-c6351ca2bfa9",
                "id": "b2438ad6-325a-41cf-b88e-9ef138d02311",
                "child": {
                    "id": "4e3f21ce-bcfb-42f1-252f-c6351ca2bfa9",
                    "range": "0.4.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "5aa5c0fe-c92a-4c26-ab6b-d28712b248f4",
                    "release": {
                        "id": "5aa5c0fe-c92a-4c26-ab6b-d28712b248f4",
                        "version": "0.4.0",
                        "package": {
                            "name": "json-schema",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "0cbea5b1-5aad-4622-b2bf-153b875d918b",
                                        "source_id": "GHSA-896r-f27r-55mw",
                                        "source": "ghsa",
                                        "severity_name": "Critical",
                                        "cvss_score": 9.8,
                                        "summary": "json-schema is vulnerable to Prototype Pollution",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "0.4.0"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "06d283ca-b565-f662-98ec-a22c9637ff62",
                "child_id": "f3fd3bcb-587c-d5a2-27f1-083868289d03",
                "id": "4da60220-b76a-4c39-9030-b29f998a7147",
                "child": {
                    "id": "f3fd3bcb-587c-d5a2-27f1-083868289d03",
                    "range": "^3.1.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "c64cc06a-2e00-4234-b9c7-671570468097",
                    "release": {
                        "id": "c64cc06a-2e00-4234-b9c7-671570468097",
                        "version": "3.1.3",
                        "package": {
                            "name": "fast-deep-equal",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "06d283ca-b565-f662-98ec-a22c9637ff62",
                "child_id": "c9dd7d5d-7f35-8d92-7cde-38f87030d60b",
                "id": "48fd21ec-6b3b-4722-b75f-9859afee45d6",
                "child": {
                    "id": "c9dd7d5d-7f35-8d92-7cde-38f87030d60b",
                    "range": "^2.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "8408d106-0e89-4177-a2f7-1be68c0432ff",
                    "release": {
                        "id": "8408d106-0e89-4177-a2f7-1be68c0432ff",
                        "version": "2.1.0",
                        "package": {
                            "name": "fast-json-stable-stringify",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "06d283ca-b565-f662-98ec-a22c9637ff62",
                "child_id": "a4c9453d-f171-44bf-fb3b-cecb62b16849",
                "id": "d5700497-7275-4ab4-9d23-8cfd474e2035",
                "child": {
                    "id": "a4c9453d-f171-44bf-fb3b-cecb62b16849",
                    "range": "^0.4.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "06e67a5a-2038-4325-8134-c1559468d71d",
                    "release": {
                        "id": "06e67a5a-2038-4325-8134-c1559468d71d",
                        "version": "0.4.1",
                        "package": {
                            "name": "json-schema-traverse",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "06d283ca-b565-f662-98ec-a22c9637ff62",
                "child_id": "2aa96892-1aa1-d40f-e5fc-a4518accecc3",
                "id": "c66115bb-5fa9-41ca-b2aa-204011113021",
                "child": {
                    "id": "2aa96892-1aa1-d40f-e5fc-a4518accecc3",
                    "range": "^4.2.2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "aea5ed10-1279-40ee-ae2c-c8d4e34bef86",
                    "release": {
                        "id": "aea5ed10-1279-40ee-ae2c-c8d4e34bef86",
                        "version": "4.4.1",
                        "package": {
                            "name": "uri-js",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "2e851086-9b90-4fc8-8315-96ff96bc6ace",
                                        "source_id": "GHSA-333w-rxj3-f55r",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": null,
                                        "summary": "Regular Expression Denial Of Service in uri-js",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "3.0.0"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "f8dcb8d9-603c-087c-5953-d9fe09e65845",
                "child_id": "3e15ce52-b9e8-4dc2-9d6e-f575d48d6d73",
                "id": "9de18ea8-f753-434b-8bcc-b24b92326c62",
                "child": {
                    "id": "3e15ce52-b9e8-4dc2-9d6e-f575d48d6d73",
                    "range": "~1.12.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "d19e6672-85c7-415c-8c87-155ffb480c6b",
                    "release": {
                        "id": "d19e6672-85c7-415c-8c87-155ffb480c6b",
                        "version": "1.12.0",
                        "package": {
                            "name": "mime-db",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "275b3ddc-54e6-aa55-566b-c195a07d02a1",
                "child_id": "9fc964ba-031c-b6f9-b223-af5988907929",
                "id": "b6efeaa8-5776-4dfd-9d6a-990c3874fb78",
                "child": {
                    "id": "9fc964ba-031c-b6f9-b223-af5988907929",
                    "range": "1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "708b6742-3cae-4980-8140-5b9dbb5d1a53",
                    "release": {
                        "id": "708b6742-3cae-4980-8140-5b9dbb5d1a53",
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
                "parent_id": "dc8a9714-119e-b407-e0ec-4073b0f40446",
                "child_id": "ff62d078-19dc-7d2a-9cf4-1a837e5eaeab",
                "id": "73970a8c-590f-4a13-86ee-6f14ca826144",
                "child": {
                    "id": "ff62d078-19dc-7d2a-9cf4-1a837e5eaeab",
                    "range": "2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "f15e7e6e-1961-4181-9358-7a371e6737bc",
                    "release": {
                        "id": "f15e7e6e-1961-4181-9358-7a371e6737bc",
                        "version": "2.7.3",
                        "package": {
                            "name": "lru-cache",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "dc8a9714-119e-b407-e0ec-4073b0f40446",
                "child_id": "52e69c15-f8f1-5c5b-f4ec-2dcf8b83c5ad",
                "id": "2a7a03ca-9e24-4d48-a47c-ea71d3cca11d",
                "child": {
                    "id": "52e69c15-f8f1-5c5b-f4ec-2dcf8b83c5ad",
                    "range": "~1.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "121e67ad-f70a-4c02-9e9a-ffd12a32b4ca",
                    "release": {
                        "id": "121e67ad-f70a-4c02-9e9a-ffd12a32b4ca",
                        "version": "1.0.1",
                        "package": {
                            "name": "sigmund",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "e33a5b3b-880e-714a-c4bd-190a49a67f12",
                "child_id": "8653054c-b253-b938-adc0-120371f060c6",
                "id": "e77ccb2b-dd2e-4e62-884d-f2b172001ee6",
                "child": {
                    "id": "8653054c-b253-b938-adc0-120371f060c6",
                    "range": "^1.1.1",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "f3b4cb0e-627a-4cb1-9d8d-c7f1cd524534",
                    "release": {
                        "id": "f3b4cb0e-627a-4cb1-9d8d-c7f1cd524534",
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
                "parent_id": "e33a5b3b-880e-714a-c4bd-190a49a67f12",
                "child_id": "82fb7d93-be69-6f6a-e4f1-1056f2ba7a4e",
                "id": "a774859b-f30c-4b16-9062-24a80d6128f3",
                "child": {
                    "id": "82fb7d93-be69-6f6a-e4f1-1056f2ba7a4e",
                    "range": "^1.0.3",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "6dfd68d4-47a1-4a89-aa51-703866ab1308",
                    "release": {
                        "id": "6dfd68d4-47a1-4a89-aa51-703866ab1308",
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
                "parent_id": "e33a5b3b-880e-714a-c4bd-190a49a67f12",
                "child_id": "68a29834-98db-e1b0-2280-7de6cef44d8a",
                "id": "2c61ff29-89fa-4109-8338-0bab515cb9a3",
                "child": {
                    "id": "68a29834-98db-e1b0-2280-7de6cef44d8a",
                    "range": "^1.0.3",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "7d5c8481-43e3-47c1-a6f5-b66de5e34e5e",
                    "release": {
                        "id": "7d5c8481-43e3-47c1-a6f5-b66de5e34e5e",
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
                "parent_id": "ff5867e5-d679-0457-19fb-13c4c8e7a1ae",
                "child_id": "e33a5b3b-880e-714a-c4bd-190a49a67f12",
                "id": "191199c6-7c25-44a8-9386-68d7b88a0412",
                "child": {
                    "id": "e33a5b3b-880e-714a-c4bd-190a49a67f12",
                    "range": "^1.1.1",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "ac9fd55c-7f8e-45c6-82b3-faa6fd56085d",
                    "release": {
                        "id": "ac9fd55c-7f8e-45c6-82b3-faa6fd56085d",
                        "version": "1.1.1",
                        "package": {
                            "name": "get-intrinsic",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "fc491d16-39d4-f13c-53dc-ba42d21845c3",
                "child_id": "f7bfd560-aec4-dc8e-02ec-622953acdd55",
                "id": "a87887fb-2363-43a3-8a79-21ba08334583",
                "child": {
                    "id": "f7bfd560-aec4-dc8e-02ec-622953acdd55",
                    "range": "^1.1.3",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "0eaa2e51-c011-4845-b29c-88590d0c24c8",
                    "release": {
                        "id": "0eaa2e51-c011-4845-b29c-88590d0c24c8",
                        "version": "1.1.4",
                        "package": {
                            "name": "define-properties",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "fc491d16-39d4-f13c-53dc-ba42d21845c3",
                "child_id": "82fb7d93-be69-6f6a-e4f1-1056f2ba7a4e",
                "id": "a6c5fe83-9aa1-462b-8e2f-706b6dc694a7",
                "child": {
                    "id": "82fb7d93-be69-6f6a-e4f1-1056f2ba7a4e",
                    "range": "^1.0.3",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "6dfd68d4-47a1-4a89-aa51-703866ab1308",
                    "release": {
                        "id": "6dfd68d4-47a1-4a89-aa51-703866ab1308",
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
                "parent_id": "fc491d16-39d4-f13c-53dc-ba42d21845c3",
                "child_id": "8279937e-18c7-f64d-1638-30d529329e55",
                "id": "9586e3e9-28cf-451c-8706-aaee7658f497",
                "child": {
                    "id": "8279937e-18c7-f64d-1638-30d529329e55",
                    "range": "^1.0.2",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "e790ff1a-66f6-4939-9623-89e4a4fcefcf",
                    "release": {
                        "id": "e790ff1a-66f6-4939-9623-89e4a4fcefcf",
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
                "parent_id": "fc491d16-39d4-f13c-53dc-ba42d21845c3",
                "child_id": "075177d2-bc44-8a39-f3fb-200c7bdd35fa",
                "id": "f7778a30-fafe-40a6-b9b9-df04846debb4",
                "child": {
                    "id": "075177d2-bc44-8a39-f3fb-200c7bdd35fa",
                    "range": "^1.1.1",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "e1fdc48f-114b-42c8-b90c-479ee772a1c6",
                    "release": {
                        "id": "e1fdc48f-114b-42c8-b90c-479ee772a1c6",
                        "version": "1.1.1",
                        "package": {
                            "name": "object-keys",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "faf1df2e-aedf-1368-2870-afdded73108d",
                "child_id": "d3bbaf46-5566-3d34-d798-b79a76fb20ff",
                "id": "d12e839e-f79d-4f30-906a-7211fa8a3f51",
                "child": {
                    "id": "d3bbaf46-5566-3d34-d798-b79a76fb20ff",
                    "range": "^1.0.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "83ffaa65-3412-4bdc-8164-066fcb18b569",
                    "release": {
                        "id": "83ffaa65-3412-4bdc-8164-066fcb18b569",
                        "version": "1.0.0",
                        "package": {
                            "name": "has-tostringtag",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "f4a353a1-327d-67e3-e350-670bc2b05d97",
                "child_id": "8279937e-18c7-f64d-1638-30d529329e55",
                "id": "a75e5d4d-b155-4dce-aa2b-2f25e0784f24",
                "child": {
                    "id": "8279937e-18c7-f64d-1638-30d529329e55",
                    "range": "^1.0.2",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "e790ff1a-66f6-4939-9623-89e4a4fcefcf",
                    "release": {
                        "id": "e790ff1a-66f6-4939-9623-89e4a4fcefcf",
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
                "parent_id": "f0cc5bb2-984d-8c6d-2338-634c921177d1",
                "child_id": "f7bfd560-aec4-dc8e-02ec-622953acdd55",
                "id": "e1b1cd30-3378-4e76-bcb7-3685287476f0",
                "child": {
                    "id": "f7bfd560-aec4-dc8e-02ec-622953acdd55",
                    "range": "^1.1.3",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "0eaa2e51-c011-4845-b29c-88590d0c24c8",
                    "release": {
                        "id": "0eaa2e51-c011-4845-b29c-88590d0c24c8",
                        "version": "1.1.4",
                        "package": {
                            "name": "define-properties",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "f0cc5bb2-984d-8c6d-2338-634c921177d1",
                "child_id": "8279937e-18c7-f64d-1638-30d529329e55",
                "id": "4cdc90cb-abdc-442d-aa55-1b1d66257bc0",
                "child": {
                    "id": "8279937e-18c7-f64d-1638-30d529329e55",
                    "range": "^1.0.2",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "e790ff1a-66f6-4939-9623-89e4a4fcefcf",
                    "release": {
                        "id": "e790ff1a-66f6-4939-9623-89e4a4fcefcf",
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
                "parent_id": "f0cc5bb2-984d-8c6d-2338-634c921177d1",
                "child_id": "489cbed4-7348-a799-c2d9-38ec23a16041",
                "id": "73473cab-7b9e-4530-9cf6-8d818006ba3e",
                "child": {
                    "id": "489cbed4-7348-a799-c2d9-38ec23a16041",
                    "range": "^1.19.0",
                    "labels": {
                        "scope": "prod",
                        "pruned": "cyclic"
                    },
                    "release_id": "c61412fa-1416-432b-af90-d6f314c3d34c",
                    "release": {
                        "id": "c61412fa-1416-432b-af90-d6f314c3d34c",
                        "version": "1.20.1",
                        "package": {
                            "name": "es-abstract",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "f0cc5bb2-984d-8c6d-2338-634c921177d1",
                "child_id": "284a214e-614f-f82c-048e-bdc3120e2108",
                "id": "4fd16229-6b47-4559-ae33-5b6f45108f71",
                "child": {
                    "id": "284a214e-614f-f82c-048e-bdc3120e2108",
                    "range": "^1.2.2",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "91607814-ab1e-47f1-8dcb-539f4800f087",
                    "release": {
                        "id": "91607814-ab1e-47f1-8dcb-539f4800f087",
                        "version": "1.2.3",
                        "package": {
                            "name": "functions-have-names",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "e55bfc7f-e55a-b941-3939-e52aee7bc956",
                "child_id": "e33a5b3b-880e-714a-c4bd-190a49a67f12",
                "id": "41964eb8-951a-4854-813f-c47a7e6473a1",
                "child": {
                    "id": "e33a5b3b-880e-714a-c4bd-190a49a67f12",
                    "range": "^1.1.1",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "ac9fd55c-7f8e-45c6-82b3-faa6fd56085d",
                    "release": {
                        "id": "ac9fd55c-7f8e-45c6-82b3-faa6fd56085d",
                        "version": "1.1.1",
                        "package": {
                            "name": "get-intrinsic",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "e55bfc7f-e55a-b941-3939-e52aee7bc956",
                "child_id": "8279937e-18c7-f64d-1638-30d529329e55",
                "id": "fc8c6cf7-0e4e-4872-bfa4-a74f0c4d1015",
                "child": {
                    "id": "8279937e-18c7-f64d-1638-30d529329e55",
                    "range": "^1.0.2",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "e790ff1a-66f6-4939-9623-89e4a4fcefcf",
                    "release": {
                        "id": "e790ff1a-66f6-4939-9623-89e4a4fcefcf",
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
                "parent_id": "e37cd4a3-6397-b548-c81f-36cb310d1858",
                "child_id": "f7bfd560-aec4-dc8e-02ec-622953acdd55",
                "id": "cad9c4a8-3492-4e9c-a0a4-27073b6b6e0f",
                "child": {
                    "id": "f7bfd560-aec4-dc8e-02ec-622953acdd55",
                    "range": "^1.1.3",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "0eaa2e51-c011-4845-b29c-88590d0c24c8",
                    "release": {
                        "id": "0eaa2e51-c011-4845-b29c-88590d0c24c8",
                        "version": "1.1.4",
                        "package": {
                            "name": "define-properties",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "e37cd4a3-6397-b548-c81f-36cb310d1858",
                "child_id": "8279937e-18c7-f64d-1638-30d529329e55",
                "id": "24fcf73b-6b01-4b6e-b217-ece8ffafe46c",
                "child": {
                    "id": "8279937e-18c7-f64d-1638-30d529329e55",
                    "range": "^1.0.2",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "e790ff1a-66f6-4939-9623-89e4a4fcefcf",
                    "release": {
                        "id": "e790ff1a-66f6-4939-9623-89e4a4fcefcf",
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
                "parent_id": "e37cd4a3-6397-b548-c81f-36cb310d1858",
                "child_id": "8122f824-913a-3667-3238-7835a3a4f45f",
                "id": "abd81889-89b6-4cdc-b3db-61f0313203ab",
                "child": {
                    "id": "8122f824-913a-3667-3238-7835a3a4f45f",
                    "range": "^1.19.5",
                    "labels": {
                        "scope": "prod",
                        "pruned": "cyclic"
                    },
                    "release_id": "c61412fa-1416-432b-af90-d6f314c3d34c",
                    "release": {
                        "id": "c61412fa-1416-432b-af90-d6f314c3d34c",
                        "version": "1.20.1",
                        "package": {
                            "name": "es-abstract",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "e11790a3-1fde-f0bb-ed12-357c98d34644",
                "child_id": "8279937e-18c7-f64d-1638-30d529329e55",
                "id": "8d6c82cd-6779-4fb1-b753-8d59d8e948bd",
                "child": {
                    "id": "8279937e-18c7-f64d-1638-30d529329e55",
                    "range": "^1.0.2",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "e790ff1a-66f6-4939-9623-89e4a4fcefcf",
                    "release": {
                        "id": "e790ff1a-66f6-4939-9623-89e4a4fcefcf",
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
                "parent_id": "d6fade40-b554-2b9d-d471-c23db166e797",
                "child_id": "f7bfd560-aec4-dc8e-02ec-622953acdd55",
                "id": "f9e9892d-4a22-41f5-89ed-ec5d4735c01d",
                "child": {
                    "id": "f7bfd560-aec4-dc8e-02ec-622953acdd55",
                    "range": "^1.1.3",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "0eaa2e51-c011-4845-b29c-88590d0c24c8",
                    "release": {
                        "id": "0eaa2e51-c011-4845-b29c-88590d0c24c8",
                        "version": "1.1.4",
                        "package": {
                            "name": "define-properties",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "d6fade40-b554-2b9d-d471-c23db166e797",
                "child_id": "8279937e-18c7-f64d-1638-30d529329e55",
                "id": "899df872-a4c5-4dc7-bf57-d9a6eca4bb15",
                "child": {
                    "id": "8279937e-18c7-f64d-1638-30d529329e55",
                    "range": "^1.0.2",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "e790ff1a-66f6-4939-9623-89e4a4fcefcf",
                    "release": {
                        "id": "e790ff1a-66f6-4939-9623-89e4a4fcefcf",
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
                "parent_id": "d6fade40-b554-2b9d-d471-c23db166e797",
                "child_id": "284a214e-614f-f82c-048e-bdc3120e2108",
                "id": "3b2b2d8f-5100-4c44-b209-f234c35bd4d9",
                "child": {
                    "id": "284a214e-614f-f82c-048e-bdc3120e2108",
                    "range": "^1.2.2",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "91607814-ab1e-47f1-8dcb-539f4800f087",
                    "release": {
                        "id": "91607814-ab1e-47f1-8dcb-539f4800f087",
                        "version": "1.2.3",
                        "package": {
                            "name": "functions-have-names",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "9e34647c-828c-7262-431f-66447d06e359",
                "child_id": "c776df17-e4eb-4bc5-64c4-84874419724a",
                "id": "1a2933db-16aa-4106-ac82-8a8a0dff4ae6",
                "child": {
                    "id": "c776df17-e4eb-4bc5-64c4-84874419724a",
                    "range": "^1.0.2",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "454a680e-f790-4135-91a7-ac8db4d328e3",
                    "release": {
                        "id": "454a680e-f790-4135-91a7-ac8db4d328e3",
                        "version": "1.0.2",
                        "package": {
                            "name": "which-boxed-primitive",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "9e34647c-828c-7262-431f-66447d06e359",
                "child_id": "82fb7d93-be69-6f6a-e4f1-1056f2ba7a4e",
                "id": "12d2f4bb-8038-47e0-8921-867f74952ed7",
                "child": {
                    "id": "82fb7d93-be69-6f6a-e4f1-1056f2ba7a4e",
                    "range": "^1.0.3",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "6dfd68d4-47a1-4a89-aa51-703866ab1308",
                    "release": {
                        "id": "6dfd68d4-47a1-4a89-aa51-703866ab1308",
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
                "parent_id": "9e34647c-828c-7262-431f-66447d06e359",
                "child_id": "8279937e-18c7-f64d-1638-30d529329e55",
                "id": "6ef22cef-a2fa-4283-a994-d4ad4c0307a5",
                "child": {
                    "id": "8279937e-18c7-f64d-1638-30d529329e55",
                    "range": "^1.0.2",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "e790ff1a-66f6-4939-9623-89e4a4fcefcf",
                    "release": {
                        "id": "e790ff1a-66f6-4939-9623-89e4a4fcefcf",
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
                "parent_id": "9e34647c-828c-7262-431f-66447d06e359",
                "child_id": "50afbc75-bd6c-a690-f705-4ca69cfb785b",
                "id": "1b93c012-dc13-41f1-8bf0-1e9a75e084f5",
                "child": {
                    "id": "50afbc75-bd6c-a690-f705-4ca69cfb785b",
                    "range": "^1.0.2",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "b44bf444-adfd-4d4a-a6a2-9f18001cf2d3",
                    "release": {
                        "id": "b44bf444-adfd-4d4a-a6a2-9f18001cf2d3",
                        "version": "1.0.2",
                        "package": {
                            "name": "has-bigints",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "7324b616-3e5c-0b55-a8ad-b86939f40ece",
                "child_id": "e0fa360c-32f6-3ee7-9c95-59240b86bd1f",
                "id": "2209b393-731c-45c8-857d-57ee7a670733",
                "child": {
                    "id": "e0fa360c-32f6-3ee7-9c95-59240b86bd1f",
                    "range": "^1.2.4",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "c4a8a1cc-1780-4c03-b3d2-c536289bcd46",
                    "release": {
                        "id": "c4a8a1cc-1780-4c03-b3d2-c536289bcd46",
                        "version": "1.2.4",
                        "package": {
                            "name": "is-callable",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "7324b616-3e5c-0b55-a8ad-b86939f40ece",
                "child_id": "15a50379-da7a-23cb-cd30-00428c17f597",
                "id": "3c911c74-6a8b-425b-81c1-fd439bf5cb7c",
                "child": {
                    "id": "15a50379-da7a-23cb-cd30-00428c17f597",
                    "range": "^1.0.3",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "fd83218a-f47a-4d13-962b-fee83f1cc537",
                    "release": {
                        "id": "fd83218a-f47a-4d13-962b-fee83f1cc537",
                        "version": "1.0.4",
                        "package": {
                            "name": "is-symbol",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "7324b616-3e5c-0b55-a8ad-b86939f40ece",
                "child_id": "0ebeaaf9-8225-2b3a-d596-d9e5592c0d91",
                "id": "253932a1-fa2a-4dbd-af20-86edf8424437",
                "child": {
                    "id": "0ebeaaf9-8225-2b3a-d596-d9e5592c0d91",
                    "range": "^1.0.1",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "37784af4-dc0f-4565-8098-7479e4a8b3df",
                    "release": {
                        "id": "37784af4-dc0f-4565-8098-7479e4a8b3df",
                        "version": "1.0.5",
                        "package": {
                            "name": "is-date-object",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "68a29834-98db-e1b0-2280-7de6cef44d8a",
                "child_id": "8653054c-b253-b938-adc0-120371f060c6",
                "id": "2f80478e-904e-4d1c-af40-8aae57655c24",
                "child": {
                    "id": "8653054c-b253-b938-adc0-120371f060c6",
                    "range": "^1.1.1",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "f3b4cb0e-627a-4cb1-9d8d-c7f1cd524534",
                    "release": {
                        "id": "f3b4cb0e-627a-4cb1-9d8d-c7f1cd524534",
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
                "parent_id": "34d2338b-46f0-de7f-0b3a-6676e7413e40",
                "child_id": "d3bbaf46-5566-3d34-d798-b79a76fb20ff",
                "id": "d481a58f-f10f-42dd-9bf6-6cb0c07ccf06",
                "child": {
                    "id": "d3bbaf46-5566-3d34-d798-b79a76fb20ff",
                    "range": "^1.0.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "83ffaa65-3412-4bdc-8164-066fcb18b569",
                    "release": {
                        "id": "83ffaa65-3412-4bdc-8164-066fcb18b569",
                        "version": "1.0.0",
                        "package": {
                            "name": "has-tostringtag",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "34d2338b-46f0-de7f-0b3a-6676e7413e40",
                "child_id": "8279937e-18c7-f64d-1638-30d529329e55",
                "id": "dcbd6082-ae2f-424d-8cbb-7cef3b3d2aa1",
                "child": {
                    "id": "8279937e-18c7-f64d-1638-30d529329e55",
                    "range": "^1.0.2",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "e790ff1a-66f6-4939-9623-89e4a4fcefcf",
                    "release": {
                        "id": "e790ff1a-66f6-4939-9623-89e4a4fcefcf",
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
                "parent_id": "30d3f126-8319-cab3-d905-820c2efd4ad9",
                "child_id": "f7bfd560-aec4-dc8e-02ec-622953acdd55",
                "id": "b574e4dc-45d2-4d20-8c17-311a40f5c027",
                "child": {
                    "id": "f7bfd560-aec4-dc8e-02ec-622953acdd55",
                    "range": "^1.1.3",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "0eaa2e51-c011-4845-b29c-88590d0c24c8",
                    "release": {
                        "id": "0eaa2e51-c011-4845-b29c-88590d0c24c8",
                        "version": "1.1.4",
                        "package": {
                            "name": "define-properties",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "30d3f126-8319-cab3-d905-820c2efd4ad9",
                "child_id": "8279937e-18c7-f64d-1638-30d529329e55",
                "id": "1362aae8-7dbc-479d-8322-dc0f9e685179",
                "child": {
                    "id": "8279937e-18c7-f64d-1638-30d529329e55",
                    "range": "^1.0.2",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "e790ff1a-66f6-4939-9623-89e4a4fcefcf",
                    "release": {
                        "id": "e790ff1a-66f6-4939-9623-89e4a4fcefcf",
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
                "parent_id": "30d3f126-8319-cab3-d905-820c2efd4ad9",
                "child_id": "8122f824-913a-3667-3238-7835a3a4f45f",
                "id": "49cefe38-a82e-40d4-8a89-2aada08eb001",
                "child": {
                    "id": "8122f824-913a-3667-3238-7835a3a4f45f",
                    "range": "^1.19.5",
                    "labels": {
                        "scope": "prod",
                        "pruned": "cyclic"
                    },
                    "release_id": "c61412fa-1416-432b-af90-d6f314c3d34c",
                    "release": {
                        "id": "c61412fa-1416-432b-af90-d6f314c3d34c",
                        "version": "1.20.1",
                        "package": {
                            "name": "es-abstract",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "15419174-def2-28ae-aef8-628de3ca2d12",
                "child_id": "e33a5b3b-880e-714a-c4bd-190a49a67f12",
                "id": "5082df1c-2269-49b5-90f9-c04ee66ae227",
                "child": {
                    "id": "e33a5b3b-880e-714a-c4bd-190a49a67f12",
                    "range": "^1.1.1",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "ac9fd55c-7f8e-45c6-82b3-faa6fd56085d",
                    "release": {
                        "id": "ac9fd55c-7f8e-45c6-82b3-faa6fd56085d",
                        "version": "1.1.1",
                        "package": {
                            "name": "get-intrinsic",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "15419174-def2-28ae-aef8-628de3ca2d12",
                "child_id": "74f2e99a-f409-5813-f210-232554f95707",
                "id": "814548f9-3bfe-4280-8cd8-09d7fb366710",
                "child": {
                    "id": "74f2e99a-f409-5813-f210-232554f95707",
                    "range": "^1.0.4",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "9d858ff0-a3a2-4750-bba5-ad82e67f7f82",
                    "release": {
                        "id": "9d858ff0-a3a2-4750-bba5-ad82e67f7f82",
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
                "parent_id": "15419174-def2-28ae-aef8-628de3ca2d12",
                "child_id": "68a29834-98db-e1b0-2280-7de6cef44d8a",
                "id": "586dda7a-e943-4364-b25d-b0cc12bb5ea3",
                "child": {
                    "id": "68a29834-98db-e1b0-2280-7de6cef44d8a",
                    "range": "^1.0.3",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "7d5c8481-43e3-47c1-a6f5-b66de5e34e5e",
                    "release": {
                        "id": "7d5c8481-43e3-47c1-a6f5-b66de5e34e5e",
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
                "parent_id": "1b251bd4-843c-231c-51c3-568bbb438395",
                "child_id": "d08c6198-d865-01fe-f64e-c5e733b8e719",
                "id": "e1d44d1f-01b6-4a75-80dc-6bc0bb4e6369",
                "child": {
                    "id": "d08c6198-d865-01fe-f64e-c5e733b8e719",
                    "range": "^0.1.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "0baadd4a-1faa-402f-bb20-0a815930f275",
                    "release": {
                        "id": "0baadd4a-1faa-402f-bb20-0a815930f275",
                        "version": "0.1.5",
                        "package": {
                            "name": "osenv",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "1b251bd4-843c-231c-51c3-568bbb438395",
                "child_id": "b4a71240-e486-d29d-81dc-8e1e595e480f",
                "id": "8163958c-c264-4d43-84b5-77b2110febbc",
                "child": {
                    "id": "b4a71240-e486-d29d-81dc-8e1e595e480f",
                    "range": "2 || 3 || 4",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "39e64c35-931d-4c1d-bf81-782feff04b56",
                    "release": {
                        "id": "39e64c35-931d-4c1d-bf81-782feff04b56",
                        "version": "4.3.6",
                        "package": {
                            "name": "semver",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "d32467a3-d773-4248-8959-296be4df611d",
                                        "source_id": "GHSA-x6fg-f45m-jf5q",
                                        "source": "ghsa",
                                        "severity_name": null,
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
                "parent_id": "1b251bd4-843c-231c-51c3-568bbb438395",
                "child_id": "ae4d2d55-b56a-58ee-c94e-2e1fa9462680",
                "id": "f7ac8b2a-02c7-4755-97ef-7271d021ce11",
                "child": {
                    "id": "ae4d2d55-b56a-58ee-c94e-2e1fa9462680",
                    "range": "^0.5.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "baadfbde-755c-42f2-998e-0316d739646c",
                    "release": {
                        "id": "baadfbde-755c-42f2-998e-0316d739646c",
                        "version": "0.5.6",
                        "package": {
                            "name": "mkdirp",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "1b251bd4-843c-231c-51c3-568bbb438395",
                "child_id": "8c583972-ffbc-13f7-ff39-e2ebc69df04b",
                "id": "b7a05256-3916-4f89-ba76-46dc5faa29be",
                "child": {
                    "id": "8c583972-ffbc-13f7-ff39-e2ebc69df04b",
                    "range": "0.0.5",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "d4de2b4a-8e48-48ba-a3e8-cd290ea0eabc",
                    "release": {
                        "id": "d4de2b4a-8e48-48ba-a3e8-cd290ea0eabc",
                        "version": "0.0.5",
                        "package": {
                            "name": "uid-number",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "1b251bd4-843c-231c-51c3-568bbb438395",
                "child_id": "716919ab-b47b-76e9-a5f0-63901316e4eb",
                "id": "f16955f1-e483-4ff1-9256-4a24a2661bd8",
                "child": {
                    "id": "716919ab-b47b-76e9-a5f0-63901316e4eb",
                    "range": "^5.1.2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "ba8ee851-4d69-47d7-b6bf-a1f45525bad8",
                    "release": {
                        "id": "ba8ee851-4d69-47d7-b6bf-a1f45525bad8",
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
                "parent_id": "1b251bd4-843c-231c-51c3-568bbb438395",
                "child_id": "48b522b9-45b0-0efb-9269-9de40666cee0",
                "id": "ca719caa-5e08-4381-a7f5-d3cb2c14633f",
                "child": {
                    "id": "48b522b9-45b0-0efb-9269-9de40666cee0",
                    "range": "^2.0.3",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "47eeabb9-0f9c-42ac-933c-0e1fe5154350",
                    "release": {
                        "id": "47eeabb9-0f9c-42ac-933c-0e1fe5154350",
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
                "parent_id": "1b251bd4-843c-231c-51c3-568bbb438395",
                "child_id": "3d9af5e9-4e06-0d2b-027b-ab0f64accd99",
                "id": "7b61545e-032a-48f0-ac4a-a4dfa9ed6de3",
                "child": {
                    "id": "3d9af5e9-4e06-0d2b-027b-ab0f64accd99",
                    "range": "~3.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "a17e9c63-52d9-4ba2-8489-825ce00aba69",
                    "release": {
                        "id": "a17e9c63-52d9-4ba2-8489-825ce00aba69",
                        "version": "3.0.6",
                        "package": {
                            "name": "nopt",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "1b251bd4-843c-231c-51c3-568bbb438395",
                "child_id": "3328e082-3246-b76b-77f4-ea3bbd350152",
                "id": "17e96198-c4f4-4232-95bd-6288b410f657",
                "child": {
                    "id": "3328e082-3246-b76b-77f4-ea3bbd350152",
                    "range": "^1.2.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "61280dd9-1fac-45a1-b4df-deed1dfcb4f2",
                    "release": {
                        "id": "61280dd9-1fac-45a1-b4df-deed1dfcb4f2",
                        "version": "1.3.8",
                        "package": {
                            "name": "ini",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "fac86470-c019-4438-aff5-271d3a72d49e",
                                        "source_id": "GHSA-qqgx-2p2h-9c37",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": 7.3,
                                        "summary": "ini before 1.3.6 vulnerable to Prototype Pollution via ini.parse",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "1.3.6"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "1b251bd4-843c-231c-51c3-568bbb438395",
                "child_id": "275b3ddc-54e6-aa55-566b-c195a07d02a1",
                "id": "d261ccd0-e976-4da2-ae10-1b99e4c6286a",
                "child": {
                    "id": "275b3ddc-54e6-aa55-566b-c195a07d02a1",
                    "range": "~1.3.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "603cba83-295c-4081-bdda-e5ec872943f8",
                    "release": {
                        "id": "603cba83-295c-4081-bdda-e5ec872943f8",
                        "version": "1.3.3",
                        "package": {
                            "name": "once",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "1b251bd4-843c-231c-51c3-568bbb438395",
                "child_id": "086e110d-21ff-8fae-4434-9f377d3cb150",
                "id": "e783eb2b-a51b-440b-8273-c7ccc9dc25b3",
                "child": {
                    "id": "086e110d-21ff-8fae-4434-9f377d3cb150",
                    "range": "~1.1.8",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "25ef037e-be97-433b-9e2d-802954720cd1",
                    "release": {
                        "id": "25ef037e-be97-433b-9e2d-802954720cd1",
                        "version": "1.1.13",
                        "package": {
                            "name": "config-chain",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "a2de94a0-82ff-6cb9-fbee-44a5376a2b40",
                "child_id": "81d4f145-f02f-e590-8f9a-ce8cde553daf",
                "id": "d9ff19e8-ba03-4038-94c4-e5943ded25eb",
                "child": {
                    "id": "81d4f145-f02f-e590-8f9a-ce8cde553daf",
                    "range": "~2.0.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "30944671-2d2b-4c74-b935-6d86b125028a",
                    "release": {
                        "id": "30944671-2d2b-4c74-b935-6d86b125028a",
                        "version": "2.0.1",
                        "package": {
                            "name": "es6-symbol",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "a2de94a0-82ff-6cb9-fbee-44a5376a2b40",
                "child_id": "41b6cee6-7ea2-a259-1c34-21a4ac27ec9c",
                "id": "9046c237-6e00-4651-80b9-18361e8a4eab",
                "child": {
                    "id": "41b6cee6-7ea2-a259-1c34-21a4ac27ec9c",
                    "range": "~0.10.6",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "32343700-7615-4411-a42c-b6cf126c91f1",
                    "release": {
                        "id": "32343700-7615-4411-a42c-b6cf126c91f1",
                        "version": "0.10.61",
                        "package": {
                            "name": "es5-ext",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "a2de94a0-82ff-6cb9-fbee-44a5376a2b40",
                "child_id": "26ff2323-b012-f4bb-0092-f62303e66fcd",
                "id": "e0fd0362-7e15-400d-956a-87e8c0a8bd10",
                "child": {
                    "id": "26ff2323-b012-f4bb-0092-f62303e66fcd",
                    "range": "~0.1.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "ce61a9d1-f0f7-401f-b982-b937227501d8",
                    "release": {
                        "id": "ce61a9d1-f0f7-401f-b982-b937227501d8",
                        "version": "0.1.1",
                        "package": {
                            "name": "d",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "81d4f145-f02f-e590-8f9a-ce8cde553daf",
                "child_id": "41b6cee6-7ea2-a259-1c34-21a4ac27ec9c",
                "id": "8ca462ef-e2b0-4a66-a876-f7541b5a0e38",
                "child": {
                    "id": "41b6cee6-7ea2-a259-1c34-21a4ac27ec9c",
                    "range": "~0.10.6",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "32343700-7615-4411-a42c-b6cf126c91f1",
                    "release": {
                        "id": "32343700-7615-4411-a42c-b6cf126c91f1",
                        "version": "0.10.61",
                        "package": {
                            "name": "es5-ext",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "81d4f145-f02f-e590-8f9a-ce8cde553daf",
                "child_id": "26ff2323-b012-f4bb-0092-f62303e66fcd",
                "id": "56a34cd3-ed54-4f1a-bb7e-dbee61d527d9",
                "child": {
                    "id": "26ff2323-b012-f4bb-0092-f62303e66fcd",
                    "range": "~0.1.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "ce61a9d1-f0f7-401f-b982-b937227501d8",
                    "release": {
                        "id": "ce61a9d1-f0f7-401f-b982-b937227501d8",
                        "version": "0.1.1",
                        "package": {
                            "name": "d",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "fb73671a-f694-89b5-a120-283cf8b4ab42",
                "child_id": "bd0dd84b-61b4-81dc-01aa-edd8dbc94799",
                "id": "b25793c3-cbc7-4312-b561-f93db9724f58",
                "child": {
                    "id": "bd0dd84b-61b4-81dc-01aa-edd8dbc94799",
                    "range": "^1.0.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "6af68f4c-6510-4690-a87a-4c8314d3b513",
                    "release": {
                        "id": "6af68f4c-6510-4690-a87a-4c8314d3b513",
                        "version": "1.2.0",
                        "package": {
                            "name": "type",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "fb73671a-f694-89b5-a120-283cf8b4ab42",
                "child_id": "41b6cee6-7ea2-a259-1c34-21a4ac27ec9c",
                "id": "70b49b07-0e15-46b4-bfe7-f14e90cafea2",
                "child": {
                    "id": "41b6cee6-7ea2-a259-1c34-21a4ac27ec9c",
                    "range": "~0.10.6",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "32343700-7615-4411-a42c-b6cf126c91f1",
                    "release": {
                        "id": "32343700-7615-4411-a42c-b6cf126c91f1",
                        "version": "0.10.61",
                        "package": {
                            "name": "es5-ext",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "ce933983-1fac-662e-0e12-e2c4b8ea2b0a",
                "child_id": "67af9a72-e109-7b07-79c9-b81c524c7a28",
                "id": "56a2a1c5-6588-4020-9035-5a5f3b124994",
                "child": {
                    "id": "67af9a72-e109-7b07-79c9-b81c524c7a28",
                    "range": "^1.0.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "59912bf1-f5e9-454b-9998-57e8fd53cfb6",
                    "release": {
                        "id": "59912bf1-f5e9-454b-9998-57e8fd53cfb6",
                        "version": "1.0.1",
                        "package": {
                            "name": "d",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "ce933983-1fac-662e-0e12-e2c4b8ea2b0a",
                "child_id": "307058d5-d072-c6ea-d13b-fe26e59d8cd8",
                "id": "b0aae638-2e11-41c1-81d2-39c674356a8a",
                "child": {
                    "id": "307058d5-d072-c6ea-d13b-fe26e59d8cd8",
                    "range": "^1.1.2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "ce506823-053c-496f-8f13-6592ccac9348",
                    "release": {
                        "id": "ce506823-053c-496f-8f13-6592ccac9348",
                        "version": "1.6.0",
                        "package": {
                            "name": "ext",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "025b2ca6-6a0c-4162-a71d-fff2f997c3a7",
                "child_id": "bd0dd84b-61b4-81dc-01aa-edd8dbc94799",
                "id": "6de20a5d-55cd-4c78-85cb-6ce55b4c7cc8",
                "child": {
                    "id": "bd0dd84b-61b4-81dc-01aa-edd8dbc94799",
                    "range": "^1.0.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "6af68f4c-6510-4690-a87a-4c8314d3b513",
                    "release": {
                        "id": "6af68f4c-6510-4690-a87a-4c8314d3b513",
                        "version": "1.2.0",
                        "package": {
                            "name": "type",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "025b2ca6-6a0c-4162-a71d-fff2f997c3a7",
                "child_id": "45a36aa8-77cb-4e00-3c77-75299b7df808",
                "id": "ea4197f9-d0e8-4020-8653-40feee7d16eb",
                "child": {
                    "id": "45a36aa8-77cb-4e00-3c77-75299b7df808",
                    "range": "^0.10.50",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "32343700-7615-4411-a42c-b6cf126c91f1",
                    "release": {
                        "id": "32343700-7615-4411-a42c-b6cf126c91f1",
                        "version": "0.10.61",
                        "package": {
                            "name": "es5-ext",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "67af9a72-e109-7b07-79c9-b81c524c7a28",
                "child_id": "bd0dd84b-61b4-81dc-01aa-edd8dbc94799",
                "id": "f8e69e40-900e-4041-9be9-3ec1e2d24ab7",
                "child": {
                    "id": "bd0dd84b-61b4-81dc-01aa-edd8dbc94799",
                    "range": "^1.0.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "6af68f4c-6510-4690-a87a-4c8314d3b513",
                    "release": {
                        "id": "6af68f4c-6510-4690-a87a-4c8314d3b513",
                        "version": "1.2.0",
                        "package": {
                            "name": "type",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "67af9a72-e109-7b07-79c9-b81c524c7a28",
                "child_id": "45a36aa8-77cb-4e00-3c77-75299b7df808",
                "id": "66769172-496a-424d-8766-aeb80c36c60e",
                "child": {
                    "id": "45a36aa8-77cb-4e00-3c77-75299b7df808",
                    "range": "^0.10.50",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "32343700-7615-4411-a42c-b6cf126c91f1",
                    "release": {
                        "id": "32343700-7615-4411-a42c-b6cf126c91f1",
                        "version": "0.10.61",
                        "package": {
                            "name": "es5-ext",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "307058d5-d072-c6ea-d13b-fe26e59d8cd8",
                "child_id": "11f76a9d-9065-7180-c7f7-590b83647fa1",
                "id": "6b2401dc-3547-4567-86af-6e3837051031",
                "child": {
                    "id": "11f76a9d-9065-7180-c7f7-590b83647fa1",
                    "range": "^2.5.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "2beac7cd-0d3b-420a-8262-70f93040abc4",
                    "release": {
                        "id": "2beac7cd-0d3b-420a-8262-70f93040abc4",
                        "version": "2.6.0",
                        "package": {
                            "name": "type",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "d4124e53-95e8-45a5-b888-335006073f1a",
                "child_id": "97789db0-1829-0fc9-0cee-5c45dd5fc495",
                "id": "8f5cb37b-e228-4611-aa02-b1a6a6c15f66",
                "child": {
                    "id": "97789db0-1829-0fc9-0cee-5c45dd5fc495",
                    "range": "^2.0.2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "15679d7c-382b-4225-8381-442d453b71f9",
                    "release": {
                        "id": "15679d7c-382b-4225-8381-442d453b71f9",
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
                "parent_id": "d39fdbe4-b054-e593-f22d-2370a7056651",
                "child_id": "5a39475a-bad8-c1de-3698-7d28ed408725",
                "id": "b81db054-f38a-4f10-8274-7a68a2434e8a",
                "child": {
                    "id": "5a39475a-bad8-c1de-3698-7d28ed408725",
                    "range": "~0.14.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "3aaec921-44da-412b-9a2b-2c0548e0651c",
                    "release": {
                        "id": "3aaec921-44da-412b-9a2b-2c0548e0651c",
                        "version": "0.14.5",
                        "package": {
                            "name": "tweetnacl",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "c159377a-ae9c-205a-705e-a09c1590b24a",
                "child_id": "5cd13594-236b-3745-b6da-230c776cc993",
                "id": "929b29ac-7be3-4148-904c-af25d417d352",
                "child": {
                    "id": "5cd13594-236b-3745-b6da-230c776cc993",
                    "range": "^1.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "7cded6f4-9988-4c84-a132-547d426f0958",
                    "release": {
                        "id": "7cded6f4-9988-4c84-a132-547d426f0958",
                        "version": "1.0.0",
                        "package": {
                            "name": "assert-plus",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "3edb66ce-cd4f-5052-e73e-6c62a3cfe2f5",
                "child_id": "5cd13594-236b-3745-b6da-230c776cc993",
                "id": "199bf3b6-f93b-4131-9ee3-3a32b9044558",
                "child": {
                    "id": "5cd13594-236b-3745-b6da-230c776cc993",
                    "range": "^1.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "7cded6f4-9988-4c84-a132-547d426f0958",
                    "release": {
                        "id": "7cded6f4-9988-4c84-a132-547d426f0958",
                        "version": "1.0.0",
                        "package": {
                            "name": "assert-plus",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "33fd8a13-a34d-2464-355c-3aea7006f588",
                "child_id": "97789db0-1829-0fc9-0cee-5c45dd5fc495",
                "id": "7b4dafdb-9842-4aaa-9212-db73d4a4461c",
                "child": {
                    "id": "97789db0-1829-0fc9-0cee-5c45dd5fc495",
                    "range": "^2.0.2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "15679d7c-382b-4225-8381-442d453b71f9",
                    "release": {
                        "id": "15679d7c-382b-4225-8381-442d453b71f9",
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
                "parent_id": "33fd8a13-a34d-2464-355c-3aea7006f588",
                "child_id": "14e96705-eaa3-aea8-9b74-19e9690ff233",
                "id": "a52863ab-46a3-4950-ac8e-20c0241b639c",
                "child": {
                    "id": "14e96705-eaa3-aea8-9b74-19e9690ff233",
                    "range": "~0.1.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "8405d021-961e-4119-aa19-5873855ef373",
                    "release": {
                        "id": "8405d021-961e-4119-aa19-5873855ef373",
                        "version": "0.1.1",
                        "package": {
                            "name": "jsbn",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "dbfdbdb6-58e6-15d3-92cf-4db845ac67ce",
                "child_id": "f7b6d9de-ff7b-e98c-4fe4-76ffec639001",
                "id": "ec1fec5f-97fb-488e-9db7-02d5341eb3bd",
                "child": {
                    "id": "f7b6d9de-ff7b-e98c-4fe4-76ffec639001",
                    "range": "1.0.2",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "93da1129-092d-42ba-a486-927d8db41cff",
                    "release": {
                        "id": "93da1129-092d-42ba-a486-927d8db41cff",
                        "version": "1.0.2",
                        "package": {
                            "name": "core-util-is",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "dbfdbdb6-58e6-15d3-92cf-4db845ac67ce",
                "child_id": "ea367258-7357-9de8-063d-2771f3b387bd",
                "id": "8277eb28-6797-487c-a2ca-717d5f8d2d46",
                "child": {
                    "id": "ea367258-7357-9de8-063d-2771f3b387bd",
                    "range": "^1.2.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "87a2ed6a-7ac4-4a9b-94de-fd5116b9b87b",
                    "release": {
                        "id": "87a2ed6a-7ac4-4a9b-94de-fd5116b9b87b",
                        "version": "1.4.1",
                        "package": {
                            "name": "extsprintf",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "dbfdbdb6-58e6-15d3-92cf-4db845ac67ce",
                "child_id": "5cd13594-236b-3745-b6da-230c776cc993",
                "id": "fd17635b-6d7e-4b3e-b830-dfe03ac619cb",
                "child": {
                    "id": "5cd13594-236b-3745-b6da-230c776cc993",
                    "range": "^1.0.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "7cded6f4-9988-4c84-a132-547d426f0958",
                    "release": {
                        "id": "7cded6f4-9988-4c84-a132-547d426f0958",
                        "version": "1.0.0",
                        "package": {
                            "name": "assert-plus",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "2aa96892-1aa1-d40f-e5fc-a4518accecc3",
                "child_id": "3d5031ec-bcba-9ee3-b9f4-4fb03bd5c547",
                "id": "01f07dfb-56da-47f7-a40b-87ebeafb41f4",
                "child": {
                    "id": "3d5031ec-bcba-9ee3-b9f4-4fb03bd5c547",
                    "range": ">=0.2.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "b8b18735-f344-4f49-9315-0353c1b5cb4b",
                    "release": {
                        "id": "b8b18735-f344-4f49-9315-0353c1b5cb4b",
                        "version": "2.1.1",
                        "package": {
                            "name": "punycode",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "f7bfd560-aec4-dc8e-02ec-622953acdd55",
                "child_id": "ff5867e5-d679-0457-19fb-13c4c8e7a1ae",
                "id": "e5c7eba2-504b-4291-822f-5fae9cd5af66",
                "child": {
                    "id": "ff5867e5-d679-0457-19fb-13c4c8e7a1ae",
                    "range": "^1.0.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "1d72f49c-7987-4b6b-8f1a-29fe3b578413",
                    "release": {
                        "id": "1d72f49c-7987-4b6b-8f1a-29fe3b578413",
                        "version": "1.0.0",
                        "package": {
                            "name": "has-property-descriptors",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "f7bfd560-aec4-dc8e-02ec-622953acdd55",
                "child_id": "075177d2-bc44-8a39-f3fb-200c7bdd35fa",
                "id": "2917a6ed-faef-47f2-84ae-9ffa4ccfdafc",
                "child": {
                    "id": "075177d2-bc44-8a39-f3fb-200c7bdd35fa",
                    "range": "^1.1.1",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "e1fdc48f-114b-42c8-b90c-479ee772a1c6",
                    "release": {
                        "id": "e1fdc48f-114b-42c8-b90c-479ee772a1c6",
                        "version": "1.1.1",
                        "package": {
                            "name": "object-keys",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "c776df17-e4eb-4bc5-64c4-84874419724a",
                "child_id": "faf1df2e-aedf-1368-2870-afdded73108d",
                "id": "ba25eb8a-2cc5-41d0-9893-9f5a7893ca70",
                "child": {
                    "id": "faf1df2e-aedf-1368-2870-afdded73108d",
                    "range": "^1.0.7",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "f74118cb-fe25-4fb8-ae71-c7e1d7645826",
                    "release": {
                        "id": "f74118cb-fe25-4fb8-ae71-c7e1d7645826",
                        "version": "1.0.7",
                        "package": {
                            "name": "is-string",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "c776df17-e4eb-4bc5-64c4-84874419724a",
                "child_id": "69a745c3-92e9-2fb9-6d8f-95507b64982b",
                "id": "5e845a89-210f-4611-9c92-dd8994e75a99",
                "child": {
                    "id": "69a745c3-92e9-2fb9-6d8f-95507b64982b",
                    "range": "^1.1.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "562d6cdd-2f35-4a3a-8570-6d18a7d1b9c7",
                    "release": {
                        "id": "562d6cdd-2f35-4a3a-8570-6d18a7d1b9c7",
                        "version": "1.1.2",
                        "package": {
                            "name": "is-boolean-object",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "c776df17-e4eb-4bc5-64c4-84874419724a",
                "child_id": "686c4201-66e6-26c9-72f1-503f2f11158a",
                "id": "a060e94b-3916-408f-9baa-05b33139ff68",
                "child": {
                    "id": "686c4201-66e6-26c9-72f1-503f2f11158a",
                    "range": "^1.0.1",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "94521bdc-86ba-42b7-a1dc-3aa52bdf3e9a",
                    "release": {
                        "id": "94521bdc-86ba-42b7-a1dc-3aa52bdf3e9a",
                        "version": "1.0.4",
                        "package": {
                            "name": "is-bigint",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "c776df17-e4eb-4bc5-64c4-84874419724a",
                "child_id": "15a50379-da7a-23cb-cd30-00428c17f597",
                "id": "2b9eab80-dc67-4e8f-9188-89c2c600b6f5",
                "child": {
                    "id": "15a50379-da7a-23cb-cd30-00428c17f597",
                    "range": "^1.0.3",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "fd83218a-f47a-4d13-962b-fee83f1cc537",
                    "release": {
                        "id": "fd83218a-f47a-4d13-962b-fee83f1cc537",
                        "version": "1.0.4",
                        "package": {
                            "name": "is-symbol",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "c776df17-e4eb-4bc5-64c4-84874419724a",
                "child_id": "1310ee44-ed5d-88d9-7694-053c9e89ed22",
                "id": "1f898191-e868-4d59-9688-be67f2ce7fcc",
                "child": {
                    "id": "1310ee44-ed5d-88d9-7694-053c9e89ed22",
                    "range": "^1.0.4",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "79e4feb5-6bd6-4423-bada-e07c0264229d",
                    "release": {
                        "id": "79e4feb5-6bd6-4423-bada-e07c0264229d",
                        "version": "1.0.7",
                        "package": {
                            "name": "is-number-object",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "15a50379-da7a-23cb-cd30-00428c17f597",
                "child_id": "82fb7d93-be69-6f6a-e4f1-1056f2ba7a4e",
                "id": "6629a5f8-016d-4c7e-8677-2971ef4a2673",
                "child": {
                    "id": "82fb7d93-be69-6f6a-e4f1-1056f2ba7a4e",
                    "range": "^1.0.3",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "6dfd68d4-47a1-4a89-aa51-703866ab1308",
                    "release": {
                        "id": "6dfd68d4-47a1-4a89-aa51-703866ab1308",
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
                "parent_id": "0ebeaaf9-8225-2b3a-d596-d9e5592c0d91",
                "child_id": "d3bbaf46-5566-3d34-d798-b79a76fb20ff",
                "id": "a5164736-c29e-4d58-80b5-38710beeed03",
                "child": {
                    "id": "d3bbaf46-5566-3d34-d798-b79a76fb20ff",
                    "range": "^1.0.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "83ffaa65-3412-4bdc-8164-066fcb18b569",
                    "release": {
                        "id": "83ffaa65-3412-4bdc-8164-066fcb18b569",
                        "version": "1.0.0",
                        "package": {
                            "name": "has-tostringtag",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "74f2e99a-f409-5813-f210-232554f95707",
                "child_id": "fb4d98d7-4a49-675f-4d4e-4bf1a1a30e6b",
                "id": "859daa63-907a-4415-8475-15530caeb70b",
                "child": {
                    "id": "fb4d98d7-4a49-675f-4d4e-4bf1a1a30e6b",
                    "range": "^1.12.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "d3d8d0c6-eb90-4b18-95e4-b706b978c9e4",
                    "release": {
                        "id": "d3d8d0c6-eb90-4b18-95e4-b706b978c9e4",
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
                "parent_id": "74f2e99a-f409-5813-f210-232554f95707",
                "child_id": "e33a5b3b-880e-714a-c4bd-190a49a67f12",
                "id": "96b2eab0-b482-4377-a064-835dca452c5b",
                "child": {
                    "id": "e33a5b3b-880e-714a-c4bd-190a49a67f12",
                    "range": "^1.1.1",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "ac9fd55c-7f8e-45c6-82b3-faa6fd56085d",
                    "release": {
                        "id": "ac9fd55c-7f8e-45c6-82b3-faa6fd56085d",
                        "version": "1.1.1",
                        "package": {
                            "name": "get-intrinsic",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "74f2e99a-f409-5813-f210-232554f95707",
                "child_id": "8279937e-18c7-f64d-1638-30d529329e55",
                "id": "b143d91f-5484-464e-aadc-645d24860f4a",
                "child": {
                    "id": "8279937e-18c7-f64d-1638-30d529329e55",
                    "range": "^1.0.2",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "e790ff1a-66f6-4939-9623-89e4a4fcefcf",
                    "release": {
                        "id": "e790ff1a-66f6-4939-9623-89e4a4fcefcf",
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
                "parent_id": "086e110d-21ff-8fae-4434-9f377d3cb150",
                "child_id": "d6a2ff56-8f87-dc23-519b-23bcd02999af",
                "id": "20e2b265-fb7b-4625-98b5-d001db03d124",
                "child": {
                    "id": "d6a2ff56-8f87-dc23-519b-23bcd02999af",
                    "range": "~1.2.1",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "478f8a85-a42b-46b5-9324-2f91872c3791",
                    "release": {
                        "id": "478f8a85-a42b-46b5-9324-2f91872c3791",
                        "version": "1.2.4",
                        "package": {
                            "name": "proto-list",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "086e110d-21ff-8fae-4434-9f377d3cb150",
                "child_id": "3328e082-3246-b76b-77f4-ea3bbd350152",
                "id": "73542784-6b96-495b-9309-5aa6cf33c228",
                "child": {
                    "id": "3328e082-3246-b76b-77f4-ea3bbd350152",
                    "range": "^1.2.0",
                    "labels": {
                        "scope": "dev"
                    },
                    "release_id": "61280dd9-1fac-45a1-b4df-deed1dfcb4f2",
                    "release": {
                        "id": "61280dd9-1fac-45a1-b4df-deed1dfcb4f2",
                        "version": "1.3.8",
                        "package": {
                            "name": "ini",
                            "package_manager": "npm",
                            "affected_by_vulnerability": [
                                {
                                    "vulnerability": {
                                        "id": "fac86470-c019-4438-aff5-271d3a72d49e",
                                        "source_id": "GHSA-qqgx-2p2h-9c37",
                                        "source": "ghsa",
                                        "severity_name": "High",
                                        "cvss_score": 7.3,
                                        "summary": "ini before 1.3.6 vulnerable to Prototype Pollution via ini.parse",
                                        "guide_vulnerabilities": []
                                    },
                                    "ranges": [
                                        {
                                            "introduced": "0.0.0",
                                            "fixed": "1.3.6"
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            {
                "parent_id": "69a745c3-92e9-2fb9-6d8f-95507b64982b",
                "child_id": "d3bbaf46-5566-3d34-d798-b79a76fb20ff",
                "id": "0f3b2c9b-2cb7-4be7-b859-4567a3a65cab",
                "child": {
                    "id": "d3bbaf46-5566-3d34-d798-b79a76fb20ff",
                    "range": "^1.0.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "83ffaa65-3412-4bdc-8164-066fcb18b569",
                    "release": {
                        "id": "83ffaa65-3412-4bdc-8164-066fcb18b569",
                        "version": "1.0.0",
                        "package": {
                            "name": "has-tostringtag",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "69a745c3-92e9-2fb9-6d8f-95507b64982b",
                "child_id": "8279937e-18c7-f64d-1638-30d529329e55",
                "id": "a0f2df80-cdee-4567-85a5-5954fec3b8b8",
                "child": {
                    "id": "8279937e-18c7-f64d-1638-30d529329e55",
                    "range": "^1.0.2",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "e790ff1a-66f6-4939-9623-89e4a4fcefcf",
                    "release": {
                        "id": "e790ff1a-66f6-4939-9623-89e4a4fcefcf",
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
                "parent_id": "686c4201-66e6-26c9-72f1-503f2f11158a",
                "child_id": "50afbc75-bd6c-a690-f705-4ca69cfb785b",
                "id": "3a4511f0-0b58-478a-9b63-fa24b44d99ab",
                "child": {
                    "id": "50afbc75-bd6c-a690-f705-4ca69cfb785b",
                    "range": "^1.0.2",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "b44bf444-adfd-4d4a-a6a2-9f18001cf2d3",
                    "release": {
                        "id": "b44bf444-adfd-4d4a-a6a2-9f18001cf2d3",
                        "version": "1.0.2",
                        "package": {
                            "name": "has-bigints",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            },
            {
                "parent_id": "1310ee44-ed5d-88d9-7694-053c9e89ed22",
                "child_id": "d3bbaf46-5566-3d34-d798-b79a76fb20ff",
                "id": "83942fd2-1c97-4ce8-ae97-656ee9382b6c",
                "child": {
                    "id": "d3bbaf46-5566-3d34-d798-b79a76fb20ff",
                    "range": "^1.0.0",
                    "labels": {
                        "scope": "prod"
                    },
                    "release_id": "83ffaa65-3412-4bdc-8164-066fcb18b569",
                    "release": {
                        "id": "83ffaa65-3412-4bdc-8164-066fcb18b569",
                        "version": "1.0.0",
                        "package": {
                            "name": "has-tostringtag",
                            "package_manager": "npm",
                            "affected_by_vulnerability": []
                        }
                    }
                }
            }
        ]
    }
]
