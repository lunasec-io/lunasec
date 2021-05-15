
import { SecureFrame } from './secure-frame'

function startup() {
  const elementType = (new URL(document.location.href)).searchParams.get('element');

  if (!elementType || (elementType !== 'input' && elementType !== 'span')){
    console.error('Invalid element type passed in iframe URL, unsure what to render');
    return;
  }

  new SecureFrame(elementType);
}
startup();