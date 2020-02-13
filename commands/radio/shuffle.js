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
        player.queue.shuffle() 
        message.channel.send(`\`${server}'s\` queue shuffled!`)
        }

    }