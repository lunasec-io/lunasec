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
const fs = require('fs');
const uuid = require('uuid').v4;
const yaml = require('js-yaml');

// These are the various Regex checks used to identify files of interest for this script.
/**
 * This one is a little bit janky because we have to check for a ton of different filenames...
 * If you know of a way to clean it up, feel free to. This seemed like the simplest solution though.
 * @type {RegExp}
 */
const javascriptRegex = /\.(((mj|j|t)sx?)|\.vue)$/i;
const cssRegex = /\.(css|scss|sass|less)$/i;
const buildOutputRegex = /\/build\//i;
const golangRegex = /\.go$/i;
const markdownRegex = /\.mdx?$/i;
const generatedFilesRegex = /(gen\.go$|generated|schema\.graphql$|_enumer\.go$|gogen)/;

const bslLicenseRegex = /.*\/bsl\/.*/i

const filePrefix = '# AUTO-GENERATED FILE CREATED BY LINTER\n\n';

/**
 * Creates a deep copy of an object or array, where deep means it copies all array internally.
 * This copy is completely separate from the copy handed to this function.
 * @param obj Any valid JSON value
 * @return {any} A copy of the provided value.
 */
function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Merges a Skywalking Eyes config with a given list of files.
 * The output is a config that will only check the files specified, instead of every file.
 * @param baseConfig The base YAML config to override (it's referentially transparent)
 * @param files List of files to check the licenses for
 * @return {any} The new Skywalking Eyes configuration file
 */
function substituteConfigFiles(baseConfig, files) {
  const configCopy = deepCopy(baseConfig);

  return {
    ...configCopy,
    header: {
      ...configCopy.header,
      paths: files,
      'paths-ignore': []
    }
  };
}

/**
 * Reads the config files on the disk and runs a config for them.
 * TODO: Make this just read all configs and not have to be hardcoded.
 * @return {{apache2: unknown, creativeCommons: unknown}} Object containing the YAML configs from disk.
 */
function readBaseLicenseConfigs() {
  const apacheConfig = fs.readFileSync('./tools/license-checker/configs/apache2.yaml', 'utf8');
  const bslConfig = fs.readFileSync('./tools/license-checker/configs/bsl-lunatrace.yaml', 'utf8');
  const creativeCommonsConfig = fs.readFileSync('./tools/license-checker/configs/CC-BY-SA-4_0.yaml', 'utf8');

  return {
    apache2: yaml.load(apacheConfig.toString()),
    bsl: yaml.load(bslConfig.toString()),
    creativeCommons: yaml.load(creativeCommonsConfig.toString())
  };
}

/**
 * Takes in a Skywalking Eyes config file and modifies it to only match files that pass a given filter function.
 * This writes a file to the disk, so be sure to clean it up afterwards!
 * @param baseConfig Base Skywalking Eyes config file to extend
 * @param files Array of filenames to check against
 * @param filterFn Filter function to check each filename against
 * @return {{path: string, filename: string}|null} Information about the config file that was written to disk.
 */
function rewriteLicenseFile(baseConfig, files, filterFn) {
  const filteredFiles = files.filter(filterFn);

  if (filteredFiles.length === 0) {
    return null;
  }

  const subsetConfig = substituteConfigFiles(baseConfig, filteredFiles);

  const configFileName = uuid() + '.ignored.yaml';
  const configPath = './tools/license-checker/configs/' + configFileName;

  fs.writeFileSync(
    configPath,
    filePrefix + yaml.dump(subsetConfig)
  );

  return {
    path: configPath,
    filename: configFileName
  };
}

/**
 * Generates a shell command to run the License Checking Tool.
 * @param {{path: string, filename: string}} configInfo Config path and filename
 * @return {string} The command to run
 */
function generateLicenseToolCommand(configInfo) {
  return `sh -c './tools/license-checker/run-license-check.sh with-config "${configInfo.filename}"; rm -f ${configInfo.path}'`;
}

function isFileCode(file) {
  return (
    file.match(javascriptRegex) || file.match(golangRegex) || (file.match(cssRegex) && file.match(buildOutputRegex))
  ) && (
    !file.match(generatedFilesRegex)
  );
}

/**
 * This script is invoked whenever a commit happens by Husky and lint-staged.
 * The output of this function is an array of commands that are run by lint-staged.
 * We do this in order to speed up `git commit` because otherwise it is painfully slow to make commits!
 * @param allStagedFiles List of filenames passed to us by lint-staged
 * @return {*[]} Array of commands to be run
 */
module.exports = (allStagedFiles) => {
  const outputCommands = [];

  const {apache2, bsl, creativeCommons} = readBaseLicenseConfigs();

  // Writes a custom file for the License checking script to use.
  const apacheConfigInfo = rewriteLicenseFile(
    apache2,
    allStagedFiles,
      file => !file.match(bslLicenseRegex) && isFileCode(file)
  );

  // Only append the license check step if we have a valid config.
  if (apacheConfigInfo !== null) {
    outputCommands.push(generateLicenseToolCommand(apacheConfigInfo));
  }

  // Writes a custom file for the License checking script to use.
  const bslConfigInfo = rewriteLicenseFile(
    bsl,
    allStagedFiles,
    file => file.match(bslLicenseRegex) && isFileCode(file)  );

  // Only append the license check step if we have a valid config.
  if (bslConfigInfo !== null) {
    outputCommands.push(generateLicenseToolCommand(bslConfigInfo));
  }

  // Writes a custom file for the License checking script to use.
  const creativeCommonsConfigInfo = rewriteLicenseFile(
    creativeCommons,
    allStagedFiles,
      (file) => {
        return file.match(markdownRegex) && !file.match(/pull_request_template.md|topics\//)
      }
  );

  // Only append the license check step if we have a valid config.
  if (creativeCommonsConfigInfo !== null) {
    outputCommands.push(generateLicenseToolCommand(creativeCommonsConfigInfo));
  }

  // Lint all JS files
  const jsFiles = allStagedFiles.filter(file => file.match(javascriptRegex));
  if (jsFiles.length > 0) {
    // Setting this to "production" allows us to disable certain nit-picky Lint rules while developing.
    outputCommands.push(`sh -c "SLOW_LINT=true eslint --fix ${jsFiles.join(' ')}"`);
  }

  return outputCommands;
}
