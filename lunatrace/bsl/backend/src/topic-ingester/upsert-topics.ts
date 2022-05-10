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
  Topic_Related_Topics_Constraint,
  Topic_Vulnerabilities_Constraint,
  Topics_Insert_Input,
} from '../hasura-api/generated';
import { log } from '../utils/log';

import { readTopicsFromFolder } from './read-topics-from-folder';
import { Topic } from './types';

export async function upsertTopics() {
  const topicsPath = process.argv[2];
  if (!topicsPath) {
    log.error('must pass a path to the topics folder as first argument');
    return;
  }
  log.info('reading topics from folder passed from command line: ', topicsPath);
  const topicData = readTopicsFromFolder(topicsPath);
  const insertTopics: Topics_Insert_Input[] = [];
  await Promise.all(
    topicData.map(async (t) => {
      const hasuraTopic = await buildTopicWithRelations(t);
      if (hasuraTopic) {
        insertTopics.push(hasuraTopic);
      }
    })
  );

  const response = await hasura.UpsertTopics({ objects: insertTopics });
  log.log({ response }, 'donzezo');
}

async function buildTopicWithRelations(topic: Topic): Promise<Topics_Insert_Input | false> {
  const newTopic: Topics_Insert_Input = convertTopicsToHasuraFormat(topic);
  const vulns = await buildTopicVulnerabilities(topic.metadata.cves);
  if (!vulns) {
    return false;
  }
  newTopic.topic_vulnerabilities = vulns;
  newTopic.related_topics = buildRelatedTopics(topic.metadata.relatedTopics);
  log.info({ newTopic }, 'generated hasura formatting topic ');
  return newTopic;
}

// Turns the base fields for the topic into a hasura-friendly object but doesn't build any relationships
function convertTopicsToHasuraFormat(topic: Topic): Topics_Insert_Input {
  return {
    topic_unique_id: topic.topic_unique_id,
    body: topic.body,
    title: topic.metadata.name,
    metadata: topic.metadata,
    metadata_schema_version: topic.metadata.schemaVersion,
    summary: topic.metadata.summary,
    tags: toPostgresArray(topic.metadata.tags),
    data_source_link: topic.topic_unique_id, // stubbed for now, make it a link
  };
}

// builds the vuln join table
// the caveat here is that if any relations are deleted from the metadata,
// they won't be cleared from the DB and will need to be cleared manually
async function buildTopicVulnerabilities(
  cves: Topic['metadata']['cves']
): Promise<Topics_Insert_Input['topic_vulnerabilities'] | false> {
  const vulnQuery = await hasura.GetVulnerabilitiesByCve({ cves });
  const vulns = vulnQuery.vulnerabilities;
  if (!vulns) {
    log.error({ vulnQuery }, 'Error fetching vulnerability IDs');
    return false;
  }
  return {
    on_conflict: { constraint: Topic_Vulnerabilities_Constraint.TopicVulnerabilitiesUnique, update_columns: [] },
    data: vulns.map((vuln) => {
      return {
        vulnerability_id: vuln.id,
      };
    }),
  };
}

// builds the self join table
function buildRelatedTopics(relatedNames: Topic['metadata']['relatedTopics']): Topics_Insert_Input['related_topics'] {
  return {
    on_conflict: { constraint: Topic_Related_Topics_Constraint.TopicRelatedTopicsUnique, update_columns: [] },
    data: relatedNames.map((r) => {
      return {
        to_topic_unique_id: r,
      };
    }),
  };
}

// Hasura array support is not great, you have to format arrays as postgres literals
function toPostgresArray(arr: string[]): string {
  const joined = arr.join(' ,');
  return `{ ${joined} }`;
}
