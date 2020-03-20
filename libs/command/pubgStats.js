const Discord = require('discord.js');
const pubgStats = require('../pubg_api/pubgStats');
const pubgUser = require('../pubg_api/pubgUsers');
const pubgSeason = require('../pubg_api/pubgSeason');

/**
* Return PUBG game statistics : !pubg <PUBG Nickname> <PUBG Platform> <PUBG Game mode>
* @param {message} message Message entered on Discord
*/
exports.getStats = function(message){
    let cmdSplit = message.content.replace(/\s\s+/g, ' ').split(' ');
    
    if (cmdSplit.length == 4 && !(cmdSplit[1] === '-g' || cmdSplit[1] === '-game')) {
        /* Check: Platforms */
        if(cmdSplit[2] === 'steam' || cmdSplit[2] === 'psn' || cmdSplit[2] === 'xbox' || cmdSplit[2] === 'kakao'){
            /* Check: Games modes */
            if (cmdSplit[3] === 'squad-fpp' || cmdSplit[3] === 'squad' || cmdSplit[3] === 'duo' || cmdSplit[3] === 'duo-fpp' || cmdSplit[3] === 'solo' || cmdSplit[3] === 'solo-fpp') {
                
                pubgUser.getUserProperty('id', cmdSplit[1], cmdSplit[2], (userPropertyError, userPropertyStatement, userProperty) => {
                    
                    /* Check: User founded */
                    if (!userPropertyError && userPropertyStatement === 'Founded') {
                        pubgSeason.getCurrentSeason(cmdSplit[2], (currentSeasonError, currentSeason) => {
                            
                            if (!currentSeasonError) {
                                pubgStats.getUserStats(userProperty, cmdSplit[2], currentSeason.seasonName, cmdSplit[3], (userStatsError, userStats) => {
                                    if (!userStatsError) {
                                        var embed = new Discord.MessageEmbed()
                                        .setColor("RANDOM")
                                        .addField(':video_game: **'+ cmdSplit[1] + '\'s Stats - ' + cmdSplit[3] +'**',userStats.nbGame + ' game(s)').addField('Win(s)',userStats.wins, inline=true).addField('Top10(s)',userStats.top10s, inline=true).addField('Avg. Top10',Math.trunc(userStats.avgTop10s) + '%', inline=true).addField('Kill(s)',userStats.kills, inline=true).addField('Death(s)',userStats.deaths, inline=true).addField('Assist(s)',userStats.assists, inline=true).addField('K/D',userStats.KD, inline=true).addField('KDA',userStats.KDA.toFixed(1), inline=true).addField('Most Kills',userStats.mostKills, inline=true).addField('Avg. Damage',Math.trunc(userStats.AvgDamage), inline=true).addField('Headshot(s)',userStats.headshotKills, inline=true).addField('Longest kill',userStats.longestKill.toFixed(0) + 'm', inline=true)
                                        .setImage(userStats.rank.rankPicture)
                                        .setFooter('Statistics from current PUBG season.');
                                        message.channel.send(embed);
                                    }
                                });
                            }
                        });
                        
                    }else if (userPropertyStatement === 'Not Found') {
                        message.reply(userProperty);
                        return;
                        
                    }else{
                        message.reply('Invalid command. See <!pubg -help> command.');
                        return;
                    }
                });
            }else{
                message.reply('Invalid game mode. See <!pubg -help> command.');
                return;
            }
        }else{
            message.reply('Invalid platform. See <!pubg -help> command.');
            return;
        }
    }
};