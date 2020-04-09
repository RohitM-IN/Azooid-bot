const opusscript = require("opusscript");
const fs = require("fs");
const admin = require('firebase-admin')
let db = admin.firestore();

exports.run = async (client, message, args) => {

  const player = client.music.players.get(message.guild.id);
  const voiceChannel = message.member.voice.channel;
  const voiceChannelID = message.member.voice.channelID;
  if (!voiceChannel || voiceChannelID !== player.voiceChannel.id) return message.channel.send("You need to be in a voice channel to use the Volume command.");

  if (!player) return message.channel.send("No song/s currently playing")
  if (!args[0]) return message.channel.send(`Current Volume is : ${player.volume}`);
  if (Number(args[0]) <= 0 || Number(args[0]) > 100) return message.channel.send("You may only set volume 1-100");

  player.setVolume(Number(args[0]));
  db.collection('guilds').doc(message.guild.id).update({
    'playervolume': args[0]
  }).then(() => {
    message.channel.send(`Successfully set volume to: ${args[0]}`);
    load();
  })
  

  function load() {
    let query = db.collection('guilds')
    let guilds = {}
    let promise = new Promise(async function (resolve) {

      await query.get().then(snapshot => {
        let remaining = snapshot.size;
        snapshot.forEach(doc => {
          guilds[doc.id] = doc.data();
          remaining--;
          if (!remaining) resolve(guilds);
        });
      })
    });
    promise.then(async function (guilds) {
      let temp = {
        guilds
      };
      await fs.writeFileSync("./data/json/serversettings.json", JSON.stringify(temp), function (err) {
        if (err) throw err;

      })
    });
    //console.log('done saving serversettings.json')
  }


}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["vol", "v"],
  permLevel: "User"
};

exports.help = {
  name: "volume",
  description: "plays audio",
  usage: ".play <name of station>",
  category: "Music",
};