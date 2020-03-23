const {
  MessageEmbed
} = require("discord.js");
const {
  stripIndents
} = require("common-tags");
const {
  api: {
    fortnite_api
  }
} = require("../auth.json");
const fortnite = require("simple-fortnite-api"),
  cli = new fortnite(fortnite_api);

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  if (!args[0]) return message.channel.send("Please supply a username.");
  if (args[1] && !["lifetime", "solo", "duo", "squad"].includes(args[1])) return message.channel.send("Usage: `.fortnite <username> <gametype>`\nGameTypes: Lifetime, Solo, Duo, Squad");
  let gametype = args[1] ? args[1].toLowerCase() : "lifetime";

  let data = await cli.find(args[0])
  if (data && data.code === 404) return message.channel.send("Unable to find the username.");
  const {
    image,
    url,
    username
  } = data;
  const {
    scorePerMin,
    winPercent,
    kills,
    score,
    wins,
    kd,
    matches
  } = data[gametype]

  const embed = new MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`Epic Games (Fortnite)| ${username}`)
    .setThumbnail(image)
    .setDescription(stripIndents `**Gamemode:** ${gametype.slice(0, 1).toUpperCase() + gametype.slice(1)}
                **Kills:** ${kills || 0}
                **Score:** ${score || 0}
                **Score Per Min:** ${scorePerMin || 0}
                **Wins:** ${wins || 0}
                **win Ratio:** ${winPercent || "0%"}
                **Kill/Death Ratio:** ${kd || 0}
                **Matches Played:** ${matches || 0}
                **Link:** [link to profile](${url})
                `)
    .setTimestamp();

  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ftn"],
  permLevel: "User"
};

exports.help = {
  name: "fortnite",
  category: "Games",
  description: "Get steam stats of a user (requires the Custom URL or just last id)",
  usage: "<user> <platform>",
};