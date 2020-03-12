const { Utils } = require("erela.js")
const { RichEmbed } = require("discord.js")
const { stripIndents } = require("common-tags")
const fs = require("fs");

module.exports = { 
        name: "nowplaying",
        aliases: ["np", "now"],
        description: "Displays what the bot is currently playing.",
        accessableby: "Member",
        clientPermissions: ["EMBED_LINKS","SEND_MESSAGES"],
        userPermissions:["VIEW_CHANNEL"],
        category: "music",
    run: async (client, message, args) => {
        const player = client.music.players.get(message.guild.id);
        
        if (!player || !player.queue[0]) {
          client.music.players.destroy(message.guild.id);
          return message.channel.send("No song/s currently playing within this guild.");
        }
        
          if (player.position > 5000){
            getnowplaying()
          }
          if (player.position < 5000){
            setTimeout(() => {
            getnowplaying()
            },3000)
          }
          
          function getnowplaying(){
          let { title, author, duration, thumbnail, requester } = player.queue[0];
          if(duration == 0 ) duration = 1;
          let volume = player.volume;
          let volemoji;
          if(volume > 80){volemoji = `🔊`;}else if(volume <= 80 && volume > 45){volemoji = `🔉`;}else if(volume > 0 && volume <=45){volemoji = `🔈`;}
          let amount;
          if(player.position != 0){
            amount = `00:${Utils.formatTime(player.position, true)}`
            
          }else{
            amount = `00:00`
          }
          const part = Math.floor((player.position / duration) * 10);
          const giveEmbed = new RichEmbed()
            .setColor("AQUA")
            .setFooter(`${client.user.username}`)
            .setDescription(`${player.playing ? "▶️" : "⏸️"} Currently Playing ${title}\n${volemoji} ${"▬".repeat(part) + "🔘" + "▬".repeat(10 - part)}[${amount} / ${Utils.formatTime(duration, true)}]\nRequested By: ${requester.tag}`)

        message.channel.send({embed: giveEmbed}).then(m => {
          const counter = setInterval(() => {
            if(player.playing !== true){
              clearInterval(counter)
            }

          if(player.position < 60000){
            if(player.position>5000){
            if(player.playing === true){
            let { title, author, duration, thumbnail, requester } = player.queue[0];
            let amount = `00:${Utils.formatTime(player.position, true)}`
            const part = Math.floor((player.position / duration) * 10);
            giveEmbed.setDescription(`${player.playing ? "▶️" : "⏸️"} Currently Playing ${title}\n${volemoji} ${"▬".repeat(part) + "🔘" + "▬".repeat(10 - part)}[${amount} / ${Utils.formatTime(duration, true)}]\nRequested By: ${requester.tag}`)
            }
          }
          }else{
            if(player.playing === true){
            let { title, author, duration, thumbnail, requester } = player.queue[0];
            const amount = `${Utils.formatTime(player.position, true)}`
            const part = Math.floor((player.position / duration) * 10);
            giveEmbed.setDescription(`${player.playing ? "▶️" : "⏸️"} Currently Playing ${title}\n${volemoji} ${"▬".repeat(part) + "🔘" + "▬".repeat(9 - part)}[${amount} / ${Utils.formatTime(duration, true)}]\nRequested By: ${requester.tag}`)
          }else{
            giveEmbed.setDescription(`⏸️ Currently Playing Nothing\n${"▬".repeat(10) + "🔘"}[00:00 / 00:00]`)
          }
        }
          m.edit(giveEmbed)
          },4000)
      })
    }
  }
}