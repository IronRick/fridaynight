// Deck.js
'use strict';

module.exports.Deck = 
class {

    constructor() {
        //console.log("DECK constructor");
        this.cards = new Array();
        this.deckIndex = 0;
        
        this.initializeDeck();
    }

    //set name(name) {this._name = name;}
    //get name() {return this._name;}
    
    
    // Deal the next card by returning the next card number on the cardIndex
    dealNextCard() {
        var nextCard = this.cards[this.deckIndex];
        
        this.deckIndex++;
        return nextCard;
    }
    
    // Debug only: show th array of cards
    showDeck() {
        console.log("Deck = " + this.cards);
    }
    
    // Function to shuffle the deck using the Fisher-Yates shuffle method
    shuffleDeck () {
        var i = 0;
        var j = 0;
        var temp = null;

        for (i = this.cards.length - 1; i > 0; i -= 1) {
            j = Math.floor(Math.random() * (i + 1));
            temp = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = temp;
        }    
    }
    
    // Create the cards array (from 0 to 51)
    initializeDeck () {
        this.cards = new Array();
        
        for (var i = 0; i < 52; i++) {
            this.cards.push(i);
        }
    }
    
    
}

;





// Server.js
//
// var Deck = require('./Deck');
// var myDeck = new Deck();