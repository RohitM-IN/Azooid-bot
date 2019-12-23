
const { get } = require("snekfetch");

module.exports = {
  name: "hboobs",
      description: "This command will return hentai porn in gif form.",
      category: "NSFW",
      usage: "hboobs",
      cost: 40,
      cooldown: 10,
      loadingString: "<a:typing:397490442469376001> **{{displayName}}** is looking at big anime tiddies...",
      aliases: ["hboobssluts"],
  run: async (client,message, args) => {
      
    if (!message.channel.nsfw) return message.reply("🔞 Cannot display NSFW content in a SFW channel.");

    const { body } = await get("https://nekos.life/api/v2/img/boobs");
    await message.channel.send({
      embed: {
        "title": "Click here if the image failed to load.",
        "url": body.url,
        "color": 6192321,
        "image": {
          "url": body.url
        },
        "footer": {
          "text": `Requested by ${message.author.tag} | Powered by Nekos.life API`
        }
      }
    });
  }
  
}
