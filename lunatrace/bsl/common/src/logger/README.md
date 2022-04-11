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
## LunaLogger

This is a slim JSON logger, with an API similar to native console.  It supports pretty colors, pretty json output, and
typescript-compatible stack traces.

```typescript
import {LunaLogger} from '@lunatrace/lunatrace-common'
const log = new LunaLogger({ trace: true }, {whatever:'extra fields'});
log.addTransport(new JsonTransport({ minLevel: 'debug', colors: false, pretty: true }));

//basic usage
log.info('some log')
```
outputs
```json
{
    "level": "debug",
    "timeEpoch": 1649550906635,
    "message": "some log",
    "timePretty": "Sat Apr 09 2022 17:35:06 GMT-0700 (Pacific Daylight Time)",
    "whatever":"extra fields",
    "loggerName": "default"
}
```
```typescript
//if the first argument is an object, any fields end up on the root logged object instead of in the message, just like pino
log.log({ test: 'field' }); // alias for info
```
outputs
```json
    {
      "level": "info",
      "timeEpoch": 1649551029078,
      "message": "",
      "timePretty": "Sat Apr 09 2022 17:37:09 GMT-0700 (Pacific Daylight Time)",
      "loggerName": "default",
      "test": "field"
    }
```
