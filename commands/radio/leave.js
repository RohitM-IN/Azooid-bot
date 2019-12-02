const Discord = require("discord.js");
//const ffmpeg = require("ffmpeg-binaries");
const opusscript = require("opusscript");

module.exports = {
    name: "leave",
    description: "plays audio",
    usage: ".play <name of station>",
    category: "music",
    aliases: ["disconnect"],
    run: async (client, message, args) => {
      message.channel.send(`this command will be added soon.... :wink:`);
    //   if (message.member.voiceChannel) {
    //     message.member.voiceChannel.leave().then(message.reply('Left Voice Channel.'));
      
    // };
  }
}