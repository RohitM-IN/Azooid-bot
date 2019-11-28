const Discord = require("discord.js");
const { stripIndents } = require("common-tags");
const fs = require('fs');

module.exports = {
    name: "prefix",
    category: "owner",
    description: "change prefix of the server ",
    run: async (client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.require("you dont have admin rights contact server admin");
        if(!args[0]) return message.channel.send("please enter server prefix");
        message.channel.send(`sry for intrusion but this command is yet to be applied but it can save the prefix in our database`);
        
        let prefixes = JSON.parse(fs.readFileSync("./prefixsettings.json", "utf8"));

        prefixes[message.guild.id] = {
            prefixes: args[0]
        };
        await fs.writeFile("./prefixsettings.json", JSON.stringify(prefixes), (err) => {
            if (err) throw err;
            console.log(err);
        });
        let sEmbed = new Discord.RichEmbed()
        .setColor("e8a515")
        .setTitle("Server prefix successfully changed")
        .setDescription(`New server prefix is : " ${args[0]} "`);
        
        message.channel.send(sEmbed);
        
        
    }
}