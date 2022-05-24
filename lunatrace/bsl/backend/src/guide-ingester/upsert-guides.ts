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
import process from 'process';

import { hasura } from '../hasura-api';
import {
  Guide_Related_Guides_Constraint,
  Guide_Vulnerabilities_Constraint,
  Guides_Insert_Input,
} from '../hasura-api/generated';
import { log } from '../utils/log';

import { readGuidesFromFolder } from './read-guides-from-folder';
import { Guide } from './types';

export async function upsertGuides() {
  const guidesPath = process.argv[2];
  if (!guidesPath) {
    log.error('must pass a path to the guides folder as first argument');
    return;
  }
  log.info('reading guides from folder passed from command line: ', guidesPath);
  const guideData = readGuidesFromFolder(guidesPath);
  const insertGuides: Guides_Insert_Input[] = [];
  await Promise.all(
    guideData.map(async (t) => {
      const hasuraGuide = await buildGuideWithRelations(t);
      if (hasuraGuide) {
        insertGuides.push(hasuraGuide);
      }
    })
  );

  const response = await hasura.UpsertGuides({ objects: insertGuides });
  log.log({ response }, 'donzezo');
}

async function buildGuideWithRelations(guide: Guide): Promise<Guides_Insert_Input | false> {
  const newGuide: Guides_Insert_Input = convertGuidesToHasuraFormat(guide);
  const vulns = await buildGuideVulnerabilities(guide.metadata.cves);
  if (!vulns) {
    return false;
  }
  newGuide.guide_vulnerabilities = vulns;
  newGuide.related_guides = buildRelatedGuides(guide.metadata.relatedGuides);
  log.info({ newGuide }, 'generated hasura formatting guide ');
  return newGuide;
}

// Turns the base fields for the guide into a hasura-friendly object but doesn't build any relationships
function convertGuidesToHasuraFormat(guide: Guide): Guides_Insert_Input {
  return {
    guide_unique_id: guide.guide_unique_id,

    body: guide.body,
    title: guide.metadata.name,
    metadata: guide.metadata,
    metadata_schema_version: guide.metadata.schemaVersion,
    severity: guide.metadata.severity,
    summary: guide.metadata.summary,
    tags: toPostgresArray(guide.metadata.tags),
    data_source_link: guide.guide_unique_id, // stubbed for now, make it a link
  };
}

// builds the vuln join table
// the caveat here is that if any relations are deleted from the metadata,
// they won't be cleared from the DB and will need to be cleared manually
async function buildGuideVulnerabilities(
  cves: Guide['metadata']['cves']
): Promise<Guides_Insert_Input['guide_vulnerabilities'] | false> {
  const vulnQuery = await hasura.GetVulnerabilitiesByCve({ cves });
  const vulns = vulnQuery.vulnerabilities;
  if (!vulns) {
    log.error({ vulnQuery }, 'Error fetching vulnerability IDs');
    return false;
  }
  return {
    on_conflict: { constraint: Guide_Vulnerabilities_Constraint.GuideVulnerabilitiesUnique, update_columns: [] },
    data: vulns.map((vuln) => {
      return {
        vulnerability_id: vuln.id,
      };
    }),
  };
}

// builds the self join table
function buildRelatedGuides(relatedNames: Guide['metadata']['relatedGuides']): Guides_Insert_Input['related_guides'] {
  return {
    on_conflict: { constraint: Guide_Related_Guides_Constraint.GuideRelatedGuidesUnique, update_columns: [] },
    data: relatedNames.map((r) => {
      return {
        to_guide_unique_id: r,
      };
    }),
  };
}

// Hasura array support is super, super awful, so you have to format arrays as postgres literals
function toPostgresArray(arr: string[]): string {
  const joined = arr.join(' ,');
  return `{ ${joined} }`;
}
