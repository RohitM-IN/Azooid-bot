exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const msg = await message.channel.send("🏓 Pinging....");
  msg.edit(`🏓 Pong!
  Latency is ${Math.floor((msg.editedTimestamp || msg.createdTimestamp) - (message.editedTimestamp || message.createdTimestamp))}ms
  API Latency is ${Math.round(client.ws.ping)}ms`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "ping",
  category: "Miscellaneous",
  description: "It... like... pings. Then Pongs. And it\"s not Ping Pong.",
  usage: "ping"
};
