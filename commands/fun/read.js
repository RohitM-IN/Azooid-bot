const fs = require('fs');
const Discord = require('discord.js');
module.exports = {
    name: "read",
    category: "fun",
    description: "reads last saved message form our database",
    run: async (client, message, args,member ) => {
        let msg = JSON.parse(fs.readFileSync("./message.json", "utf8"));
        let author_id = message.author.id
        let guild_id = message.guild.id
       // let out = msg[guild_id].author_id.msgs
        let out = msg [guild_id][author_id].message  
        if(out  == null )return message.channel.send("save somthing first");
        //console.log(out)
       let sEmbed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle(`Here is the massage you recorded`)
        .setDescription(`${ out}`);
        message.reply(sEmbed);
        

    }
    
}
process.on('unhandledRejection', error => console.log('Uncaught Promise Rejection', error));
