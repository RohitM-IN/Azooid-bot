const Discord = require('discord.js');
var bigInt = require("big-integer");
const https = require("https");
const auth = require('../auth.json').api.steamapi;

function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

exports.run = async (client, message, args, level,userID, channelID) => { // eslint-disable-line no-unused-vars
    if (!args[0]) return message.channel.send(`usage: ".csgow <steamid or custom url>"`)
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
            var Glock = body.playerstats.stats.filter((stat) => {
              return stat.name === 'total_kills_glock';
               });
              let _Glock = Glock.reduce((sum, el) => {
              sum += el.value;
              return sum;
              }, 0);
              var TEC9 = body.playerstats.stats.filter((stat) => {
              return stat.name === 'total_kills_tec9';
              });
              let _TEC9 = TEC9.reduce((sum, el) => {
              sum += el.value;
              return sum;
              }, 0);
              var CZ75 = body.playerstats.stats.filter((stat) => {
              return stat.name === 'total_kills_elite';
              });
              let _CZ75 = CZ75.reduce((sum, el) => {
              sum += el.value;
              return sum;
              }, 0);
              var Mac10 = body.playerstats.stats.filter((stat) => {
              return stat.name === 'total_kills_mac10';
              });
              let _Mac10 = Mac10.reduce((sum, el) => {
              sum += el.value;
              return sum;
              }, 0);
              var Sawed = body.playerstats.stats.filter((stat) => {
              return stat.name === 'total_kills_sawedoff';
              });
              let _Sawed = Sawed.reduce((sum, el) => {
              sum += el.value;
              return sum;
              }, 0);
              var Galil = body.playerstats.stats.filter((stat) => {
              return stat.name === 'total_kills_galilar';
              });
              let _Galil = Galil.reduce((sum, el) => {
              sum += el.value;
              return sum;
              }, 0);
              var Ak47 = body.playerstats.stats.filter((stat) => {
              return stat.name === 'total_kills_ak47';
              });
              let _Ak47 = Ak47.reduce((sum, el) => {
              sum += el.value;
              return sum;
              }, 0);
              var SG556 = body.playerstats.stats.filter((stat) => {
              return stat.name === 'total_kills_sg556';
              });
              let _SG556 = SG556.reduce((sum, el) => {
              sum += el.value;
              return sum;
              }, 0);
              var G3SG1 = body.playerstats.stats.filter((stat) => {
              return stat.name === 'total_kills_g3sg1';
              });
              let _G3SG1 = G3SG1.reduce((sum, el) => {
              sum += el.value;
              return sum;                    
              }, 0);
              var P2000 = body.playerstats.stats.filter((stat) => {
              return stat.name === 'total_kills_hkp2000';
              });
              let _P2000 = P2000.reduce((sum, el) => {
              sum += el.value;
              return sum;
              }, 0);
              var FiveSeveN = body.playerstats.stats.filter((stat) => {
              return stat.name === 'total_kills_fiveseven';
              });
              let _FiveSeveN = FiveSeveN.reduce((sum, el) => {
              sum += el.value;
              return sum;
              }, 0);
              var MAG7 = body.playerstats.stats.filter((stat) => {
              return stat.name === 'total_kills_mag7';
              });
              let _MAG7 = MAG7.reduce((sum, el) => {
              sum += el.value;
              return sum;
              }, 0);
              var MP9 = body.playerstats.stats.filter((stat) => {
              return stat.name === 'total_kills_mp9';
              });
              let _MP9 = MP9.reduce((sum, el) => {
              sum += el.value;
              return sum;
              }, 0);
              var Famas = body.playerstats.stats.filter((stat) => {
              return stat.name === 'total_kills_famas';
              });
              let _Famas = Famas.reduce((sum, el) => {
              sum += el.value;
              return sum;
              }, 0);
              var M4A1 = body.playerstats.stats.filter((stat) => {
              return stat.name === 'total_kills_m4a1';
              });
              let _M4A1 = M4A1.reduce((sum, el) => {
              sum += el.value;
              return sum;
              }, 0);
              var AUG = body.playerstats.stats.filter((stat) => {
              return stat.name === 'total_kills_aug';
              });
              let _AUG = AUG.reduce((sum, el) => {
              sum += el.value;
              return sum;
              }, 0);
              var Scar20 = body.playerstats.stats.filter((stat) => {
              return stat.name === 'total_kills_scar20';
              });
              let _Scar20 = Scar20.reduce((sum, el) => {
              sum += el.value;
              return sum;
              }, 0);
              var P250 = body.playerstats.stats.filter((stat) => {
              return stat.name === 'total_kills_p250';
              });
              let _P250 = P250.reduce((sum, el) => {
              sum += el.value;
              return sum;
              }, 0);
              var DualBerettas = body.playerstats.stats.filter((stat) => {
              return stat.name === 'total_kills_elite';
              });
              let _DualBerettas = DualBerettas.reduce((sum, el) => {
              sum += el.value;
              return sum;
              }, 0);
              var Deagle = body.playerstats.stats.filter((stat) => {
              return stat.name === 'total_kills_deagle';
              });
              let _Deagle = Deagle.reduce((sum, el) => {
              sum += el.value;
              return sum;
              }, 0);
              var XM1014 = body.playerstats.stats.filter((stat) => {
              return stat.name === 'total_kills_xm1014';
              });
              let _XM1014 = XM1014.reduce((sum, el) => {
              sum += el.value;
              return sum;
              }, 0);
              var Nova = body.playerstats.stats.filter((stat) => {
              return stat.name === 'total_kills_nova';
              });
              let _Nova = Nova.reduce((sum, el) => {
              sum += el.value;
              return sum;
              }, 0);
              var MP7 = body.playerstats.stats.filter((stat) => {
              return stat.name === 'total_kills_mp7';
              });
              let _MP7 = MP7.reduce((sum, el) => {
              sum += el.value;
              return sum;
              }, 0);
              var UMP45 = body.playerstats.stats.filter((stat) => {
              return stat.name === 'total_kills_ump45';
              });
              let _UMP45 = UMP45.reduce((sum, el) => {
              sum += el.value;
              return sum;
              }, 0);
              var P90 = body.playerstats.stats.filter((stat) => {
              return stat.name === 'total_kills_p90';
              });
              let _P90 = P90.reduce((sum, el) => {
              sum += el.value;
              return sum;
              }, 0);
              var Bizon = body.playerstats.stats.filter((stat) => {
              return stat.name === 'total_kills_bizon';
              });
              let _Bizon = Bizon.reduce((sum, el) => {
              sum += el.value;
              return sum;
              }, 0);
              var Negev = body.playerstats.stats.filter((stat) => {
              return stat.name === 'total_kills_negev';
              });
              let _Negev = Negev.reduce((sum, el) => {
              sum += el.value;
              return sum;
              }, 0);
              var M249 = body.playerstats.stats.filter((stat) => {
              return stat.name === 'total_kills_m249';
              });
              let _M249 = M249.reduce((sum, el) => {
              sum += el.value;
              return sum;
              }, 0);
              var SSG08 = body.playerstats.stats.filter((stat) => {
              return stat.name === 'total_kills_ssg08';
              });
              let _SSG08 = SSG08.reduce((sum, el) => {
              sum += el.value;
              return sum;
              }, 0);
              var AWP = body.playerstats.stats.filter((stat) => {
              return stat.name === 'total_kills_awp';
              });
              let _AWP = AWP.reduce((sum, el) => {
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
              var Taser = body.playerstats.stats.filter((stat) => {
              return stat.name === 'total_kills_taser';
              });
              let _Taser = Taser.reduce((sum, el) => {
              sum += el.value;
              return sum;
              }, 0);
              var Molotov = body.playerstats.stats.filter((stat) => {
              return stat.name === 'total_kills_molotov';
              });
              let _Molotov = Molotov.reduce((sum, el) => {
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
            let embed = new Discord.MessageEmbed()
            .setColor("#1adb3e")
            .setAuthor(`Counter-Strike: Global Offensive | ${playerID}`)
            .setThumbnail(profilePic)
            .setURL("http://steamcommunity.com/id/" + customUrl)
            .setDescription(`**Name:** ${name}`)
            .addField(`**Achievements:**`,`${body.playerstats.achievements.length}`,true)
            .addField(`**Terrorist:**`,`:point_down:`)
            .addField(`**Glock:**`,`${numberWithCommas(_Glock)}`,true)
            .addField(`**TEC 9:**`,`${numberWithCommas(_TEC9)}`,true)
            .addField(`**CZ75-Auto:**`,`${numberWithCommas(_CZ75)}`,true)
            .addField(`**Mac 10:**`,`${numberWithCommas(_Mac10)}`,true)
            .addField(`**Sawed-Off:**`,`${numberWithCommas(_Sawed)}`,true)
            .addField(`**Galil AR:**`,`${numberWithCommas(_Galil)}`,true)
            .addField(`**Ak47:**`,`${numberWithCommas(_Ak47)}`,true)
            .addField(`**SG 556:**`,`${numberWithCommas(_SG556)}`,true)
            .addField(`**G3SG1:**`,`${numberWithCommas(_G3SG1)}`,true);
            let embed1 = new Discord.MessageEmbed()
            .setColor("#1adb3e")
            .addField(`**Counter-Terrorist:**`,`:point_down:`)
            .addField(`**P2000 / USP-S:**`,`${numberWithCommas(_P2000)}`,true)
            .addField(`**Five-SeveN:**`,`${numberWithCommas(_FiveSeveN)}`,true)
            .addField(`**MAG 7:**`,`${numberWithCommas(_MAG7)}`,true)
            .addField(`**MP 9:**`,`${numberWithCommas(_MP9)}`,true)
            .addField(`**Famas:**`,`${numberWithCommas(_Famas)}`,true)
            .addField(`**M4A1 / M4A1-S:**`,`${numberWithCommas(_M4A1)}`,true)
            .addField(`**AUG:**`,`${numberWithCommas(_AUG)}`,true)
            .addField(`**Scar 20:**`,`${numberWithCommas(_Scar20)}`,true)
            .addField("**Common Weapons:**",`:point_down:`)
            .addField(`**P250:**`,`${numberWithCommas(_P250)}`,true)
            .addField(`**Dual Berettas:**`,`Updated soon`,true)
            .addField(`**Deagle:**`,`${numberWithCommas(_Deagle)}`,true)
            .addField(`**XM 1014:**`,`${numberWithCommas(_XM1014)}`,true)
            .addField(`**Nova:**`,`${numberWithCommas(_Nova)}`,true)
            .addField(`**MP 7:**`,`${numberWithCommas(_MP7)}`,true)
            .addField(`**UMP 45:**`,`${numberWithCommas(_UMP45)}`,true)
            .addField(`**P 90:**`,`${numberWithCommas(_P90)}`,true)
            .addField(`**Bizon:**`,`${numberWithCommas(_Bizon)}`,true)
            .addField(`**Negev:**`,`${numberWithCommas(_Negev)}`,true)
            .addField(`**M 249:**`,`${numberWithCommas(_M249)}`,true)
            .addField(`**SSG 08:**`,`${numberWithCommas(_SSG08)}`,true)
            .addField(`**AWP:**`,`${numberWithCommas(_AWP)}`,true)
            let embed2 = new Discord.MessageEmbed()
            .setColor("#1adb3e")
            .addField(`**Melee weapons:**`,`:point_down:`)
            .addField(`**Knife:**`,`${numberWithCommas(_knifek)}`,true)              
            .addField(`**Taser:**`,`${numberWithCommas(_Taser)}`,true)
            .addField(`**Molotov:**`,`${numberWithCommas(_Molotov)}`,true)
            .addField(`**Extra info:**`,`:point_down:`)
            .addField(`**donated weapons:**`,`${numberWithCommas(_weapons_donated)} `,true) 
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
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["cs-gow"],
    permLevel: "User"
  };
  
  exports.help = {
    name: "csgow",
    description: "Displays a user's csgo weapons stats!",
    usage: "csgow <steamid or custom url>",
    category: "Games",
  };
  
