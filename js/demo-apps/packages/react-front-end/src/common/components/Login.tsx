import { Button, FormControl, FormHelperText, FormLabel, makeStyles, Paper, TextField } from '@material-ui/core';
import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useStoreActions } from '../store';

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

export const Login: React.FunctionComponent = () => {
  const classes = useStyles({});

  const history = useHistory();
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginThunk = useStoreActions((actions) => actions.login);
  const login = async (e: FormEvent) => {
    e.preventDefault();
    const data = await loginThunk({ username, password });
    if (!data.success) {
      setError(data.error);
      return;
    }
    history.push('/');
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
