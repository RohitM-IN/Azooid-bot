const Discord = require("discord.js");
const { stripIndents } = require("common-tags");
const fs = require('fs');

module.exports = {
    name: "welcome",
    category: "owner",
    description: "change welcome channel of the server ",
    run: (client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.require("you dont have admin rights contact server admin");
        if(!args[0]) return message.channel.send("please enter channel id or #<id here>");
        
        let welcomes = JSON.parse(fs.readFileSync("./serversettings.json", "utf8"));
        

        welcomes[message.guild.id] = {
            welcomes: args[0]
        };
        fs.writeFile("./serversettings.json", JSON.stringify(welcomes ,undefined , 4), (err) => {
            if (err) throw err;
            console.log(err);
        });
        let sEmbed = new Discord.RichEmbed()
        .setColor("e8a515")
        .setTitle("Welcome channel successfully changed")
        .setDescription(`New welcome channel is : " ${ welcomes[message.guild.id].welcomes} "`);
        message.channel.send(sEmbed);
        //console.log(welcomes);
        message.channel.send(`sry or intrusion but this command is yet to be applied or having some problems so till then default channels are welcome and general`);
        
        
    }
}