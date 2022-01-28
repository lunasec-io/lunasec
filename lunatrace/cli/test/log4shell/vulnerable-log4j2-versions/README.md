<!--
  ~ Copyright by LunaSec (owned by Refinery Labs, Inc)
  ~
  ~ Licensed under the Creative Commons Attribution-ShareAlike 4.0 International
  ~ (the "License"); you may not use this file except in compliance with the
  ~ License. You may obtain a copy of the License at
  ~
  ~ https://creativecommons.org/licenses/by-sa/4.0/legalcode
  ~
  ~ See the License for the specific language governing permissions and
  ~ limitations under the License.
  ~
-->
# Log4j2 Releases

Run the following js on `https://mvnrepository.com/artifact/org.apache.logging.log4j/log4j-core`. (If there is a
maven API or something for doing this, please let me know)
```shell
const releases = document.querySelectorAll('.release');
const versions = [];
for (let release of releases) {
    versions.push(release.text);
}
console.log(JSON.stringify(versions));
```