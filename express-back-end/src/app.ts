import express from 'express';
import {processForm, SecureFormData} from './process-form';
import {DeploymentStage, SecureResolver} from '@lunasec/node-sdk';

const app = express();

app.use(express.json());

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

export default app;
