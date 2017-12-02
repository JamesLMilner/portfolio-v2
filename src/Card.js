import React, { Component } from 'react';
import './Card.css'

import vex from 'vex-js';
import vexDialog from 'vex-dialog';
import 'vex-js/dist/css/vex.css';
import 'vex-js/dist/css/vex-theme-wireframe.css';

vex.registerPlugin(vexDialog);
vex.defaultOptions.className = "vex-theme-wireframe";

class Card extends Component {

  constructor() {
    super();
    console.log("Card Constructor");
    this.defaultClass = "Card pure-u-1-1 pure-u-sm-1-2 pure-u-md-1-3 pure-u-lg-1-4 ";
    this.message = "";
    this.addClass = " fadeIn ";
    this.currentCard = null;
  }

  componentDidMount() {
    
    console.log("componentDidMount")
    requestAnimationFrame(() => {
       const newClass = this.defaultClass + " " + this.currentCard._fade;
       this.currentCard.className = newClass;
    });
   
  }

  createMessage() {
    return `<h3> ${this.props.data.name} </h3>
    <p> <strong>On this project I was a</strong>: ${this.props.data.relation} </p>
    <p> <strong>What was it?</strong> ${this.props.data.snippet} </p>
    <p> <strong>Core technologies: </strong> </p> ${this.props.data.technologies} </p>
    <p> <a class="dialogLinks" href="${this.props.data.demo}" <strong>Demo Link </strong></a></p>
    <p> <a class="dialogLinks" href="${this.props.data.github}" <strong>Source Link </strong></a></p>`
  }

  confirm() {
    const message = this.createMessage();
    
    const options = {
      unsafeMessage: message,
      callback: function (value) {
          if (value) {
              console.log('Successfully destroyed the planet.')
          } else {
              console.log('Chicken.')
          }
      }
    }
    vex.dialog.buttons.YES.text = 'Coolbeans';
    vex.dialog.buttons.NO.text = "";
    vex.dialog.confirm(options);

  }

  render() {
    
    let search = this.props.value.toLowerCase();
    search = search.trim();
    
    const checkTags = this.props.data.tags.indexOf(search) !== -1;
    const checkName = this.props.data.name.toLowerCase().indexOf(search) !== -1;

    let fade = " fadeOut ";

    if (checkName || checkTags || search === "") {
      fade = " fadeIn ";
    }

    return (
      <div 
        onClick={this.confirm.bind(this)}
        ref={(card) => {
          if (card) {
            card._fade = fade; 
            this.currentCard = card; 
          }
        }}
        className={this.defaultClass + fade}>
        <div>{this.props.data.name}</div>
      </div>
    );

  }

}

export default Card;
