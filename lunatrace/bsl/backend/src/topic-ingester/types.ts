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
import {Topic_Vulnerabilities_Insert_Input} from "../hasura-api/generated";

import {TopicMetadata1} from "./schemas/generated-schema-1-validator";

export interface Topic {
    metadata: TopicMetadata1;
    body: string;
    topic_unique_id:string;
}

export type TopicVulnerability = NonNullable<Topic_Vulnerabilities_Insert_Input>
