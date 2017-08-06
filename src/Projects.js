import React, { Component } from 'react';
import Cards from './Cards.js';
import Mountains from './Mountains.js';
import ProjectsData from './ProjectsData.js';
import "./Projects.css";

class Projects extends Component {

  constructor(props) {
      super(props);

      let cards = ProjectsData;
      cards = this.shuffleArray(cards);

      this.state = { 
        cards: cards
      }

  }

  shuffleArray(array) {

    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;

  }

  render() {
    
    return (
        <div className="Projects pure-u-1">
            <Mountains/>
            <Cards
              value={this.props.value}
              cards={this.state.cards}/>  
        </div>
    );
  }
}

export default Projects;
