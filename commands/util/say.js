const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "say",
    category: "util",
    description: "clean up to last 100 messages ",
    usage: "<no of messages>",
    run: async (client, message, args) => {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.require("off..");
        if (args.length < 1) return message.channel.reply('nothing to say').then(m => m.delete(5000));
       let botmessage = args.join(" ");
       message.delete().catch();
       message.channel.send(botmessage);
        
        
    }
}