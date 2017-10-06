'use strict'

const WebSocket = require('ws');
const pokerHubClass = require('./PokerHub.js');
const playerClass = require('./Player.js');

//const util = require('util');
//const deckClass = require('./Deck.js');
//const roomClass = require('./Room.js');
//const lobbyClass = require('./Lobby.js');
//const Hand = require('pokersolver').Hand;


const wss = new WebSocket.Server({ port: 8080 });
const mainHub = new pokerHubClass.PokerHub(wss);


wss.on('connection', function connection(ws) {

    ws.player = new playerClass.Player(-1, "", "");
    
    ws.on('message', function incoming(msg) {
        try{
            var data = JSON.parse(msg);
            
            if(data.fridaynight_msg) {
                mainHub.evaluateMsg(ws, data.fridaynight_msg);
            }
        
        } catch(e) {
            ws.send("error with server: " + e.toString());
        }
    });
});



// Broadcast to all.
/*
wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
};
*/
// util.inspect(ws,  { showHidden: false, depth: 2 })

/*

function testCode () {
    var myDeck = new deckClass.Deck();

    myDeck.shuffleDeck();
    //myDeck.showDeck();

    var room = new roomClass.Room(1, "Private Game Room");

    var allRooms = new Array();
    
    allRooms.push(room);
    
    testRoom(allRooms[0]);    

    allRooms[0].showPlayers();
};

function testRoom (room) {
    var p1 = new playerClass.Player(1, "Gratton", "Bob");
    var p2 = new playerClass.Player(2, "Blow", "Joe");
    var p3 = new playerClass.Player(3, "Sparrow", "Jack");

    room.addPlayer(p1);
    room.addPlayer(p3);
    room.addPlayer(p2);

    room.removePlayer(p3);
    room.addPlayer(p1);
    room.removePlayer(p1);
    room.addPlayer(p3);
    room.addPlayer(p3);
    room.addPlayer(p1);
}

function testHand () {
    var hand = Hand.solve(['Ad', 'As', 'Jc', 'Th', '2d', 'Qs', 'Qd']);
    var hand2 = Hand.solve(['Ad', 'As', 'Jc', 'Qh', '2d', 'Qs', 'Qd']);
    console.log(hand.name); // Two Pair
    console.log(hand.descr); // Two Pair, A's & Q's    
    
    
    var winner = Hand.winners([hand, hand2])[0];
    console.log(winner.descr);
}

*/
