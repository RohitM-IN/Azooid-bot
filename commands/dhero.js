const { MessageEmbed } = require('discord.js');
var fs = require("fs");
var schedule = require('node-schedule');
const leven = require('leven');
var j = schedule.scheduleJob('0 20 * * 2', function() {
    refreshDotaData();
  });
  function refreshDotaData() {

    https.get("https://raw.githubusercontent.com/odota/dotaconstants/master/build/heroes.json", res => {
      res.setEncoding("utf8");
      let body = "";
      res.on("data", data => {
        body += data;
      });
      res.on("end", () => {
  
        console.log("Hero Data Retrieved");
        //  body = "[" + body.substring(body.indexOf("{") + 1, body.lastIndexOf("}")) + "]";
        fileData("heroes.json", body);
        console.log("Hero Data Written");
      });
    });
    https.get("https://raw.githubusercontent.com/odota/dotaconstants/master/build/items.json", res => {
      res.setEncoding("utf8");
      let body = "";
      res.on("data", data => {
        body += data;
      });
      res.on("end", () => {
  
        console.log("Item Data Retrieved");
        //  body = "[" + body.substring(body.indexOf("{") + 1, body.lastIndexOf("}")) + "]";
        fileData("items.json", body);
        console.log("Item Data Written");
      });
    });
    https.get("https://raw.githubusercontent.com/odota/dotaconstants/master/build/abilities.json", res => {
      res.setEncoding("utf8");
      let body = "";
      res.on("data", data => {
        body += data;
      });
      res.on("end", () => {
        console.log("Ability Data Retrieved");
        //  body = "[" + body.substring(body.indexOf("{") + 1, body.lastIndexOf("}")) + "]";
        fileData("abilities.json", body);
        console.log("Ability Data Written");
      });
    });
  }


exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    path = './commands/game/heroes.json';
    
    var heroName = args.join(" ")
    if(!heroName) return message.channel.send(`Enter a hero name!!!\nusage: "dhero <hero name>"`)
        var testHero = readDotaHeroFile( heroName);
        function readDotaHeroFile( query) {
          var query = query.toLowerCase().replace(/\s+/g, '').replace(/-/g, "");
          fs.readFile('./heroes.json', 'utf8', function(err, data) {
            if (err) throw err;
        
            data = JSON.parse(data);
            var tempHeroArray = [];
        
            for (var key in data) {
              if (data.hasOwnProperty(key)) {
        
        
                var tempString = data[key].localized_name.toLowerCase().replace(/\s+/g, '').replace(/-/g, "");
                if (tempString.indexOf(query) != -1) {
                  tempHeroArray.push(data[key]);
                  //console.log("hero found:" + data[key].localized_name);
                }
        
              }
            }
            //console.log("length:" + tempHeroArray.length);
            if (tempHeroArray.length == 0) {
              message.channel.send("Sorry , I could not find a hero with that name.");
              return;
            }
            var bestHero = tempHeroArray[0];
        
            var bestDist = leven(query, tempHeroArray[0].localized_name.toLowerCase());
            for (var i = 0; i < tempHeroArray.length; i++) {
              if (leven(query, tempHeroArray[i].localized_name.toLowerCase()) < bestDist) {
                bestHero = tempHeroArray[i];
              }
            }
            var attribute = bestHero.primary_attr;
            var colorSet = 0;
            if (attribute.valueOf() == "str") {
              attribute = "strength";
              colorSet = 10038562;
            } else if (attribute.valueOf() == "int") {
              attribute = "intelligence";
              colorSet = 34266;
            } else {
              attribute = "agility";
              colorSet = 306699;
            }
            var roles = bestHero.roles;
            var rolesString = "";
            for (var role in roles) {
              rolesString += roles[role] + "  ";
            }
            var projectileSpeed = "Projectile Speed: " + bestHero.projectile_speed + "\n";
            if (projectileSpeed == "0") {
              projectileSpeed = "";
            }
        
            let embed = new MessageEmbed()
            .setTitle(bestHero.localized_name)
            .setURL("https://dota2.gamepedia.com/" + bestHero.localized_name.split(' ').join('_'))
            .setThumbnail("http://cdn.dota2.com/apps/dota2/images/heroes/" + bestHero.name.substring(bestHero.name.indexOf("hero_") + 5) + "_lg.png")
            .addField(`**Basic Info:**`,bestHero.localized_name + " is a " + bestHero.attack_type.toLowerCase() + " " + attribute + " hero.")
            .addField(`**Roles:**`,rolesString)
            .addField(`**Basic Stats:**`,"Base Health: " + bestHero.base_health + "; Base HP Regen: " + bestHero.base_health_regen + "\nBase Mana: " + bestHero.base_mana + "; Base Mana Regen: " + bestHero.base_mana_regen + "\nBase Armor: " + bestHero.base_armor + "\nBase Magic Resistance: " + bestHero.base_mr)
            .addField(`**Attribute Stats:**`,"Base Strength: " + bestHero.base_str + "; Strength Gain: " + bestHero.str_gain + "\nBase Agility: " + bestHero.base_agi + "; Agility Gain: " + bestHero.agi_gain + "\nBase Intelligence: " + bestHero.base_int + "; Intelligence Gain: " + bestHero.int_gain)
            .addField(`**Attack Stats:**`, "Base Attack Range: " + bestHero.attack_range + "\n" + projectileSpeed + "Base Attack Rate: " + bestHero.attack_rate + " seconds")
            .addField(`**Movement Stats:**`,"Base Movement Speed: " + bestHero.move_speed + "\nTurn Rate: " + bestHero.turn_rate + " seconds\n" + "Legs: " + bestHero.legs + " legs")
            .setTimestamp()
            .setFooter(client.user.username)
            message.channel.send(embed)
            
        
        
          });
        
        }
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["gethero","dota-hero"] ,
    permLevel: "User"
  };
  
  exports.help = {
    name: "dhero",
    description: "Displays dota 2 heros stats!",
    usage: "dhero <hero name>",
    category: "Games",
  };
  