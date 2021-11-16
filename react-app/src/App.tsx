import React, {Component} from 'react';
import './App.css';
import './components/root.css';
import { styled, useTheme } from "@mui/material/styles";
import Navbar from './components/Navbar'
import Restaurants from './components/Restaurants'
import ImageUpload from './components/ImageUpload';
import RestaurantDrawer from "./components/RestaurantDrawer";
import { Restaurant as RestaurantModel} from './models/Restaurant'
import { Restaurants as RestaurantsModel} from './models/Restaurants'
import { CssBaseline, Drawer, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Requests from "./Requests";


const theme = createTheme({
    typography: {
      fontFamily: [
        'Open Sans',
        'sans-serif'
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
        date: new Date(),
        sideBarState: false,
        openRestaurant: new RestaurantModel(),
        restaurantList: new RestaurantsModel(),
    };

    componentDidMount() {
      this.updateRestaurantData();
    }

    updateRestaurantData() {
      Requests.fetchRestaurantsByDate(this.state.date).then((response: RestaurantsModel) => {
        let prevState = {...this.state};
        prevState.restaurantList = response;
        this.setState(prevState);
        console.log(prevState);
      });
    }

    handleChangeMealsDate = (mealdate: Date) => {
        let prevState = {...this.state};
        prevState.date = mealdate;
        this.setState(prevState, this.updateRestaurantData);
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
                          onSelectMealsDate={this.handleChangeMealsDate}
                        />
                        <Restaurants
                          restaurants={this.state.restaurantList}
                          onSelectRestaurant={this.handleSideBarState}/>
                    </Main>
                    
                    <RestaurantDrawer
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
