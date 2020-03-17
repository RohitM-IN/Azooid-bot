const fs = require('fs');
const Discord = require('discord.js');
exports.run = async (client, message, args,member ) => {
        let msg = JSON.parse(fs.readFileSync("./data/json/message.json", "utf8"));
        let author_id = message.author.id
        let guild_id = message.guild.id
        let out = msg [guild_id][author_id].message  
        if(out  == null )return message.channel.send("save somthing first");

       let sEmbed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle(`Here is the massage you recorded`)
        .setDescription(`${ out}`);
        message.reply(sEmbed);
    }
    

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
  };

  exports.help = {
    name: "read",
    description: "reads last saved message form our database",
    usage: "read",
    category: "Fun",
  };