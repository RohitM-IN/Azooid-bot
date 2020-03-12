const Discord = require("discord.js");
const { stripIndents } = require("common-tags");
const fs = require('fs');

module.exports = {
    name: "autorole",
    category: "owner",
    description: "sets auto role for new members of the server ",
    clientPermissions: ["EMBED_LINKS","SEND_MESSAGES"],
	userPermissions:["VIEW_CHANNEL","MANAGE_ROLES"],
    aliases: ["role","set-role"],
    run: async (client, message, args, db) => {
        if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send("you dont have admin rights contact server admin");
        if(!args[0]) return message.channel.send("please enter the roll name");
        let role
        //let guildMember = 
        //let test = client.channels.guild.roles.find('name',args[0])
        //console.log(test)
        db.collection('guilds').doc(message.guild.id).update({
            'guildautorole': args[0] 
        }).then(() => {
            let sEmbed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle("Server autoroll successfully added/changed")
        .setDescription(`New server autoroll is : " ${args[0]} "`);
        
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