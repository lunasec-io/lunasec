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
import Downloader from './components/elements/downloader';
import Input from './components/elements/input';
import Paragraph from './components/elements/paragraph';
import TextArea from './components/elements/textarea';
import Uploader from './components/elements/uploader';
import wrapComponent from './components/wrapComponent';
export * from './components/SecureForm';
export * from './providers/SecureFormContext';
export * from './providers/LunaSecConfigContext';
export * from './types/internal-types';
export * from './types/component-types';

export { LunaSecError } from '@lunasec/isomorphic-common'; //expose this so users can use it as well

export const SecureParagraph = wrapComponent(Paragraph, 'Paragraph');
export const SecureDownload = wrapComponent(Downloader, 'Downloader');
export const SecureUpload = wrapComponent(Uploader, 'Uploader');
export const SecureTextArea = wrapComponent(TextArea, 'TextArea');
export const SecureInput = wrapComponent(Input, 'Input');
