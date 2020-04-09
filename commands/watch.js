const {checkModifyPermission, getMediaId} = require('../util/Util');
const fs = require('fs');
  
  exports.run = async (client, message, args ,serverData) => {
    const dataFile = "./data.json";
    let data = JSON.parse(fs.readFileSync(dataFile));
    const alIdRegex = /anilist\.co\/anime\/(.\d*)/;
    const malIdRegex = /myanimelist\.net\/anime\/(.\d*)/;
  
    if (!checkModifyPermission(message)) {
      message.react("👎");
      return;
    }
    console.log(data);
    console.log(data[message.guild.id])
    message.channel.startTyping();
    const channelData = data[message.channel.id] || {shows: []};
    let watched = channelData.shows || [];

    const watchId = await getMediaId(args[0]);
    if (!watchId || watched.includes(watchId)) {
      message.react("👎");
      message.channel.stopTyping();
      return;
    }
    watched.push(watchId);
    channelData.shows = watched;
    data[message.channel.id] = channelData;
    message.react("👍");
    message.channel.stopTyping();
    return data;
  }
  exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['add','anime-add'],
    permLevel: "User"
  };
  
  exports.help = {
    name: "watch",
    description: "Adds a new anime to watch for new episodes of. Whatever channel this is used in is the channel the announcements will be made in.",
    usage: "watch <url of that anime or id MAL/Anilist>",
    category: "Anime",
    extra:"You may provide an AniList entry link, a direct AniList media ID, or a MyAnimeList link."
  };