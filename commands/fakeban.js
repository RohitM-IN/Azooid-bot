const fs = require('fs');
const Discord = require('discord.js');
exports.run = async (client, message, args ) => {
  
        let embed = new Discord.MessageEmbed()
        .setTitle(`:warning:`)
        .setDescription(`**${message.author.tag}** has banned **${args[0]}** from this server.`)
        .setFooter(`Oh, just kidding! XD`)
        message.channel.send(embed)
        

    }

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
  };

  exports.help = {
    name: 'fakeban',
    description: 'Bans a user from the server*. Oh, not really though, just to mess with them.',
    usage: 'fakeBan [ @USER_MENTION | USER_ID ]',
    category: "Fun",
  };