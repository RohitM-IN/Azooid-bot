const {
    MessageEmbed
} = require("discord.js");
const {
    stripIndents
} = require("common-tags");
const fetch = require("node-fetch");
const dateFormat = require("dateformat")
const {
    api: {
        steamapi
    }
} = require("../auth.json");


exports.run = async (client, message, args) => {
    if (!args[0]) return message.channel.send("Please provide an account name!");
    const id_ = args[0].match(/^(https:\/\/steamcommunity\.com\/id\/)?([^\s\/]+)\/?$/);
    if (id_) {
        args[0] = id_[2];
    }
    const token = steamapi;

    const url = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${token}&vanityurl=${args.join(" ")}`;

    fetch(url).then(res => res.json()).then(body => {
        if (body.response.success === 42) return message.channel.send("I was unable to find a steam profile with that name");

        const id = body.response.steamid;
        const summaries = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${token}&steamids=${id}`;
        const bans = `http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=${token}&steamids=${id}`;
        const state = ["Offline", "Online", "Busy", "Away", "Snooze", "Looking to trade", "Looking to play"];

        fetch(summaries).then(res => res.json()).then(body => {
            if (!body.response) return message.channel.send("I was unable to find a steam profile with that name.");
            const {
                personaname,
                avatarfull,
                realname,
                personastate,
                loccountrycode,
                profileurl,
                timecreated
            } = body.response.players[0];

            fetch(bans).then(res => res.json()).then(body => {
                if (!body.players) return message.channel.send("I was unable to find a steam profile with that name");
                const {
                    NumberOfVACBans,
                    NumberOfGameBans
                } = body.players[0];

                const embed = new MessageEmbed()
                    .setColor("RANDOM")
                    .setAuthor(`Steam Services | ${personaname}`, avatarfull)
                    .setThumbnail(avatarfull)
                    .setDescription(stripIndents `**Real Name:** ${realname || "Unknown"}
                **Status:** ${state[personastate]}
                **Country:** :flag_${loccountrycode ? loccountrycode.toLowerCase() : "white"}:
                **Account Created:** ${dateFormat(timecreated * 1000,"d/mm/yyyy (h:MM:ss TT)")}
                **Bans:** Vac: ${NumberOfVACBans}, Game: ${NumberOfGameBans}
                **Link:** [link to profile](${profileurl})
                `)
                    .setTimestamp()
                    .setFooter(client.user.username);





                message.channel.send(embed);


            })
        })
    })


}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "steam",
    category: "Games",
    description: "Get steam stats of a user (requires the Custom URL or just last id)",
    usage: "<user>",
};