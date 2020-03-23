const hastebin = require('hastebin-gen');

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  let haste = args.slice(0).join(" ")

  let type = args.slice(1).join(" ")

  if (!args[0]) {
    return message.channel.send("What do you want to post in Hastebin?")
  }

  hastebin(haste).then(r => {

    message.channel.send("`Posted to Hastebin at this URL:`  " + r);

  }).catch(console.error);

  message.delete();
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["pastebin"],
  permLevel: "User"
};

exports.help = {
  name: "hastebin",
  category: "Miscellaneous",
  description: "saves the message to hastebin ",
  usage: "hastebin <your complete message>",
};