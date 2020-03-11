const fs = require("fs");
const RadioBrowser = require('radio-browser')
const {Utils} = require("erela.js")
const {RichEmbed} = require("discord.js")

module.exports = {
    name: "radio",
    description: "Playes radio in the voice channel.",
    usage: "<prefix>radio <channel name>",
    example: ".radio ncs",
    category: "music",
    run: async (client, message, args) => {
        if (!args[0]) return message.channel.send("Please provide a song name or link to search.");
        const query = args.join(" ");
        const {voiceChannel} = message.member;
        if (!voiceChannel) return message.channel.send("You need to be in a voice channel to play music.");

        const player = client.music.players.get(message.guild.id);
        if (!player) client.music.players.spawn({
            guild: message.guild,
            textChannel: message.channel,
            voiceChannel
        });
        const plays = client.music.players.get(message.guild.id);
        let filter = {
            limit: 5, // list max 5 items
            by: 'name', // search in tag
            searchterm: query, // term in tag

        }
        let str = "";
        let i = 0;
        let datas = JSON.parse(fs.readFileSync("./data/json/serversettings.json", "utf8"))
        let volume = datas['guilds'][message.guild.id]['playervolume'];
        let embed = new RichEmbed()
            .setTitle('Search Results')
            .setFooter("Your response time closes within the next 30 seconds. Type 'cancel' to cancel the selection");
        await RadioBrowser.getStations(filter)
            .then(async data => {
                for (i = 0; i < 6; i++) {
                    if (data[i] != undefined) {
                        embed.addField(`Station ${i+1} `, `**${data[i].name}**,Language:**${data[i].language}**`);
                    }
                }
                message.channel.send(embed)
                const collector = message.channel.createMessageCollector(m => {
                    return m.author.id === message.author.id && new RegExp(`^([1-5]|cancel)$`, "i").test(m.content)
                }, {
                    time: 30000,
                    max: 1
                });

                collector.on("collect", async m => {
                    if (/cancel/i.test(m.content)) return collector.stop("cancelled")

                    const track = [Number(m.content) - 1];

                    collector.on("end", (_, reason) => {
                        if (["time", "cancelled"].includes(reason)) {
                            if (player.queue.empty == true) client.music.players.destroy(player.guild.id);
                            return message.channel.send("Cancelled selection.")
                        }
                    });
                    str = data[track].url
                    if (!str) return message.channel.send('Cannot play this Radio Station');
                    await play(str)
                })
            })
        async function play(str) {
            if (str.length === 0) return message.channel.send(new RichEmbed().setDescription(`Invalid Radio item`).setColor("GREEN"))
            await client.music.search(str, message.author).then(async res => {

                    switch (res.loadType) {
                        case "TRACK_LOADED":
                            plays.queue.add(res.tracks[0]);
                            message.channel.send(`Adding \`${res.tracks[0].title}\` \`${Utils.formatTime(res.tracks[0].duration, true)}\``);
                            if (!plays.playing) {
                                plays.play();
                                plays.setVolume(volume || 100);
                                plays.setTrackRepeat(false);
                                plays.setQueueRepeat(false);
                            }
                            break;

                        case "LOAD_FAILED":
                            message.channel.send("Unable to add this station try other options !!");
                            break;
                    }
                })
                .catch(error => console.error(error))
        }


    }

}