const { MessageEmbed } = require("discord.js")

exports.run = async (client, message, args) => {
        const player = client.music.players.get(message.guild.id);
        const  voiceChannel  = message.member.voice.channel;
        const  voiceChannelID  = message.member.voice.channelID;

         if (!voiceChannel || voiceChannelID !== player.voiceChannel.id) return message.channel.send("You need to be in same voice channel to use the queue repeat command.");      
        if (!player || !player.queue[0]) return message.channel.send("There is no song playing.");
        let repeatstate = player.queueRepeat;

        player.setQueueRepeat(!repeatstate);
        const embed = new MessageEmbed()
            .setAuthor(`${player.queueRepeat ? "Repeating The Queue:" : "Stopped Repeating The Queue:"}`)
        message.channel.send(embed);
    }


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [ "repeatq","queue-r","repeatqueue" ,'loopall'],
    permLevel: "User"
  };

  exports.help = {
    name: "queuerepeat",
    description: "Repeats complete Queue again and again",
    usage: "repeat",
    category: "Music",
  };