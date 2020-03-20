const Discord = require('discord.js');

/**
* Displays the help panel
* @param {message} message Message entered on Discord
*/
exports.getHelp = function(message){
    let cmdSplit = message.content.replace(/\s\s+/g, ' ').split(' ');
    
    if(cmdSplit.length == 2 && cmdSplit[1] === '-help' || cmdSplit[1] === '-h'){
        
        var embed = new Discord.MessageEmbed()
        .setColor('#af1717')
        .addField(':question: **Help center**', 'How to use the command?')
        //.addField(':bar_chart: **Get your stats**', 'To obtain your statistics, you must run the following command: **.pubg <PUBG Nickname> <PUBG Platform> <PUBG Game mode>**. The following platforms are available: steam, psn, xbox and kakao. The following game modes are available: solo, solo-fpp, duo, duo-fpp, squad, squad-fpp')
        //.addField('`Example: `', '```\n.pubg unknownPlayer steam squad-fpp```')
        .addField(':bar_chart: **Get your last game stats**', 'To obtain the statistics of the last game, you must run the following command: **.pubg -game <PUBG Nickname> <PUBG Platform>**. The following platforms are available: steam, psn, xbox and kakao.')
        .addField('`Example: `', '```\n.pubg -game unknownPlayer steam```')
        ;
        message.channel.send(embed);
    }
};