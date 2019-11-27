const Discord = require("discord.js");

module.exports = async ( client ,channel ) => {

    var log = channel.guild.channels.find(ch => ch.name.includes('member-log')) || channel.guild.channels.find(ch => ch.name.includes('log')) || channel.guild.channels.find(ch => ch.name.includes('logs')) || channel.guild.channels.find(ch => ch.name.includes('general')) ;
    var sEmbed = new Discord.RichEmbed()
                .setColor("RANDOM")
                .setTitle(`:information_source: A channel Was Created!`)
                .setDescription(`**Name**\n${channel}`)
                .addField(`**Type**`,`${channel.type}`) 
                .setFooter(`ChannelID:${channel.id} | CreatedAT:${channel.createdAt}`);
                log.send(sEmbed);

}