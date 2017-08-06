import React, { Component } from 'react';
import './Card.css'

import 'vex-js/dist/css/vex.css';
import 'vex-js/dist/css/vex-theme-wireframe.css';

var vex = require('vex-js');
vex.registerPlugin(require('vex-dialog'));
vex.defaultOptions.className = "vex-theme-wireframe";

class Card extends Component {

  constructor() {
    super();
    this.message = "";
  }

  createMessage() {
    return `<h3> ${this.props.data.name} </h3>
    <p> <strong>On this project I was a</strong>: ${this.props.data.relation} </p>
    <p> <strong>What was it?</strong> ${this.props.data.snippet} </p>
    <p> <strong>Core Technologies: </strong> </p> ${this.props.data.technologies} </p>
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
    const search = this.props.value.toLowerCase();
    const check = this.props.data.tags.indexOf(search);
    
    if (check !== -1 || search === "") {
       return (
        <div 
          onClick={this.confirm.bind(this)}
          className="Card pure-u-1-1 pure-u-sm-1-2 pure-u-md-1-3 pure-u-lg-1-4 fadeIn fadeOut">
          <div>{this.props.data.name}</div>
        </div>
      );
    } else {
        return null
    }

  }

}

export default Card;