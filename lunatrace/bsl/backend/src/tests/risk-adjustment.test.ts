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
import { mergeValue, modifyVectorString } from '../models/vulnerability-dependency-tree/risk-adjustment/vector-strings';

describe('risk adjustment', () => {
  // TODO: Find and use a good fuzzer for testing all these matrices, I think free knows a good one
  it('merges vector values properly', () => {
    function assertCorrectVectorMerge(keyName: string, valOne: string, valTwo: string, expected: string) {
      const mergedValue = mergeValue(keyName, valOne, valTwo);
      expect(mergedValue).toEqual(expected);
    }
    assertCorrectVectorMerge('CR', 'L', 'H', 'H');
    assertCorrectVectorMerge('AV', 'X', 'L', 'L');
    assertCorrectVectorMerge('AV', 'L', 'X', 'L');
    assertCorrectVectorMerge('AR', 'M', 'L', 'M');
  });

  it('modifies a vector string', () => {
    const aVectorString = 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H/CR:L';
    const modified = modifyVectorString(aVectorString, { A: 'X', CR: 'M' });
    expect(modified).toEqual('CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H/CR:M');
  });
});
