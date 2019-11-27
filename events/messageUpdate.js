const Discord = require("discord.js");
module.exports = async (client,oldMessage, newMessage) => {
    
    if(newMessage.cleanContent === oldMessage.cleanContent) return ;
    if (newMessage.channel.type == 'text' && newMessage.cleanContent != oldMessage.cleanContent) {
        

        //log to console
        //console.log('[' + newMessage.guild.name + '][#' + newMessage.channel.name + '][UPDMSG] ' +
         //   newMessage.author.username + '#' + newMessage.author.discriminator + ':\n\tOLDMSG: ' +
          //  formatConsoleMessage(oldMessage) + '\n\tNEWMSG: ' + formatConsoleMessage(newMessage));
//console.log(newMessage.channel)
//console.log(oldMessage.author.id)
//console.log(newMessage.author.username);
        var log = newMessage.guild.channels.find(ch => ch.name.includes('member-log')) || newMessage.guild.channels.find(ch => ch.name.includes('log')) || newMessage.guild.channels.find(ch => ch.name.includes('logs')) ;
        if (log != null)
            //log.send('**[Message Updated]** *' + newMessage.author + '*:\n*Old Message*: ' + oldMessage.cleanContent +
             //   '\n*New Message*: ' + newMessage.cleanContent);
                var sEmbed = new Discord.RichEmbed()
                .setColor("RANDOM")
                .setTitle(`:information_source: A Message Was Edited!`)
                .setDescription(`**USER**\n<@${newMessage.author.id}>`)
                .addField(`**Before**`,` \`\`\`${oldMessage.cleanContent}\`\`\` `) //what can i do to put oldMessage.cleanContent in codeblock
                .addField(`**After**`,`\`\`\`${newMessage.cleanContent}\`\`\`\ `)
                .addField(`**Channel**`,`<#${oldMessage.channel.id}> (${oldMessage.channel.id})`)
                .setFooter(`MessageID:${oldMessage.author.lastMessageID} | AuthorID:${oldMessage.author.id} \n • CreatedAT:${oldMessage.createdAt}`);
                //.setFooter(`CreatedAT:${oldMessage.createdAt}`);
                log.send(sEmbed);
                
    }
}