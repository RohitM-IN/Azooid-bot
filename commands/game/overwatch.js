const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const overwatch = require("overwatch-api");

module.exports = {
    name: "overwatch",
    category: "game",
    description: "Displays your overwatch stats!",
    usage: "<user> (platform)",
    aliases: ["owstats", "ow"],
    run: async (client, message, args) => {
    if(!args[0]) return message.channel.send("Please supplay a username.");
    if(!args[1] || (args[1] && !["pc", "xbl", "psn"].includes(args[1]))) return message.channel.send("Please supply a platform to check. `pc`, `xbl` or `psn`");
    if(args[0].includes("#")) args[0] = args[0].replace(/#/g, "-");

    overwatch.getProfile(args[1], "global", args[0], (err,json) => {
        if(err) return message.channel.send("Unable to find a user with that user name.");
        const { games, level, portrait, username , playtime: { competitive, quickplay }, private } = json;
        const { sportsmanship, shotcaller, teammate } = json.endorsement;
        const { won, draw, played, lostr, win_rate } = json.games.competitive;

        if(private) return message.channel.send("This user stats are private and cannot be obtained via this command.");
        
            const embed = new RichEmbed()
                .setColor("Random")
                .setAuthor(`Blizzard (Overwatch) | ${username}`, portrait)
                .setThumbnail(portrait)
                .addField("General:", stripIndents`
                **Level:** ${level || 0}
                **Sportsmanship** ${sportsmanship.rate || 0} /100
                **Shotcaller:** ${shotcaller.rate || 0} /100
                **Teammate:** ${teammate.rate || 0} /100
                `)
                .addField("Competitive:", stripIndents`
                **Played:** ${played || 0}
                **Won:** ${won || 0}
                **Draw:** ${draw || 0}
                **Lost:** ${win_rate || 0}
                **Playtime:** ${competitive || "00:00:00"}
                `, true)
                .addField("QuickPlay:", stripIndents`
                **Played:** ${games.quickplay.played || "N/A"}
                **Won:** ${games.quickplay.won || 0}
                **Playtime:** ${quickplay || 0}
                `,true)
                .setTimestamp()

            message.channel.send(embed);
    })
    
    }
}
