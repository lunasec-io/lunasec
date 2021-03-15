import crypto from 'crypto';
import express from 'express';
import helmet from 'helmet';

const app = express();

app.set('view engine', 'pug');

app.use(helmet());
app.use((req, res, next) => {
  res.locals.nonce = crypto.randomBytes(16).toString('hex');
  helmet.contentSecurityPolicy({
    directives: {
      scriptSrc: ["'self'", "'unsafe-inline'", `'nonce-${res.locals.nonce}'`],
      objectSrc: "'none'",
      defaultSrc: "'none'",
      frameAncestors: 'http://localhost:5001',
//      childSrc: 'http://localhost:5002',
      baseUri: "'none'",
      requireTrustedTypesFor: "'script'",
      reportUri: 'http://localhost:5004'
    }
  })(req, res, next);
});

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  // res.header.
  res.render('index');
});

app.listen(5002, () => {
  console.log('listening on http://localhost:5002/');
});


