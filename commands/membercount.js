const { MessageEmbed } = require("discord.js");


exports.run = async (client, message, args) => {
    const role = message.guild.roles.cache.size;
    const online = (message.guild.members.cache.filter(m => m.presence.status != 'offline').size - message.guild.members.cache.filter(m=>m.user.bot).size)
       const embed = new MessageEmbed()
             .setAuthor("Servername: " + message.guild.name, message.guild.iconURL())
             .setColor(0x00A2E8)
             .addField('Members', `${message.guild.memberCount - message.guild.members.cache.filter(m=>m.user.bot).size}`, true)
             .addField('Online', `${online}`, true)
             .addField("Bots", message.guild.members.cache.filter(m=>m.user.bot).size)
             .setTimestamp()
             .setFooter(client.user.username, client.user.avatarURL());
       message.channel.send({embed}) 
    }


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['memcount','totalmem'],
    permLevel: "User"
  };
  
  exports.help = {
    name: "membercount",
    description: "Sends total members in server",
    category: "Moderation",
    usage: "membercount",
  };


  