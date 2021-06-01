import {
  __SECURE_FRAME_URL__,
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
    this.frameNonce = generateSecureNonce();
    // start up RPC
    this.messageCreator = new FrameMessageCreator((notification) => this.frameNotificationCallback(notification));

    // Attach the frame
    const frameUrl = this.generateUrl();
    this.frameElement = this.buildFrame(frameUrl);
    document.body.appendChild(this.frameElement);
  }

  buildFrame(url: string) {
    const frame = document.createElement('iframe');
    frame.src = url;
    // Idk if this is necessary
    frame.setAttribute('width', '0');
    frame.setAttribute('height', '0');
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
      this.sendIFrameAttributes();
    }
  }
  // Generate some attributes for sending to the iframe via RPC.
  generateIframeAttributes(): AttributesMessage {
    const style = {
      style: {
        //try an empty object to see what happens
      },
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
    if (!this.frameRef.current || !this.frameRef.current.contentWindow) {
      console.error('Frame not initialized for message sending');
      return;
    }
    await this.messageCreator.sendMessageToFrameWithReply(this.frameRef.current.contentWindow, message);
    return;
  }
}

export function downloadFile(token: string) {
  new FileDownloader(token);
}
