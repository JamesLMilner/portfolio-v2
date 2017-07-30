import React, { Component } from 'react';
import Mountains from './Mountains.js';
import './TopBar.css';

class Top extends Component {

  render() {
    return (
        <div className="TopBar">
          <h2>Portfolio</h2>
          <Mountains/>
        </div>
    );
  }
}

export default Top;
