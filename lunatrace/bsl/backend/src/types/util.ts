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
export type VoidResult = { error: false };
export type ValueResult<T> = { error: false; res: T };
export type Result<T = undefined> = T extends undefined ? VoidResult : ValueResult<T>;
export type ErrorResult = { error: true; msg: string; rawError?: Error };

export type MaybeError<T = undefined> = Result<T> | ErrorResult;

export type MaybeResultOrError<T = undefined> = Result<T> | ErrorResult;

export type MaybeErrorVoid = MaybeError<undefined>;
