const fs = require('fs');
const Discord = require('discord.js');
module.exports = {
    name: "invite",
    category: "fun",
    description: "Sends you the invite link for bot and server",
    run: async (client, message, args ) => {
        let invitecode = "https://discord.gg/55rfDdK";
        let botinvitecode  = "http://bit.ly/ethytgamingbot";
        
        // let sEmbed = new Discord.RichEmbed()
        // .setColor("RANDOM")
        // .setTitle(`Here is the invite link for inviting  to your server`)
        // .setDescription(`${botinvitecode}`);
        
        // let Embed = new Discord.RichEmbed()
        // .setColor("RANDOM")
        // .setTitle(`Here is the invite code for joining  bot's support server`)
        // .setDescription(`${invitecode}`);

        // if(args[0] == 'bot') message.reply(sEmbed);
        // if(args[0] == 'server') message.reply(Embed);
        //message.reply(sEmbed);
        //message.reply(Embed);
        message.channel.send(`Here is the invite link for inviting  to your server\n${botinvitecode}\nHere is the invite code for joining  bot's support server\n${invitecode}`);
        message.author.send(`Here is the invite link for inviting  to your server\n${botinvitecode}\nHere is the invite code for joining  bot's support server\n${invitecode}`);
        //message.author.send(sEmbed);
        //message.author.send(Embed);
        console.error('Caught the promise rejections');
    }
    
}
process.on('unhandledRejection', error => console.log('Uncaught Promise Rejection', error));
