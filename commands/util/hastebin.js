const hastebin = require('hastebin-gen');

module.exports ={ 
    name: "hastebin",
    category: "util",
    description: "saves the message to hastebin ",
    usage: "hastebin <your complete message>",
    clientPermissions: ["SEND_MESSAGES"],
	userPermissions:["VIEW_CHANNEL"],
    aliases:["pastebin"],
    run : async (client, message, args) => {

     let haste = args.slice(0).join(" ")

        let type = args.slice(1).join(" ")

        if (!args[0]) { return message.channel.send("What do you want to post in Hastebin?") }

        hastebin(haste).then(r => {

            message.channel.send("`Posted to Hastebin at this URL:`  " + r);

        }).catch(console.error);

        message.delete();

    }
}        
