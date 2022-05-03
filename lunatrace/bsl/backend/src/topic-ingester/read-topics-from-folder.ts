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
import fs from 'fs';
import path from 'path';

import { TopicMetadata1 } from '@lunatrace/lunatrace-common';
import yaml from 'js-yaml';

import { log } from '../utils/log';

import { Convert as Convert1 } from './schemas/generated-schema-1-validator';
import { Topic } from './types';

interface TopicMetadataWithSchema {
  schemaVersion: number;
  [x: string | number | symbol]: unknown;
}

export function readTopicsFromFolder(topicsFolder: string): Topic[] {
  const topicsPath = path.resolve(topicsFolder);
  const contents = fs.readdirSync(topicsPath);
  const topics: Topic[] = [];
  contents.forEach((topicFolderName) => {
    const topicPath = path.join(topicsPath, topicFolderName);
    log.info('reading topic from folder ', topicPath);

    if (fs.statSync(topicPath).isDirectory()) {
      const topic = parseTopic(topicPath, topicFolderName);
      if (topic) {
        topics.push(topic);
      }
    }
  });
  log.info({ topics }, 'read topics');
  return topics;
}

function parseTopic(topicPath: string, topicFolderName: string): Topic | void {
  const topicContents = fs.readdirSync(topicPath);
  if (!topicHasCorrectFiles(topicContents)) {
    log.error(
      { topicPath, topicContents },
      'Folder in topics missing required files to be a valid topic, skipping topic'
    );
    return;
  }
  const metadata = parseMetadata(path.join(topicPath, 'metadata.yaml'));
  if (!metadata) {
    log.error({ topicPath, topicContents }, 'No metadata, skipping topic');
    return;
  }
  const body = fs.readFileSync(path.join(topicPath, 'body.md'), 'utf-8');
  return { body, metadata, topic_unique_id: topicFolderName };
}

function parseMetadata(metadataPath: string): TopicMetadata1 | void {
  const fileContents = fs.readFileSync(metadataPath, 'utf8');
  const parsedYaml = yaml.load(fileContents);
  if (!isMetadata(parsedYaml)) {
    log.error({ parsedYaml, metadataPath }, 'Metadata isnt an object with schema version, skipping topic');
    return;
  }
  // Switch off of schema version here in the future
  if (parsedYaml.schemaVersion !== 1) {
    log.error({ parsedYaml, metadataPath }, 'Unknown schema version, skipping topic');
    return;
  }
  try {
    return Convert1.toTopicMetadata1FromObject(parsedYaml);
  } catch (e) {
    log.error({ e, parsedYaml }, 'Failed to parse metadata according to schema, skipping topic');
  }
}

function topicHasCorrectFiles(files: string[]): boolean {
  const shouldHave = ['body.md', 'docusaurus-frontmatter.md', 'metadata.yaml'];
  return shouldHave.every((fileName) => {
    return files.includes(fileName);
  });
}

function isMetadata(obj: unknown): obj is TopicMetadataWithSchema {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'schemaVersion' in obj &&
    !isNaN((obj as TopicMetadataWithSchema).schemaVersion)
  );
}
