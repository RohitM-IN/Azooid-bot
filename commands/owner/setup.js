const Discord = require("discord.js");
const { stripIndents } = require("common-tags");
const fs = require('fs');

module.exports = {
    name: "setup",
    category: "owner",
    description: "This will reset all the settigs of the server to default",
    aliases: ["server-setup"],
    run: async (client, message, args, db) => {
        if(!message.member.hasPermission('ADMINISTRATOR') || message.author.id == "348832732647784460") return message.channel.send("you dont have admin rights contact server admin");
        let gData = message.guild
        db.collection('guilds').doc(gData.id).set({
            'guildID': gData.id,
            'guildName': gData.name,
            'guildOwner': gData.owner.user.username,
            'guildOwnerID': gData.owner.id,
            'guildMemberCount': gData.memberCount,
            'prefix': '.',
            'welcomeChannelID': "default",
            'logchannel':'default',
            'voicelogchannel':'default',
            'guildautorole':'default'
        }).then(message.channel.send("DataBase Successdfully Created/Reset for this server!\nnow use <prefix>welcome & <prefix>log command to set their channels")) 
    /*
    message.channel.send("Do you wish to set welcome channel and log channel now?").then(msg.react)
    */
    }
}