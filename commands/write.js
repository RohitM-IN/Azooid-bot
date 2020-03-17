const fs = require('fs')

exports.run = async (client, message, args) => {
        let save = args.join(" ");
        
        if(message.content.length > 900) return message.channel.send('Please reduce the message you want to save below 900 characters')
        let msgs = JSON.parse(fs.readFileSync("./data/json/message.json", "utf8"));

        msgs [message.guild.id]= {[message.author.id] : {
            message: save
        }};
        await fs.writeFile("./data/json/message.json", JSON.stringify(msgs,null,4), (err) => {
            if (err) throw err;
            console.log(err);
            message.channel.send("message saved!")
        });
        
    }
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["save"],
    permLevel: "User"
  };

  exports.help = {
    name: "write",
    description: "Save 1 message in our database",
    usage: ".write <message>",
    category: "Fun",
  };
