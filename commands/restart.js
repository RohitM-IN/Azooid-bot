const ownerid = "348832732647784460";
const { config } = require("dotenv");

exports.run = async (client, message, args, level) => {// eslint-disable-line no-unused-vars
    if(message.author.id !== ownerid) return message.reply("Bot Owner can only use this command").then(m =>m.delete({ timeout: 5000 }));
  
    
      channel.send('Resetting...')
      client.destroy()
      client.login(client.config.token)
      
}
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "Bot Admin"
  };
  
  exports.help = {
    name: "restart",
    category: "System",
    description: "Shuts down the Client and will try to re log in the bot.",
    usage: "restart"
  };
  