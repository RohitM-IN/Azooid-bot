const Discord = require('discord.js');
const admin = require('firebase-admin');
let db = admin.firestore();
module.exports =  async (client,guild) => {
	console.log(`Hi, ${client.user.username} is now serving  in ${client.guilds.cache.size} servers and serving ${client.guilds.cache.reduce((c, p) => c + p.memberCount, 0)} users!.`);
  db.collection('guilds').doc(guild.id).delete()
  client.user.setPresence({activity: {name: `@Azooid#8892 help | ${client.guilds.cache.size} Servers`, type:0},status: "online",});
  
  activity.name

  
  //client.users.get(guild.owner.id).send("By By  \`" + guild.name + "\` If you feel inviting me again then go to <http://bit.ly/inviteazooid>");

}

