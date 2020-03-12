const Discord = require("discord.js");
const config = require("../../config.json");
const ownerid = "348832732647784460";
const { inspect } = require("util");

  module.exports = {
    name: "eval",
    category: "owner",
    description: "Dangerous eval command",
    clientPermissions: ["SEND_MESSAGES"],
    userPermissions:["VIEW_CHANNEL"],
    run: async (client, message, args) => {
      
      
      if(message.author.id == ownerid){
        let toeval = args.join(" ");
        let evaled = inspect(eval(toeval, { depth: 0 }))
        try{
          if(toeval) {
            let hrStart = process.hrtime()
            let hrDiff;
            hrDiff = process.hrtime(hrStart)
            return message.channel.send(`Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s`: ''}${hrDiff[1]/ 1000000}ms *\`\`\`javascrpit\n${evaled}\n\`\`\``, { maxLength: 1900})
          } else {
            message.channel.send("Error while evaluating.")
          }
        } catch(e){
          message.channel.send(`Error while evaluating : \`${e.message}\``);
        }
      } else {
        return message.reply("you dont have perission to use this command").then(m => m.delete(5000));
      }


      
    
    }
}
