const Discord = require('discord.js');
const admin = require('firebase-admin');
let db = admin.firestore();
module.exports =  async (client,guild) => {
	console.log(`Hi, ${client.user.username} is now serving  in ${client.guilds.size} servers and serving ${client.guilds.reduce((c, p) => c + p.memberCount, 0)} users!.`);
  db.collection('guilds').doc(guild.id).delete()
}

