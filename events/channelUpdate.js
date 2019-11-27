const Discord = require('discord.js');
module.exports = async (client,oldChannel, newChannel,message) => {
		// if (!oldChannel || !newChannel) return;
		// if (newChannel.type !== 'text' || oldChannel.type !== 'text') return;
		// console.log("step 1")

		// if (!client.provider.getGuild(oldChannel.guild.id, 'prefix')) return;
		// if (client.provider.getGuild(oldChannel.guild.id, 'channelupdatelog') === 'false') return;

		// const langSet = client.provider.getGuild(oldChannel.guild.id, 'language');
		// const lang = require(`../languages/${langSet}.json`);

		// if (!client.channels.get(client.provider.getGuild(oldChannel.guild.id, 'channelupdatelogchannel'))) return;

		// const messagechannel = message.guild.channels.find(ch => ch.name.includes('member-log')) || message.guild.channels.find(ch => ch.name.includes('log')) || message.guild.channels.find(ch => ch.name.includes('logs')) || message.guild.channels.find(ch => ch.name.includes('general')) ;
		// if (!messagechannel) return;
		// console.log('step 2')
		// if (oldChannel.name !== newChannel.name) {
		// 	console.log('step 3')
		// 	const embed = new Discord.MessageEmbed()
		// 		.setColor('ORANGE')
		// 		.setTimestamp()
		// 		.setAuthor(`:information_source: Channel name updated`)
		// 		.addField(`📎 Channel ID:`, oldChannel.id)
		// 		.addField(`📤 Old Channel Name:`, oldChannel.name)
		// 		.addField(`📥 New Channel Name:`, newChannel.name);
		// 	return messagechannel.send({
		// 		embed: embed
		// 	});
		// }
		// if (oldChannel.topic !== newChannel.topic) {
		// 	const embed = new Discord.MessageEmbed()
		// 		.setColor('ORANGE')
		// 		.setTimestamp()
		// 		.setAuthor(lang.channelupdateevent_topicupdated)
		// 		.addField(`⚙ ${lang.channelcreateevent_channelname}`, oldChannel.name)
		// 		.addField(`📎 ${lang.channelcreateevent_channelid}`, oldChannel.id)
		// 		.addField(`📤 ${lang.channelupdateevent_oldtopic}`, oldChannel.topic ? oldChannel.topic : lang.channelupdateevent_nochanneltopic)
		// 		.addField(`📥 ${lang.channelupdateevent_newtopic}`, newChannel.topic ? newChannel.topic : lang.channelupdateevent_nochanneltopic);
		// 	return messagechannel.send({
		// 		embed: embed
		// 	});
		// }
		// if (oldChannel.rawPosition !== newChannel.rawPosition) {
		// 	const embed = new Discord.MessageEmbed()
		// 		.setColor('ORANGE')
		// 		.setTimestamp()
		// 		.setAuthor(lang.channelupdateevent_positionupdated)
		// 		.addField(`⚙ ${lang.channelcreateevent_channelname}:`, oldChannel.name)
		// 		.addField(`📎 ${lang.channelcreateevent_channelid}`, oldChannel.id)
		// 		.addField(`📤 ${lang.channelupdateevent_oldposition}`, oldChannel.rawPosition)
		// 		.addField(`📥 ${lang.channelupdateevent_newposition}`, newChannel.rawPosition);
		// 	return messagechannel.send({
		// 		embed: embed
		// 	});
		// }
	}

