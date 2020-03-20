const { MessageEmbed } = require("discord.js")
exports.run = async (client, message, args) => {
        const  voiceChannel  = message.member.voice.channel;
        const  voiceChannelID  = message.member.voice.channelID;
   
        const player = client.music.players.get(message.guild.id);
        let pausestat = player.playing

        if(!player) return message.channel.send("No song/s currently playing in this guild.");
        if (!voiceChannel || voiceChannelID !== player.voiceChannel.id) return message.channel.send("You need to be in a voice channel to use the leave command.");
        player.pause(pausestat);
        let embed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(pausestat ? "⏸️ Successfully paused the song." : "▶️ Successfully resumed the song.")
                .setFooter(client.user.tag, client.user.displayAvatarURL())
        message.channel.send(embed)
              
}


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
  };

  exports.help = {
    name: "pause",
    description: "Pauses the music.",
    usage: "pause",
    category: "Music",
  };