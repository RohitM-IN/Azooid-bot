const fs = require("fs");
const RadioBrowser = require('radio-browser')
const {Utils} = require("erela.js")
const {MessageEmbed} = require("discord.js")

exports.run = async (client, message, args) => {
    const  voiceChannel  = message.member.voice.channel;
        if (!voiceChannel) return message.channel.send("You need to be in a voice channel to play music.");

    const permissions = voiceChannel.permissionsFor(client.user);
    if (!permissions.has("CONNECT")) return message.channel.send("I cannot connect to your voice channel, make sure I have permission to!");
    if (!permissions.has("SPEAK")) return message.channel.send("I cannot connect to your voice channel, make sure I have permission to!");

const query = args.join(" ")
    if (!args[0]) return message.channel.send("Please provide a song name or link to search.");
    let datas = JSON.parse(fs.readFileSync("./data/json/serversettings.json", "utf8"))
    let volume = datas['guilds'][message.guild.id]['playervolume'];
    if(volume !== Number) volume = 100;
    const plays = client.music.players.spawn({
        guild: message.guild,
        textChannel: message.channel,
        voiceChannel
    });

    let filter = {
        limit: 1,
        by: 'name',
        searchterm: query
    }
    let str = "" 
    await RadioBrowser.getStations(filter)
    .then(data => {
        dat2a = data.forEach(item => {
            str = item.url
        })
    })
    if(str.length === 0 || str === "") return message.channel.send(new MessageEmbed().setDescription(`Invalid Radio Station`).setColor("GREEN").addField(`you can search radio name Like NCS`,`http://www.radio-browser.info/gui/#!/byname/ncs`))
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
}


    


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
  };

  exports.help = {
    name: "radio",
    description: "Playes radio in the voice channel.",
    usage: "<prefix>radio <channel name>",
    category: "Music",
  };