import React, {Component} from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Restaurants from './components/Restaurants'
import RightDrawer from "./components/RightDrawer";

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
            <div className="App">
                <Navbar mealsDay={this.getMealsDay}/>
                {/* <RightDrawer meals={this.state.res}/> */}
                <Restaurants/>
            </div>
        );
    }
}

export default App;
