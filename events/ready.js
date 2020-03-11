const https = require("https");
var fs = require("fs");
const { RichEmbed } = require('discord.js')
const firebase = require('firebase/app');
const FieldValue = require('firebase-admin').firestore.FieldValue;
const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccount.json')
let db = admin.firestore();
var ref = admin.database().ref();
var usersRef = ref.child('guilds');
const { nodes,nodes1 } = require("../config.json")

const { ErelaClient, Utils } = require("erela.js");

module.exports = async (client) => {
    

        console.log(`Hi, ${client.user.username} is now online and ready to server in ${client.guilds.size} servers and serving ${client.guilds.reduce((c, p) => c + p.memberCount, 0)} users!.`);
        
    
        client.user.setPresence({
            status: "online",
            game: {
                name: "@mention help",
                type: "PLAYING"
            }
        });
        refreshDotaData();
    
    function refreshDotaData() {
  
      https.get("https://raw.githubusercontent.com/odota/dotaconstants/master/build/heroes.json", res => {
        res.setEncoding("utf8");
        let body = "";
        res.on("data", data => {
          body += data;
        });
        res.on("end", () => {
    
          // console.log("Hero Data Retrieved");
          //  body = "[" + body.substring(body.indexOf("{") + 1, body.lastIndexOf("}")) + "]";
          fileData("./heroes.json", body);
          // console.log("Hero Data Written");
        });
      });
      https.get("https://raw.githubusercontent.com/odota/dotaconstants/master/build/items.json", res => {
        res.setEncoding("utf8");
        let body = "";
        res.on("data", data => {
          body += data;
        });
        res.on("end", () => {
    
          // console.log("Item Data Retrieved");
          //  body = "[" + body.substring(body.indexOf("{") + 1, body.lastIndexOf("}")) + "]";
          fileData("./items.json", body);
          // console.log("Item Data Written");
        });
      });
      https.get("https://raw.githubusercontent.com/odota/dotaconstants/master/build/abilities.json", res => {
        res.setEncoding("utf8");
        let body = "";
        res.on("data", data => {
          body += data;
        });
        res.on("end", () => {
          // console.log("Ability Data Retrieved");
          //  body = "[" + body.substring(body.indexOf("{") + 1, body.lastIndexOf("}")) + "]";
          fileData("./abilities.json", body);
          // console.log("Ability Data Written");
        });
      });
    }
    function fileData(savPath, newData) {

        fs.exists(savPath, function(exists) {
          if (exists) {
            fs.readFile(savPath, 'utf8', function(err, data) {
              if (err) throw err;
              //Do your processing, MD5, send a satellite to the moon, etc.
              //console.log("Data:" + data);
              fs.writeFile(savPath, newData, function(err) {
                if (err) throw err;
                console.log('complete');
              });
            });
          } else {
            fs.writeFile(savPath, {
              flag: 'wx'
            }, function(err, data) {
              fs.readFile(savPath, 'utf8', function(err, data) {
                if (err) throw err;
                //Do your processing, MD5, send a satellite to the moon, etc.
                //console.log("Data:" + data);
                fs.writeFile(savPath, newData, function(err) {
                  if (err) throw err;
                  console.log('complete');
                });
              });
            })
          }
        });
      
      }
      load()

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
    
    client.music = new ErelaClient(client, nodes)
        .on("nodeError", console.log)
        .on("nodeConnect", () => console.log("Successfully created a new Node."))
        .on("queueEnd", player => {
            player.textChannel.send("Well nothing left for me to play see you soon !")
            player.setTrackRepeat(false);
            player.setQueueRepeat(false);
            return client.music.players.destroy(player.guild.id)
        })
        .on("trackStart", async ({textChannel, trackRepeat}, {title, duration , thumbnail ,requester ,uri }) => {
          
          if(trackRepeat === false){
            let Embed = new RichEmbed()
          .setTitle(`:musical_note: Now Playing`)
          .addField(`**Title :** `,`${title} : \`${Utils.formatTime(duration, true)}\``)
          .setThumbnail(thumbnail)
          .addField(`Requested By :`,requester.username)
          .addField(`**Link:**`,`[${title}](${uri})`)
          .setTimestamp()
          .setFooter(`${client.user.username}`);
          textChannel.send(Embed);
          }else{
            return;
          }
          
        })
      
        .on("nodeDisconnect", (node, error) => console.log(error));
    client.levels = new Map()
        .set("none", 0.0)
        .set("low", 0.10)
        .set("medium", 0.15)
        .set("high", 0.25);

        
        
    
}