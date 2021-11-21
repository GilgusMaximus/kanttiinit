import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { AccountCircle } from '@mui/icons-material';
import { Stack } from '@mui/material';
import { fontSize } from '@mui/system';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';

export interface PrivacyProps {
  open: boolean;
  onClose: (value: string) => void;
}

function ProfileView(props: PrivacyProps) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose('0');
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
        <Stack direction="column" spacing={1} alignItems="center"justifyContent="center" sx={{minWidth: 300}}>
            <DialogTitle>Privacy Policy</DialogTitle>
            <PrivacyTipIcon sx={{ fontSize: 60}}></PrivacyTipIcon>
            {}
            {
              "Our web service retrieves all menu data directly from the restaurants, and isn't directly responsible for the correctness of any information. Please verify the information about allergens at the restaurants. By registering to the service, your email address and your selected password is going be stored in our database. For security measures, your selected password is encrypted. Your provided data is not going to be forwarded to any other business for analytics or data distribution. By uploading meal images, you allow the website to use it. The users themselves are responsible for avoiding and preventing copyright violation. Uploading inapproriate images can have conesquences for the user."
            }
        </Stack>
    </Dialog>
  );
}

export default function Privacy() {
    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
  };

  return (
    <div>
      <Button color="inherit" onClick={handleClickOpen}>
                <PrivacyTipIcon/>
            </Button>
      <ProfileView
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}