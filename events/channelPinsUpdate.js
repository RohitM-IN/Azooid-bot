const Discord = require("discord.js");


module.exports = async (client, channel ) => {
    
    var log = channel.guild.channels.find(ch => ch.name.includes('member-log')) || channel.guild.channels.find(ch => ch.name.includes('log')) || channel.guild.channels.find(ch => ch.name.includes('logs')) || channel.guild.channels.find(ch => ch.name.includes('general')) ;
    if(!log) return;
    var sEmbed = new Discord.RichEmbed()
                .setColor("RANDOM")
                .setTitle(`:pushpin: Pins Updated!`)
                .setDescription(`**Name**\n${channel.name}`)
                .addField(`**Type**`,`${channel.type}`) 
                .setFooter(`ChannelID:${channel.id}`)
                .setTimestamp();
                log.send(sEmbed);

}