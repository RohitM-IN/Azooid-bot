const {query} = require('../util/Util.js');
const fs = require('fs');
const requireText = require("require-text");
const { flatten } = require('array-flatten');
  
  exports.run = async (client, message, args ,serverData) => {
    const dataFile = "./data.json";
    let data = JSON.parse(fs.readFileSync(dataFile));

    let channelData = data[message.channel.id];
      if (!channelData || !channelData.shows || channelData.shows.length === 0) {
        message.react("👎");
        return;
      }


      function handlePage(page = 0) {
        return query(requireText("../query/Watching.graphql", require), {watched: channelData.shows, page}).then(res => {
          return res;
        });
      }

      let finished = [];
      return handlePage().then(res => res.data.Page).then(res => promiseWhile(res, val => {
        finished.push(val.media.filter(e => e.status === "FINISHED").map(e => e.id));
        return val.pageInfo.hasNextPage
      }, val => handlePage(val.pageInfo.currentPage + 1).then(res => res.data.Page))).then(() => {
        finished = flatten(finished);
        channelData.shows = channelData.shows.filter(e => !finished.includes(e));

        message.channel.send(`Removed ${finished.length} shows from the list.`);
        console.log(channelData)
        data[message.channel.id] = channelData;
        message.react("👍");
        message.channel.stopTyping();
        return data;
      });
      function promiseWhile(data, condition, action) {
        function whilst(data) {
          return condition(data) ? action(data).then(whilst) : Promise.resolve(data);
        }
      
        return whilst(data);
      }
    }


  

  
  exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
  };
  
  exports.help = {
    name: "cleanani",
    description: "Purges any completed shows from this channel's watch list.",
    usage: "cleanani",
    category: "Anime",
  };