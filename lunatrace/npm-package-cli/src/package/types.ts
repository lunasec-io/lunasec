/*
 * Copyright 2023 by LunaSec (owned by Refinery Labs, Inc)
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
/**
 * Specifies which package manager to use. NPM is the default unless specified.
 */
export type PackageManagerType = 'npm' | 'yarn';

export interface PackageTreeConfig {
  /**
   * The root path of the package tree data (package.json and package-lock.json).
   */
  root: string;
  /**
   * The package manager to use. NPM is the default unless specified.
   */
  packageManager?: PackageManagerType;
  /**
   * The path to the package.json file.
   * If not provided, it will be resolved from the root path as `package.json`.
   */
  packageJsonPath?: string;
  /**
   * The path to the package-lock.json file (if NPM) or the yarn.lock (if Yarn). If not provided,
   * it will be resolved as the default for the package manager in the same directory as the package.json.
   */
  packageLockPath?: string;
}
