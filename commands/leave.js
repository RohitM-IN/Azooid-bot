const Discord = require("discord.js");
const { Utils } = require("erela.js")
const { MessageEmbed } = require("discord.js")
const opusscript = require("opusscript");
var playAudioURL = require('play-audio-url');
const fs = require("fs");

exports.run = async (client, message, args) => {
    const  voiceChannel  = message.member.voice.channel;
    const player = client.music.players.get(message.guild.id);

    if(!player) return message.channel.send("No song/s currently playing in this guild.");
    if(!voiceChannel || voiceChannel.id !== player.voiceChannel.id) return message.channel.send("You need to be in a voice channel to use the leave command.");

    client.music.players.destroy(message.guild.id);
    return message.channel.send("Successfully stopped the music.")
}


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["stop"],
    permLevel: "User"
  };

  exports.help = {
    name: "leave",
    description: "stops the audio",
    usage: "stop",
    category: "Music",
  };