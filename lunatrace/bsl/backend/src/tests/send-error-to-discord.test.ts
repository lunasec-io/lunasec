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
import axios from 'axios';

import { sendErrorToDiscord } from '../utils/send-error-to-discord';
jest.mock('axios');
const axiosMock = axios as jest.MockedObject<typeof axios>;

describe('discord error logs', () => {
  it('sends an error to discord', async () => {
    await sendErrorToDiscord(new Error('fake error text'));
    expect(axiosMock.post).toBeCalled();
  });
});
