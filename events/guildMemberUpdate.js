const Discord = require('discord.js');


module.exports =  async (oldMember, newMember) => {

  //   const messagechannel = client.channels.get(client.provider.getGuild(newMember.guild.id, 'guildmemberupdatelogchannel'));

  //   if (oldMember.nickname !== newMember.nickname) {
  //     const embed = new Discord.RichEmbed()
  //       .setColor('ORANGE')
  //       .setTimestamp()
  //       .setAuthor(`:information_source: Nickname changed!`)
  //       .addField(`📎 Member:`, `${oldMember.user.tag} (${oldMember.id})`)
  //       .addField(`📤 Old nickname:`, oldMember.nickname === null ? "The member had no nickname" : oldMember.nickname)
  //       .addField(`📥 New nickname:`, newMember.nickname === null ? "The nickname has been reset" : newMember.nickname);
  //     messagechannel.send(embed);
  //   }


  //   if (oldMember.roles.size < newMember.roles.size) {
  //     const embed = new Discord.RichEmbed()
  //       .setColor('ORANGE')
  //       .setTimestamp()
  //       .setAuthor(`:information_source: Role assigned!`)
  //       .addField(`📎 Member:`, `${oldMember.user.tag} (${oldMember.id})`);

  //     messagechannel.send(embed);

      
  //   if (oldMember.roles.size > newMember.roles.size) {
  //     const embed = new Discord.MessageEmbed()
  //       .setColor('ORANGE')
  //       .setTimestamp()
  //       .setAuthor(`:information_source: Role removed!`)
  //       .addField(`📎 Member:`, `${oldMember.user.tag} (${oldMember.id})`);

  //     messagechannel.send(embed);

  //   }
  // }
}