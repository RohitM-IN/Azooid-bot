const Discord = require('discord.js');
module.exports = async (client,oldChannel, newChannel,message) => {
		// if (!oldChannel || !newChannel) return;
		// if (newChannel.type !== 'text' || oldChannel.type !== 'text') return;


		// const messagechannel = message.guild.channels.find(ch => ch.name.includes('member-log')) || message.guild.channels.find(ch => ch.name.includes('log')) || message.guild.channels.find(ch => ch.name.includes('logs')) || message.guild.channels.find(ch => ch.name.includes('general')) ;
		// if (!messagechannel) return;
		// if (oldChannel.name !== newChannel.name) {
		// 	const embed = new Discord.RichEmbed()
		// 		.setColor('ORANGE')
		// 		.setTimestamp()
		// 		.setAuthor(`:information_source: Channel name updated!`)
		// 		.addField(`📎 Channel ID:`, oldChannel.id)
		// 		.addField(`📤 Old Channel Name:`, oldChannel.name)
		// 		.addField(`📥 New Channel Name:`, newChannel.name);
		// 	return messagechannel.send(embed);
		// }
		// if (oldChannel.topic !== newChannel.topic) {
		// 	const embed = new Discord.RichEmbed()
		// 		.setColor('ORANGE')
		// 		.setTimestamp()
		// 		.setAuthor(`:information_source: Channel topic updated!`)
		// 		.addField(`⚙ Channel Name:`, oldChannel.name)
		// 		.addField(`📎 ChannelID`, oldChannel.id)
		// 		.addField(`📤 oldtopic`, oldChannel.topic ? oldChannel.topic : "No channel topic")
		// 		.addField(`📥 newtopic`, newChannel.topic ? newChannel.topic : "No channel topic");
		// 	return messagechannel.send({
		// 		embed: embed
		// 	});
		// }
		// if (oldChannel.rawPosition !== newChannel.rawPosition) {
		// 	const embed = new Discord.MessageEmbed()
		// 		.setColor('ORANGE')
		// 		.setTimestamp()
		// 		.setAuthor(`:information_source: Channel position updated!`)
		// 		.addField(`⚙ Channelname:`, oldChannel.name)
		// 		.addField(`📎 ChannelID`, oldChannel.id)
		// 		.addField(`📤 Old position:`, oldChannel.rawPosition)
		// 		.addField(`📥 New position:`, newChannel.rawPosition);
		// 	return messagechannel.send({
		// 		embed: embed
		// 	});
		// }
	}

