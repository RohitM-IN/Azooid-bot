const fs = require('fs');
const Discord = require('discord.js');
exports.run = async (client, message, args ) => {

let spinning = await message.channel.send({
    embed: {
        color: 16515072,
        description: `${message.author.tag} is spinning a fidget spinner...`,
        image: {
        url: 'https://i.ibb.co/0M9BH31/r-647810-4-Fe-CH.gif'
        }
    }
    });

    let timeout = (Math.random() * (60 - 5 + 1)) + 5;
    setTimeout(() => {
    spinning.edit({
        embed: {
        color: 16515072,
        description: `${message.author.tag}, you spinned the fidget spinner for ${timeout.toFixed(2)} seconds.`
        }
    }).catch(e => {
        console.log.error(e);
    });
    }, timeout * 1000);
        

}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["fspin"] , 
    permLevel: "User"
  };

  exports.help = {
    name: 'fidgetSpinner',
    description: 'Spins a fidget spinner for you and shows for how long it was spinning.',
    usage: 'fakeBan [ @USER_MENTION | USER_ID ]',
    category: "Fun",
  };