const Discord = require("discord.js");
const ownerid = "348832732647784460";

module.exports = {
    name: "lists",
    category: "owner",
    description: "lists all the servers  ",
    run: async (client, message, args) => {
      if(message.author.id != ownerid) return;
        
        message.channel.send(client.guilds.map(r => ` \`${r.name}\` | **${r.memberCount}** members |id:\`${r.id}\` `))

    }
}