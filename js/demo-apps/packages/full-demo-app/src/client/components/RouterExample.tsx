import { Typography, Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import React from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';

export const RouterExample: React.FunctionComponent = () => {
  const history = useHistory();
  const location = useLocation();
  const { slug } = useParams();

  return (
    <Card>
      <CardHeader title='Router Example' />
      <CardContent>
        <Typography>
          location.pathname: <strong>{location.pathname}</strong>
        </Typography>
        <Typography>
          "slug" parameter: <strong>{slug}</strong>
        </Typography>
        <Button variant='contained' color='primary' onClick={() => history.goBack()}>
          history.goBack()
        </Button>
      </CardContent>
    </Card>
  );
};
