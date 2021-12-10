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
import fs from 'fs'

const rawHTML = fs.readFileSync('./stub/raw-frame-contents.html').toString();

const escapedHTML = escape(rawHTML);

const moduleWithEscapedHTML = `export const stubFrameBody = "${escapedHTML}"`;

fs.writeFileSync('./stub/wrapped-frame-dom-string.js', moduleWithEscapedHTML);

console.log('Generated escaped html ESM wrapper')
