import {
  __SECURE_FRAME_URL__,
  addJsEventListener,
  AttributesMessage,
  FrameMessageCreator,
  generateSecureNonce,
  secureFramePathname,
  UnknownFrameNotification,
} from '@lunasec/browser-common';

class FileDownloader {
  token!: string;
  messageCreator!: FrameMessageCreator;
  frameElement!: HTMLIFrameElement;
  frameNonce!: string;

  constructor(token: string) {
    this.token = token;
    this.frameNonce = generateSecureNonce();

    // start up RPC
    this.messageCreator = new FrameMessageCreator((notification) => this.frameNotificationCallback(notification));
    addJsEventListener(window, (message) => this.messageCreator.postReceived(message));

    // Attach the frame
    this.frameElement = this.buildFrame();
    document.body.appendChild(this.frameElement);
  }

  buildFrame() {
    const frame = document.createElement('iframe');
    frame.src = this.generateUrl();
    // Idk if this is necessary
    frame.setAttribute('width', '0');
    frame.setAttribute('height', '0');
    frame.setAttribute('style', 'border-width:0;');
    return frame;
  }

  generateUrl() {
    const frameURL = new URL(secureFramePathname, __SECURE_FRAME_URL__);
    frameURL.searchParams.set('n', this.frameNonce);
    frameURL.searchParams.set('origin', window.location.origin);
    frameURL.searchParams.set('element', 'a');
    return frameURL.toString();
  }

  frameNotificationCallback(notification: UnknownFrameNotification) {
    if (notification.frameNonce !== this.frameNonce) {
      console.debug('Received notification intended for different listener, discarding');
      return;
    }
    if (notification.command === 'NotifyOnStart') {
      void this.sendIFrameAttributes();
    }
  }

  // Generate some attributes for sending to the iframe via RPC.
  generateIframeAttributes(): AttributesMessage {
    const style = {
      style: {},
    };
    return {
      id: this.frameNonce,
      style: JSON.stringify(style),
      token: this.token,
      hidden: true,
    };
  }

  // Give the iframe all the information it needs to exist when it wakes up
  async sendIFrameAttributes() {
    const frameAttributes = this.generateIframeAttributes();
    const message = this.messageCreator.createMessageToFrame('Attributes', frameAttributes);
    const frameWindow = this.frameElement.contentWindow;
    if (!frameWindow) {
      console.error('Attempted to send frame message to iframe that wasnt attached to DOM');
      return;
    }
    await this.messageCreator.sendMessageToFrameWithReply(frameWindow, message);
    return;
  }
}

export function downloadFile(token: string) {
  new FileDownloader(token);
  return;
}
