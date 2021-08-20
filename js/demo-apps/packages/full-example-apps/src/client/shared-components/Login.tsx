import React, {useState} from 'react';
import {Paper, FormControl, FormLabel, FormHelperText, TextField, Button, makeStyles} from '@material-ui/core';
import {performLoginAPI} from "../dedicated-tokenizer/passport-auth-example/utils/api-facade";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing() * 2,
    },
    center: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    padding: {
        padding: theme.spacing()
    }
}))

export const Login: React.FunctionComponent = () => {
    const classes = useStyles({});

    const history = useHistory();
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {
        const res = await performLoginAPI(username, password);
        if (!res.success) {
            setError(res.error);
            return;
        }
        history.push('/');
    }

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
                fullWidth autoFocus required
              />
              <TextField
                className={classes.margin}
                id="username"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth required
              />
              <FormHelperText className={classes.margin}>
                  {error}
              </FormHelperText>
              <Button
                className={classes.margin}
                variant="outlined"
                color="primary"
                style={{ textTransform: "none" }}
                onClick={login}
              >
                  Login
              </Button>
          </FormControl>
      </Paper>
    )
}
