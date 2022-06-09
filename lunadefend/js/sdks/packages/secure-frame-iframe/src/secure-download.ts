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
import { FileInfo, Tokenizer } from '@lunasec/tokenizer-sdk';
// 1 fetch filename from metadata and s3 headers in parallel
// 2 Put them onto the a tag
// 3 User clicks the tag
// 4 Maybe display percentage
// 5 Once blob is loaded, make a fake <a> with the blob as an href and trigger it

// Download the file as a blob and then convert to a File object to add some metadata fields
// Then stick it on the link

function setupLink(fileInfo: FileInfo, a: HTMLAnchorElement, hidden: boolean, tokenizer: Tokenizer) {
  a.textContent = fileInfo.filename;

  // In order to trigger a download in a browser, we need to fake a click on an href element
  // Note that we use the actual anchor element here instead of a fake, so that when we unregister our handler
  // the file will download from the locally stored blob on future clicks
  async function triggerDownload(e: Event) {
    e.preventDefault();
    a.textContent = 'Loading...';
    const f = await tokenizer.detokenizeFileFromFileInfo(fileInfo);
    if (!f.success) {
      a.textContent = 'Error';
      throw e;
    }
    a.download = fileInfo.filename;
    a.href = URL.createObjectURL(f.file);
    a.textContent = fileInfo.filename;

    a.removeEventListener('click', triggerDownload);
    a.click();
  }

  a.addEventListener('click', triggerDownload);
  // If the element is in hidden mode, start the download ourselves.
  if (hidden) {
    a.click();
  }
}

export async function handleDownload(token: string, a: HTMLAnchorElement, tokenizer: Tokenizer, hidden: boolean) {
  a.textContent = '...Loading';
  try {
    const fileInfoRes = await tokenizer.detokenizeToFileInfo(token);
    if (!fileInfoRes.success) {
      throw fileInfoRes.error;
    }
    setupLink(fileInfoRes.fileInfo, a, hidden, tokenizer);
  } catch (e) {
    a.textContent = 'Error';
    throw e;
  }
  return;
}
