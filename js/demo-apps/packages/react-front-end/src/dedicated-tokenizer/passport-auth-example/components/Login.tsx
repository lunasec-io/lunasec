import { Button, FormControl, FormHelperText, FormLabel, makeStyles, Paper, TextField } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useStoreActions } from '../store';
import { CurrentUserResponse } from '../types';

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

  const setUser = useStoreActions((actions) => actions.setUser);
  const login = async () => {
    const { data } = await axios.post<CurrentUserResponse>(`/auth/login`, { username, password });
    if (!data.success) {
      setError(data.error);
      return;
    }
    setUser(data.user);
    history.push('/');
  };

  return (
    <Paper className={classes.padding}>
      <FormControl className={`${classes.margin}`} error={!!error}>
        <FormLabel>Login</FormLabel>
        <TextField
          className={classes.margin}
          id="username"
          label="Username"
          type="email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          autoFocus
          required
        />
        <TextField
          className={classes.margin}
          id="username"
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
          onClick={login}
        >
          Login
        </Button>
      </FormControl>
    </Paper>
  );
};
