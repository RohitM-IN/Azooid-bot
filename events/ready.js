const https = require("https");
var fs = require("fs");
const { ErelaClient, Utils } = require("erela.js");
const { nodes } = require("../auth.json")
var http = require('http');
var index = fs.readFileSync('index.html');

module.exports = async (client) => {
    

        console.log(`Hi, ${client.user.username} is now online and ready to server in ${client.guilds.size} servers and serving ${client.guilds.reduce((c, p) => c + p.memberCount, 0)} users!.`);
        
    
        client.user.setPresence({
            status: "online",
            game: {
                name: "@mention help",
                type: "PLAYING"
            }
        });
		


		http.createServer(function (req, res) {
		res.writeHead(200, {'Content-Type': 'text/plain'});
			res.end(index);
			
		}).listen(9615);
		console.log("Http Started");
		
		
		
		
		
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

    //     client.music = new ErelaClient(client, nodes)
    //     .on("nodeError", console.log)
    //     .on("nodeConnect", () => console.log("Successfully created a new Node."))
    //     .on("queueEnd", player => {
    //         player.textChannel.send("Queue has ended.")
    //         return client.music.players.destroy(player.guild.id)
    //     })
    //     .on("trackStart", ({textChannel}, {title, duration}) => textChannel.send(`Now playing: **${title}** \`${Utils.formatTime(duration, true)}\``).then(m => m.delete(15000)));

    // client.levels = new Map()
    //     .set("none", 0.0)
    //     .set("low", 0.10)
    //     .set("medium", 0.15)
    //     .set("high", 0.25);

      
      }
      
    
}