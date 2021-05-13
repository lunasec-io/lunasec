// import crypto from 'crypto';
import express from 'express';
import {processForm, SecureFormData} from "./process-form";
// import helmet from 'helmet';

const app = express();

app.use(express.json());


app.set('view engine', 'pug');

// app.use(helmet());
// app.use((req, res, next) => {
//   res.locals.csp_nonce = crypto.randomBytes(16).toString('hex');
//   helmet.contentSecurityPolicy({
//     directives: {
//     }
//   })(req, res, next);
// });


app.get('/', async (_req, res) => {
  res.render('index');
});

app.post('/signup', async (req, _res) => {
  const ssnToken: string = req.body.ssnToken;

  if (!ssnToken) {
    console.error("ssn token is not set");
    return;
  }

  const formData: SecureFormData = {
    ssnToken: ssnToken
  };

  const plaintext = await processForm(formData);
  console.log(plaintext);
});

export default app;
