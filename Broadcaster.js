// Broadcaster.js
'use strict';

const WebSocket = require('ws');
const lobbyClass = require('./Lobby.js');

//const roomClass = require('./Room.js');

module.exports.Broadcaster = 
class {
    
    constructor(wss) {
        this.wss = wss;
        this.lobby = new lobbyClass.Lobby("Main Lobby");
        
        this.lobby.addRoom(1, "Low stakes");
        this.lobby.addRoom(2, "Medium stakes");
        this.lobby.addRoom(3, "High rollers stakes");
        
        console.log("Lobby created: " + this.lobby.lobbyName + " - " + this.lobby.rooms.length + " tables.");
        this.lobby.displayRooms();
    }


    
    broadcast_lobby() {
        this.wss.clients.forEach(
            function each(client) {
                if (client.readyState === WebSocket.OPEN) {
                    //console.log("BROADCAST Lobby -- " + client.player.nickName);
                    //console.log("lobby.rooms: " + this.build_JSON("lobby", this.lobby.rooms) );
                    
                    
                    client.send(this.build_JSON("lobby", this.lobby.rooms) );
                }
            }, this
        )
    }
    
    broadcast_chat(chat_msg) {
        this.wss.clients.forEach(
            function each(client) {
                if (client.readyState === WebSocket.OPEN) {
                    //console.log("BROADCAST Chat -- " + client.player.nickName);
                    client.send(this.build_JSON("chat", [chat_msg]));
                }
            }, this
        )
    }
    
    build_JSON(action, params) {
        var myObj = {
            fridaynight_msg: {
                message: {
                    action: "",
                    params: []
                }
            }
        };
        
        myObj.fridaynight_msg.message.action = action;
        myObj.fridaynight_msg.message.params = params;
        
        return JSON.stringify(myObj);
    }
    
};
