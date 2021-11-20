import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled, useTheme } from "@mui/material/styles";
import ProfileViewDemo from './SimpleDialog';

const NDAYS = 7;

type onSelectMealsDateType = (day: Date) => void;

class Bar extends React.Component<
    { onSelectMealsDate: onSelectMealsDateType },
    { currentDates: Date[], showUserUi: boolean, selectedDate: number }> {

    state = { currentDates: [new Date()], showUserUi: false, selectedDate: 0 };

    componentDidMount() {
        let currentDatesArray = []
        for (let i = 0; i < NDAYS; i++) {
            currentDatesArray.push(new Date(Date.now() + i * 24 * 60 * 60 * 1000))
        }
        this.setState({currentDates: currentDatesArray});
        console.log(this.state.currentDates);
    }

    handleSelectMealsDay = (day: Date) => {
        this.setState({selectedDate: this.state.currentDates.indexOf(day)})
        this.props.onSelectMealsDate(day);
    }


    render() {
        
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
                                {this.state.currentDates.map((x, index) => (
                                    <Button
                                        className="date-button"
                                        id={[x.getUTCDate(), x.getUTCMonth() + 1].join('-')}
                                        variant="contained"
                                        onClick={() => {this.handleSelectMealsDay(x);}}
                                        sx={{bgcolor: (this.state.selectedDate == index) ? '#1769aa' : '#2196f3'}}
                                    >
                                        {(x.toLocaleDateString("en-EN", {weekday: 'long'}).substr(0, 2).toUpperCase()) + " " + ([x.getUTCDate(), x.getUTCMonth() + 1].join('-'))}
                                    </Button>
                                ))}
                            </div>
                        <ProfileViewDemo></ProfileViewDemo>
                    </Toolbar>
                </AppBar>
            </Box>
        );
    }
}


interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
    drawerWidth?: number;
}
  
const Navbar = styled(Bar, {
    shouldForwardProp: (prop) => prop !== "open" && prop !== "drawerWidth" 
    })<AppBarProps>(({ theme, open, drawerWidth }) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}vw)`,
        transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
        }),
        marginRight: drawerWidth+'vw'
    })
}));


export default Navbar
