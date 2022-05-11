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
import { GuideMetadata } from '@lunatrace/lunatrace-common';

import { GetGuideDetailsQuery } from '../../api/generated';

type GeneratedGuideDetails = NonNullable<GetGuideDetailsQuery['guides_by_pk']>;

export interface GuideDetailsData extends GeneratedGuideDetails {
  metadata: GuideMetadata;
}
