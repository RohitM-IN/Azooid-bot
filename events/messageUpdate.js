const Discord = require("discord.js");
module.exports = async (client,oldMessage, newMessage) => {
    if (newMessage.author.bot || oldMessage.author.bot) return; 
    
    if(newMessage.cleanContent === oldMessage.cleanContent) return ;
    if (newMessage.channel.type == 'text' && newMessage.cleanContent != oldMessage.cleanContent) {
        

        var log = newMessage.guild.channels.cache.find(ch => ch.name.includes('member-log')) || newMessage.guild.channels.cache.find(ch => ch.name.includes('log')) || newMessage.guild.channels.cache.find(ch => ch.name.includes('logs')) ;
        if (log != null) 
                var sEmbed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`:information_source: A Message Was Edited!`)
                .setDescription(`**USER**\n<@${newMessage.author.id}>`)
                .addField(`**Before**`,` \`\`\`${oldMessage.cleanContent}\`\`\` `) 
                .addField(`**After**`,`\`\`\`${newMessage.cleanContent}\`\`\`\ `)
                .addField(`**Channel**`,`<#${oldMessage.channel.id}> (${oldMessage.channel.id})`)
                .setFooter(`MessageID:${oldMessage.author.lastMessageID} | AuthorID:${oldMessage.author.id} \n • CreatedAT:${oldMessage.createdAt}`);       
                log.send(sEmbed);
                
    }
}