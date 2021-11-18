import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { AccountCircle } from '@mui/icons-material';
import { Stack } from '@mui/material';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { logout } from './Firebase';
import UserAuthForm from './UserAuthForm';
import { fontSize } from '@mui/system';


export interface SimpleDialogProps {
  open: boolean;
  onClose: (value: string) => void;
}

function ProfileView(props: SimpleDialogProps) {
  const { onClose, open } = props;

  const [username, setUsername] = React.useState<String | null>();
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            setUsername(user.email);
            // ...
        } else {
            // User is signed out
            // ...
            setUsername(null);
        }
    });

  const handleClose = () => {
    onClose('0');
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
        <Stack direction="column" spacing={1} alignItems="center"justifyContent="center" sx={{minWidth: 300}}>
            <DialogTitle>UserProfile</DialogTitle>
            <AccountCircle sx={{ fontSize: 60}}></AccountCircle>
            {username && `Account: ${username}`}
            {!username && <UserAuthForm/>}
            {username && <Button onClick={logout}>Logout</Button>}
        </Stack>
    </Dialog>
  );
}

export default function ProfileViewDemo() {
    const [open, setOpen] = React.useState(false);
    const [loggedIn, setLoggedIn] = React.useState(false);
    
    const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        setLoggedIn(true);
        // ...
    } else {
        // User is signed out
        setLoggedIn(false);
    }
});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
  };

  return (
    <div>
      <span style={{fontSize: 'small'}}>
          {!loggedIn && '(Logged Out)'}
          {loggedIn && '(Logged In)'}
      </span>
      <Button color="inherit" onClick={handleClickOpen}>
                <AccountCircle/>
            </Button>
      <ProfileView
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}