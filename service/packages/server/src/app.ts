import crypto from 'crypto';
import express from 'express';
import helmet from 'helmet';

const app = express();

app.set('view engine', 'pug');

app.use(helmet());
app.use((req, res, next) => {
  res.locals.csp_nonce = crypto.randomBytes(16).toString('hex');
  helmet.contentSecurityPolicy({
    directives: {
      scriptSrc: ['\'none\'', '\'unsafe-inline\'', `'nonce-${res.locals.csp_nonce}'`],
      connectSrc: ['http://localhost:5002'],
      objectSrc: '\'none\'',
      defaultSrc: '\'none\'',
      frameAncestors: 'http://localhost:3000/',
      baseUri: '\'none\'',
      requireTrustedTypesFor: '\'script\'',
      reportUri: 'http://localhost:5004',
      styleSrc: ['\'none\'', '\'unsafe-inline\'', `'nonce-${res.locals.csp_nonce}'`]
    }
  })(req, res, next);
});

app.use('/frame/public/js', express.static(process.env.JS_STATIC_PATH || 'public/js'));
app.use('/frame/public', express.static(process.env.STATIC_PATH || 'public'));

app.use((_req, res, next) => {
  // TODO: Parse out the environment variable and whitelist it in the CSP policy.
  res.locals.js_script_url = process.env.JS_SCRIPT_URL || '/frame/public/js/main-dev.js';

  next();
});


// TODO: Move this to a POST request API call so that this token doesn't persist in Browser logs.
app.get('/frame', async (req, res) => {
  const referer = req.headers.referer;

  // TODO: Return errors as HTML?
  if (!referer) {
    res.status(400).json({
      error: true,
      message: 'Missing origin for request'
    });
    return;
  }

  res.locals.request_origin = referer;

  res.render('index');
});
//
// app.post('/tokenize', bodyParser.json(), async (req, res) => {
//   if (typeof req.body !== 'object') {
//     res.status(400);
//     res.json({
//       success: false,
//       error: 'Invalid body for request'
//     });
//     return;
//   }
//
//   // TODO: We assume that we're going to generate a new token every time currently.
//   // TODO: Eventually we will likely want to be able to "overwrite" a Token's value.
//   // if (req.body.token === undefined || typeof req.body.token !== 'string') {
//   //   res.status(400);
//   //   res.json({
//   //     success: false,
//   //     error: 'Invalid token specified to tokenize'
//   //   });
//   //   return;
//   // }
//
//   if (req.body.value === undefined || typeof req.body.value !== 'string') {
//     res.status(400);
//     res.json({
//       success: false,
//       error: 'Invalid value specified to tokenize'
//     });
//     return;
//   }
//
//   const response = await tokenizeValue(req.body.value);
//
//   if (!response.success) {
//     res.status(500);
//     res.json({
//       success: false,
//       error: 'Unable to tokenize value',
//       internalError: true
//     });
//     return;
//   }
//
//   res.json({
//     success: true,
//     tokenId: response.tokenId
//   });
// });

// TODO: Add metadata endpoints

export default app;
