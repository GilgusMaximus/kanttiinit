import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar'
import Restaurant from './components/Restaurant'
import Restaurants from './components/Restaurant'

class App extends Component {
  state = {
    data: null,
    res: [],
  };

  fetchUrl = async (url: string) => {
       const response: Response = await fetch(url, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
          },
      })
      return response.json();
  }

  fetchUrlParam = async (url: string,  param: string) => {
       const response: Response = await fetch(`${url}${param}/`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
          },
      })
      return response.json();
  }

  fetchRestaurants = async() => {
    this.fetchUrl('http://localhost:4000/restaurants/').then((data) => {      
      console.log(data)
      return data
      // this.setState({ res: data })
    })
  }

  componentDidMount() {
    this.fetchRestaurants()
  }

  render() {
    const restaurants = this.state.res?.map((rest, i) => (
      <p>rest: {rest}, i: {i}</p>
    ))
    return (
        <div className="App">
        <Navbar
        
        />

          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">{this.state.data}</p>

          {restaurants}
        </div>
    );
  }
}

export default App;