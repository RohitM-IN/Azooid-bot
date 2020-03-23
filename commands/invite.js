const fs = require('fs');
const Discord = require('discord.js');
exports.run = async (client, message, args) => {
  let invitecode = "https://discord.gg/uBDPReC";
  let botinvitecode = `<${client.config.dashboard.callbackURL.split("/").slice(0, -1).join("/")}>`;

  message.channel.send(`Here is the invite link for inviting ${client.user.username} to your server\n${botinvitecode}\nHere is the invite code for joining  bot's support server\n${invitecode}`);
  message.author.send(`Here is the invite link for inviting ${client.user.username} to your server\n${botinvitecode}\nHere is the invite code for joining  bot's support server\n${invitecode}`);

}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['inv', 'i'],
  permLevel: "User"
};

exports.help = {
  name: "invite",
  description: "Sends you the invite link for bot and server",
  usage: 'invite',
  category: "Fun",
};