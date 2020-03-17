const Discord = require('discord.js');
const https = require("https");
const auth = require('../auth.json').api.steamapi;

exports.run = async (client, message, args, level,userID) => { // eslint-disable-line no-unused-vars
    function numberWithCommas(x) {
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
      }
    function steamStatus( userID) {

        https.get("https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?key="+auth+"&format=json&appid=359550", res => {
          res.setEncoding("utf8");
          let bodyAll = "";
          res.on("data", dataAll => {
            bodyAll += dataAll;
          });
          res.on("end", () => {
            bodyAll = JSON.parse(bodyAll);
      
            https.get("https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?key"+auth+"&format=json&appid=570", res => {
              res.setEncoding("utf8");
              let bodyDota = "";
              res.on("data", dataDota => {
                bodyDota += dataDota;
              });
              res.on("end", () => {
                bodyDota = JSON.parse(bodyDota);
      
                https.get("https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?key="+auth+"&format=json&appid=730", res => {
                  res.setEncoding("utf8");
                  let bodyCSGO = "";
                  res.on("data", dataCSGO => {
                    bodyCSGO += dataCSGO;
                  });
                  res.on("end", () => {
                    bodyCSGO = JSON.parse(bodyCSGO);
      
                    https.get("https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?key="+auth+"&format=json&appid=1085660", res => {
                      res.setEncoding("utf8");
                      let bodyTF = "";
                      res.on("data", dataTF => {
                        bodyTF += dataTF;
                      });
                      res.on("end", () => {
                        bodyTF = JSON.parse(bodyTF);
      
                        https.get("https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?key="+auth+"&format=json&appid=271590", res => {
                          res.setEncoding("utf8");
                          let bodyGTA = "";
                          res.on("data", dataGTA => {
                            bodyGTA += dataGTA;
                          });
                          res.on("end", () => {
                            bodyGTA = JSON.parse(bodyGTA);
      
                            https.get("https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?key="+auth+"&format=json&appid=578080", res => {
                              res.setEncoding("utf8");
                              let bodyPUBG = "";
                              res.on("data", dataPUBG => {
                                bodyPUBG += dataPUBG;
                              });
                              res.on("end", () => {
                                bodyPUBG = JSON.parse(bodyPUBG);
                                let embed = new Discord.RichEmbed()
                                .setColor("#1adb3e")
                                .setTimestamp()
                                .setAuthor(`Here are some popular steam games ${message.author.tag}`)
                                .setDescription(`Player Counts:`)
                                .addField(`**Rainbow Six Siege:**`,`${numberWithCommas(bodyAll.response.player_count)} currently in game.`)
                                .addField(`**Dota 2:**`,`${numberWithCommas(bodyDota.response.player_count)} currently in game.`)
                                .addField(`**CSGO:**`,`${numberWithCommas(bodyCSGO.response.player_count)} currently in game.`)
                                .addField(`**Destiny 2:**`,`${numberWithCommas(bodyTF.response.player_count)} currently in game.`)
                                .addField(`**GTA V:**`,`${numberWithCommas(bodyGTA.response.player_count)} currently in game.`)
                                .addField(`**PUBG:**`,`${numberWithCommas(bodyPUBG.response.player_count)} currently in game.`)
                                .setFooter(client.user.username);

                                message.channel.send(embed);
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      }
      
    
      steamStatus( userID)
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["pcount"] , 
    permLevel: "User"
  };
  
  exports.help = {
    name: "playercount",
    description: "Displays total no of players in game!",
    usage: "playercount",
    category: "Games",
    
  };
  