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

import { GuideMetadata1 } from '@lunatrace/lunatrace-common';
import yaml from 'js-yaml';

import { log } from '../utils/log';

import { Convert as Convert1 } from './schemas/generated-schema-1-validator';
import { Guide } from './types';

interface GuideMetadataWithSchema {
  schemaVersion: number;
  [x: string | number | symbol]: unknown;
}

export function readGuidesFromFolder(guidesFolder: string): Guide[] {
  const guidesPath = path.resolve(guidesFolder);
  const contents = fs.readdirSync(guidesPath);
  const guides: Guide[] = [];
  contents.forEach((guideFolderName) => {
    const guidePath = path.join(guidesPath, guideFolderName);
    log.info('reading guide from folder ', guidePath);

    if (fs.statSync(guidePath).isDirectory()) {
      const guide = parseGuide(guidePath, guideFolderName);
      if (guide) {
        guides.push(guide);
      }
    }
  });
  log.info({ guides }, 'read guides');
  return guides;
}

function parseGuide(guidePath: string, guideFolderName: string): Guide | void {
  const guideContents = fs.readdirSync(guidePath);
  if (!guideHasCorrectFiles(guideContents)) {
    log.error(
      { guidePath, guideContents },
      'Folder in guides missing required files to be a valid guide, skipping guide'
    );
    return;
  }
  const metadata = parseMetadata(path.join(guidePath, 'metadata.yaml'));
  if (!metadata) {
    log.error({ guidePath, guideContents }, 'No metadata, skipping guide');
    return;
  }
  const body = fs.readFileSync(path.join(guidePath, 'body.md'), 'utf-8');
  return { body, metadata, guide_unique_id: guideFolderName };
}

function parseMetadata(metadataPath: string): GuideMetadata1 | void {
  const fileContents = fs.readFileSync(metadataPath, 'utf8');
  const parsedYaml = yaml.load(fileContents);
  if (!isMetadata(parsedYaml)) {
    log.error({ parsedYaml, metadataPath }, 'Metadata isnt an object with schema version, skipping guide');
    return;
  }
  // Switch off of schema version here in the future
  if (parsedYaml.schemaVersion !== 1) {
    log.error({ parsedYaml, metadataPath }, 'Unknown schema version, skipping guide');
    return;
  }
  try {
    return Convert1.toGuideMetadata1FromObject(parsedYaml);
  } catch (e) {
    log.error({ e, parsedYaml }, 'Failed to parse metadata according to schema, skipping guide');
  }
}

function guideHasCorrectFiles(files: string[]): boolean {
  const shouldHave = ['body.md', 'docusaurus-frontmatter.md', 'metadata.yaml'];
  return shouldHave.every((fileName) => {
    return files.includes(fileName);
  });
}

function isMetadata(obj: unknown): obj is GuideMetadataWithSchema {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'schemaVersion' in obj &&
    !isNaN((obj as GuideMetadataWithSchema).schemaVersion)
  );
}
