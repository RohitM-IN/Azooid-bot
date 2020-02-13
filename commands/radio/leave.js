const Discord = require("discord.js");
const opusscript = require("opusscript");

module.exports = {
    name: "leave",
    description: "plays audio",
    usage: ".play <name of station>",
    category: "music",
    aliases: ["disconnect","stop"],
    run: async (client, message, args) => {
      //message.channel.send(`Audio Quality not too good :wink:`);
      const { voiceChannel } = message.member;
      const player = client.music.players.get(message.guild.id);

      if(!player) return message.channel.send("No song/s currently playing in this guild.");
      if(!voiceChannel || voiceChannel.id !== player.voiceChannel.id) return message.channel.send("You need to be in a voice channel to use the leave command.");

      client.music.players.destroy(message.guild.id);
      return message.channel.send("Successfully stopped the music.")
  }
}