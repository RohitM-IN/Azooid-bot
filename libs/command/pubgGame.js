const Discord = require('discord.js');
const pubgGame = require('../pubg_api/pubgGame');
const pubgUser = require('../pubg_api/pubgUsers');

/**
* Return PUBG game statistics : !pubg -g <PUBG Nickname> <PUBG Platform>
* @param {message} message Message entered on Discord
*/
exports.getGameStats = function(message){
    let cmdSplit = message.content.replace(/\s\s+/g, ' ').split(' ');
    
    if (cmdSplit.length == 4 && (cmdSplit[1] === '-g' || cmdSplit[1] === '-game' || cmdSplit[1] === 'lg')) {
        /* Check: Platforms */
        if(cmdSplit[3] === 'steam' || cmdSplit[3] === 'psn' || cmdSplit[3] === 'xbox' || cmdSplit[3] === 'kakao'){
            
            /* Get user ID */
            pubgUser.getUser(cmdSplit[2], cmdSplit[3], (userError, userStatement, user) => {
                
                /* Check: User founded */
                if (!userError && userStatement === 'Founded') {
                    var matchId = user.data[0].relationships.matches.data[0].id;
                    var userId = user.data[0].id;
                    
                    if (matchId != 'null' && matchId != "undefined") {

                        pubgGame.getRosterStats(cmdSplit[3], matchId, userId, (pubgGameError, pubgGameStats) => {
                            if (!pubgGameError) {

                                var embed = new Discord.RichEmbed();
                                embed.setColor('#f7a838');
                                embed.addField(':video_game: **' + cmdSplit[2] + '\'s last game stats - #' + pubgGameStats[0].rank + '/' + pubgGameStats[0].nbRosters + '**', pubgGameStats[0].gameMode)

                                pubgGameStats.forEach(function(p){ 
                                    embed.addField('____________**' + p.name + '**____________','**Kills**: ' + p.kills + ' - **Assists**: ' + p.assists + ' - **Headshots**: ' + p.headshotKills + ' - **Damages**: ' + Math.floor(p.damageDealt) + ' - **Longest Kill**: ' + Math.floor(p.longestKill) + 'm');
                                });

                                message.channel.send(embed);
                            } 
                        });
                    }
                    
                }else if (userStatement === 'Not Found') {
                    message.reply(user);
                    return;
                    
                }else{
                    message.reply('Invalid command. See <!pubg -help> command.');
                    return;
                }
            });
        }else{
            message.reply('Invalid platform. See <!pubg -help> command.');
            return;
        }
    }
};