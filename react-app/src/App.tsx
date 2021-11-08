import React, {Component} from 'react';
import './App.css';
import './components/root.css';
import { styled, useTheme } from "@mui/material/styles";
import Navbar from './components/Navbar'
import Restaurants from './components/Restaurants'
import MealDrawer from "./components/MealDrawer";
import { Restaurant as RestaurantModel} from './models/Restaurant'
import { CssBaseline, Drawer, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ThemeProvider, createTheme } from '@mui/material/styles';


const theme = createTheme({
    typography: {
      fontFamily: [
        'Open Sans'
      ].join(','),
   },});

const drawerWidth = 35;

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



class App extends Component<{}, { sideBarState: boolean, openRestaurant: RestaurantModel }> {

    state = {
        day: new Date(),
        sideBarState: false,
        openRestaurant: new RestaurantModel(),
    };

    handleChangeMealsDay = (mealDay: Date) => {
        let prevState = {...this.state};
        prevState.day = mealDay;
        this.setState(prevState);
        console.log(prevState);
    }

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
            <ThemeProvider theme={theme}>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <Main open={this.state.sideBarState}>
                        <Navbar 
                          position="fixed"
                          open={this.state.sideBarState}
                          drawerWidth={drawerWidth}  
                          onSelectMealsDay={this.handleChangeMealsDay}
                        />
                        <Restaurants onSelectRestaurant={this.handleSideBarState}/>
                    </Main>
                    
                    <MealDrawer
                        open={this.state.sideBarState}
                        restaurant={this.state.openRestaurant}
                        drawerWidth={drawerWidth}
                        onDrawerClose={this.handleDrawerClose}
                    />                
                    
                </Box>
            </ThemeProvider>
        );
    }
}

export default App;
