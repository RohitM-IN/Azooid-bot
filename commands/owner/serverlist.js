const Discord = require("discord.js");
const os = require('os');
var memStat = require('mem-stat');
var netStat = require('net-stat');
var disk = require('diskusage');
const ownerid = "348832732647784460";

module.exports = {
    name: "lists",
    category: "owner",
    clientPermissions: ["SEND_MESSAGES"],
    userPermissions:["VIEW_CHANNEL"],
    description: "lists all the servers  ",
    run: async (client, message, args) => {
      if(message.author.id != ownerid) return;
      // const promises = [
      //   client.shard.fetchClientValues('guilds.map'),
      //   client.shard.fetchClientValues('guilds.size'),
    	// 	client.shard.broadcastEval('this.guilds.reduce((c, p) => c + p.memberCount, 0)')
      // ];
  
      // Promise.all(promises)
      //   .then(results => {
      //     const totalGuilds = results[1].reduce((prev, guildCount) => prev + guildCount, 0);
      //     const totalMembers = results[2].reduce((prev, memberCount) => prev + memberCount, 0);
      //     message.channel.send(`Total Guilds : ${totalGuilds} | Total Members : ${totalMembers}`)
      //     message.channel.send(results[0].map(r => ` \`${r.name}\` | **${r.memberCount}** members |id:\`${r.id}\` `))
           
      //   })
      //   .catch(console.error);
      message.channel.send(client.guilds.map(r => ` \`${r.name}\` | **${r.memberCount}** members |id:\`${r.id}\` `))

    }
}