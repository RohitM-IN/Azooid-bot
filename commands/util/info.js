const { RichEmbed } = require("discord.js")


module.exports = {
        name: "info",
        description: "Pulls the info of the bot!",
        usage: "info",
        category: "util",
    run: async (client, message, args) => {
    let sEmbed = new RichEmbed()
        .setColor('#00ff00')
        .setFooter(`${client.user.username}`)
        .setTimestamp()
        .setTitle(`:information_source: ${client.user.username} Status`)
        .setDescription('Here\'s some info about me')
        .addField(':white_check_mark: API Status', `ONLINE & bot latency to this server is ${Math.round(client.ping)}ms`)
        .addField(':spy:  My masters:', 'RootAndroid58[https://github.com/RootAndroid58]')
        .addField(':purple_heart:  My Life', 'I\'m currently being hosted on a Heroku free tier server') 
        .addField(':satellite_orbital: Server dominance', `Found ${client.guilds.size} server instances with a population of ${client.users.size} users`)
    message.channel.send(sEmbed);
    }
}