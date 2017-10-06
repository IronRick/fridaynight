// Room.js
'use strict';

const playerClass = require('./Player.js');

module.exports.Room = 
class {
    
    constructor(roomId, roomName) {
        
        this.roomId = roomId;
        this.roomName = roomName;
        
        this.MAX_PLAYERS = 6;
        this.players = new Array(this.MAX_PLAYERS);
        this.nbActivePlayers = 0;
        
        this.initializeRoom();
        
    }

    getName() {
        return this.roomName;
    }
    
    initializeRoom() {
        for(var i=0; i<this.players.length; i++) {
            this.players[i] = null;
        }
    }
    
    showPlayers(){
        console.log("----- Players in " + this.getName() + " -----");
        for(var i=0; i<this.players.length; i++) {
            if (this.players[i] == null)
                console.log("Player " + i + ": [empty]");
            else
                console.log("Player " + i + ": " + this.players[i].getName() );
        }
    }
    
    addPlayer(newPlayer) {
        if (this.findPlayer(newPlayer) != -1)
            return false;
        
        var seatNo = this.findSeat();
        if(seatNo == -1)
            return false;
        
        this.players[seatNo] = newPlayer;
        this.nbActivePlayers += 1;
    }
    
    removePlayer(oldPlayer) {
        var position = this.findPlayer(oldPlayer);
        if (position != -1) {
            this.players[position] = null;
            this.nbActivePlayers -= 1;
        }
    }
    
    findPlayer(searchPlayer) {
        var position = -1;
        var i = 0;
        var maxPlayers = this.players.length;
        
        while ((position == -1) && (i<maxPlayers)) {
            //console.log("i=" + i + ", maxPlayers=" + maxPlayers + ", Player=" + this.players[i]);
            if (this.players[i] != null) {
                if (this.players[i].playerId == searchPlayer.playerId)
                    position = i;
            }
            i++;
        }
        return position;
    }

    findSeat() {
        var seatNo = -1;
        var i = 0;
        var maxPlayers = this.players.length;
        
        while ((seatNo == -1) && (i<maxPlayers)) {
            //console.log("i=" + i + ", maxPlayers=" + maxPlayers + ", Player=" + this.players[i]);
            if (this.players[i] == null)
                seatNo = i;
            i++;
        }
        
        return seatNo;
    }
    
};
