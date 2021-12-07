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
    const beginningWithFragment = beginning.concat(htmlFragment);
    const newIndexPage = beginningWithFragment.concat(end);
    fs.writeFileSync(filePath, newIndexPage);

    console.log('Inserted analytics into ', fileName)
});



