const {
    Utils
} = require("erela.js")
const {
    MessageEmbed
} = require("discord.js")
const opusscript = require("opusscript");
const fs = require("fs");
exports.run = async (client, message, args) => {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) return message.channel.send("You need to be in a voice channel to play music.");

    const permissions = voiceChannel.permissionsFor(client.user);
    if (!permissions.has("CONNECT")) return message.channel.send("I cannot connect to your voice channel, make sure I have permission to!");
    if (!permissions.has("SPEAK")) return message.channel.send("I cannot connect to your voice channel, make sure I have permission to!");

    if (!args[0]) return message.channel.send("Please provide a song name or link to search.");

    let datas = JSON.parse(fs.readFileSync("./data/json/serversettings.json", "utf8"))
    let volume = datas['guilds'][message.guild.id]['playervolume'];
    const player = client.music.players.spawn({
        guild: message.guild,
        textChannel: message.channel,
        voiceChannel
    });
    let searchQuery 
    searchQuery = {
        source: "soundcloud",
        query: args.join(" ")
    };

    client.music.search(searchQuery, message.author).then(async res => {
        switch (res.loadType) {
            case "TRACK_LOADED":
                player.queue.add(res.tracks[0]);
                message.channel.send(`Adding \`${res.tracks[0].title}\` \`${Utils.formatTime(res.tracks[0].duration, true)}\``);
                if (!player.playing) {
                    player.play();
                    player.setVolume(volume || 100);
                }
                break;

            case "SEARCH_RESULT":
                let index = 1;
                const tracks = res.tracks.slice(0, 5);
                const embed = new MessageEmbed()
                    .setAuthor("Song Selection.", message.author.displayAvatarURL())
                    .setDescription(tracks.map(video => `**${index++} -** ${video.title} : \`${Utils.formatTime(video.duration, true)}\``))
                    .setFooter("Your response time closes within the next 30 seconds. Type 'cancel' to cancel the selection");

                await message.channel.send(embed);


                const collector = message.channel.createMessageCollector(m => {
                    return m.author.id === message.author.id && new RegExp(`^([1-5]|cancel)$`, "i").test(m.content)
                }, {
                    time: 30000,
                    max: 1
                });

                collector.on("collect", m => {
                    if (/cancel/i.test(m.content)) return collector.stop("cancelled")

                    const track = tracks[Number(m.content) - 1];
                    player.queue.add(track)
                    message.channel.send(`Adding \`${track.title}\` \`${Utils.formatTime(track.duration, true)}\``);
                    if (!player.playing) {
                        player.play();
                        player.setTrackRepeat(false);
                        player.setVolume(volume || 100);
                        player.setQueueRepeat(false);
                    }
                });

                collector.on("end", (_, reason) => {
                    if (["time", "cancelled"].includes(reason)) {
                        if (player.queue.empty == true) client.music.players.destroy(player.guild.id);
                        return message.channel.send("Cancelled selection.")
                    }
                });
                break;

            case "PLAYLIST_LOADED":
                res.playlist.tracks.forEach(track => player.queue.add(track));
                const duration = Utils.formatTime(res.playlist.tracks.reduce((acc, cur) => ({
                    duration: acc.duration + cur.duration
                })).duration, true);
                message.channel.send(`Adding \`${res.playlist.tracks.length}\` \`${duration}\` tracks in playlist \`${res.playlist.info.name}\``);
                if (!player.playing) {
                    player.play();
                    player.setTrackRepeat(false);
                    player.setVolume(volume || 100);
                    player.setQueueRepeat(false);
                }
                break;

            case "LOAD_FAILED":
                message.channel.send("Unable to add this song try other options !!");
                break;
        }
    }).catch(err => message.channel.send(err.message))
}


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["sp","soundcloud","sc","scplay"],
    permLevel: "User"
};

exports.help = {
    name: "splay",
    description: "plays audio from soundcloud",
    usage: "splay <name of song>",
    category: "Music",
};