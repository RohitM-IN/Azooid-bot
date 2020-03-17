// This event executes when a new guild (server) is joined.
const admin = require('firebase-admin');
let db = admin.firestore();
let fs = require('fs')
module.exports = (client, guild) => {
  db.collection('guilds').doc(guild.id).set({
    'guildID': guild.id,
    'guildName': guild.name,
    'guildOwner': guild.owner.user.username,
    'guildOwnerID': guild.owner.id,
    'guildMemberCount': guild.memberCount,
    'prefix': '.',
    'welcomeChannelID': "default",
    'logchannel': 'default',
    'voicelogchannel': 'default',
    'guildautorole': 'default',
    'defaultchannelID': "default",
    'playervolume': 100
})
client.fetchUser(guild.owner.id, false).then(user => {
    user.send("Thanks for Inviting me to " + guild.name + " plz use welcome and log command to set the channel \nEX: <prefix>welcome #<channel name> \nEX: <prefix>log -h", )
})
load();
client.users.get(guild.owner.id).send("someMessageThanks for Inviting me to " + guild.name + " plz use welcome and log command to set the channel \nEX: <prefix>welcome #<channel name> \nEX: <prefix>log -h");
  client.user.setPresence({game: {name: `@Azooid#8892 help | ${client.guilds.size} Servers`, type:0}});
  client.log("log", `New guild has been joined: ${guild.name} (${guild.id}) with ${guild.memberCount}`, "JOINED");
  load()
};


function load() {
  let query = db.collection('guilds')
  let guilds = {} // plain object, not array   
  let promise = new Promise(async function(resolve) {
  
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
          let temp = { guilds };
          await fs.writeFileSync ("./data/json/serversettings.json", JSON.stringify(temp), function(err) {
              if (err) throw err;
          
          })
  });
  console.log("done saving serversettings.json")
}