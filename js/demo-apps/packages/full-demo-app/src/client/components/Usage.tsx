import { CardHeader } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';

export const Usage: React.FunctionComponent = () => (
  <Grid item xs={12}>
    <Card>
      <CardHeader title='Usage' />
      <CardContent>
        <Typography>
          <strong>npm run dev</strong> - Client and server are in watch mode with source maps, opens{' '}
          <a href='http://localhost:3000'>http://localhost:3000</a>
        </Typography>
        <Typography>
          <strong>npm run test</strong> - Runs jest tests
        </Typography>
        <Typography>
          <strong>npm run lint</strong> - Runs es-lint
        </Typography>
        <Typography>
          <strong>npm run build</strong> - <strong>dist</strong> folder will include all the needed files, both client
          (Bundle) and server.
        </Typography>
        <Typography>
          <strong>npm start</strong> - Runs <strong>node ./dist/server/server.js</strong>
        </Typography>
        <Typography>
          <strong>npm start:prod</strong> - sets <strong>NODE_ENV</strong> to <strong>production</strong> and then runs <strong>node ./dist/server/server.js</strong>. (Bypassing webpack proxy)
        </Typography>
      </CardContent>
    </Card>
  </Grid>
);
