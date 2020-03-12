const Discord = require("discord.js");
const { stripIndents } = require("common-tags");
const fs = require('fs');

module.exports = {
    name: "welcome",
    category: "owner",
    description: "change welcome channel of the server ",
    clientPermissions: ["EMBED_LINKS","SEND_MESSAGES"],
	userPermissions:["VIEW_CHANNEL","ADMINISTRATOR"],
    run: (client, message, args,db) => {
        if(!message.member.hasPermission('ADMINISTRATOR') || message.author.id == "348832732647784460") return message.channel.send("you dont have admin rights contact server admin");
        if(!args[0]) return message.channel.send("please enter channel id or #<id here>");

        db.collection('guilds').doc(message.guild.id).update({
            'welcomeChannelID': args[0] 
        }).then(() => {
            let sEmbed = new Discord.RichEmbed()
            .setColor("e8a515")
            .setTitle("Welcome channel successfully changed")
            .setDescription(`New welcome channel is : " ${args[0]} "`);
        
            message.channel.send(sEmbed);
            load();
        })

        

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
        
        
    }
}