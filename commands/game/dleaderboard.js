const Discord = require('discord.js');
const https = require("https");
 

  module.exports = {
    name: "dleaderboard",
    description: "Displays dota 2 leaderboard!",
    usage: "dlb",
    category: "game",
    clientPermissions: ["EMBED_LINKS","SEND_MESSAGES"],
    userPermissions:["VIEW_CHANNEL"],
    aliases: ["dlb"] , 
    run: async (client, message, args, userID) => {
        
function leaderboardMessage( userID) {

    https.get("https://www.dota2.com/webapi/ILeaderboard/GetDivisionLeaderboard/v0001?division=americas", res => {
      res.setEncoding("utf8");
      let bodyUS = "";
      res.on("data", dataUS => {
        bodyUS += dataUS;
      });
      res.on("end", () => {
        bodyUS = JSON.parse(bodyUS);
  
        https.get("https://www.dota2.com/webapi/ILeaderboard/GetDivisionLeaderboard/v0001?division=europe", res => {
          res.setEncoding("utf8");
          let bodyEU = "";
          res.on("data", dataEU => {
            bodyEU += dataEU;
          });
          res.on("end", () => {
            bodyEU = JSON.parse(bodyEU);
  
            https.get("https://www.dota2.com/webapi/ILeaderboard/GetDivisionLeaderboard/v0001?division=se_asia", res => {
              res.setEncoding("utf8");
              let bodySEA = "";
              res.on("data", dataSEA => {
                bodySEA += dataSEA;
              });
              res.on("end", () => {
                bodySEA = JSON.parse(bodySEA);
  
                https.get("https://www.dota2.com/webapi/ILeaderboard/GetDivisionLeaderboard/v0001?division=china", res => {
                  res.setEncoding("utf8");
                  let bodyAsia = "";
                  res.on("data", dataAsia => {
                    bodyAsia += dataAsia;
                  });
                  res.on("end", () => {
                    bodyAsia = JSON.parse(bodyAsia);
                    var americasLeaderboardString = "";
  
                    for (var i = 0; i < 10; i++) {
                      americasLeaderboardString += (i + 1) + ". ";
                      if (bodyUS.leaderboard[i].team_tag !== "" && (bodyUS.leaderboard[i].hasOwnProperty('team_tag') == true)) {
                        americasLeaderboardString += bodyUS.leaderboard[i].team_tag + "."
                      }
                      americasLeaderboardString += bodyUS.leaderboard[i].name + "\n";
                    }
                    americasLeaderboardString = escapeBackTicks(americasLeaderboardString);
                    var europeLeaderboardString = "";
  
                    for (var i = 0; i < 10; i++) {
                      europeLeaderboardString += (i + 1) + ". ";
                      if (bodyEU.leaderboard[i].team_tag !== "" && (bodyEU.leaderboard[i].hasOwnProperty('team_tag') == true)) {
                        europeLeaderboardString += bodyEU.leaderboard[i].team_tag + "."
                      }
                      europeLeaderboardString += bodyEU.leaderboard[i].name + "\n";
                    }
                    europeLeaderboardString = escapeBackTicks(europeLeaderboardString);
                    var seaLeaderboardString = "";
  
                    for (var i = 0; i < 10; i++) {
                      seaLeaderboardString += (i + 1) + ". ";
                      if (bodySEA.leaderboard[i].team_tag !== "" && (bodySEA.leaderboard[i].hasOwnProperty('team_tag') == true)) {
                        seaLeaderboardString += bodySEA.leaderboard[i].team_tag + "."
                      }
                      seaLeaderboardString += bodySEA.leaderboard[i].name + "\n";
                    }
                    seaLeaderboardString = escapeBackTicks(seaLeaderboardString);
                    var asiaLeaderboardString = "";
  
                    for (var i = 0; i < 10; i++) {
                      asiaLeaderboardString += (i + 1) + ". ";
                      if (bodyAsia.leaderboard[i].team_tag !== "" && (bodyAsia.leaderboard[i].hasOwnProperty('team_tag') == true)) {
                        asiaLeaderboardString += bodyAsia.leaderboard[i].team_tag + "."
                      }
                      asiaLeaderboardString += bodyAsia.leaderboard[i].name + "\n";
                    }
                    asiaLeaderboardString = escapeBackTicks(asiaLeaderboardString);
                    // console.log(americasLeaderboardString)
                    let embed = new Discord.RichEmbed()
                    .setColor("#1adb3e")
                    .setAuthor(`Here are the top 10 players in each region | ${message.author.tag}`)
                    .setDescription(`**Leaderboards**`)
                    .addField(`**Americas:**`,`${americasLeaderboardString}`,true)
                    .addField(`**Europe:**`,`${europeLeaderboardString}`,true)
                    .addBlankField()
                    .addField(`**South East Asia:**`,`${seaLeaderboardString}`,true)
                    .addField(`**China:**`,`${asiaLeaderboardString}`,true)
                    .setTimestamp()
                    .setFooter(client.user.username);

                    message.channel.send(embed)
                    
  
                  });
                });
              });
            });
          });
        });
      });
    });
  }
  function escapeBackTicks(string) {
    var index = string.indexOf('`', index);
  
    while (string.indexOf('`', index) != -1) {
      string = string.substring(0, index) + ("\\") + string.substring(index);
      if (string.indexOf('`', index+2) == -1) {
        return string;
      }
      index = string.indexOf('`', index+2);
    }
    return string;
  }
  
        leaderboardMessage( userID)
  }
  }
  
  