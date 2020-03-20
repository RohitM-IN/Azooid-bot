const Discord = require("discord.js");
const fs = require('fs')
module.exports =  async (client,oldUser, newUser) => {
//    console.log(oldUser)
//     if (newUser.bot || oldUser.bot) return;    
//     if(oldUser.username === newUser.username) return ;
//     let data = await fs.readFileSync ("./data/json/serversettings.json","utf8", function(err) {
//         if (err) throw err;
//     })
//     data = JSON.parse(data)
//     console.log(client.guilds.id)
//     let logging = data['guilds'][client.guilds.id]['log'];
//     if(!logging) return;
//         var log = client.channels.cache.find(ch => ch.name.includes('member-log')) || client.channels.cache.find(ch => ch.name.includes('log')) ;
//         if (!log) return;
//         if (!log.permissionsFor(client.user).has(["SEND_MESSAGES","EMBED_LINKS"])) return;


//         var sEmbed = new Discord.MessageEmbed()
//            .setColor("RANDOM")
//            .setTimestamp()
//            .setTitle(`:information_source: A User Updated his Username!`)
//            .setDescription(`**USER**\n<@${newUser.id}>`)
//            .addField(`**Before**`,` \`\`\`${oldUser.username}\`\`\` `)
//            .addField(`**After**`,`\`\`\`${newUser.username}\`\`\`\ `);       
//         log.send(sEmbed)	
  }


