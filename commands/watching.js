const {query} = require('../util/Util.js');
const fs = require('fs');
const requireText = require("require-text");
  
  exports.run = async (client, message, args ,serverData) => {
    const dataFile = "./data.json";
    let data = JSON.parse(fs.readFileSync(dataFile));
    const alIdRegex = /anilist\.co\/anime\/(.\d*)/;
    const malIdRegex = /myanimelist\.net\/anime\/(.\d*)/;
  
    const channelData = data[message.channel.id];
    if (!channelData || !channelData.shows || channelData.shows.length === 0) {
      message.react("👎");
      return;
    }

    message.channel.startTyping();
    handleWatchingPage(0);

    function handleWatchingPage(page) {
      query(requireText("../query/Watching.graphql", require), {watched: channelData.shows, page}).then(res => {
        let description = "";
        res.data.Page.media.forEach(m => {
          if (m.status !== "RELEASING")
            return;

          const nextLine = `\n- [${m.title.romaji}](${m.siteUrl}) (\`${m.id}\`)`;
          if (1000 - description.length < nextLine.length) {
            sendWatchingList(description, message.channel);
            console.log(description.length);
            description = "";
          }

          description += nextLine;
        });
        if (description.length !== 0)
          sendWatchingList(description, message.channel);

        if (res.data.Page.pageInfo.hasNextPage) {
          handleWatchingPage(res.data.Page.pageInfo.currentPage + 1);
          return;
        }
        if (description.length === 0)
          message.channel.send("No currently airing shows are being announced.");
        message.channel.stopTyping();
      });
    }
    function sendWatchingList(description, channel) {
        const embed = {
          title: "Current announcements ",
          color: 4044018,
          author: {
            name: "AniList",
            url: "https://anilist.co",
            icon_url: "https://anilist.co/img/logo_al.png"
          },
          description
        };
        channel.send({embed});
      }  
}

  

  
  exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
  };
  
  exports.help = {
    name: "watching",
    description: "Prints a list of all anime names being watched that are still currently airing.",
    usage: "watching ",
    category: "Anime",
  };