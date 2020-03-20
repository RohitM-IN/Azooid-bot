const config = require("../config.js");

module.exports =  (client , shardID) => {
    
    console.log(`The WebSocket has closed and will no longer attempt to reconnect`);
    client.destroy()
    client.login(client.config.token)
    // client.destroy().then(client.login(config1.token))

}

