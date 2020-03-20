
const { MessageEmbed } = require('discord.js');

exports.run = async(client ,message ,args) => {
	let text = args.join(" ")
	if (!text) return message.channel.send(`What text would you like to embed?`)
	
    let embed = new MessageEmbed()
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(client.user.username)
    .setDescription(text)
		return message.channel.send(embed);
	}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: "User"
  };

  exports.help = {
	name: 'embed',
	description: 'Sends text in an embed.',
	category: "text-edit",
	usage: "embed <Description>",
  };