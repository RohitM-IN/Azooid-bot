const Discord = require("discord.js");
var dateFormat = require('dateformat');
module.exports =  async (client,oldUser, newUser) => {
   
    if (newUser.bot) return;    
    if(oldUser.username === newUser.username) return ;
    
        var log = client.guilds.channels.find(ch => ch.name.includes('member-log')) || client.guilds.channels.find(ch => ch.name.includes('log')) ;
        if (log != null) 
        var sEmbed = new Discord.RichEmbed()
           .setColor("RANDOM")
           .setTimestamp()
           .setTitle(`:information_source: A User Updated his Username!`)
           .setDescription(`**USER**\n<@${newUser.id}>`)
           .addField(`**Before**`,` \`\`\`${oldUser.username}\`\`\` `) //what can i do to put oldMessage.cleanContent in codeblock
           .addField(`**After**`,`\`\`\`${newUser.username}\`\`\`\ `);       
        log.send(sEmbed);
                    
    
    
		
  }


