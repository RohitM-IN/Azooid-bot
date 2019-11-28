const { config } = require("dotenv");
const config1 = require("../config.json");

module.exports =  (client) => {
    
    console.log(`The WebSocket has closed and will no longer attempt to reconnect`);
    client.destroy().then(client.login(process.env.TOKEN))
    // client.destroy().then(client.login(config1.token))

}

