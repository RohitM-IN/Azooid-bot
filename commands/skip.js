const Discord = require("discord.js");
const opusscript = require("opusscript");

exports.run = async (client, message, args) => {
        const player = client.music.players.get(message.guild.id);
        if (!player) return message.channel.send("No song/s currently playing")

        if (player.queue.length > 1) {
            player.stop();

        } else {
            message.channel.send("Nothing left for me to skip use stop command to stop the music!!")
        }
        player.setTrackRepeat(false);
        player.setQueueRepeat(false);
    }


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["s"],
    permLevel: "User"
  };

  exports.help = {
    name: "skip",
    description: "skips the current audio in queue",
    usage: "skip ",
    category: "Music",
  };