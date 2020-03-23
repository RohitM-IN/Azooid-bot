const Discord = require("discord.js");
const fs = require('fs')

module.exports = async (client, channel) => {
    let data = await fs.readFileSync("./data/json/serversettings.json", "utf8", function (err) {
        if (err) throw err;
    })
    data = JSON.parse(data)
    let logging = data['guilds'][channel.guild.id]['log'];
    if (!logging) return;
    var log = channel.guild.channels.cache.find(ch => ch.name.includes('member-log')) || channel.guild.channels.cache.find(ch => ch.name.includes('log'));
    if (!log) return;
    var sEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`:information_source: A channel Was Deleted!`)
        .setDescription(`**Name**\n${channel.name}`)
        .addField(`**Type**`, `${channel.type}`)
        .setFooter(`ChannelID:${channel.id} | DeletedAT:${channel.createdAt}`);
    log.send(sEmbed);

}