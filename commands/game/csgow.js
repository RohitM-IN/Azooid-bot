const Discord = require('discord.js');
var request = require('request');
const { stripIndents } = require("common-tags");
var converter = require('steam-id-convertor');
var bigInt = require("big-integer");
var fs = require("fs");
var schedule = require('node-schedule');
const leven = require('leven');
const https = require("https");
const auth = require('../../auth.json').api.steamapi;

function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }
module.exports = {
    name: "csgow",
    description: "Displays a user's csgo weapons stats!",
    usage: "csgow <steamid or custom url>",
    category: "game",
    aliases: ["cs-gow"] , 
    run: async (client, message, args, userID, channelID) => {
        let test = args[0];
        let id = test.match(/^(https:\/\/steamcommunity\.com\/id\/)?([^\s\/]+)\/?$/);
        let id_ = test.match(/^(https:\/\/steamcommunity\.com\/profiles\/)?([^\s\/]+)\/?$/);

        if(id) args[0] = id[2];
        if(id_) args[0] = id_[2];
        
        async function doCSGOStats(steam64ID, profilePic, name, customUrl, userID) {
            message.channel.send("fetching stats please wait!!").then(msg => {
                https.get("https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v2/?key=" + auth + "&steamid=" + steam64ID + "&appid=730", res => {
              res.setEncoding("utf8");
          
              let body = "";
              res.on("data", data => {
                body += data;
              });
              res.on("end", () => {
                if(body.indexOf("500 Internal Server Error")!=-1){
                   msg.edit("Blocked by player's privacy settings.");
                    return;
                  }
                body = JSON.parse(body);
                if (body.playerstats == undefined) {
                 // console.log("profile not found");
                  msg.edit("No CSGO profile found.");
                  return;
                }
                var kd = bigInt("" + body.playerstats.stats[0].value).divmod("" + body.playerstats.stats[1].value);
                // console.log("kd: " + new String(kd.quotient));
                var tempString = new String(kd.remainder / body.playerstats.stats[1].value);
                var calculatedKD = new String(kd.quotient) + tempString.substring(tempString.indexOf("."));
                let embed = new Discord.RichEmbed()
                .setColor("#1adb3e")
                .setAuthor(`Counter-Strike: Global Offensive | ${playerID}`)
                .setThumbnail(profilePic)
                .setURL("http://steamcommunity.com/id/" + customUrl)
                .setDescription(`**Name:** ${name}`)
                .addField(`**Achievements:**`,`${body.playerstats.achievements.length}`,true)
                .addField(`**Terrorist:**`,`:point_down:`)
                .addField(`**Glock:**`,`${numberWithCommas(String(body.playerstats.stats[11].value))}`,true)
                .addField(`**TEC 9:**`,`${numberWithCommas(String(body.playerstats.stats[155].value))}`,true)
                .addField(`**CZ75-Auto:**`,`${numberWithCommas(String(body.playerstats.stats[12].value))}`,true)
                .addField(`**Mac 10:**`,`${numberWithCommas(String(body.playerstats.stats[16].value))}`,true)
                .addField(`**Sawed-Off:**`,`${numberWithCommas(String(body.playerstats.stats[149].value))}`,true)
                .addField(`**Galil AR:**`,`${numberWithCommas(String(body.playerstats.stats[164].value))}`,true)
                .addField(`**Ak47:**`,`${numberWithCommas(String(body.playerstats.stats[19].value))}`,true)
                .addField(`**SG 556:**`,`${numberWithCommas(String(body.playerstats.stats[125].value))}`,true)
                .addField(`**G3SG1:**`,`${numberWithCommas(String(body.playerstats.stats[22].value))}`,true);
                let embed1 = new Discord.RichEmbed()
                .setColor("#1adb3e")
                .addField(`**Counter-Terrorist:**`,`:point_down:`)
                .addField(`**P2000 / USP-S:**`,`${numberWithCommas(String(body.playerstats.stats[122].value))}`,true)
                .addField(`**Five-SeveN:**`,`${numberWithCommas(String(body.playerstats.stats[14].value))}`,true)
                .addField(`**MAG 7:**`,`${numberWithCommas(String(body.playerstats.stats[158].value))}`,true)
                .addField(`**MP 9:**`,`${numberWithCommas(String(body.playerstats.stats[137].value))}`,true)
                .addField(`**Famas:**`,`${numberWithCommas(String(body.playerstats.stats[21].value))}`,true)
                .addField(`**M4A1 / M4A1-S:**`,`${numberWithCommas(String(body.playerstats.stats[160].value))}`,true)
                .addField(`**AUG:**`,`${numberWithCommas(String(body.playerstats.stats[20].value))}`,true)
                .addField(`**Scar 20:**`,`${numberWithCommas(String(body.playerstats.stats[132].value))}`,true)
                .addField("**Common Weapons:**",`:point_down:`)
                .addField(`**P250:**`,`${numberWithCommas(String(body.playerstats.stats[123].value))}`,true)
                .addField(`**Dual Berettas:**`,`Updated soon`,true)
                .addField(`**Deagle:**`,`${numberWithCommas(String(body.playerstats.stats[11].value))}`,true)
                .addField(`**XM 1014:**`,`${numberWithCommas(String(body.playerstats.stats[14].value))}`,true)
                .addField(`**Nova:**`,`${numberWithCommas(String(body.playerstats.stats[141].value))}`,true)
                .addField(`**MP 7:**`,`${numberWithCommas(String(body.playerstats.stats[136].value))}`,true)
                .addField(`**UMP 45:**`,`${numberWithCommas(String(body.playerstats.stats[16].value))}`,true)
                .addField(`**P 90:**`,`${numberWithCommas(String(body.playerstats.stats[17].value))}`,true)
                .addField(`**Bizon:**`,`${numberWithCommas(String(body.playerstats.stats[151].value))}`,true)
                .addField(`**Negev:**`,`${numberWithCommas(String(body.playerstats.stats[144].value))}`,true)
                .addField(`**M 249:**`,`${numberWithCommas(String(body.playerstats.stats[23].value))}`,true)
                .addField(`**SSG 08:**`,`${numberWithCommas(String(body.playerstats.stats[134].value))}`,true)
                .addField(`**AWP:**`,`${numberWithCommas(String(body.playerstats.stats[19].value))}`,true)
                let embed2 = new Discord.RichEmbed()
                .setColor("#1adb3e")
                .addField(`**Melee weapons:**`,`:point_down:`)
                .addField(`**Knife:**`,`${numberWithCommas(String(body.playerstats.stats[8].value))}`,true)              
                .addField(`**Taser:**`,`${numberWithCommas(String(body.playerstats.stats[163].value))}`,true)
                .addField(`**Molotov:**`,`${numberWithCommas(String(body.playerstats.stats[165].value))}`,true)
                .addField(`**Extra info:**`,`:point_down:`)
                .addField(`**donated weapons:**`,`${numberWithCommas(String(body.playerstats.stats[35].value))} `,true) 
                .addField(`**K/D:**`,`${calculatedKD}`,true)
                .addField(`**Total Kills:**`,`${numberWithCommas(String(body.playerstats.stats[0].value))}`,true)
                .setTimestamp()
                .setFooter(client.user.username);
                
                
                msg.edit("some info may be wrong don't panic");
                message.channel.send(embed);
                message.channel.send(embed1);
                message.channel.send(embed2);
                  
                },function(error, response) {
                    if(error) return message.channel.send("looks like i broke try the command again");
                    // console.log(response);
                }
                );
              }); 
            }).catch(console.error);

              
          }
        var playerID = args[0];
        // console.log(playerID);
        var steam64ID = 0;

        https.get("https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=" + auth + "&vanityurl=" + playerID, res => {
          res.setEncoding("utf8");
          let bodySteam = "";
          res.on("data", steamData => {
            bodySteam += steamData;
          });
          res.on("end", () => {
            bodySteam = JSON.parse(bodySteam);
            // console.log("sucess = " + bodySteam.response.success);
            var searchID = playerID;
            if (bodySteam.response.success === 1) {
            //   console.log("steamid = " + bodySteam.response.steamid);
              steam64ID = (bodySteam.response.steamid);
              searchID = steam64ID;
            }

            https.get("https://api.steampowered.com/isteamuser/getplayersummaries/v0002/?key=" + auth + "&steamids=" + searchID, res => {
              res.setEncoding("utf8");
              let bodySteam2 = "";
              res.on("data", steamData2 => {
                bodySteam2 += steamData2;
              });
              res.on("end", () => {
                //console.log(bodySteam2);
                bodySteam2 = JSON.parse(bodySteam2);

                if (bodySteam2.response.players.length == 0) {
                  message.channel.send("No players found.");
                  return;
                } else {
                  steam64ID = playerID;
                //   console.log(steam64ID);
                  doCSGOStats(searchID, bodySteam2.response.players[0].avatarfull, bodySteam2.response.players[0].personaname, playerID, userID);
                   
                }
              });
            });


          });
        });   
    }
}
