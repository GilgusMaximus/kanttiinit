import React, {Component} from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Restaurants from './components/Restaurants'
import MealDrawer from "./components/MealDrawer";
import { Restaurant as RestaurantModel} from './models/Restaurant'

class App extends Component<{}, { sideBarState: boolean, openRestaurant: RestaurantModel }> {
    handleSideBarState = (sideBarState: boolean, openRestaurant: RestaurantModel) => {
        let prevState = {...this.state};
        prevState.sideBarState = sideBarState;
        prevState.openRestaurant = openRestaurant;        
        this.setState(prevState);
        console.log(prevState);
    }

    render() {
        return (
            <div className="App">
                <Navbar/>
                <Restaurants onSelectRestaurant={this.handleSideBarState}/>
            </div>
        );
    }
}

export default App;
