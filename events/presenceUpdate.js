const Discord = require('discord.js');

module.exports =  (oldPresence, newPresence) => {
		/* try {

            
			const messagechannel = channel.guild.channels.find(ch => ch.name.includes('member-log')) || channel.guild.channels.find(ch => ch.name.includes('log')) || channel.guild.channels.find(ch => ch.name.includes('logs')) || channel.guild.channels.find(ch => ch.name.includes('general')) ;
			if (!messagechannel) return;

			if (oldPresence.status !== newPresence.status) {
				const embed = new Discord.MessageEmbed()
					.setColor('ORANGE')
					.setTimestamp()
					.setAuthor(`:information_source: Presence changed!`)
					.addField(`📎 Member:`, `${newPresence.user.tag} (${newPresence.userID})`)
					.addField(`📤 Old presence:`, oldPresence.status)
					.addField(`📥 New presence:`, newPresence.status);
				messagechannel.send(embed);
			}
		} catch (error) {
			console.error(error);
		}*/
}

