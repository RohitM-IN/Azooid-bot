const Discord = require('discord.js');
const { getMember } = require("../util/function.js");
exports.run = (client, message, args) => {
        const member = getMember(message, args.join(" "));
		
		let avatarURL = "https://cdn.discordapp.com/avatars/"+member.user.id+"/"+member.user.avatar+".png"
		if(member.user.avatar == null) avatarURL = "https://cdn.discordapp.com/embed/avatars/0.png"
      const randomnumber = Math.floor(Math.random() * 101);
      const Index = Math.floor(randomnumber / 10);
      const level = `:beer:`.repeat(Index) + `:yum:`.repeat(10 - Index);
      let embed = new Discord.RichEmbed()
      .setAuthor(`${message.author.username} says`,message.author.avatarURL)
      .setTitle(`Scanning the drunk rate of ${member.user.username} ...`)
      .setThumbnail(avatarURL)
      .setDescription(`${member.user.username} is ${randomnumber}% dank! :fire::beer:`)
      .addField(`rate:`,level)
      .setColor(0x2471a3)
      .setTimestamp()
      
      .setFooter(client.user.username, client.user.displayAvatarURL)

      message.channel.send(embed)
    },

  exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['dank', 'd%', '%d'],
    permLevel: "User"
  };

  exports.help = {
    name: 'drankrate',
    description: 'this command will rank your dankness.',
    usage: "drankrate <@user>",
    category: "Fun",
  };