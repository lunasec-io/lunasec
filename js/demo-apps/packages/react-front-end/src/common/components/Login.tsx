/*
 * Copyright 2021 by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { Button, FormControl, FormHelperText, FormLabel, makeStyles, Paper, TextField } from '@material-ui/core';
import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useStoreActions } from '../store';
import { Transport } from '../types';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing() * 2,
  },
  center: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  padding: {
    padding: theme.spacing(),
  },
}));

export const Login: React.FunctionComponent<{
  transport: Transport;
}> = (props) => {
  const classes = useStyles({});

  const history = useHistory();
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const loginThunk = useStoreActions((actions) => actions.login);
  const login = async (e: FormEvent) => {
    e.preventDefault();
    const data = await loginThunk({ transport: props.transport, username, password });
    if (!data.success) {
      setError(data.error);
      return;
    }
    history.push(`/${window.location.hash}`);
  };

  return (
    <Paper className={classes.padding}>
      <form id="login-form" onSubmit={(e) => login(e)}>
        <FormControl className={`${classes.margin}`} error={!!error}>
          <FormLabel>Login</FormLabel>
          <TextField
            className={classes.margin}
            id="username"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            autoFocus
            required
          />
          <TextField
            className={classes.margin}
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
          />
          <FormHelperText className={classes.margin}>{error}</FormHelperText>
          <Button
            className={classes.margin}
            variant="outlined"
            color="primary"
            style={{ textTransform: 'none' }}
            type="submit"
          >
            Login
          </Button>
        </FormControl>
      </form>
    </Paper>
  );
};
