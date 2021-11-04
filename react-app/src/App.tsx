import React, {Component} from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Restaurants from './components/Restaurants'
import RightDrawer from "./components/RightDrawer";

class App extends Component {

    render() {
        return (
            <div className="App">
                <Navbar/>
                {/* <RightDrawer meals={this.state.res}/> */}
                <Restaurants/>
            </div>
        );
    }
}

export default App;
