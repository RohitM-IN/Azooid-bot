const Discord = require("discord.js");
const { stripIndents } = require("common-tags");
const fs = require('fs');

module.exports = {
    name: "reset",
    category: "owner",
    description: "This will reset all the settigs of the server to default",
    aliases: ["reset-settings","settings-delete"],
    clientPermissions: ["EMBED_LINKS","SEND_MESSAGES"],
	userPermissions:["VIEW_CHANNEL","ADMINISTRATOR"],
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
        }).then(message.channel.send("Updated"))

        
        
    }
}