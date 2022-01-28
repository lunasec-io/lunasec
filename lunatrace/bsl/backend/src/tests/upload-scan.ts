/*
 * Copyright by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Business Source License v1.1
 * (the "License"); you may not use this file except in compliance with the
 * License. You may obtain a copy of the License at
 *
 * https://github.com/lunasec-io/lunasec/blob/master/licenses/BSL-LunaTrace.txt
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { Scan } from '../models/scan';

void Scan.uploadScan('~/tmp/syftoutput.json', 'ddbb00e7-2454-495f-a7ce-ba6522559b62').then((res) => {
  console.log(res);
});
