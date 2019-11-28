
const { get } = require("snekfetch");


module.exports = {
  name: "neko",
  description: "Shows a picture of a neko.",
  category: "NSFW",
  usage: "neko",
  extended: "This command will return a Neko, a lewd Neko if used in a NSFW channel",
  cost: 40,
  cooldown: 10,
  aliases: ["catgirl"],
  run: async (client,message, args, level) => {
      
    if (!message.channel.nsfw) return message.reply("🔞 Cannot display NSFW content in a SFW channel.");

    const msg = await message.channel.send(`<a:typing:397490442469376001> **${message.member.displayName}** is looking for a feline...`);
    const { body } = await get("https://nekos.life/api/v2/img/lewd");
    await msg.edit({
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
