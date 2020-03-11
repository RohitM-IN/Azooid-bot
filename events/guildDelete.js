const Discord = require('discord.js');
module.exports =  async (client,guild) => {
	console.log(`Hi, ${client.user.username} is now serving  in ${client.guilds.size} servers and serving ${client.guilds.reduce((c, p) => c + p.memberCount, 0)} users!.`);
	}

