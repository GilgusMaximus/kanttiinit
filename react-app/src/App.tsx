import React, {Component} from 'react';
import './App.css';
import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Navbar from './components/Navbar'
import Restaurants from './components/Restaurants'
import MealDrawer from "./components/MealDrawer";
import { Restaurant as RestaurantModel} from './models/Restaurant'
import { CssBaseline, Drawer, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';

// TODO clean


const drawerWidth = 30;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  marginRight: -drawerWidth+'vw',
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: 0
  })
}));

// Transport to NAVbar component

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}
  
const AppBar = styled(Navbar, {
    shouldForwardProp: (prop) => prop !== "open"
    })<AppBarProps>(({ theme, open }) => ({
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

// END Transport to NAVbar component

class App extends Component<{}, { sideBarState: boolean, openRestaurant: RestaurantModel }> {

    state = { 
        sideBarState: true,
        openRestaurant: new RestaurantModel(),
    };

    handleSideBarState = (sideBarState: boolean, openRestaurant: RestaurantModel) => {
        let prevState = {...this.state};
        prevState.sideBarState = sideBarState;
        prevState.openRestaurant = openRestaurant;        
        this.setState(prevState);
        console.log(prevState);
    }

    handleDrawerClose = () => {
        let prevState = {...this.state};
        prevState.sideBarState = false;
        this.setState(prevState);
    }

    render() {
        return (
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Main open={this.state.sideBarState}>
                    <AppBar position="fixed" open={this.state.sideBarState}/>
                    <Restaurants onSelectRestaurant={this.handleSideBarState}/>
                </Main>
                
                <MealDrawer
                    open={this.state.sideBarState}
                    restaurant={this.state.openRestaurant}
                    drawerWidth={drawerWidth}
                    onDrawerClose={this.handleDrawerClose}
                />                
                
            </Box>
        );
    }
}

export default App;
