// Player.js
'use strict';

module.exports.Player = 
class {

    constructor(playerId, firstName, lastName, nickName) {
        this.setPlayer(playerId, firstName, lastName, nickName);
    }

    getName() {
        return this.firstName + " " + this.lastName;
    }
    
    getNickName() {
        return this.nickName;
    }
    
    setPlayer(playerId, firstName, lastName, nickName) {
        this.playerId = playerId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.nickName = nickName;
    }
    
};
