const Discord = require('discord.js');
var converter = require('steam-id-convertor');
const https = require("https");
const auth = require('../auth.json').api.steamapi;

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    if(args[0] == null) return message.channel.send(`usage: "dota <steamid or custom url>"`)
    var playerID = args[0];
    //console.log(playerID);
    var steam64ID = 0;
    let channelID = message.channel.id
    

      https.get("https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=" + auth + "&vanityurl=" + playerID, res => {
        res.setEncoding("utf8");
        let bodySteam = "";
        res.on("data", steamData => {
          bodySteam += steamData;
        });
        res.on("end", () => {
          bodySteam = JSON.parse(bodySteam);
          //console.log("sucess = " + bodySteam.response.success);
          if (bodySteam.response.success === 1) {
           // console.log("steamid = " + bodySteam.response.steamid);
            steam64ID = (bodySteam.response.steamid);
            var steam32ID = converter.to32(bodySteam.response.steamid);
           // console.log("steam32ID=" + steam32ID);
            doProfileStats(steam32ID, channelID, playerID);

          } else {

            https.get("https://api.steampowered.com/isteamuser/getplayersummaries/v0002/?key=" + auth + "&steamids=" + playerID, res => {
              res.setEncoding("utf8");
              let bodySteam2 = "";
              res.on("data", steamData2 => {
                bodySteam2 += steamData2;
              });
              res.on("end", () => {
                //console.log(bodySteam2);
                bodySteam2 = JSON.parse(bodySteam2);

                if (bodySteam2.response.players.length == 0) {
                  bot.sendMessage({
                    to: channelID,
                    message: "No players found."

                  });
                  return;
                } else {
                  steam64ID = playerID;
                  var steam32ID = converter.to32(playerID);
                  //console.log("steam32ID=" + steam32ID);

                  doProfileStats(steam32ID, channelID, steam64ID);
                }
              });
            });
          }



        });
      });
    
  function doProfileStats(steam32ID, steam64ID) {
      var wins = "";
      var loss = "";
      https.get("https://api.opendota.com/api/players/" + steam32ID, res => {
        res.setEncoding("utf8");
        let body = "";
        res.on("data", data => {
          body += data;
        });
        res.on("end", () => {
          body = JSON.parse(body);
    
          // console.log(wins);
          https.get("https://api.opendota.com/api/players/" + steam32ID + "/wl", res => {
    
            res.setEncoding("utf8");
            let body2 = "";
            res.on("data", data2 => {
              body2 += data2;
            });
            res.on("end", () => {
              body2 = JSON.parse(body2);
              if (body.profile == undefined) {
                //console.log("profile not found");
                message.channel.send("No tracked profile on OpenDota.");
                return;
              }
              wins = body2.win;
              loss = body2.lose;
              // console.log(body.profile.account_id);
    
              https.get("https://api.opendota.com/api/players/" + steam32ID + "/recentMatches", res => {
                res.setEncoding("utf8");
                let tempData = "";
                res.on("data", data3 => {
                  tempData += data3;
                });
                res.on("end", () => {
                  tempData = JSON.parse(tempData);
                 // console.log(tempData);
                  var match = tempData[0];
                  //console.log("match"+match);
                  var rankString = "";
                 // console.log("rank:" + body.rank_tier + "");
                  if (body.rank_tier !== null) {
                    rankString += "Actual:";
                    if ((body.rank_tier + "").substring(0, 1) === '1') {
                      rankString += "Herald:";
                    }
                    if ((body.rank_tier + "").substring(0, 1) === '2') {
                      rankString += "Guardian:"
                    }
                    if ((body.rank_tier + "").substring(0, 1) === '3') {
                      rankString += "Crusader:"
                    }
                    if ((body.rank_tier + "").substring(0, 1) === '4') {
                      rankString += "Archon:"
                    }
                    if ((body.rank_tier + "").substring(0, 1) === '5') {
                      rankString += "Legend:"
                    }
                    if ((body.rank_tier + "").substring(0, 1) === '6') {
                      rankString += "Ancient:"
                    }
                    if ((body.rank_tier + "").substring(0, 1) === '7') {
                      rankString += "Divine:"
                    }
                    rankString += (body.rank_tier + "").substring(1)
                  }
                  var fieldsArray = [{
                    name: "Name",
                    value: body.profile.personaname + ""
                  }, {
                    name: "MMR",
                    value: rankString + "Estimated: " + body.mmr_estimate.estimate + ""
                  }, {
                    name: "Win/Loss",
                    value: "Wins: " + wins + " Losses: " + loss
                  }];
                  let gone = false;
                  if (match !== undefined) {
                    gone = true;
                    var matchInfo = "";
                    if (match.radiant_win === 'true') {
                      matchInfo += "**RADIENT VICTORY:**\n";
                    } else {
                      matchInfo += "**DIRE VICTORY:**\n";
                    }
                    //matchInfo += "[" + match.match_id + "](https://www.opendota.com/matches/" + match.match_id + ")\nk-d-a: " + match.kills + "-" + match.deaths + "-" + match.assists + "\n" + match.xp_per_min + " xpm and " + match.gold_per_min + " gpm";
                    //console.log(matchInfo);

                    let _embed = new Discord.RichEmbed()
                      .setColor("RANDOM")
                      .setAuthor(`Dota2 | ${body.profile.personaname}`)
                      .setThumbnail(body.profile.avatarfull)
                      .setTimestamp()
                      .setFooter(client.user.username)
                      .setDescription("[OpenDota](https://www.opendota.com/players/" + body.profile.account_id + ")")
                      .addField(`**Name:**`,`${body.profile.personaname}`,true)
                      .addField(`**MMR:**${rankString}`,`**Estimated:** ${body.mmr_estimate.estimate}`,true)
                      .addField(`**Wins:**`,`${wins}`,true)
                      .addField(`**Losses:**`,`${loss}`,true)
                      .addField(`**Last Match:**`,matchInfo,true)
                      .addField(`**Last Match ID:**`,"[" + match.match_id + "](https://www.opendota.com/matches/" + match.match_id + ")",true)
                      .addField(`**K-D-A:**`,match.kills + "-" + match.deaths + "-" + match.assists,true)
                      .addField(`**XPM:**`,match.xp_per_min,true)
                      .addField(`**GPM:**`,match.gold_per_min,true)
                      message.channel.send(_embed)

                  }
                  if (body.playerstats === undefined && gone != true) {
                      //console.log(matchInfo);
                      let embed = new Discord.RichEmbed()
                      .setColor("RANDOM")
                      .setAuthor(`Dota 2 • ${body.profile.personaname}`)
                      .setThumbnail(body.profile.avatarfull)
                      .setTimestamp()
                      .setFooter(client.user.username)
                      .setDescription("[OpenDota](https://www.opendota.com/players/" + body.profile.account_id + ")")
                      .addField(`**Name:**`,`${body.profile.personaname}`,true)
                      .addField(`**MMR:**${rankString}`,`**Estimated:** ${body.mmr_estimate.estimate}`,true)
                      .addBlankField()
                      .addField(`**Wins:**`,`${wins}`,true)
                      .addField(`**Losses:**`,`${loss}`,true)
                      message.channel.send(embed)
                    
    
                  }
    
                });
    
              });
    
            });
          });
    
    
        });
      });
    
    }
};
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["dota2"], 
    permLevel: "User"
  };
  
  exports.help = {
    name: "dota",
    description: "Displays a user's dota2 stats!",
    usage: "dota <steamid or custom url>",
    category: "Games",
  };
  