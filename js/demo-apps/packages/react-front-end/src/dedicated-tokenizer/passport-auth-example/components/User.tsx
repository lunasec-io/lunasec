import { SecureForm, SecureInput } from '@lunasec/react-sdk';
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

import {ApiResponse, CurrentUserResponse, UserModel} from '../types';

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
  setError(data.error);
}

export const User: React.FunctionComponent = () => {
  const classes = useStyles({});

  const [authError, setAuthError] = useState<string>('');
  const [saveSuccessful, setSaveSuccessful] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<UserModel | null>(null);
  const [ssnToken, setSSNToken] = useState<string | null>(null);

  const ssnValidated = (isValid: boolean) => {
    console.log(`ssn is valid? ${isValid.toString()}`);
  };

  useEffect(() => {
    void loadUser(setUser, setError); // does this only once
  }, []);

  const uploadFormData = async () => {
    if (ssnToken === null) {
      setError('ssnToken is null');
      return;
    }

    const { data } = await axios.post<ApiResponse>(`/user/me`, {
      ssnToken: ssnToken,
    });
    if (!data.success) {
      setError(JSON.stringify(data.error));
      return;
    }
    setSaveSuccessful(true);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void uploadFormData();
  };

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
          <SecureForm name="secure-form-example" onSubmit={(e) => handleFormSubmit(e)}>
            <FormGroup className={classes.margin}>
              <Typography>Id: {user.id}</Typography>
            </FormGroup>
            <FormGroup className={classes.margin}>
              <FormLabel htmlFor="ssn-token-input">Social Security Number</FormLabel>
              <SecureInput
                id="ssn-token-input"
                name="ssn"
                type="ssn"
                validator="SSN"
                onValidate={(isValid) => ssnValidated(isValid)}
                token={ssnToken || undefined}
                placeholder="XXX-XX-XXXX"
                onChange={(e) => setSSNToken(e.target.value)}
              />
            </FormGroup>
            <div className={classes.margin}>
              <Button variant="outlined" color="primary" style={{ textTransform: 'none' }} type="submit">
                Save
              </Button>
            </div>
          </SecureForm>
        </CardContent>
      </Card>
    </Grid>
  );
};
