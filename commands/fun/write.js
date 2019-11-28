const fs = require('fs')

module.exports = {
    name: "write",
    category: "fun",
    description: "Save 1 message in our database",
    run: async (client, message, args) => {

        // editedmessage = message.content.slice(6);
        //console.log(args.join(" "));
        let save = args.join(" ");
        

        let msgs = JSON.parse(fs.readFileSync("./message.json", "utf8"));

        msgs [message.guild.id]= {[message.author.id] : {
            message: save
        }};
        await fs.writeFile("./message.json", JSON.stringify(msgs,null,4), (err) => {
            if (err) throw err;
            console.log(err);
            message.channel.send("message saved!")
        });
        
    }
    
}
