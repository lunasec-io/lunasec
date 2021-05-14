
import { SecureElement } from './secure-element'

function startup() {
  const elementType = (new URL(document.location.href)).searchParams.get('element');

  if (!elementType || !['input', 'span'].includes(elementType)){
    console.error('Invalid element type passed in iframe URL, unsure what to render');
    return;
  }
  if (elementType === 'span') {
    new SecureElement<'span'>(elementType);
    return;
  }

  if (elementType === 'input'){
    new SecureElement<'input'>(elementType)
    return;
  }
}
startup();