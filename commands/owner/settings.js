const Discord = require("discord.js");
const { stripIndents } = require("common-tags");
const fs = require('fs');
const config1 = require("../../config.json");


module.exports = {
    name: "settings",
    category: "owner",
    description: "Displays all the settings of the server ",
    aliases: ["setting","setup"],
    run: async (client, message) => {
        // if(!message.member.hasPermission('ADMINISTRATOR')) return message.require("you dont have admin rights contact server admin");
        // if(!args[0]) return message.channel.send("please enter server prefix");
        
        let prefixes = JSON.parse(fs.readFileSync("./prefixsettings.json", "utf8"));
        let prefix = prefixes[message.guild.id].prefixes ;
        let welcomes = JSON.parse(fs.readFileSync("./serversettings.json", "utf8"));
        let welcome = welcomes[message.guild.id].welcomes;
       
        let sEmbed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle("Server settings are")
        .setDescription(`server prefix is \ \ \ \ **  ${prefix}  **    and **  ${config1.prefix_mention} ** \nserver welcome channel is:${welcome} "`);
        message.channel.send(sEmbed);
        
        
    }
}