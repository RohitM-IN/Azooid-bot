// const Discord = require("discord.js");
// // const ffmpeg = require("ffmpeg-binaries");
// const opusscript = require("opusscript");
// var playAudioURL = require('play-audio-url');

// module.exports = {
//     name: "play",
//     description: "plays audio",
//     usage: ".play <name of station>",
//     category: "music",
//     aliases: ["p"],
//     run: async (client, message, args) => {
//         message.channel.send(`this command will be added soon.... :wink:`);
//         // // if (args.length === 0)
//         // // return message.reply("You never supplied a stream URL!");
      
//         // //   const streamURL = args.slice(0, args.length).join(" ") || args[0];
      
//         // //     if (message.member.voiceChannel) {
//         // //       message.member.voiceChannel.join()
//         // //         .then(connection => {
//         // //           message.reply('Connected! Playing..');
//         // //           connection.playArbitraryInput(`${streamURL}`);
//         // //         })
//         // //         .catch(console.log);
//         // //     } else {
//         // //       message.reply('You are not in a voice channel!');
//         // //     }
// //           if (args.length === 0)
// //   return message.reply("You never supplied a stream URL!");

// //     const streamURL = args.slice(0, args.length).join(" ");

// //       if (message.member.voiceChannel) {
// //         message.member.voiceChannel.join()
// //           .then(connection => {
// //             // message.reply('Connected! Playing..');
// //             require('http').get("http://radio.animenexus.mx:8000/animenexus", (res) => {
// //                 connection.playStream(res);
// //             })
// //           })
// //           .catch(console.log);
// //       } else {
// //         message.reply('You are not in a voice channel!');
// //       }
//     //     message.member.voiceChannel.join().then(connection => {
//     // console.log('joined channel');

//     // playAudioURL({ url: 'http:\/\/peridot.streamguys.com:7150\/Mirchi' }, onPlay)
//     // player.start
//     // // When no packets left to sent leave the channel.
//     // })
//     // // Handle error without crashing the app.
//     // .catch(console.error);


        
//     //     // You can also pass sampleRate here.
//     //     // e.g.: { url: 'https://o.k/guy.mp3', sampleRate: 22050 } 
        
//     //     // playAudioURL passes back an htmlPlayer if it was able to play
//     //     // via an HTMLAudioElement, otherwise passes an AudioContext-based player.
//     //     function onPlay(error, { htmlPlayer, bufferPlayer }) {
//     //       if (error) {
//     //         console.log(error);
//     //       } else if (htmlPlayer) {
//     //         setTimeout(player.pause, 10000);
//     //       } else if (bufferPlayer) {
//     //         setTimeout(bufferPlayer.stop, 10000);
//     //       }
//     //     }
//     }
// }

  


// exports.run = (client, message, args) => {
  

//     };

const { Utils } = require("erela.js")
const { RichEmbed } = require("discord.js")

module.exports = { 
        name: "play",
        description: "Play a song/playlist or search for a song from youtube",
        usage: "<input>",
        category: "music",
        accessableby: "Member",
        aliases: ["p", "pplay"],
    run: async (bot, message, args) => {
        // const { voiceChannel } = message.member;
        // if (!voiceChannel) return message.channel.send("You need to be in a voice channel to play music.");

        // const permissions = voiceChannel.permissionsFor(bot.user);
        // if (!permissions.has("CONNECT")) return message.channel.send("I cannot connect to your voice channel, make sure I have permission to!");
        // if (!permissions.has("SPEAK")) return message.channel.send("I cannot connect to your voice channel, make sure I have permission to!");

        // if (!args[0]) return message.channel.send("Please provide a song name or link to search.");

        // const player = bot.music.players.spawn({
        //     guild: message.guild,
        //     textChannel: message.channel,
        //     voiceChannel
        // });

        // bot.music.search(args.join(" "), message.author).then(async res => {
        //     switch (res.loadType) {
        //         case "TRACK_LOADED":
        //             player.queue.add(res.tracks[0]);
        //             message.channel.send(`Enqueuing \`${res.tracks[0].title}\` \`${Utils.formatTime(res.tracks[0].duration, true)}\``);
        //             if (!player.playing) player.play()
        //             break;
                
        //         case "SEARCH_RESULT":
        //             let index = 1;
        //             const tracks = res.tracks.slice(0, 5);
        //             const embed = new RichEmbed()
        //                 .setAuthor("Song Selection.", message.author.displayAvatarURL)
        //                 .setDescription(tracks.map(video => `**${index++} -** ${video.title}`))
        //                 .setFooter("Your response time closes within the next 30 seconds. Type 'cancel' to cancel the selection");

        //             await message.channel.send(embed);

        //             const collector = message.channel.createMessageCollector(m => {
        //                 return m.author.id === message.author.id && new RegExp(`^([1-5]|cancel)$`, "i").test(m.content)
        //             }, { time: 30000, max: 1});

        //             collector.on("collect", m => {
        //                 if (/cancel/i.test(m.content)) return collector.stop("cancelled")

        //                 const track = tracks[Number(m.content) - 1];
        //                 player.queue.add(track)
        //                 message.channel.send(`Enqueuing \`${track.title}\` \`${Utils.formatTime(track.duration, true)}\``);
        //                 if(!player.playing) player.play();
        //             });

        //             collector.on("end", (_, reason) => {
        //                 if(["time", "cancelled"].includes(reason)) return message.channel.send("Cancelled selection.")
        //             });
        //             break;

        //         case "PLAYLIST_LOADED":
        //             res.playlist.tracks.forEach(track => player.queue.add(track));
        //             const duration = Utils.formatTime(res.playlist.tracks.reduce((acc, cur) => ({duration: acc.duration + cur.duration})).duration, true);
        //             message.channel.send(`Enqueuing \`${res.playlist.tracks.length}\` \`${duration}\` tracks in playlist \`${res.playlist.info.name}\``);
        //             if(!player.playing) player.play()
        //             break;
        //     }
        // }).catch(err => message.channel.send(err.message))
    }
}