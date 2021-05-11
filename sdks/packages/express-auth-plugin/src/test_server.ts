import express from 'express';
import cors from 'cors';
import {authPlugin} from "./index";

const app = express();
app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200,
}))

app.get('/set-id-token',async function(req, res) {
  const id_token = req.query.id_token;
  if (typeof id_token !== 'string') {
    res.status(400).send({
      'success': false,
      'error': 'id_token is not a string',
      'id_token': id_token
    });
    return
  }
  res.header('Set-Cookie', `id_token: ${id_token}`)
  res.status(200).send({
    'success': true
  })
});

authPlugin(app);

app.listen(3001, () => console.log('Example app is listening on port 3001.'));
