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
import { useHistory, useRouteMatch } from 'react-router-dom';

import { useStoreActions } from '../store';
import { Transport } from '../types';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing() * 2,
  },
  padding: {
    padding: theme.spacing(),
  },
}));

export const Signup: React.FunctionComponent<{
  transport: Transport;
}> = (props) => {
  const classes = useStyles({});
  const history = useHistory();
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const signupThunk = useStoreActions((actions) => actions.signup);
  const match = useRouteMatch<{ mode: string }>(`/:mode`);

  const signup = async (e: FormEvent) => {
    e.preventDefault();
    const data = await signupThunk({ transport: props.transport, username, password });
    if (!data.success) {
      setError(data.error);
      return;
    }

    // Send us to the first example
    if (match && match.params.mode) {
      history.push(`/${match.params.mode}/secureinput`);
    }
  };

  return (
    <Paper className={classes.padding}>
      <form id="signup-form" onSubmit={(e) => signup(e)}>
        <FormControl className={`${classes.margin}`} error={!!error}>
          <FormLabel>Signup</FormLabel>
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
          {error ? <FormHelperText className={classes.margin}>{error}</FormHelperText> : null}
          <Button
            className={classes.margin}
            variant="outlined"
            color="primary"
            style={{ textTransform: 'none' }}
            type="submit"
          >
            Signup
          </Button>
        </FormControl>
      </form>
    </Paper>
  );
};
