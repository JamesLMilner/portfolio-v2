import React, { Component } from 'react';
import './TopBar.css';

class TopBar extends Component {

  render() {
    return (
        <div className="TopBar">
          <h1>Portfolio</h1>
          <input 
            placeholder="Search..." 
            className="Search" 
            type="text" 
            value={this.props.value} 
            onChange={this.props.handleChange} />
        </div>
    );
  }
}

export default TopBar;
