const Discord = require("discord.js");
module.exports =  async (client,oldUser, newUser) => {
   
    if (newUser.bot) return;    
    if(oldUser.username === newUser.username) return ;
    
        var log = client.guilds.channels.find(ch => ch.name.includes('member-log')) || client.guilds.channels.find(ch => ch.name.includes('log')) ;
        if (!log) return;
        if (!log.permissionsFor(client.user).has("SEND_MESSAGES")) return;
        if (!log.permissionsFor(client.user).has("EMBED_LINKS")) return; 


        var sEmbed = new Discord.RichEmbed()
           .setColor("RANDOM")
           .setTimestamp()
           .setTitle(`:information_source: A User Updated his Username!`)
           .setDescription(`**USER**\n<@${newUser.id}>`)
           .addField(`**Before**`,` \`\`\`${oldUser.username}\`\`\` `)
           .addField(`**After**`,`\`\`\`${newUser.username}\`\`\`\ `);       
        log.send(sEmbed)	
  }


