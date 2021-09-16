import { Button, FormControl, FormHelperText, FormLabel, makeStyles, Paper, TextField } from '@material-ui/core';
import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useStoreActions } from '../store';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing() * 2,
  },
  padding: {
    padding: theme.spacing(),
  },
}));

export const Signup: React.FunctionComponent = () => {
  const classes = useStyles({});
  const history = useHistory();
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const signupThunk = useStoreActions((actions) => actions.signup);
  const signup = async (e: FormEvent) => {
    e.preventDefault();
    const data = await signupThunk({ username, password });
    if (!data.success) {
      setError(data.error);
      return;
    }
    history.push(`/${window.location.hash}`);
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
