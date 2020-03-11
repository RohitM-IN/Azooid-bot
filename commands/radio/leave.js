const Discord = require("discord.js");
// const ffmpeg = require("ffmpeg-binaries");
const opusscript = require("opusscript");

module.exports = {
    name: "leave",
    description: "plays audio",
    usage: ".play <name of station>",
    category: "music",
    aliases: ["disconnect"],
    run: async (client, message, args) => {
    //  message.channel.send(`this command will be added soon.... :wink:`);
    // //   if (message.member.voiceChannel) {
    // //     message.member.voiceChannel.leave()
    // //   message.reply('Left Voice Channel.');
    // // };
    //   if (message.member.voiceChannel) {
    //     message.member.voiceChannel.leave().then(message.reply('Left Voice Channel.'));
      
    // };

  //   const { voiceChannel } = message.member;
  //   const player = client.music.players.get(message.guild.id);

  // if(!player) return;
  // client.music.players.destroy(message.guild.id)
  // return message.channel.send("disconnected")
  }
}