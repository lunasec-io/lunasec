/*
 * Copyright 2021 by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
// this is only used for the vanilla JS apps which are not currently supported, IE these constants are deprecated
export const __SECURE_FRAME_URL__: string =
  process.env.REACT_APP_SECURE_FRAME_URL || process.env.SECURE_FRAME_URL || 'http://localhost:37766';
export const secureFramePathname = '/frame';
export const secureFrameSessionVerifyPathname = '/session/verify';
