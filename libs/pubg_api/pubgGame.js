const request = require('request');
const config = require('../config/config');

/**
 * Get PUBG game statitics
 * @param {string} pubgPlatform 
 * @param {string} pubgMatchId Match ID
 * @param {Function} callback 
 * @return json file with all game statitics
 */
function getMatchGame(pubgPlatform, pubgMatchId, callback){
    request({
        headers: {
            'Authorization': config.pubgApiKey,
            'Accept': 'application/vnd.api+json'
        },
        uri: 'https://api.pubg.com/shards/' + pubgPlatform + '/matches/' + pubgMatchId,
        method: 'GET'
        
    }, function (error, response, body) {
        if (error) {
            return callback(error, null);
            
        }else{
            let jsonResponse = JSON.parse(body);
            if(jsonResponse.data != undefined){
                return callback(null, jsonResponse);
            }
            if(jsonResponse.errors != undefined){
                return callback('error', null);
            }
        }
    });
}

/**
 * Get game statitics
 * @param {string} pubgPlatform 
 * @param {string} pubgMatchId
 * @param {string} pubgUserId
 * @param {Function} callback 
 * @return {Array} game statitics for roster's player
 */
exports.getRosterStats = function(pubgPlatform, pubgMatchId, pubgUserId, callback){
    getMatchGame(pubgPlatform, pubgMatchId, (gameError, jsonResponse) => {
        if (!gameError) {            

            /* GET Roster ID*/
            var playerId = pubgUserId;
            jsonResponse.included.forEach(function(data){ 
                if (data.type === 'participant' && data.attributes.stats.playerId.includes(pubgUserId)) {
                    playerId = data.id;
                }
            });

            /* GET Roster's players */
            var rosterPlayers;
            var finalRank;
            var nbRosters = 0;
            jsonResponse.included.forEach(function(roster){
                if (roster.type === 'roster') {
                    nbRosters++;
                    roster.relationships.participants.data.forEach(function(rosterPlayer){
                        if (rosterPlayer.id === playerId) {
                            rosterPlayers = roster.relationships.participants.data;
                            finalRank = roster.attributes.stats.rank
                        }
                    });
                }
            });

             /* GET players stats */
             var playersStats = [];
            jsonResponse.included.forEach(function(player){
                rosterPlayers.forEach(function(playerRoster){ 
                    if (player.type === 'participant' && player.id === playerRoster.id) {
                        
                        playersStats.push({
                            playerId: player.attributes.stats.playerId,
                            name: player.attributes.stats.name,
                            kills: player.attributes.stats.kills,
                            assists: player.attributes.stats.assists,
                            damageDealt: player.attributes.stats.damageDealt,
                            headshotKills: player.attributes.stats.headshotKills,
                            longestKill: player.attributes.stats.longestKill,
                            walkDistance: player.attributes.stats.walkDistance,
                            rank: finalRank,
                            gameMode: jsonResponse.data.attributes.gameMode,
                            nbRosters: nbRosters
                        });
                    }
                });
            });

            return callback(gameError, playersStats);
        }
    });
};