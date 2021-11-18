import { Backdrop, Box, Button, CircularProgress, Input, TextField } from '@mui/material';
import React, { MouseEventHandler, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AccountCircle } from '@mui/icons-material';


const ProfileField = (props: any) => {
    const [username, setUsername] = useState<string | null>('');
    const [isShowing, setIsShowing] = useState<boolean>(false);
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
      };
      const handleToggle = () => {
        setOpen(!open);
      };
    const auth = getAuth();
    
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            setUsername(user.email)
            // ...
        } else {
            // User is signed out
            // ...
        }
    });

    return (
        <div>
            <Button color="inherit" onClick={handleToggle}>
                <AccountCircle/>
            </Button>
            <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
            >
                <CircularProgress></CircularProgress>
            </Backdrop>  
        </div>
    )
}

export default ProfileField;
