import React, { Component } from 'react';
import './Cards.css';
import Card from './Card.js';

class Cards extends Component {

  createCards(cardsData) {
    const cards = [];
    cardsData.forEach((project, i) => {
      cards.push(
        <Card 
          data={project}
          key={i}
          value={this.props.value}/>
      );
    });
    return cards
  }

  render() {
    const cards = this.createCards(this.props.cards);
    return (
      <div className="Cards">
        {cards}
      </div>
    );
  }
}

export default Cards;
