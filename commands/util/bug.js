const { RichEmbed } = require("discord.js");
const moment = require('moment');
const ownerID = require('../../config.json').ownerid;

module.exports = {
    name: "bug",
    aliases: ["reportbug", "report-bug"],
    category: "util",
    description: "reports the owner of a bug",
    usage: "bug <issue>",
    run: (client, message, args) => {
        let tDate = moment().format('LLLL');
        client.users.get(ownerID).send(`**Username**: ${message.author.username}, ${message.author.id}\n**Bug**: \`\`\`${args.join(" ")}\`\`\`\n**Server**: ${message.guild.name}\n**Date**: ${tDate}`);
    }
}