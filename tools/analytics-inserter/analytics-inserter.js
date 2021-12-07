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
#!/usr/bin/env node

// This script finds any html files in the /build folder where it was called from and adds the analytics snippet to them

const fs = require("fs");
const path = require("path");

const htmlFragment = fs.readFileSync(path.join(__dirname,"./analytics-fragment.txt"));
const buildDir = path.join(process.cwd(), 'build/');

fs.readdirSync(buildDir).forEach((fileName) => {
    if (!fileName.includes('.html')) {
      return;
    }

    const filePath = path.join(buildDir,fileName);
    const indexPage = fs.readFileSync(filePath);
    const [beginning, end] = indexPage.toString().split('</body>');
    const beginningWithFragment = beginning.concat(htmlFragment.toString());
    const newIndexPage = beginningWithFragment.concat(end);
    fs.writeFileSync(filePath, newIndexPage);

    console.log('Inserted analytics into ', fileName)
});



