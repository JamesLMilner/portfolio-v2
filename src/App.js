import React, { Component } from 'react';
import TopBar from './TopBar.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TopBar/>
        <div className="Projects">
          <p> hello </p>
        </div>
      </div>
    );
  }
}

export default App;
