/*
 * Copyright 2021 by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import fs, { promises } from 'fs';
import os from 'os';
import path from 'path';

export const withTempFile = async (filename: string, fn: (path: string) => void) => {
  return await withTempDir((dir) => fn(path.join(dir, filename)));
};

export const withTempDir = async (fn: (path: string) => void) => {
  const dir = await promises.mkdtemp((await promises.realpath(os.tmpdir())) + path.sep);
  try {
    return fn(dir);
  } finally {
    void (await promises.rmdir(dir, { recursive: true }));
  }
};

export function copyFileSync(source: string, target: string) {
  let targetFile = target;

  // If target is a directory, a new file with the same name will be created
  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source));
    }
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source));
}

export function copyFolderRecursiveSync(source: string, target: string) {
  let files = [];

  // Check if folder needs to be created or integrated
  const targetFolder = target;
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder);
  }

  // Copy
  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source);
    files.forEach(function (file) {
      const curSource = path.join(source, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, targetFolder);
      } else {
        copyFileSync(curSource, targetFolder);
      }
    });
  }
}

export function findFileMatchingPatternSync(targetFolder: string, filter: RegExp) {
  const files = fs.readdirSync(targetFolder);
  for (const file of files) {
    if (filter.test(file)) {
      return file;
    }
  }
  return undefined;
}
