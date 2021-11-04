import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

export default function ButtonAppBar() {

    let currentDates = []
    for (let i = 0; i < 7; i++) {
        currentDates.push(new Date(Date.now() + i * 24 * 60 * 60 * 1000))
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    {currentDates.map((x) => (
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            {(x.toLocaleDateString("en-EN", {weekday: 'long'}).substr(0, 2).toUpperCase()) + " " +  ([x.getUTCDate(), x.getUTCMonth()+1].join('-'))}
                        </Typography>
                    ))}
                    <Button color="inherit">
                        <AccountCircle/>
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
