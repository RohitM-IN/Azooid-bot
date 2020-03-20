const { stripIndents } = require("common-tags");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");



exports.run = async (client, message, args) => {
    fetch("https://coronavirus-tracker-api.herokuapp.com/all")
    .then(res => res.json()).then(body => {
        const embed = new MessageEmbed()
            .addField("Confirmed", stripIndents`
                **Total Cases:** ${body.confirmed.latest}
                **Total Locations:** ${body.confirmed.locations.length}
                **Last Updated:** ${body.confirmed.last_updated}
            `)
            .addField("Deaths", stripIndents`
                **Total Deaths:** ${body.deaths.latest}
                **Total Locations:** ${body.deaths.locations.length}
                **Last Updated:** ${body.deaths.last_updated}
            `)
            .addField("Recovered", stripIndents`
                **Total Recoveries:** ${body.recovered.latest}
                **Total Locations:** ${body.recovered.locations.length}
                **Last Updated:** ${body.recovered.last_updated}
            `)
        message.channel.send(embed)
    })

    }


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["covid-19"],
    permLevel: "User"
  };

  exports.help = {
    name: "corona",
    description: "Sends you letest news about corona virus Be Care Full !",
    usage: "corona",
    category: "Fun",
  };