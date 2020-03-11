const {RichEmbed} = require("discord.js");
const { Utils } = require("erela.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "repeat",
    description: "repeats the audio again and again",
    usage: "repeat",
    category: "music",
    run: async (client, message, args) => {
        const player = client.music.players.get(message.guild.id);
        const { voiceChannel,voiceChannelID } = message.member;
        if (!voiceChannel) return message.channel.send("You need to be in a voice channel to use the repeat command.");
        if(voiceChannelID  !== player.voiceChannel.id) return message.channel.send("You need to be in a voice channel to use the repeat command.");      
        if(!player || !player.queue[0]) return message.channel.send("There is no song playing.");
        let { title, author, duration, thumbnail,uri } = player.queue[0];
        let repeatstate = player.trackRepeat
        
            player.setTrackRepeat(!repeatstate);
            const embed = new RichEmbed()
            .setAuthor(`${player.trackRepeat ? "Repeating:" : "Stopped Repeating:"}`)
            .setThumbnail(thumbnail)
            .setDescription(stripIndents`
            ${player.playing ? "▶️" : "⏸️"} **[${title}](${uri})** \`${Utils.formatTime(duration, true)}\` by ${author}
            `)
            return message.channel.send(embed)
        
        }
    }
