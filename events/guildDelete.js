const Discord = require('discord.js');
module.exports =  async (guild) => {
	// 	if (!client.provider.isReady) return;

	// 	const embed = new Discord.MessageEmbed()
	// 		.setTimestamp()
	// 		.setAuthor(`${guild.name} (${guild.id})`)
	// 		.addField(`Owner`, `${guild.owner.user.tag} (${guild.ownerID})`)
	// 		.setColor('RED')
	// 		.setFooter('LEFT DISCORD SERVER');
	// 	await client.channels.get('497400159894896651').send({ embed: embed });

	// 	await client.provider.clearGuild(guild.id);
	console.log(`Hi, ${client.user.username} is now serving  in ${client.guilds.size} servers and serving ${client.guilds.reduce((c, p) => c + p.memberCount, 0)} users!.`);
	}

