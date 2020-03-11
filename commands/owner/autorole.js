const Discord = require("discord.js");
const { stripIndents } = require("common-tags");
const fs = require('fs');

module.exports = {
    name: "autorole",
    category: "owner",
    description: "sets auto role for new members of the server ",
    run: async (client, message, args) => {
        if(!message.member.hasPermission('MANAGE_ROLES')) return message.require("you dont have admin rights contact server admin");
        if(!args[0]) return message.channel.send("please enter the roll name");
        message.channel.send(`sry for intrusion but this command is yet to be applied but data is saved in our database`);
        
        let roles = JSON.parse(fs.readFileSync("./role.json", "utf8"));

        roles[message.guild.id] = {
            roles: args[0]
        };
        await fs.writeFile("./role.json", JSON.stringify(roles), (err) => {
            if (err) throw err;
            console.log(err);
        });
        let sEmbed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle("Server autoroll successfully added/changed")
        .setDescription(`New server autoroll is : " ${args[0]} "`);
        
        message.channel.send(sEmbed);
        
        
    }
}