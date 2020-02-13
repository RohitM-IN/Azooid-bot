
const { get } = require("snekfetch");


module.exports = {
  name: "ngif",
  description: "This command will return lewd nekos in gif form.",
  category: "NSFW",
  usage: "ngif",
  cost: 40,
  cooldown: 10,
  loadingString: "<a:typing:397490442469376001> **{{displayName}}** is looking for neko gifs...",
  aliases: ["nekogif"],
  run: async (client,message, args) => {
      
    if (!message.channel.nsfw) return message.reply("🔞 Cannot display NSFW content in a SFW channel.");
    //message.channel.send(`<a:typing:397490442469376001> ${message.author.tag} is looking for neko gifs...`);
    const { body } = await get("https://nekos.life/api/v2/img/nsfw_neko_gif");
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
