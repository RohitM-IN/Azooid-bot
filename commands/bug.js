const moment = require('moment');
const ownerID = require('../config.json').ownerid;

exports.run = async (client, message, args) => {
  let tDate = moment().format('LLLL');
  client.users.cache.get(ownerID).send(`**Username**: ${message.author.username}, ${message.author.id}\n**Bug**: \`\`\`${args.join(" ")}\`\`\`\n**Server**: ${message.guild.name}\n**Date**: ${tDate}`, {
    split: "\n"
  });
  message.channel.send('Bug Reported to Bot Owner!');
}


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["reportbug", "report-bug"],
  permLevel: "User"
};

exports.help = {
  name: "bug",
  description: "reports the owner of a bug",
  category: "Moderation",
  usage: "bug <issue>",
};