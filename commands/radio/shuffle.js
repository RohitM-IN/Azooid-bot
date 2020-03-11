const { Utils } = require("erela.js")
const { RichEmbed,Collection } = require("discord.js") 
const { stripIndents } = require("common-tags")
module.exports = { 
    name: "shuffle",
    description: "Loops the Queue",
    category: "music",
    accessableby: "Member",
    aliases: ["shift"],
    run: async (client, message, args) => {
        const server = message.guild.name;
        const player = client.music.players.get(message.guild.id)
        if(!player || !player.queue[0]) return message.channel.send("No Songs Currently playing in this Guild!");
        const { voiceChannel } = message.member;
        if (!voiceChannel || voiceChannel.id !== player.voiceChannel.id) return message.channel.send("You need to be in same voice channel to shuffle music!!");
        player.queue.shuffle() 
        message.channel.send(`\`${server}'s\` queue shuffled!`)
    }

}