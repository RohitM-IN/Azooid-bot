const Discord = require('discord.js');
module.exports = async (oldGuild, newGuild) => {
		// if (!client.provider.isReady) return;
		// if (!client.provider.getGuild(newGuild.id, 'prefix')) return;

		// const lang = require(`../languages/${client.provider.getGuild(newGuild.id, 'language')}.json`);

		// if (client.provider.getGuild(newGuild.id, 'guildupdatelog') === 'false') return;

		// const messagechannel = client.channels.get(client.provider.getGuild(newGuild.id, 'guildupdatelogchannel'));
		// // // //  var log = newGuild.channels.find(ch => ch.name.includes('member-log')) || newGuild.channels.find(ch => ch.name.includes('log')) // || channel.guild.channels.find(ch => ch.name.includes('logs')) || channel.guild.channels.find(ch => ch.name.includes('general')) ;
		// // // // if (!messagechannel) return;
		// // // // console.log(oldGuild.name + "\n"+ newGuild.name)
		// // // // if (oldGuild.name !== newGuild.name) {
		// // // // 	const embed = new Discord.RichEmbed()
		// // // // 		.setColor('ORANGE')
		// // // // 		.setTimestamp()
		// // // // 		.setAuthor(`:information_source: guild updated`)
		// // // // 		.addField(`📤 Old Name`, oldGuild.name)
		// // // // 		.addField(`📥 New Name`, newGuild.name);
		// // // // 	log.send(embed);
		// // // // }

		// if (oldGuild.afkChannelID !== newGuild.afkChannelID) {
		// 	const embed = new Discord.RichEmbed()
		// 		.setColor('ORANGE')
		// 		.setTimestamp()
		// 		.setAuthor(":information_source: Afk channel updated")
		// 		.addField(`📤 Old Afk channel:`, oldGuild.afkChannel === null ? "There wasn't an AFK channel before" : oldGuild.afkChannel.name)
		// 		.addField(`📥 New Afk channel:`, newGuild.afkChannel === null ? "There isn't an AFK channel anymore" : newGuild.afkChannel.name);
		// 	log.send(embed);
		// }
		
		// // working
		// if (oldGuild.afkTimeout !== newGuild.afkTimeout) {
		// 	const embed = new Discord.RichEmbed()
		// 		.setColor('ORANGE')
		// 		.setTimestamp()
		// 		.setAuthor(":information_source: AFK timeout changed!")
		// 		.addField(`📤 Old AFK timeout:`, `${oldGuild.afkTimeout} seconds`)
		// 		.addField(`📥 New AFK timeout:`, `${newGuild.afkTimeout} seconds`);
		// 		log.send(embed);
		// }

		// if (oldGuild.iconURL() !== newGuild.iconURL()) {
		// 	const embed = new Discord.RichEmbed()
		// 		.setColor('ORANGE')
		// 		.setTimestamp()
		// 		.setAuthor(":information_source: Server icon changed!")
		// 		.addField(`📤 Old server icon:`, oldGuild.iconURL() === null ? "There wasn't a servericon before" : oldGuild.iconURL())
		// 		.addField(`📥 New server icon:`, newGuild.iconURL() === null ? "There isn't a servericon anymore" : newGuild.iconURL());
		// 		log.send(embed);
		// }

		// if (oldGuild.owner.id !== newGuild.owner.id) {
		// 	const embed = new Discord.RichEmbed()
		// 		.setColor('ORANGE')
		// 		.setTimestamp()
		// 		.setAuthor(":information_source: Owner changed!")
		// 		.addField(`📤 Old owner:`, oldGuild.owner.user.tag)
		// 		.addField(`📥 New owner:`, newGuild.owner.user.tag);
		// 		log.send(embed);
		// }
	}

