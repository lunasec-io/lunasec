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
import { UiNode, UiNodeInputAttributes } from '@ory/kratos-client';
import { FormEvent } from 'react';

export type ValueSetter = (value: string | number | boolean | undefined) => Promise<void>;

export type FormDispatcher = (e: MouseEvent | FormEvent) => void;

export interface NodeInputProps {
  node: UiNode;
  attributes: UiNodeInputAttributes;
  value: any;
  disabled: boolean;
  dispatchSubmit: FormDispatcher;
  setValue: ValueSetter;
}
