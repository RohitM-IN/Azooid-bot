
const { get } = require("snekfetch");

module.exports = {
  name: "hgif",
  description: "This command will return hentai porn in gif form.",
  category: "NSFW",
  usage: "hgif",
  cost: 40,
  cooldown: 10,
  loadingString: "<a:typing:397490442469376001> **{{displayName}}** is looking for hentai porn gifs...",
  aliases: ["hentaigif"],
  run: async (client,message, args) => {
      
    if (!message.channel.nsfw) return message.reply("🔞 Cannot display NSFW content in a SFW channel.");

    const { body } = await get("https://nekos.life/api/v2/img/Random_hentai_gif");
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
