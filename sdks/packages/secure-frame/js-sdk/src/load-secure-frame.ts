/* eslint-disable functional/no-throw-statement, @typescript-eslint/ban-ts-comment, functional/immutable-data */

import {createDomWatcher} from './scan-dom';
import {addMessageListener} from '@lunasec/secure-frame-common/build/main/rpc/listener';
import {SECURE_FRAME_URL} from '@lunasec/secure-frame-common';

export function loadSecureFrame() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    const errorString = 'Cannot load secure frame SDK without valid browser';
    console.error(errorString);
    throw new Error(errorString);
  }

  // TODO: Generate this string programmatically at build time.
  const SECURE_FRAME_SDK_VERSION = '1.2.3';

  // @ts-ignore
  const detectedVersion = window.__SECURE_FRAME_SDK_VERSION__;

  // TODO: Make this check semver ranges
  if (
    detectedVersion !== undefined &&
    detectedVersion !== SECURE_FRAME_SDK_VERSION
  ) {
    const errorString = 'Cannot mix versions of secure frame SDK';
    console.error(errorString);
    throw new Error(errorString);
  }

  // @ts-ignore
  window.__SECURE_FRAME_SDK_VERSION__ = SECURE_FRAME_SDK_VERSION;

  console.log('Successfully mounted secure frame SDK');

  // TODO: Add some postMessage test logic
  // queryDomForForms(document);

  const body = document.querySelector('html');

  if (!body) {
    throw new Error('Unable to locate body for DOM page');
  }

  addMessageListener(window, document);

  createDomWatcher(document, SECURE_FRAME_URL, body);
}
