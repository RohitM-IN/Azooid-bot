const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
    name: "logger",
    category: "moderation",
    description: "Kicks the member",
    usage: "<id | mention>",
    aliases: ["log","setlog"],
    run: async (client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.require("you dont have admin rights contact server admin");
        if(!args[0]) return message.channel.send("please enter server ID");
        message.channel.send(`sry for intrusion but this command is yet to be applied but it can save the prefix in our database`);
        
        let channelID = JSON.parse(fs.readFileSync("./logger.json", "utf8"));

        channelID[message.guild.id] = {
            channelID: args[0]
        };
        await fs.writeFile("./logger.json", JSON.stringify(channelID), (err) => {
            if (err) throw err;
            console.log(err);
        });
        let sEmbed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle("Server ID successfully changed")
        .setDescription(`New server ID is : " <#${args[0]}> "`);
        
        message.channel.send(sEmbed);
    }
};
