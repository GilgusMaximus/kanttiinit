import { Input, TextField } from '@mui/material';
import React, { MouseEventHandler, useState } from 'react';


const RegisterForm = (props: any) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(event: any) {
        event.preventDefault();
        console.log(username, password)
    }

    return (
        <form>
            <TextField label="Username" onBlur={(event) => setUsername(event.target.value)}></TextField>
            <TextField type={'password'} label="Password" onBlur={(event) => setPassword(event.target.value)}> </TextField>
            <Input type="submit" value="Submit" onClick={handleSubmit}></Input>
        </form>
    )
};

export default RegisterForm;
