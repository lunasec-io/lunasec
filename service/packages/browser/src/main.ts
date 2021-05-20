
import { SecureFrame } from './secure-frame'

function startup() {
  const elementType = (new URL(document.location.href)).searchParams.get('element');

  if (!elementType || (elementType !== 'input' && elementType !== 'span')){
    throw new Error('Invalid element type passed in iframe URL, unsure what to render');
  }

  const loadingText = document.querySelector('.loading-text') as Element;

  if (!loadingText) {
      throw new Error('Couldnt find loading text element in iframe HTML')
  }
  new SecureFrame(elementType, loadingText);
}
startup();