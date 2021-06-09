import express from 'express';
import {processForm, SecureFormData} from './process-form';
import {DeploymentStage, LunaSecExpressAuthPlugin, LunaSecTokenAuthService, SecureResolver} from '@lunasec/node-sdk';
import {SecretProviders} from "@lunasec/node-sdk/build/main/token-auth-service/types";

const app = express();

app.use(express.json());

const tokenService = new LunaSecTokenAuthService({
  secretProvider: {
    type: SecretProviders.environment,
  }
});

const authPlugin = new LunaSecExpressAuthPlugin({tokenService});

authPlugin.register(app);

const secureResolver = new SecureResolver({
  stage: DeploymentStage.DEV
});

const secureProcessForm = secureResolver.wrap(processForm);

app.get('/', async (_req, res) => {
  res.render('index');
});

app.post('/signup', async (req, res) => {
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

app.get('/profile', async (_req, res) => {
  try {
    const tokenGrant = await tokenService.authorize("lunasec-2ce7db69-6668-403a-9878-3a9de04ea806")
    res.json({
      "ssn": tokenGrant.toString()
    })
    res.end()
  } catch (e) {
    console.error(e);
  }
})

export default app;
