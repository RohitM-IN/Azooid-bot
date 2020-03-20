const Discord = require("discord.js");
const fs = require('fs')
module.exports = async (client, channel) => {
    if(channel.type == 'dm') return;
    if (!channel.guild) return;
    if(!channel.id) return;
    let data = await fs.readFileSync ("./data/json/serversettings.json","utf8", function(err,data) {
        if (err) throw err;
    })
    data = JSON.parse(data)
    let logging = data['guilds'][channel.guild.id]['log'];
    if(!logging) return;
    var log = channel.guild.channels.cache.find(ch => ch.name.includes('member-log')) || channel.guild.channels.cache.find(ch => ch.name.includes('log')) || channel.guild.channels.cache.find(ch => ch.name.includes('logs')) || channel.guild.channels.cache.find(ch => ch.name.includes('general')) ;
    if(!log) return;
    var sEmbed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(`:information_source: A channel Was Created!`)
                    .setDescription(`**Name**\n${channel}`)
                   .addField(`**Type**`,`${channel.type}`) 
                   .setFooter(`ChannelID:${channel.id} | CreatedAT:${channel.createdAt}`);
                   log.send(sEmbed);

}
