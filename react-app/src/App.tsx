import React, {Component} from 'react';
import './App.css';
import './components/root.css';
import Navbar from './components/Navbar'
import Restaurants from './components/Restaurants'
import RightDrawer from "./components/RightDrawer";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
      fontFamily: [
        'Open Sans'
      ].join(','),
   },});

class App extends Component {
    state = {
        day: new Date()
    }

    getMealsDay = (mealVal: any) => {
        this.setState({mealsDay: mealVal}, () => {
            console.log(mealVal)
        })
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
            <div className="App">
                <Navbar mealsDay={this.getMealsDay}/>
                {/* <RightDrawer meals={this.state.res}/> */}
                <Restaurants/>
            </div>
            </ThemeProvider>
        );
    }
}

export default App;
