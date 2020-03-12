const Discord = require("discord.js");
const config1 = require("../../config.json");
const ownerid = "348832732647784460";
const { inspect } = require("util");
const { config } = require("dotenv");
config({
    path: __dirname + "/.env"
});

  module.exports = {
    name: "restart",
    category: "owner",
    description: "reboot bot command",
    clientPermissions: ["EMBED_LINKS","SEND_MESSAGES"],
	userPermissions:["VIEW_CHANNEL","ADMINISTRATOR"],
    run: async (client, message, args) => {
        if(message.author.id !== ownerid) return message.reply("Bot Owner can only use this command").then(m => m.delete(5000));
            // message.channel.send('Resetting...')
            // .then(msg => client.destroy())
            // .then(() => client.login(config1.token));
            channel.send('Resetting...')
            .then(msg => client.destroy())
            .then(() => client.login(process.env.TOKEN));

        }
         


      
    
}



