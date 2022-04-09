"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterFindingsByIgnored = void 0;
function filterFindingsByIgnored(findings) {
    return findings.filter((f) => {
        // Get the ignored_vulnerability that is linked to this finding, if any.  There are a maximum of one because of the unique constraint
        const ignoreRule = f.vulnerability.ignored_vulnerabilities[0];
        // if there are none just keep it
        if (!ignoreRule) {
            return true;
        }
        // check if any of the rules match all of the locations in our list
        f.locations.every((location) => {
            return ignoreRule.locations.includes(location);
        });
    });
}
exports.filterFindingsByIgnored = filterFindingsByIgnored;
