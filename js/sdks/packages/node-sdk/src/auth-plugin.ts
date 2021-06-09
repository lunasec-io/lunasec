import { URL } from 'url';

import cookieParser from 'cookie-parser';
import { Router, Request, Response } from 'express';

function encodeUint8Array(uint8array: Uint8Array): string {
  return Buffer.from(uint8array).toString('base64');
}

export class LunaSecExpressAuthPlugin {
  private readonly secureFrameUrl: string;

  constructor() {
    const secureFrameUrl = process.env.SECURE_FRAME_URL;
    if (secureFrameUrl === undefined) {
      throw Error('SECURE_FRAME_URL not found in environment variables.');
    }
    this.secureFrameUrl = secureFrameUrl;
  }

  async handleSecureFrameAuthRequest(req: Request, res: Response) {
    const stateToken = req.query.state;

    if (typeof stateToken !== 'string') {
      res.status(400).send({
        error: 'state is not set in request',
      });
      return;
    }

    const idToken = req.cookies['id_token'];

    if (idToken === undefined) {
      console.error('id_token is not set in request');
      res.status(400).send({
        error: 'id_token is not set in request',
      });
      return;
    }

    const encodedData = encodeUint8Array(new Uint8Array());

    const redirectUrl = new URL(this.secureFrameUrl);
    redirectUrl.searchParams.append('state', stateToken);
    redirectUrl.searchParams.append('openid_token', encodedData);
    redirectUrl.pathname = '/session/create';

    console.log('redirecting...', redirectUrl.href);

    res.redirect(redirectUrl.href);
  }

  async register(app: Router) {
    app.get('/secure-frame', cookieParser(), this.handleSecureFrameAuthRequest.bind(this));
  }
}
