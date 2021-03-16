import crypto from 'crypto';
import express from 'express';
import helmet from 'helmet';

const app = express();

app.set('view engine', 'pug');

// This intentionally has a very insecure default
// app.use(helmet());
// app.use((req, res, next) => {
  // res.locals.nonce = crypto.randomBytes(16).toString('hex');
  // helmet.contentSecurityPolicy({
  //   directives: {
  //     scriptSrc: ["'self'", "'unsafe-inline'", `'nonce-${res.locals.nonce}'`],
  //     objectSrc: "'none'",
  //     defaultSrc: "'none'",
  //     childSrc: 'http://localhost:5002',
  //     baseUri: "'none'",
  //     requireTrustedTypesFor: "'script'",
  //     reportUri: 'http://localhost:5004'
  //   }
  // })(req, res, next);
// });

app.use('/static', express.static('./static'));

app.get('/', (req, res) => {
  // res.header.
  res.render('index');
});

app.get('/submit', (req, res) => {
  console.log('form values:', req.query);

  res.locals.firstName = req.query.firstName;
  res.locals.lastName = req.query.lastName;

  res.render('reflect-values');
})

app.listen(5001, () => {
  console.log('listening on http://localhost:5001/');
});


