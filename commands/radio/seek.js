const Discord = require("discord.js");
const { Utils } = require("erela.js");


module.exports = {
    name: "seek",
    description: "seeks the audio back and fourth",
    usage: "seek <time>",
    category: "music",
    clientPermissions: ["EMBED_LINKS","SEND_MESSAGES"],
	userPermissions:["VIEW_CHANNEL"],
    example: "seek 1h15m2s",
    run: async (client, message, args) => {
        const player = client.music.players.get(message.guild.id);
        const {
            voiceChannel
        } = message.member;
        let msg = 'usage:\nseek 1h2m3s \nwhere **h** is hour **m** is min **s** is sec\nexample:\n1) seek 15m4s\t2) seek 1h 24s'
        if (!player) return message.channel.send("No song/s currently playing")
        if (!voiceChannel) return message.channel.send("You need to be in a voice channel to use the seek command.");
        if (!args[0]) return message.channel.send(msg);
        const {
            duration
        } = player.queue[0];
        let time = 0;

        function seek() {
            return new Promise(resolve => {
                args.forEach(arg => {
                    tr = Utils.parseTime(arg) //
                    time = time + tr
                })

                if (time == 0) return message.channel.send(msg);
                if (time > duration) return message.channel.send('Seeking duration is greater than the track duration');
                player.seek(time);
                resolve();

            })
        }

        seek().then(message.channel.send(`Successfully seeked to \`${Utils.formatTime(time, true)}/${Utils.formatTime(duration, true)}\``));

    }
}