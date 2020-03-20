const Discord = require("discord.js");


module.exports = async (client, guild ) => {
    
    guild.owner.send(guild.name+" is unavailable, likely due to a Discord server outage!!")

}