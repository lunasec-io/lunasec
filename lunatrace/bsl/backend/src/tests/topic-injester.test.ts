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

import { readTopicsFromFolder } from '../topic-ingester/read-topics-from-folder';
describe('topic injester', () => {
  it('parses topics from disk', () => {
    const topics = readTopicsFromFolder('./src/fixtures/topics');
    console.log('read topics, ', topics);
    const topic = topics[0];
    expect(topic).toHaveProperty('body');
    expect(topic).toHaveProperty('metadata');
    expect(topic.topic_unique_id).toBe('LUNATOPIC-20220422-1-TEST-TOPIC');
  });
});
