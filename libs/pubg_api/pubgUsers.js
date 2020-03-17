const request = require('request');
const config = require('../config/config');

/**
* Get PUBG player informations from PUBG API
* @param {*} pubgUserName 
* @param {*} PubgPlatform 
* @param {*} callback 
* @returns Return PUBG player informations
*/
function getUser(pubgUserName, PubgPlatform, callback){
    request({
        headers: {
            'Authorization': config.pubgApiKey,
            'Accept': 'application/vnd.api+json'
        },
        uri: 'https://api.pubg.com/shards/' + PubgPlatform + '/players?filter[playerNames]=' + pubgUserName,
        method: 'GET'
        
    }, function (error, response, body) {
        if (error) {
            return callback(error, 'Error', null);
            
        }else{
            let jsonResponse = JSON.parse(body);
            if(jsonResponse.data != undefined){
                return callback(null, 'Founded', jsonResponse);
            }
            if(jsonResponse.errors != undefined){
                return callback('error', 'Not Found', null);
            }
        }
    });
};

/**
* Get property from PUBG player informations
* @param {string} _property Property to get
* @param {string} pubgUserName 
* @param {string} PubgPlatform 
* @param {string} callback 
* @returns property from PUBG player informations
*/
exports.getUserProperty = function(_property, pubgUserName, PubgPlatform, callback){
    getUser(pubgUserName, PubgPlatform, (userError, userStatement, propertyPubgUser) => {
        
        switch (userStatement) {
            case 'Founded':
            let property = propertyPubgUser.data[0][_property];
            return callback(null, userStatement, property);
            
            case 'Not Found':
            return callback(null, userStatement, 'No Player Found.');
            
            case 'Error':
            return callback(null, userStatement, 'Fatal Error.');
        }
        
    });
};

/**
* Get PUBG player informations
* @param {*} pubgUserId 
* @param {*} PubgPlatform 
* @param {*} callback 
* @returns Return PUBG player informations
*/
exports.getUser = function(pubgUsername, PubgPlatform, callback){
    getUser(pubgUsername, PubgPlatform, (userError, userStatement, pubgUser) => {
        
        switch (userStatement) {
            case 'Founded':
            return callback(null, userStatement, pubgUser);
            
            case 'Not Found':
            return callback(null, userStatement, 'No Players Found.');
            
            case 'Error':
            return callback(null, userStatement, 'Fatal Error.');
        }
    });
};