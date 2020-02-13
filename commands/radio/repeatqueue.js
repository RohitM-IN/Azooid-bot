const { RichEmbed } = require("discord.js")

module.exports = { 
        name:"queuerepeat",
        description: "Repeat Queue",
        category: "music",
        aliases: [ "repeatq","queue-r","repeatqueue" ],
    run: async (client, message, args) => {
        const player = client.music.players.get(message.guild.id);
        const { voiceChannel,voiceChannelID } = message.member;
        if (!voiceChannel) return message.channel.send("You need to be in a voice channel to use the queue repeat command.");
        if(voiceChannelID  !== player.voiceChannel.id) return message.channel.send("You need to be in same voice channel to use the queue repeat command.");          
        if(!player || !player.queue[0]) return message.channel.send("There is no song playing.");
        let repeatstate = player.queueRepeat;
        
            player.setQueueRepeat(!repeatstate);
            const embed = new RichEmbed()
            .setAuthor(`${player.queueRepeat ? "Repeating The Queue:" : "Stopped Repeating The Queue:"}`)
            message.channel.send(embed);


    }
}