import React, { Component } from 'react';
import TopBar from './TopBar.js';
import BottomBar from './BottomBar.js';
import Projects from './Projects.js';
import './App.css';
import './vendor/pure-min.css';
import './vendor/grids-responsive-min.css';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {value: ''};
      this.handleChange = this.handleChange.bind(this);
    }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    
    return (
      <div className="App pure-g">
        <div className="pure-u-1 pure-g" >
          <TopBar 
            handleChange={this.handleChange} 
            value={this.state.value}/>

          <Projects 
            value={this.state.value}/>
        </div>
        <BottomBar/>
      </div>
    );
  }
}

export default App;
