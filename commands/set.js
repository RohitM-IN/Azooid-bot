const {
  inspect
} = require("util");
const {
  stripIndent
} = require('common-tags')
let keys = ['prefix', 'welcomeChannelID', 'logchannel', 'voicelogchannel', 'guildautorole', 'defaultchannelID', 'playervolume']
const admin = require('firebase-admin');
let db = admin.firestore();
// This command is to modify/edit guild configuration. Perm Level 3 for admins
// and owners only. Used for changing prefixes and role names and such.

// Note that there's no "checks" in this basic version - no config "types" like
// Role, String, Int, etc... It's basic, to be extended with your deft hands!

// Note the **destructuring** here. instead of `args` we have :
// [action, key, ...value]
// This gives us the equivalent of either:
// const action = args[0]; const key = args[1]; const value = args.slice(2);
// OR the same as:
// const [action, key, ...value] = args;
exports.run = async (client, message, [action, key, ...value], level) => { // eslint-disable-line no-unused-vars

  // Retrieve current guild settings
  const settings = message.settings;
  //const defaults = client.settings.get("default");
  let defaults = ['.', 'default', '100']
  let deleted, messages;
  let datas = JSON.parse(fs.readFileSync("./data/json/serversettings.json", "utf8"))
  messages = stripIndent `
  {
  'guildID': ${datas['guilds'][message.guild.id]['guildID']},
  'guildName': ${datas['guilds'][message.guild.id]['guildName']},
  'prefix': ${datas['guilds'][message.guild.id]['prefix']},
  'welcomeChannelID': ${datas['guilds'][message.guild.id]['welcomeChannelID']},
  'logchannel': ${datas['guilds'][message.guild.id]['logchannel']},
  'voicelogchannel': ${datas['guilds'][message.guild.id]['voicelogchannel']},
  'guildautorole': ${datas['guilds'][message.guild.id]['guildautorole']},
  'defaultchannelID': ${datas['guilds'][message.guild.id]['defaultchannelID']},
  'playervolume': ${datas['guilds'][message.guild.id]['playervolume']}
  }`
  if (action == 'reset' || action == 'create') {
    let gData = message.guild
    db.collection('guilds').doc(gData.id).set({
      'guildID': gData.id,
      'guildName': gData.name,
      'guildOwner': gData.owner.user.username,
      'guildOwnerID': gData.owner.id,
      'guildMemberCount': gData.memberCount,
      'prefix': '.',
      'welcomeChannelID': "default",
      'logchannel': 'default',
      'voicelogchannel': 'default',
      'guildautorole': 'default',
      'defaultchannelID': "default",
      'playervolume': 100
    }).then(message.channel.send("DataBase Successdfully Created/Reset for this server!\nnow use <prefix>welcome & <prefix>log command to set their channels"))
  }
  if (!action) {
    let remains = [key];

    message.channel.send(`***__Current Guild Settings__***\n\`\`\`json\n${messages}\n\`\`\``)
  }
  // Secondly, if a user does `-set edit <key> <new value>`, let's change it
  if (action === "edit") {
    if (!key) return message.reply("Please specify a key to edit");
    if (!keys == key) return message.reply(`This key does not exist in the settings Keys are ${keys}`);
    if (value.length < 1) return message.reply("Please specify a new value");

    let data = value.join(" ");
    db.collection('guilds').doc(message.guild.id).update({
      key: data
    }).then(() => {
      message.reply(`${key} successfully edited to ${value.join(" ")}`);
    })
    //client.settings.set(message.guild.id, settings);

  } else

    // Thirdly, if a user does `-set del <key>`, let's ask the user if they're sure...
    if (action === "del") {
      if (!key) return message.reply("Please specify a key to delete (reset).");
      if (!keys == key) return message.reply("This key does not exist in the settings");
      if (keys[0] == key) deleted = defaults[0]
      else if (keys[1] == key || keys[2] == key || keys[3] == key || keys[4] == key || keys[5] == key) deleted = defaults[1]
      else if (keys[6] == key) deleted = defaults[3]
      // Throw the 'are you sure?' text at them.
      const response = await client.awaitReply(message, `Are you sure you want to reset \`${key}\` to the default \`${deleted}\`?`);

      // If they respond with y or yes, continue.
      if (["y", "yes"].includes(response)) {

        // We delete the `key` here.
        db.collection('guilds').doc(message.guild.id).update({
          key: deleted
        }).then(() => {
          message.reply(`${key} was successfully deleted.`);
        })

      } else
        // If they respond with n or no, we inform them that the action has been cancelled.
        if (["n", "no", "cancel"].includes(response)) {
          let data = JSON.parse(fs.readFileSync("./data/json/serversettings.json", "utf8"))
          let remains = data['guilds'][message.guild.id][key];
          message.reply(`Your setting for \`${key}\` remains at \`${remains}\``);
        }
    } else

      // Using `-set get <key>` we simply return the current value for the guild.
      if (action === "get") {
        if (!key) return message.reply("Please specify a key to view");
        if (!keys == key) return message.reply("This key does not exist in the settings");
        let data = JSON.parse(fs.readFileSync("./data/json/serversettings.json", "utf8"))
        let val = data['guilds'][message.guild.id][key];
        message.reply(`The value of ${key} is currently ${val}`);

        // Otherwise, the default action is to return the whole configuration in JSON format (to be prettified!);
      } else {
        await message.channel.send(`***__Current Guild Settings__***\n\`\`\`json\n${messages}\n\`\`\``);
        message.channel.send(`See the Dashboard on <http://www.azooid.tk/>`);
      }
  load();
};

function load() {
  let query = db.collection('guilds')
  let guilds = {} // plain object, not array   
  let promise = new Promise(async function (resolve) {

    await query.get().then(snapshot => {
      let remaining = snapshot.size; // If firebase, there is this property
      snapshot.forEach(doc => {
        guilds[doc.id] = doc.data();
        remaining--;
        if (!remaining) resolve(guilds);
      });
    })
  });
  promise.then(async function (guilds) {
    // do anything you like with guilds inside this function...
    let temp = {
      guilds
    };
    await fs.writeFileSync("./data/json/serversettings.json", JSON.stringify(temp), function (err) {
      if (err) throw err;

    })
  });
  console.log("done saving serversettings.json")
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["setting", "settings"],
  permLevel: "Administrator"
};

exports.help = {
  name: "set",
  category: "System",
  description: "View or change settings for your server.",
  usage: "set <view/get/edit> <key> <value>"
};