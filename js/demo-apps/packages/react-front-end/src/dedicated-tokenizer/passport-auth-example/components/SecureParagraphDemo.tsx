import { SecureParagraph } from '@lunasec/react-sdk';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  FormGroup,
  FormLabel,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { ApiResponse, CurrentUserResponse, UserModel } from '../types';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing() * 2,
  },
  padding: {
    padding: theme.spacing(),
  },
}));

async function loadUser(setUser: React.Dispatch<any>, setError: React.Dispatch<React.SetStateAction<string | null>>) {
  const { data } = await axios.get<CurrentUserResponse>(`/user/me`);
  if (data.success) {
    setUser(data.user);
    return;
  }
  return setError(data.error);
}

export const SecureParagraphDemo: React.FunctionComponent = () => {
  // const classes = useStyles({});

  // const [authError, setAuthError] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<UserModel | null>(null);

  useEffect(() => {
    void loadUser(setUser, setError); // does this only once
  }, []);

  if (!user) {
    return (
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <p>Loading...</p>
          </CardContent>
        </Card>
      </Grid>
    );
  }

  return (
    <Grid item xs={12}>
      {error !== null ? (
        <Card>
          <CardHeader title={'Error'} />
          <CardContent>
            <p>{error}</p>
          </CardContent>
        </Card>
      ) : null}
      <Card>
        <CardHeader title={`User: ${user.username}`} />
        <CardContent>
          <Typography>
            <p>Social Security Number:</p>
            <SecureParagraph token={user.ssn_token} />
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};
