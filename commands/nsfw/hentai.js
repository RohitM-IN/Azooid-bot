
const { get } = require("snekfetch");

module.exports = {
  name: "hentai",
  description: "This command will return hentai.",
  category: "NSFW",
  usage: "hentai",
  cost: 40,
  cooldown: 10,
  loadingString: "<a:typing:397490442469376001> **{{displayName}}** is looking for hentai...",
  run: async (client,message, args) => {
      
    if (!message.channel.nsfw) return message.reply("🔞 Cannot display NSFW content in a SFW channel.");
    const { body } = await get("https://nekobot.xyz/api/image?type=hentai");
    await message.channel.send({
      embed: {
        "title": "Click here if the image failed to load.",
        "url": body.message,
        "color": 6192321,
        "image": {
          "url": body.message
        },
        "footer": {
          "text": `Requested by ${message.author.tag} | Powered by NekoBot API`
        }
      }
    });
  }
  
}
