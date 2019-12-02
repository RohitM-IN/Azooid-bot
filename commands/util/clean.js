const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "clean",
    category: "util",
    description: "clean up to last 100 messages ",
    usage: "<no of messages>",
    aliases:["cleanup", "clear"],
    run: async (client, message, args) => {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.require("off..");
        if(!args[0]) return message.channel.send("enter amount of message max 100");
        // if(args[0] == String) return message.channel.send('enter amount!'); 
        if(args[0] == "all") args[0]= 100;
        if(args[0] == "up") args[0]= 100;
                     
        if(args[0]>100)
        {
            message.channel.send("please enter amount less than 100").then(msg => msg.delete(5000));
        }
        else{
            message.channel.bulkDelete(args[0]).then(() => {
                message.channel.send(`Cleared ${args[0]} messages.`).then(msg => msg.delete(5000));
            })
        }

        
        
    }
}
process.on('unhandledRejection', error => console.log('Uncaught Promise Rejection', error));
