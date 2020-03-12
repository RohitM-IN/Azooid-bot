const Discord = require("discord.js");
const opusscript = require("opusscript");
const fs = require("fs");


module.exports = {
  name: "volume",
  description: "plays audio",
  usage: ".play <name of station>",
  category: "music",
  clientPermissions: ["EMBED_LINKS","SEND_MESSAGES"],
	userPermissions:["VIEW_CHANNEL"],
  aliases: ["vol", "v"],
  run: async (client, message, args, db) => {
    //message.channel.send(`Audio Quality not too good :wink:`);
    const player = client.music.players.get(message.guild.id);

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
    }


  }
}