import { Button, Input, TextField } from '@mui/material';
import React, { MouseEventHandler, useState } from 'react';


const RegisterForm = (props: any) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleRegister(event: any) {
        event.preventDefault();
        props.registerFun({username: username, password: password});
    }
    return (
        <div>
            <TextField label="Username" onBlur={(event) => setUsername(event.target.value)}></TextField>
            <TextField type={'password'} label="Password" onBlur={(event) => setPassword(event.target.value)}> </TextField>
            <Button onClick={handleRegister}>Register</Button>
        </div>
    )
};

export default RegisterForm;
