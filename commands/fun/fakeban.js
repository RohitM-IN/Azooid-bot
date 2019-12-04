const fs = require('fs');
const Discord = require('discord.js');
module.exports = {
    name: 'fakeban',
    description: 'Bans a user from the server*. Oh, not really though, just to mess with them.',
    botPermission: '',
    userTextPermission: '',
    userVoicePermission: '',
    usage: 'fakeBan [ @USER_MENTION | USER_ID ]',
    run: async (client, message, args ) => {
  
        let embed = new Discord.RichEmbed()
        .setTitle(`:warning:`)
        .setDescription(`**${message.author.tag}** has banned **${args[0]}** from this server.`)
        .setFooter(`Oh, just kidding! XD`)
        message.channel.send(embed)
        

    }
    
}
