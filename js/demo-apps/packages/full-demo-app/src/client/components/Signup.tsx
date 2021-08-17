import React, {useState} from 'react';
import {Paper, Grid, TextField, Button, FormControlLabel, Checkbox, InputLabel, makeStyles} from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'
import {LunaSecConfigContext, SecureUpload} from "@lunasec/react-sdk";

const lunaSecDomain = 'http://localhost:37766'

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing() * 2,
    },
    padding: {
        padding: theme.spacing()
    }
}))

export const SignupForm: React.FunctionComponent = () => {
    const classes = useStyles({});

    const [files, setFiles] = useState<string[]>([])

    const handleUploadChange = (tokens) => {
        setFiles(tokens)
    }

    return (
        <Paper className={classes.padding}>
            <div className={classes.margin}>
                <Grid container spacing={8} alignItems="flex-end">
                    <Grid item>
                        <Face />
                    </Grid>
                    <Grid item md={true} sm={true} xs={true}>
                        <TextField id="username" label="Username" type="email" fullWidth autoFocus required />
                    </Grid>
                </Grid>
                <Grid container spacing={8} alignItems="flex-end">
                    <Grid item>
                        <Fingerprint />
                    </Grid>
                    <Grid item md={true} sm={true} xs={true}>
                        <TextField id="username" label="Password" type="password" fullWidth required />
                    </Grid>
                </Grid>
                <Grid container spacing={8} alignItems="flex-end">
                    <Grid item>
                        <InputLabel htmlFor="drivers-license-upload">Driver's License Upload</InputLabel>
                        <SecureUpload
                            id="drivers-license-upload"
                            name="uploader"
                            filetokens={files}
                            onTokenChange={handleUploadChange}
                        />
                    </Grid>
                </Grid>
                <Grid container alignItems="center" >
                    <Grid item>
                        <FormControlLabel control={
                            <Checkbox
                                color="primary"
                            />
                        } label="Remember me" />
                    </Grid>
                    <Grid item>
                        <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">Forgot password ?</Button>
                    </Grid>
                </Grid>
                <Grid container style={{ marginTop: '10px' }}>
                    <Button variant="outlined" color="primary" style={{ textTransform: "none" }}>Signup</Button>
                </Grid>
            </div>
        </Paper>
    )
}

export const Signup: React.FunctionComponent = () => {
    const [authError, setAuthError] = useState<string>('')

    console.log(authError)

    return (
        <LunaSecConfigContext.Provider
            value={{
                lunaSecDomain: lunaSecDomain,
                authenticationErrorHandler: (_e: Error) => {
                    setAuthError('Failed to authenticate with LunaSec. \n Is a user logged in?');
                },
            }}
        >
            <SignupForm />
        </LunaSecConfigContext.Provider>
    )
}
