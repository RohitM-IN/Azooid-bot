const Discord = require("discord.js");

module.exports = async ( client , channel ) => {
    let x = channel.guild.me.joinedTimestamp/1000

    if(x <= (x+10)) return;
    
    
    // event firing when it joins a guild
    if (!channel.guild) return;
    if(channel.type == 'dm') return;
    if(!channel.id) return;
    // console.log(client.provider)
    
    var log = channel.guild.channels.find(ch => ch.name.includes('member-log')) || channel.guild.channels.find(ch => ch.name.includes('log')) || channel.guild.channels.find(ch => ch.name.includes('logs')) || channel.guild.channels.find(ch => ch.name.includes('general')) ;
    if(log == null) return;
    var sEmbed = new Discord.RichEmbed()
                    .setColor("RANDOM")
                    .setTitle(`:information_source: A channel Was Created!`)
                    .setDescription(`**Name**\n${channel}`)
                   .addField(`**Type**`,`${channel.type}`) 
                   .setFooter(`ChannelID:${channel.id} | CreatedAT:${channel.createdAt}`);
                   log.send(sEmbed);

}
