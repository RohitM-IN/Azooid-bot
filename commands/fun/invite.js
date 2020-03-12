const fs = require('fs');
const Discord = require('discord.js');
module.exports = {
    name: "invite",
    category: "fun",
    clientPermissions: ['SEND_MESSAGES'],
	userPermissions:["VIEW_CHANNEL"],
    description: "Sends you the invite link for bot and server",
    run: async (client, message, args ) => {
        let invitecode = "https://discord.gg/55rfDdK";
        let botinvitecode  = "http://bit.ly/ethytgamingbot";
        
        message.channel.send(`Here is the invite link for inviting ${client.user.username} to your server\n${botinvitecode}\nHere is the invite code for joining  bot's support server\n${invitecode}`);
        message.author.send(`Here is the invite link for inviting ${client.user.username} to your server\n${botinvitecode}\nHere is the invite code for joining  bot's support server\n${invitecode}`);

    }
    
}
