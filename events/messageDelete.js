const Discord = require("discord.js");

module.exports = async (client, message) => {
    var msg = message.content;
    let text = ""
    let length;
    const arr = msg.split(' ');
    if (arr.length > 5) {
        length = 5
    } else length = arr.length
    if (!length) length = 5;
    if (msg.length > 5) {
        for (let i = 0; i < length; i++) {
            text += arr[i] + ' ';
        }
    } else text = msg

    var log = message.guild.channels.cache.find(ch => ch.name.includes('member-log')) || message.guild.channels.cache.find(ch => ch.name.includes('log')) || messageDelete.guild.channels.find(ch => ch.name.includes('logs'));
    if (!log) return;
    var sEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`:warning: A Message Was Deleted!`)
        .setDescription(`**USER**\n<@${message.author.id}>`)
        .addField(`**Content**`, ` \`\`\`${text}...\`\`\` `)
        .addField(`**Channel**`, `<#${message.channel.id}> (${message.channel.id})`)
        .setFooter(`MessageID:${message.author.lastMessageID} | AuthorID:${message.author.id}`);
    log.send(sEmbed);

}