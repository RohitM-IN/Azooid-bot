const Discord = require("discord.js");
// const ffmpeg = require("ffmpeg-binaries");
const opusscript = require("opusscript");
var playAudioURL = require('play-audio-url');

module.exports = {
    name: "play",
    description: "plays audio",
    usage: ".play <name of station>",
    category: "music",
    aliases: ["p"],
    run: async (client, message, args) => {
        message.channel.send(`this command will be added soon.... :wink:`);
//           if (args.length === 0)
//   return message.reply("You never supplied a stream URL!");

//     const streamURL = args.slice(0, args.length).join(" ");

//       if (message.member.voiceChannel) {
//         message.member.voiceChannel.join()
//           .then(connection => {
//             // message.reply('Connected! Playing..');
//             require('http').get("http://radio.animenexus.mx:8000/animenexus", (res) => {
//                 connection.playStream(res);
//             })
//           })
//           .catch(console.log);
//       } else {
//         message.reply('You are not in a voice channel!');
//       }
    //     message.member.voiceChannel.join().then(connection => {
    // console.log('joined channel');

    // playAudioURL({ url: 'http:\/\/peridot.streamguys.com:7150\/Mirchi' }, onPlay)
    // player.start
    // // When no packets left to sent leave the channel.
    // })
    // // Handle error without crashing the app.
    // .catch(console.error);


        
    //     // You can also pass sampleRate here.
    //     // e.g.: { url: 'https://o.k/guy.mp3', sampleRate: 22050 } 
        
    //     // playAudioURL passes back an htmlPlayer if it was able to play
    //     // via an HTMLAudioElement, otherwise passes an AudioContext-based player.
    //     function onPlay(error, { htmlPlayer, bufferPlayer }) {
    //       if (error) {
    //         console.log(error);
    //       } else if (htmlPlayer) {
    //         setTimeout(player.pause, 10000);
    //       } else if (bufferPlayer) {
    //         setTimeout(bufferPlayer.stop, 10000);
    //       }
    //     }
    }
}

  


exports.run = (client, message, args) => {
  

    };
  