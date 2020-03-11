const Discord = require("discord.js");
const { Utils } = require("erela.js");


module.exports = {
    name: "bassboost",
    description: "plays audio",
    usage: ".bassboost <on/off>",
    category: "music",
    run: async (client, message, args) => {
    const player = client.music.players.get(message.guild.id);
    if(!player) return message.channel.send("No song/s currently playing")
    if(!args[0]) return message.channel.send('usage: bassboost on OR bassboost off');
    if(args[0] == 'on' || args[0] == 'ON'){
        player.setEQ(Array(6).fill(0).map((n, i) => ({ band: i, gain: 0.5 })));
        
        message.channel.send('Bassboost ON!!');
    }else if(args[0] == 'off' || args[0] == 'of' || args[0] == 'OFF'){
        player.setEQ(Array(6).fill(0).map((n, i) => ({ band: i, gain: 0 })));
        message.channel.send('Bassboost OFF!!');
    }

}
}