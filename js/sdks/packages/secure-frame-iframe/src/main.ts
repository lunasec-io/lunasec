import { ComponentNames, componentNames } from '@lunasec/react-sdk';

import { SecureFrame } from './secure-frame';

function startup() {
  console.log('IFRAME COOKIES ARE ', document.cookie);
  const componentName = new URL(document.location.href).searchParams.get('component') as ComponentNames | null;
  if (!componentName || !componentNames.includes(componentName)) {
    throw new Error('Invalid element type passed in iframe URL, unsure what to render');
  }

  const loadingText = document.querySelector('.loading-text') as Element;
  if (!loadingText) {
    throw new Error('Couldnt find loading text element in iframe HTML');
  }

  new SecureFrame(componentName, loadingText);
}
startup();
