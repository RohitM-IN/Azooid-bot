const Discord = require("discord.js");

module.exports = async ( client , channel ) => {
    if(channel.type == 'dm') return;
    if (!channel.guild) return;
    if(!channel.id) return;
    
    let x = channel.guild.me.joinedTimestamp/1000
    if(x <= (x+10)) return;

    var log = channel.guild.channels.find(ch => ch.name.includes('member-log')) || channel.guild.channels.find(ch => ch.name.includes('log')) || channel.guild.channels.find(ch => ch.name.includes('logs')) || channel.guild.channels.find(ch => ch.name.includes('general')) ;
    if(!log) return;
    var sEmbed = new Discord.RichEmbed()
                    .setColor("RANDOM")
                    .setTitle(`:information_source: A channel Was Created!`)
                    .setDescription(`**Name**\n${channel}`)
                   .addField(`**Type**`,`${channel.type}`) 
                   .setFooter(`ChannelID:${channel.id} | CreatedAT:${channel.createdAt}`);
                   log.send(sEmbed);

}
