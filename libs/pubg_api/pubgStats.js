const request = require('request');
const pubgRank = require('../pubg_api/pubgRank');
const config = require('../config/config');

/**
* GET all game statistics from PUBG API for a pubgUserId on this PubgPlatform
* @param {string} pubgUserId 
* @param {string} PubgPlatform 
* @param {string} PubgSeason 
* @param {Function} callback 
* @returns Return game statistics for pubgUserId on this PubgPlatform
*/
function getStats(pubgUserId, PubgPlatform, PubgSeason, callback){
    request({
        headers: {
            'Authorization': config.pubgApiKey,
            'Accept': 'application/vnd.api+json'
        },
        uri: 'https://api.pubg.com/shards/'+ PubgPlatform +'/players/'+ pubgUserId +'/seasons/'+ PubgSeason ,
        method: 'GET'
        
    }, function (error, response, body) {
        if (error) {
            return callback(error, null);
            
        }else{
            let jsonResponse = JSON.parse(body);
            return callback(null, jsonResponse);
        }
    });
}

/**
* GET some game statistics from PUBG API for a pubgUserId on this PubgPlatform
* @param {string} pubgUserId 
* @param {string} PubgPlatform 
* @param {string} PubgSeason 
* @param {Function} callback 
* @returns Return game statistics for pubgUserId on this PubgPlatform
*/
exports.getUserStats = function(pubgUserId, PubgPlatform, PubgSeason, type, callback){
    getStats(pubgUserId, PubgPlatform, PubgSeason, (getStatserror, jsonResponse) => {
        if (!getStatserror) {
            if (jsonResponse.data != undefined) {
                
                /* Get PUBG rank */
                var personalRank = pubgRank.getRank(jsonResponse.data.attributes.gameModeStats[type].rankPoints);
                
                /* Consolidation of the data to be returned */
                var response = {
                    nbGame: jsonResponse.data.attributes.gameModeStats[type].roundsPlayed,
                    wins: jsonResponse.data.attributes.gameModeStats[type].wins,
                    top10s: jsonResponse.data.attributes.gameModeStats[type].top10s,
                    avgTop10s: (jsonResponse.data.attributes.gameModeStats[type].top10s * 100) / jsonResponse.data.attributes.gameModeStats[type].roundsPlayed,
                    kills: jsonResponse.data.attributes.gameModeStats[type].kills,
                    deaths: jsonResponse.data.attributes.gameModeStats[type].losses,
                    KD: Math.round(jsonResponse.data.attributes.gameModeStats[type].kills / jsonResponse.data.attributes.gameModeStats[type].losses * 100) / 100,
                    KDA: Math.round((jsonResponse.data.attributes.gameModeStats[type].kills + jsonResponse.data.attributes.gameModeStats[type].assists) / jsonResponse.data.attributes.gameModeStats[type].losses * 100) / 100,
                    assists: jsonResponse.data.attributes.gameModeStats[type].assists,
                    mostKills: jsonResponse.data.attributes.gameModeStats[type].roundMostKills,
                    AvgDamage: jsonResponse.data.attributes.gameModeStats[type].damageDealt / jsonResponse.data.attributes.gameModeStats[type].roundsPlayed,
                    headshotKills: jsonResponse.data.attributes.gameModeStats[type].headshotKills,
                    longestKill: jsonResponse.data.attributes.gameModeStats[type].longestKill,
                    rank: personalRank
                }
                return callback(null, response);
                
            }else{
                return callback(getStatserror, null);
            }
        }
    });
};