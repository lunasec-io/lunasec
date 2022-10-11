import { checkWebPSupport } from 'supports-webp-sync'

var png = "png";
var jpg = "jpg";
if (checkWebPSupport()) {
  png = "webp";
  jpg = "webp";
}

export { png, jpg };