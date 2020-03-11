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
    name: "csgo",
    description: "Displays a user's csgo stats!",
    usage: "csgo <steamid or custom url>",
    category: "game",
    aliases: ["cs-go"] , 
    run: async (client, message, args, userID, channelID) => {
      if (!args[0]) return message.channel.send(`usage: ".csgo <steamid or custom url>"`)
        let test = args[0];
        let id = test.match(/^(https:\/\/steamcommunity\.com\/id\/)?([^\s\/]+)\/?$/);
        let id_ = test.match(/^(https:\/\/steamcommunity\.com\/profiles\/)?([^\s\/]+)\/?$/);

        if(id) args[0] = id[2];
        if(id_) args[0] = id_[2];
        
        function doCSGOStats(steam64ID, profilePic, name, customUrl, userID) {
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
                var headshotk = body.playerstats.stats.filter((stat) => {
                  return stat.name === 'total_kills_headshot';
                });
                let _headshotk = headshotk.reduce((sum, el) => {
                sum += el.value;
                return sum;
                }, 0);
                var knifek = body.playerstats.stats.filter((stat) => {
                return stat.name === 'total_kills_knife';
                });
                let _knifek = knifek.reduce((sum, el) => {
                sum += el.value;
                return sum;
                }, 0);
                var hegrenade = body.playerstats.stats.filter((stat) => {
                return stat.name === 'total_kills_hegrenade';
                });
                let _hegrenade = hegrenade.reduce((sum, el) => {
                sum += el.value;
                return sum;
                }, 0);
                var zoomed_sniper = body.playerstats.stats.filter((stat) => {
                return stat.name === 'total_kills_against_zoomed_sniper';
                });
                let _zoomed_sniper = zoomed_sniper.reduce((sum, el) => {
                sum += el.value;
                return sum;
                }, 0);
                var mvps = body.playerstats.stats.filter((stat) => {
                return stat.name === 'total_mvps';
                 });
                let _mvps = mvps.reduce((sum, el) => {
                sum += el.value;
                return sum;
                }, 0);
                var weapons_donated = body.playerstats.stats.filter((stat) => {
                  return stat.name === 'total_weapons_donated';
                   });
                  let _weapons_donated = weapons_donated.reduce((sum, el) => {
                  sum += el.value;
                  return sum;
                  }, 0);
                
                var kd = bigInt("" + body.playerstats.stats[0].value).divmod("" + body.playerstats.stats[1].value);
                // console.log("kd: " + new String(kd.quotient));
                var tempString = new String(kd.remainder / body.playerstats.stats[1].value);
                var calculatedKD = new String(kd.quotient) + tempString.substring(tempString.indexOf("."));
                
              
                let embed = new Discord.RichEmbed()
                .setColor("RANDOM")
                .setAuthor(`Counter-Strike: Global Offensive | ${playerID}`)
                .setThumbnail(profilePic)
                .setURL("http://steamcommunity.com/id/" + customUrl)
                .setDescription(`**Name:** ${name}`)
                .addField(`**Achievements:**`,`${body.playerstats.achievements.length}`,true)
                .addField(`**Total Time Played:**`,`${numberWithCommas(String(bigInt(body.playerstats.stats[2].value).divide(3600)))} hrs played`,true)
                .addField(`**K/D:**`,`${calculatedKD}`,true)
                .addField(`**Bombs:**`,`Planted ${numberWithCommas(String(body.playerstats.stats[3].value))} bombs\ndefused ${numberWithCommas(String(body.playerstats.stats[4].value))} bombs`,true)
                .addField(`**Wins:**`,`${numberWithCommas(String(body.playerstats.stats[5].value))} times`,true)
                .addField(`**Money:**`,`$${numberWithCommas(String(body.playerstats.stats[7].value))} earned`,true)
                .addField(`**Damage:**`,`${numberWithCommas(String(body.playerstats.stats[6].value))}`,true)
                .addField("**Misc. Kill Stats:**",`:point_down:`)
                .addField(`**Headshots:**`,`${numberWithCommas(_headshotk)}`,true)
                .addField(`**Enemy Weapons:**`,`${numberWithCommas(String(body.playerstats.stats[25].value))}`,true) 
                .addField(`**knife:**`,`${numberWithCommas(_knifek)}`,true)
                .addField(`**HE nades:**`,`${numberWithCommas(_hegrenade)}`,true)
                .addField("**Other Stats:**",`:point_down:`)
                .addField(`**rounds:**`,`${numberWithCommas(String(body.playerstats.stats[45].value))}`,true)
                .addField(`**kills:**`,`${numberWithCommas(String(body.playerstats.stats[0].value))} times`,true)
                .addField(`**Deaths:**`,`${numberWithCommas(String(body.playerstats.stats[1].value))} shots`,true)
                .addField(`**killed:**`,`${numberWithCommas(_zoomed_sniper)} zoomed in snipers`,true)
                .addField(`**donated weapons:**`,`${numberWithCommas(_weapons_donated)} `,true) 
                .addField(`**MVPs:**`,`${numberWithCommas(_mvps)} received`,true)
                .setTimestamp()
                .setFooter(client.user.username);
                
          
                msg.edit(embed);
                  
                },function(error, response) {
                    if(error) return message.channel.send("looks like i broke try the command again");
                    // console.log(response);
                }
                );
              }); 
            })

              
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
