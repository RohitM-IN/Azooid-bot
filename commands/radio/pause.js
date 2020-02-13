const { RichEmbed } = require("discord.js")
module.exports = {
        name: "pause",
        description: "Pauses the music.",
        category: "music",
    run: async (client, message, args) => {
        const { voiceChannel } = message.member;
        const player = client.music.players.get(message.guild.id);
        let pausestat = player.playing

        if(!player) return message.channel.send("No song/s currently playing in this guild.");
        if (!voiceChannel || voiceChannel.id !== player.voiceChannel.id) return message.channel.send("You need to be in a voice channel to use the leave command.");
        player.pause(!pausestat)
        if (!pausestat) {
            //player.pause(false);
            return message.channel.send(new RichEmbed()
                .setColor("GREEN")
                .setDescription("▶️ Successfully resumed the song.")
                .setFooter(client.user.tag, client.user.displayAvatarURL))
        } else {
            message.channel.send(new RichEmbed()
                .setColor("GREEN")
                .setDescription("⏸️ Successfully paused the song.")
                .setFooter(client.user.tag, client.user.displayAvatarURL))
        }
    }
}