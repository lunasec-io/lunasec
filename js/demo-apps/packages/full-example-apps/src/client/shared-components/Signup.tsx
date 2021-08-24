import { Button, FormControl, FormHelperText, FormLabel, makeStyles, Paper, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { performSignupAPI } from '../dedicated-tokenizer/passport-auth-example/utils/api-facade';

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

  const signup = async () => {
    const res = await performSignupAPI(username, password);
    if (!res.success) {
      setError(JSON.stringify(res.error));
      return;
    }
    history.push('/');
  };

  return (
    <Paper className={classes.padding}>
      <FormControl className={`${classes.margin}`} error={!!error}>
        <FormLabel>Signup</FormLabel>
        <TextField
          className={classes.margin}
          id='username'
          label='Username'
          type='email'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          autoFocus
          required
        />
        <TextField
          className={classes.margin}
          id='username'
          label='Password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
        />
        {error ? <FormHelperText className={classes.margin}>{error}</FormHelperText> : null}
        <Button
          className={classes.margin}
          variant='outlined'
          color='primary'
          style={{ textTransform: 'none' }}
          onClick={signup}
        >
          Signup
        </Button>
      </FormControl>
    </Paper>
  );
};
