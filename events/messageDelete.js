const Discord = require("discord.js");

module.exports = async (client, message  ) => {
    var msg;
    if (message.content.length >= 900) {
        return ;
    } else {
        msg = message.content;
    }
    var log = message.guild.channels.find(ch => ch.name.includes('member-log')) || message.guild.channels.find(ch => ch.name.includes('log')) || messageDelete.guild.channels.find(ch => ch.name.includes('logs')) ;
    var sEmbed = new Discord.RichEmbed()
                .setColor("RANDOM")
                .setTitle(`:warning: A Message Was Deleted!`)
                .setDescription(`**USER**\n<@${message.author.id}>`)
                .addField(`**Content**`,` \`\`\`${msg || msg[0]}\`\`\` `) //what can i do to put oldMessage.cleanContent in codeblock
                .addField(`**Channel**`,`<#${message.channel.id}> (${message.channel.id})`)
                .setFooter(``)
                .setFooter(`MessageID:${message.author.lastMessageID} | AuthorID:${message.author.id}`);
                log.send(sEmbed);

}