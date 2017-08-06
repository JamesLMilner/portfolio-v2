import React, { Component } from 'react';
import './BottomBar.css';
import reactLogo from './react.png'

class BottomBar extends Component {

  render() {
    return (
        <div className="pure-u-1 BottomBar">
          <span> 
            © James Milner, 2017 - Made using 
            <img className="reactLogo" alt="React Logo" src={reactLogo}/> 
          </span>
        </div>
    );
  }
}

export default BottomBar;
