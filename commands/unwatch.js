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

      message.channel.startTyping();
      const channelData = data[message.channel.id];
      if (!channelData || !channelData.shows || channelData.shows.length === 0) {
        message.react("🤷");
        message.channel.stopTyping();
        return;
      }

      const watchId = await getMediaId(args[0]);
      if (!watchId || !channelData.shows.includes(watchId)) {
        message.react("👎");
        message.channel.stopTyping();
        return;
      }
      channelData.shows = channelData.shows.filter(id => id !== watchId);
      data[message.channel.id] = channelData;
      message.react("👍");
      message.channel.stopTyping();
      return data;
  }
  exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['remove','anime-del'],
    permLevel: "User"
  };
  
  exports.help = {
    name: "unwatch",
    description: "Removes an anime from the list. Whatever channel this is used in is the channel the announcements will be made in.",
    usage: "unwatch <url of that anime or id MAL/Anilist>",
    category: "Anime",
    extra:"You may provide an AniList entry link, a direct AniList media ID, or a MyAnimeList link."
  };