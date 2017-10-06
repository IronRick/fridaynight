// Lobby.js
'use strict';

const roomClass = require('./Room.js');

module.exports.Lobby = 
class {
    
    constructor(lobbyName) {
        
        this.lobbyName = lobbyName;
        
        this.rooms = new Array();
        
        //this.initializeLobby();
        
    }
    
    initializeLobby() {
        for(var i=0; i<this.rooms.length; i++) {
            this.rooms[i] = null;
        }        
    }
    
    addRoom(id, roomName) {
        var room = new roomClass.Room(id, roomName);
        this.rooms.push(room);
    }
    
    getRooms() {
        
    }
    
    joinRoom(roomId, ws) {
        for(var i=0; i<this.rooms.length; i++) {
            //console.log("Search room " + i + ", RoomId=" + this.rooms[i].roomId);
            if (this.rooms[i].roomId == roomId) {
                //console.log("Adding a new player: " + ws.player.playerId);
                this.rooms[i].addPlayer(ws.player);
            }
        }
    }
    
    displayRooms() {
        for(var i=0; i<this.rooms.length; i++) {
            console.log("Room " + this.rooms[i].roomId + " - " + this.rooms[i].roomName);
        }          
    }
    
};