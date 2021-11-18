import { Button, Grid, Input, Stack, TextField } from '@mui/material';
import React, { MouseEventHandler, useState } from 'react';
import  { login, register } from './Firebase';

const UserAuthForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleRegister(event: any) {
        event.preventDefault();
        register({username: username, password: password});
    }
    function handleLogin(event: any) {
        event.preventDefault();
        login({username: username, password: password});
    }
    return (
        <Stack>
            <Grid container spacing={1} alignItems="center"justifyContent="center">
                <Grid item xs={'auto'}>
                    <TextField label="Username" onBlur={(event) => setUsername(event.target.value)}></TextField>
                </Grid>
                <Grid item xs={'auto'}>
                    <TextField type={'password'} label="Password" onBlur={(event) => setPassword(event.target.value)}> </TextField>
                </Grid>
            </Grid>
            <Grid container spacing={1} alignItems="center"justifyContent="center">
            <Grid item xs={'auto'} alignItems="center" justifyContent="center">
                <Button onClick={handleRegister}>Register</Button>
            </Grid>
            <Grid item xs={'auto'} alignItems="center" justifyContent="center">
                <Button onClick={handleLogin}>Login</Button>
            </Grid>
            </Grid>
        </Stack>
    )
};

export default UserAuthForm;
