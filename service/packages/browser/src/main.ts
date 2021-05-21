
import { SecureFrame, ElementTypes } from './secure-frame'
import {SecureDownload } from './secure-download'
const supportedElements = ['input','textarea','span','a']
function startup() {
  const elementType = (new URL(document.location.href)).searchParams.get('element') as keyof ElementTypes | null;

  if (!elementType || !supportedElements.includes(elementType)){
    throw new Error('Invalid element type passed in iframe URL, unsure what to render');
  }

  const loadingText = document.querySelector('.loading-text') as Element;

  if (!loadingText) {
      throw new Error('Couldnt find loading text element in iframe HTML')
  }
  if(elementType === 'a'){
    new SecureDownload(loadingText)
  } else {
    new SecureFrame(elementType, loadingText);
  }
}
startup();

