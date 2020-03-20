const Discord = require("discord.js");

module.exports = async (client, message  ) => {
    var msg = message.content;
    let text = ""
    const arr = msg.split(' ');
    if(msg.length >5){
        for(let i = 0 ; i <5 ; i ++)
        {
            text += arr[i]; 
        }
    }else text = msg
    

    var log = message.guild.channels.cache.find(ch => ch.name.includes('member-log')) || message.guild.channels.cache.find(ch => ch.name.includes('log')) || messageDelete.guild.channels.find(ch => ch.name.includes('logs')) ;
    if(!log) return;
    var sEmbed = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`:warning: A Message Was Deleted!`)
                .setDescription(`**USER**\n<@${message.author.id}>`)
                .addField(`**Content**`,` \`\`\`${text}...\`\`\` `) //what can i do to put oldMessage.cleanContent in codeblock
                .addField(`**Channel**`,`<#${message.channel.id}> (${message.channel.id})`)
                .setFooter(`MessageID:${message.author.lastMessageID} | AuthorID:${message.author.id}`);
                log.send(sEmbed);

}