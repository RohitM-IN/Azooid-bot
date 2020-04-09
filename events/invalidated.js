const Discord = require("discord.js");

module.exports = async (client) => {
    console.log('[log] [client] client invalidated destroying client....');
    client.destroy();
}