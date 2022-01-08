require('dotenv').config();

import Express from 'express';

const app = Express();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
