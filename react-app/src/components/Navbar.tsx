import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

import Request from '../Requests'

class Navbar extends React.Component<{ mealsDay: any }, { day: Date }> {
    state = {day: new Date()};

    render() {
        let currentDates = []
        for (let i = 0; i < 7; i++) {
            currentDates.push(new Date(Date.now() + i * 24 * 60 * 60 * 1000))
        }

        return (
            <Box sx={{flexGrow: 6}}>
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
                        <div id="date-buttons">
                            {currentDates.map((x) => (
                                <Button className="date-button" id={[x.getUTCDate(), x.getUTCMonth() + 1].join('-')}
                                        variant="contained"
                                        onClick={() => {
                                            // return this.setState({day: x})
                                            //     , () => {
                                                // callback function
                                                this.props.mealsDay(Request.fetchMealsDate(x))
                                            // }
                                        }}
                                >
                                    {(x.toLocaleDateString("en-EN", {weekday: 'long'}).substr(0, 2).toUpperCase()) + " " + ([x.getUTCDate(), x.getUTCMonth() + 1].join('-'))}
                                </Button>
                            ))}
                        </div>
                        <Button color="inherit">
                            <AccountCircle/>
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>
        );
    }
}


export default Navbar
