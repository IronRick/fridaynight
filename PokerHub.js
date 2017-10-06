// PokerHub.js
'use strict';

const broadcasterClass = require('./Broadcaster.js');

module.exports.PokerHub = 
class {
    
    constructor(wss) {
        this.hubName = "Poker HUB";
        
        this.wss = wss;
        this.brodcaster = new broadcasterClass.Broadcaster(this.wss);
    }

    
    evaluateMsg(ws, data) {
        var message = (data.message === undefined) ? {action: "none"} : data.message;
        var client_info = (data.client_info === undefined) ? {player_id: -1, player_name: "none"} : data.client_info;
        
        
        switch(message.action) {
            case "new":
                this.newPlayer(ws, message, client_info);
                break;

            case "chat":
                this.brodcaster.broadcast_chat(ws.player.nickName + ": " + message.params[0]);
                break;
                
            case "lobby":
                this.brodcaster.broadcast_lobby();
                break;
                
            case "joinroom":
                this.requestJoinRoom(ws, message, client_info);
                this.brodcaster.broadcast_lobby();
                break;
                
            case "none":
                console.log("Player (" + client_info.player_name + ") - Action:none" );
                break;
        }
    }
    
    newPlayer(ws, message, client_info) {
        console.log("Player (" + client_info.player_name + ") - Action:new" );
        ws.player.setPlayer(client_info.player_id, "First", "Last", client_info.player_name);
        
        this.brodcaster.broadcast_lobby();
        this.brodcaster.broadcast_chat(ws.player.nickName + " have joined the lobby.");
    }
    
    requestJoinRoom(ws, message, client_info) {
        if(message.params[0]) {
            console.log("Request Join Room for " + client_info.player_name + ", RoomId:" + message.params[0]);
            this.brodcaster.lobby.joinRoom(message.params[0], ws);
        }
    }
    
};