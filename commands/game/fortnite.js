const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { api: { fortnite_api } } = require("../../auth.json");
const fortnite = require("simple-fortnite-api") , cli = new fortnite(fortnite_api);
const Client = require("fortnite");
const ft = new Client(fortnite_api);

module.exports = {
    name: "fortnite",
    category: "game",
    description: "Get steam stats of a user (requires the Custom URL or just last id)",
    usage: "<user> <platform> | store",
    example:".ft ninja pc  or  .ft store",
    aliases:["ftn","ft","fts"],
    run: async (client, message, args) => {
        const platforms = ["pc", "xb1", "psn"];
        
        if (args[0].toLowerCase() === "store") {
            const store = await ft.store();

            const embed = new RichEmbed()
                .setColor("#9d4dbb")
                .setFooter("Fortnite store", message.author.displayAvatarURL)
                .setTimestamp();

            store.sort((a, b) => {
                return b.vbucks - a.vbucks;
            });

            store.forEach(el => {
                embed.addField(el.name, stripIndents`**- Rarity:** ${el.rarity}
                **- Price:** ${el.vbucks} v-bucks
                **- Image:** [Press Me](${el.image})`, true)
            });

            message.channel.send(embed);
        } else {
            const lastWord = args[args.length - 1].toLowerCase();
            
            let platform, username; 

            if (platforms.includes(lastWord)) {
                username = args.slice(0, args.length - 1).join(" "); 
                platform = lastWord;
            } else {    
                username = args.join(" ");
                platform = "pc";
            }
            
            const search = await ft.user(username, platform);

            if (!search.username) {
                return message.channel.send("Couldn't find that person, try again")
                    .then(m => m.delete(5000));
            }
            

            const lifetime = search.stats.lifetime;
            const solo = search.stats.solo;
            const duo = search.stats.duo;
            const squad = search.stats.squad;

            const embed = new RichEmbed()
                .setTitle(`${search.username} (${search.platform})`)
                .setURL(search.url)
                .setThumbnail("https://i.imgur.com/xUcA9gT.png")
                .setColor("#9d4dbb")
                .setFooter(client.user.username, message.author.displayAvatarURL)
                .setTimestamp()
                .addField("Solo:", stripIndents`**- Wins:** ${solo.wins || "NAN"}
                **- Score:** ${solo.score || "NAN"}
                **- KD:** ${solo.kd || "NAN"}
                **- Kills:** ${solo.kills || "NAN"}
                **- Kills per match:** ${solo.kills_per_match || "NAN"}`, true)
                .addField("Duo:", stripIndents`**- Wins:** ${duo.wins || "NAN"}
                **- Score:** ${duo.score || "NAN"}
                **- KD:** ${duo.kd || "NAN"}
                **- Kills:** ${duo.kills || "NAN"}
                **- Kills per match:** ${duo.kills_per_match || "NAN"}`, true)
                .addBlankField()
                .addField("Squad:", stripIndents`**- Wins:** ${squad.wins || "NAN"}
                **- Score:** ${squad.score || "NAN"}
                **- KD:** ${squad.kd || "NAN"}
                **- Kills:** ${squad.kills || "NAN"}
                **- Kills per match:** ${squad.kills_per_match || "NAN"}`, true)
                .addField("Lifetime:", stripIndents`**- Wins:** ${lifetime.wins || "NAN"}
                **- Score:** ${lifetime.score || "NAN"}
                **- KD:** ${lifetime.kd || "NAN"}
                **- Kills:** ${lifetime.kills || "NAN"}`, true)

            message.channel.send(embed)
        }
    }
}