const config = require("../../config.json");

  module.exports = {
    name: "eval",
    category: "bot",
    description: "Dangerous eval command",
    run: async (client, message, args) => {
        
        if(message.author.id !== config.ownerid) return;
        try {
          const code = args.join(" ");
          let evaled = eval(code);
     
          if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);
     
            message.channel.sendCode("xl", evaled);
        } catch (err) {
          message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
      
    
    }
}
