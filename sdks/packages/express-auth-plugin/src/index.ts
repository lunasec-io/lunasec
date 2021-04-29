import {Router} from "express";
import Cookies from "cookies";
import {URL} from "url";
import {Crypto} from "@peculiar/webcrypto";

// @ts-ignore
global.self = global;
// @ts-ignore
global.window = global;
// @ts-ignore
global.crypto = new Crypto();

// @ts-ignore
global.window.atob = function atob(str) {
  return Buffer.from(str, 'base64').toString('binary');
};

// @ts-ignore
global.window.btoa = function btoa(str) {
  var buffer;

  if (str instanceof Buffer) {
    buffer = str;
  } else {
    buffer = Buffer.from(str.toString(), 'binary');
  }

  return buffer.toString('base64');
};

import {binaryInsecure, hybrid, KeysetHandle} from "tink-crypto";

function encodeUint8Array(uint8array: Uint8Array): string {
  return Buffer.from(uint8array).toString('base64');
}

function loadSecureFrameKeyset(): KeysetHandle {
  const secureFrameKeysetEncoded = process.env.SECURE_FRAME_KEYSET;
  if (secureFrameKeysetEncoded === undefined) {
    throw Error("SECURE_FRAME_KEYSET not found in environment variables.");
  }

  const secureFrameKeyset = Buffer.from(secureFrameKeysetEncoded, 'base64');
  return binaryInsecure.deserializeKeyset(secureFrameKeyset);
}

export async function authPlugin(app: Router) {
  hybrid.register();
  const secureFrameKeyset = loadSecureFrameKeyset();
  const hybridEncrypt =
    await secureFrameKeyset.getPrimitive<hybrid.HybridEncrypt>(hybrid.HybridEncrypt);

  const secureFrameUrl = process.env.SECURE_FRAME_URL;
  if (secureFrameUrl === undefined) {
    throw Error("SECURE_FRAME_URL not found in environment variables.");
  }

  app.get('/secure-frame',async function(req, res) {
    const stateToken = req.query.state;
    if (typeof stateToken !== "string") {
      res.status(400).send('state is not set in request');
      return;
    }

    const cookies = new Cookies(req, res);
    const idToken = cookies.get('id_token');

    if (idToken === undefined) {
      res.status(400).send('id_token is not set in request');
      return;
    }

    const encryptedData = await hybridEncrypt.encrypt(Buffer.from(idToken), Buffer.from("secureFrame"));

    const encodedData = encodeUint8Array(encryptedData);

    const redirectUrl = new URL(secureFrameUrl);
    redirectUrl.searchParams.append('state', stateToken);
    redirectUrl.searchParams.append('openid_token', encodedData);
    redirectUrl.pathname = '/session/create';

    res.redirect(redirectUrl.href);
  });
}
