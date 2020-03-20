const Discord = require('discord.js');
const { stripIndents } = require("common-tags");
var fs = require("fs");
var pubgSeason = require('../libs/pubg_api/pubgSeason'); 
var pubgGame = require('../libs/pubg_api/pubgGame'); 
var pubgStatsCmd = require('../libs/command/pubgStats')
var pubgGameCmd = require('../libs/command/pubgGame')
var helpCmd = require('../libs/command/help')


exports.run = async (client, message, args, userID, channelID) => {
      if (!args[0]) return message.channel.send(embed);
      try
      {
        //pubgStatsCmd.getStats(message);
        pubgGameCmd.getGameStats(message);
        helpCmd.getHelp(message);
        }catch{
          message.channel.send("Looks like some error happned try again or play 1 match to get results")
        }
            var embed = new Discord.MessageEmbed()
            .setColor('#af1717')
            .addField(':question: **Help center**', 'How to use the command?')
            .addField(':bar_chart: **Get your stats**', 'To obtain your statistics, you must run the following command: **.pubg <PUBG Nickname> <PUBG Platform> <PUBG Game mode>**. The following platforms are available: steam, psn, xbox and kakao. The following game modes are available: solo, solo-fpp, duo, duo-fpp, squad, squad-fpp')
            .addField('`Example: `', '```\n.pubg unknownPlayer steam squad-fpp```')
            .addField(':bar_chart: **Get your last game stats**', 'To obtain the statistics of the last game, you must run the following command: **.pubg -game <PUBG Nickname> <PUBG Platform>**. The following platforms are available: steam, psn, xbox and kakao.')
            .addField('`Example: `', '```\n.pubg -game unknownPlayer steam```');
         
    }
    exports.conf = {
        enabled: true,
        guildOnly: false,
        aliases: ["pbg"],
        permLevel: "User"
      };
      
      exports.help = {
        name: "pubg",
        description: "Displays a user's pubg stats!",
        usage: ".pubg -game <PUBG Nickname> <PUBG Platform> | type .pubg -help",
        category: "Games",
      };
    