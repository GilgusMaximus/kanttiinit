import { Button, Input, TextField } from '@mui/material';
import React, { MouseEventHandler, useState } from 'react';


const LoginForm = (props: any) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin(event: any) {
        event.preventDefault();
        props.loginFun({username: username, password: password});
    }

    return (
        <div>
            <TextField label="Username" onBlur={(event) => setUsername(event.target.value)}></TextField>
            <TextField type={'password'} label="Password" onBlur={(event) => setPassword(event.target.value)}> </TextField>
            <Button onClick={handleLogin}>LogIn</Button>
        </div>
    )
};

export default LoginForm;
