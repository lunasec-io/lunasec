import {Router} from 'express'
import {randomUUID} from "crypto";
import { lunaSec } from './configure-lunasec';
import {readSessionFromRequest} from "./read-session-from-request";
const routes = Router();

// (forrest) Leaving the secure resolver stuff commented out until chris gets a chance to take another pass at it
// const secureResolver = new SecureResolver({
//   stage: DeploymentStage.DEV,
// });
//
// const secureProcessForm = secureResolver.wrap(processForm);

export function createRoutes() {
  routes.get('/auth', async (req, res) => {
    const id_token = await readSessionFromRequest(req);
    if (id_token === null) {
      res.status(401).end();
      return;
    }
    res.status(200).end();
  });

  // This little helper route gets called manually to simulate a login flow for the purposes of the demo
  routes.get('/set-id-token', async function (_, res) {
    const id_token = await lunaSec.auth.createAuthenticationJWT('user', {
      session: {
        id: randomUUID()
      }
    });
    res.cookie('id_token', id_token.toString())
    res.redirect('back')
  });

  routes.get('/', async (_req, res) => {
    res.end();
  });

  routes.post('/check-cors', (_req, res) => {
    res.status(200).send('ok');
  });

  //
  // routes.post('/signup', async (req, res) => {
  //   const ssnToken: string = req.body.ssnToken;
  //
  //   if (!ssnToken) {
  //     console.error('ssn token is not set');
  //     res.status(400);
  //     res.end();
  //     return;
  //   }
  //
  //   const formData: SecureFormData = {
  //     ssnToken: ssnToken,
  //   };
  //
  //   const plaintext = await secureProcessForm(formData);
  //   if (plaintext === undefined) {
  //     console.error('error when calling process form');
  //     res.status(500);
  //     res.end();
  //     return;
  //   }
  //
  //   console.log(plaintext);
  //   res.status(200);
  //   res.end();
  // });

  routes.get('/grant', async (req, res) => {
    const tokenId = req.query.token;

    if (tokenId === undefined || typeof tokenId !== 'string') {
      console.error('token not defined in grant request, or is not a string');
      res.status(400);
      res.end();
      return;
    }

    // TODO (cthompson) sessionId is a value that should be set in the jwt, it is a value that the session for the backend and secure frame share
    const sessionId = '1234';

    try {
      const tokenGrant = await lunaSec.grants.create(sessionId, tokenId);
      res.json({
        grant: tokenGrant, // grant stringifies itself on serialization
      });
      res.end();
    } catch (e) {
      console.error('error while authorizing token grant: ', e);
      res.status(500);
      res.end();
      return;
    }
  });

  return routes;
}
