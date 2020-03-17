const { RichEmbed } = require('discord.js');
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
  
        // console.log("Hero Data Retrieved");
        //  body = "[" + body.substring(body.indexOf("{") + 1, body.lastIndexOf("}")) + "]";
        fileData("heroes.json", body);
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
        fileData("items.json", body);
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
        fileData("abilities.json", body);
        // console.log("Ability Data Written");
      });
    });
  }




exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    if(args[0] == null) return message.channel.send(`Enter Name of the item!!\nusage: "ditems <item name>"`)
    var itemName = args.join(" ");
      var testItem = readDotaItemFile( itemName);
      function readDotaItemFile( query) {
        var query = query.toLowerCase().replace(/\s+/g, '').replace(/-/g, "");
        fs.readFile('./items.json', 'utf8', function(err, data) {
          if (err) throw err;
      
          data = JSON.parse(data);
          var tempItemArray = [];
          var tempKeyArray = [];
      
          for (var key in data) {
            if (data.hasOwnProperty(key)) {
              
      
              //console.log(JSON.stringify(data[key]));
              if (data[key].dname !== undefined) {
                var tempString = data[key].dname.toLowerCase().replace(/\s+/g, '').replace(/-/g, "");
                if (tempString.indexOf(query) != -1) {
                  if (tempString.indexOf("recipe") == -1) {
      
                    tempItemArray.push(data[key]);
                    tempKeyArray.push(key);
                    // console.log("item found:" + data[key].dname);
                    
                     if(data[key].use) desc = data[key].use[0].desc
                     if(data[key].active) desc = data[key].active[0].desc
                     if(data[key].passive) desc = data[key].passive[0].desc
                     if(data[key].toggle) desc = data[key].toggle[0].desc
                     
                     //desc = data[key].use[0].desc || data[key].active[0].desc || data[key].passive[0].desc || data[key].toggle[0].desc 
                  }
                }
              }
      
            }
          }
          // console.log("length:" + tempItemArray.length);
          if (tempItemArray.length == 0) {
            message.channel.send("Sorry , I could not find an item with that name.");
            return;
          }
          
          var bestItem = tempItemArray[0];
         // console.log(bestItem)
          var bestItemKey = tempKeyArray[0];
          var bestDist = leven(query, tempItemArray[0].dname.toLowerCase());
          for (var i = 0; i < tempItemArray.length; i++) {
            if (leven(query, tempItemArray[i].dname.toLowerCase()) < bestDist) {
              bestItem = tempItemArray[i];
              bestItemKey = tempKeyArray[i];
            }
          }
          var messageFields = [];
          messageFields.push({
            name: "Cost",
            value: bestItem.cost + " Gold"
          });
          if (bestItem.desc !== "") {
            messageFields.push({
              name: "Description",
              value: bestItem.desc
            });
          }
          if (bestItem.lore !== "") {
            messageFields.push({
              name: "Lore",
              value: bestItem.lore
            });
          }
          if (bestItem.notes !== "") {
            messageFields.push({
              name: "Notes",
              value: bestItem.notes
            });
          }
          if (bestItem.cd !== false) {
            messageFields.push({
              name: "Cooldown",
              value: bestItem.cd + " Seconds"
            });
          }
          
      
            var components = "";
            var componentsArray = bestItem.components;
            //console.log(bestItem.components)
            for (var tempComponent in componentsArray) {
              // console.log("comp:" + componentsArray[tempComponent]);
              if (data[componentsArray[tempComponent]] !== undefined) {
                // console.log("component: " + data[componentsArray[tempComponent]].dname);
                components += data[componentsArray[tempComponent]].dname + " (" + data[componentsArray[tempComponent]].cost + ")\n";
              }
            }
            // console.log("key:" + bestItemKey);
            if (data["recipe_" + bestItemKey] !== undefined) {
              components += "Recipe" + " (" + data["recipe_" + bestItemKey].cost + ")\n";
            }
            // console.log("components:" + components);
            messageFields.push({
              name: "Components",
              value: components + ""
            });
            //console.log(components)
          
          var attribString = "";
          var attribArray = bestItem.attrib;
          for (var attribute in attribArray) {
            if (attribArray[attribute].footer != undefined) {
              attribString += attribArray[attribute].header + "" + attribArray[attribute].value + " " + attribArray[attribute].footer;
            } else {
              attribString += attribArray[attribute].header + " " + attribArray[attribute].value;
            }
            attribString += "\n";
          }
          messageFields.push({
            name: "Item Attributes",
            value: attribString
          });
          
          
          let embed = new RichEmbed()
          .setTitle(bestItem.dname)
          .setURL("https://dota2.gamepedia.com/" + bestItem.dname.split(' ').join('_'))
          .setThumbnail("http://cdn.dota2.com/apps/dota2/images/" + bestItem.img.substring(bestItem.img.indexOf("items/"), bestItem.img.indexOf("?3")))
          .addField(`**Cost:**`,bestItem.cost + " Gold")
          .addField(`**Description:**`,desc||"none")
          .addField(`**Lore:**`,bestItem.lore||"none")
          .addField(`**Notes:**`,bestItem.notes||"none")
          .addField(`**Cooldown:**`,(bestItem.cd||0) +" sec",true)
          .addField(`**Components:**`,components||"none",true)
          .addField(`**Item Attributes:**`,attribString||"none",true)
          message.channel.send(embed)
        });
    }
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
  };
  
  exports.help = {
    name: "dhero",
    description: "Displays dota 2 heros stats!",
    usage: "dhero <hero name>",
    category: "Games",
  };
  