import {AllowedElements} from '@lunasec/react-sdk'
import { SecureFrame } from './secure-frame'
const supportedElements = ['input','textarea','span','a']
function startup() {
  const elementType = (new URL(document.location.href)).searchParams.get('element') as keyof AllowedElements | null;
  console.log('framestart with element type ', elementType)
  if (!elementType || !supportedElements.includes(elementType)){
    throw new Error('Invalid element type passed in iframe URL, unsure what to render');
  }

  const loadingText = document.querySelector('.loading-text') as Element;

  if (!loadingText) {
      throw new Error('Couldnt find loading text element in iframe HTML')
  }

    new SecureFrame(elementType, loadingText);

}
startup();

