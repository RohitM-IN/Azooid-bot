
const { get } = require("snekfetch");

module.exports = {
  name: "hanal",
      description: "This command will return hentai porn in gif form.",
      category: "NSFW",
      usage: "hanal",
      cost: 40,
      cooldown: 10,
      loadingString: "<a:typing:397490442469376001> **{{displayName}}** is looking for hentai porn gifs...",
  run: async (client,message, args, level, loadingMessage) => {
      
    if (!message.channel.nsfw) return message.reply("🔞 Cannot display NSFW content in a SFW channel.");

    const { body } = await get("https://nekos.life/api/v2/img/anal");
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
