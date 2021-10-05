#!/usr/bin/env node
"use strict";
// This bin file gets symlinked into node_modules/.bin by npm
// This utility checks if it is running globally and uses a local copy if present
const importLocal = require("import-local");

if (importLocal(__filename)) {
  console.log("using local version of LunaSec");
} else {
  // This will eventually get run when this file is invoked a second time from within the local project
  require("."); // Runs index.js
}
