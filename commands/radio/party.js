const Discord = require("discord.js");
const { Utils } = require("erela.js");


module.exports = {
    name: "party",
    description: "plays audio",
    usage: ".eq <on/off>",
    category: "music",
    clientPermissions: ["EMBED_LINKS","SEND_MESSAGES"],
	userPermissions:["VIEW_CHANNEL"],
    run: async (client, message, args) => {
    const player = client.music.players.get(message.guild.id);
    if(!player) return message.channel.send("No song/s currently playing")
    if(!args[0]) return message.channel.send('usage: bassboost on OR bassboost off');
    if(!args || args[0] == 'on'){
        player.setEQ([
            { band: 0, gain: 0.45 },
            { band: 1, gain: 0.45 },
            { band: 2, gain: 0 },
            { band: 3, gain: 0 },
            { band: 4, gain: 0 },
            { band: 13, gain: 0.45 },
            { band: 12, gain: 0.45 }  
       ]);
       message.channel.send('Party Mode ON');
    }

   if(args[0] == 'off' || args[0] == 'of' || args[0] == 'OFF') {
    player.setEQ(Array(13).fill(0).map((n, i) => ({ band: i, gain: 0 })));
    message.channel.send('Party Mode ON');
}


}
}