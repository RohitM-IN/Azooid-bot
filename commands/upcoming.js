const fs = require('fs');
const requireText = require("require-text");
const {query, getAnnouncementEmbed, getFromNextDays} = require('../util/Util.js');
const fetch = require("node-fetch");
const streamingSites = [
    "Amazon",
    "Animelab",
    "Crunchyroll",
    "Funimation",
    "Hidive",
    "Hulu",
    "Netflix",
    "Viz"
  ];
exports.run = async (client, message, args ) => {
    const dataFile = "./data.json";
    let data = JSON.parse(fs.readFileSync(dataFile));
  
    const channelData = data[message.channel.id];
    if (!channelData || !channelData.shows || channelData.shows.length === 0) {
      message.react("👎");
      return;
    }

    message.channel.startTyping();
    query(requireText("../query/Schedule.graphql", require), { page: 0, watched: channelData.shows, nextDay: Math.round(getFromNextDays(7).getTime() / 1000) }).then(res => {
      if (res.errors) {
        console.log(JSON.stringify(res.errors));
        message.channel.stopTyping();
        return;
      }

      if (res.data.Page.airingSchedules.length === 0) {
        message.react("👎");
        message.channel.stopTyping();
        return;
      }

      const anime = res.data.Page.airingSchedules[0];
      const embed = getAnnouncementEmbed(anime, new Date(anime.airingAt * 1000), true);
      message.channel.send({embed});
      message.channel.stopTyping();
    });
  }

  exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['next','up-ani'],
    permLevel: "User"
  };
  
  exports.help = {
    name: "upcoming",
    description: "Displays the next anime to air (in the next 7 days) that the current channel is watching.",
    usage: "watch <url of that anime or id MAL/Anilist>",
    category: "Anime",
    
  };