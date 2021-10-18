import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar'
import Restaurants from './components/Restaurants'

class App extends Component {
  public state: { res: typeof Restaurants[] } = { // or any[]
      res: [],
  }

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
      return await this.fetchUrl('http://localhost:4000/restaurants/')
  }

  componentDidMount() {
    this.fetchRestaurants().then(response => {
        console.log("IN FETCHING", response)
        this.setState({res: response})
    })
  }

  render() {
    return (
        <div className="App">
        <Navbar

        />

          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>

          <Restaurants restaurants ={ this.state.res }/>
        </div>

    );
  }
}

export default App;
