const fs = require('fs')

module.exports = {
    name: "write",
    category: "fun",
    description: "Save 1 message in our database",
	clientPermissions: ["EMBED_LINKS","SEND_MESSAGES"],
	userPermissions:["VIEW_CHANNEL"],
    run: async (client, message, args) => {

        // editedmessage = message.content.slice(6);
        //console.log(args.join(" "));
        let save = args.join(" ");
        
        if(message.content.length > 900) return message.channel.send('Please reduce the message you want to save below 900 characters')
        let msgs = JSON.parse(fs.readFileSync("./data/message.json", "utf8"));

        msgs [message.guild.id]= {[message.author.id] : {
            message: save
        }};
        await fs.writeFile("./data/message.json", JSON.stringify(msgs,null,4), (err) => {
            if (err) throw err;
            console.log(err);
            message.channel.send("message saved!")
        });
        
    }
    
}
