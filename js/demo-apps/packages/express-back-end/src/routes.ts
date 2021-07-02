
import {processForm, SecureFormData} from './process-form';
import {DeploymentStage, LunaSecTokenAuthService, SecureResolver} from '@lunasec/node-sdk';

import {Router} from 'express'
const routes = Router();



const secureResolver = new SecureResolver({
  stage: DeploymentStage.DEV
});

const secureProcessForm = secureResolver.wrap(processForm);

export function createRoutes(tokenService: LunaSecTokenAuthService) {

  routes.get('/set-id-token', async function (req, res) {
    const id_token = req.query.id_token;
    if (typeof id_token !== 'string') {
      res.status(400).send({
        success: false,
        error: 'id_token is not a string',
        id_token: id_token,
      });
      return;
    }
    res.cookie('id_token', id_token);
    res.status(200).send({
      success: true,
    });
  });

  routes.get('/', async (_req, res) => {
    res.end();
  });

  routes.post('/signup', async (req, res) => {
    const ssnToken: string = req.body.ssnToken;

    if (!ssnToken) {
      console.error("ssn token is not set");
      res.status(400)
      res.end()
      return;
    }

    const formData: SecureFormData = {
      ssnToken: ssnToken
    };

    const plaintext = await secureProcessForm(formData);
    if (plaintext === undefined) {
      console.error("error when calling process form")
      res.status(500)
      res.end()
      return;
    }

    console.log(plaintext);
    res.status(200)
    res.end()
  });

  routes.get('/grant', async (req, res) => {
    const tokenId = req.query.token;

    if (tokenId === undefined || typeof tokenId !== 'string') {
      console.error("token not defined in grant request, or is not a string");
      res.status(400);
      res.end();
      return;
    }

    try {
      const tokenGrant = await tokenService.authorize(tokenId);
      res.json({
        "grant": tokenGrant // grant stringifies itself on serialization
      });
      res.end();
    } catch (e) {
      console.error("error while authorizing token grant: ", e);
      res.status(500);
      res.end();
      return;
    }
  })

  return routes;
}