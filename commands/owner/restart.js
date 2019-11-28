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
    run: async (client, message, args) => {
        console.log('woring before')
        console.log(message.author.id)
        if(message.author.id !== ownerid) return message.reply("you dont have perission to use this command").then(m => m.delete(5000));
        console.log('woring after')
            // message.channel.send('Resetting...')
            // .then(msg => client.destroy())
            // .then(() => client.login(config1.token));
            channel.send('Resetting...')
            .then(msg => client.destroy())
            .then(() => client.login(process.env.TOKEN));

        }
         


      
    
}



