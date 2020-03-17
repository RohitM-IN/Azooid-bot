const request = require('request');
const config = require('../config/config');

/**
 * Get all seasons from PUBG API
 * @param {string} platform 
 * @param {Function} callback 
 * @return json file with all PUBG season on this platform
 */
function getSeasons(platform, callback){
    request({
        headers: {
            'Authorization': config.pubgApiKey,
            'Accept': 'application/vnd.api+json'
        },
        uri: 'https://api.pubg.com/shards/' + platform + '/seasons',
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
 * Get current PUBG season
 * @param {string} seasonPlatfom 
 * @param {Function} callback 
 * @returns Current PUBG season
 */
exports.getCurrentSeason = function(seasonPlatfom, callback){
    getSeasons(seasonPlatfom, (seasonsError, jsonResponse) => {
        if (!seasonsError) {
            jsonResponse.data.forEach(function(s){ 
                if(s.attributes.isCurrentSeason == true){
                    return callback(seasonsError, s);
                }
            });
        }
    });
};