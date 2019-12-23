const { RichEmbed } = require("discord.js")
const { stripIndents } = require("common-tags");

module.exports = {
    name: "markdown",
    aliases: ["md"],
    category: "info",
    description: "gives info on discord mark down text",
    run: async (client, message, args) => {
        let embed = new RichEmbed()
        .setColor("RANDOM")
        .setDescription("Here are some example of discord markdown to make your message beautiful")
        .addField(`*kursiv:*`,"\`\`\`*kursiv*\`\`\`",true)
        .addField(`**fett:**`,`\`\`\`**fett**\`\`\``,true )
        .addField(`***fett kursiv:***`,`\`\`\`***fett kursiv***\`\`\``,true)
        .addField(`~~durchgestrichen:~~`,`\`\`\`~~durchgestrichen~~\`\`\``,true)
        .addField(`__unterstrichen:__`,`\`\`\`__unterstrichen__\`\`\``,true)
        .addField(`__*unterstrichen kursiv:*__`,`\`\`\`__*unterstrichen kursiv*__\`\`\``,true)
        .addField(`__**unterstrichen fett**__:`,`\`\`\`__**unterstrichen fett**__\`\`\``,true)
        .addField(`__***unterstrichen fett kursiv***__:`,`\`\`\`__***unterstrichen fett kursiv***__\`\`\``,true)
        .addField(`Spoiler: (||XD||)`,`\`\`\`||Spoiler||\`\`\``,true)
        .addField(`> Single Line Quote:`,` \`\`\`> Single Line Quote\`\`\``,true)
        .addField(`>>> Multi Line Quote:`,`\`\`\`>>> Multi Line Quote\`\`\``,true)
        .addField(`Also find more here`,`<https://support.discordapp.com/hc/en-us/articles/210298617-Markdown-Text-101-Chat-Formatting-Bold-Italic-Underline->`)
        .setTimestamp()
        .setFooter(`${client.user.username}`, client.user.displayAvatarURL)

        message.channel.send(embed)
        
    }
    
}

