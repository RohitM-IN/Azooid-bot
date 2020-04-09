const {
  MessageEmbed
} = require("discord.js")
const {
  nodes
} = require("../config.json")
const {
  ErelaClient,
  Utils
} = require("erela.js");
const admin = require('firebase-admin');
let db = admin.firestore();
var fs = require("fs");
const https = require("https");
const { getAnnouncementEmbed ,query  } = require('../util/Util.js')
const requireText = require("require-text");
const {flatten }= require("array-flatten");
module.exports = async client => {
  // Why await here? Because the ready event isn't actually ready, sometimes
  // guild information will come in *after* ready. 1s is plenty, generally,
  // for all of them to be loaded.
  // NOTE: client.wait and client.log are added by ./util/functions.js !
  await client.wait(1000);

  // This loop ensures that client.appInfo always contains up to date data
  // about the app's status. This includes whether the bot is public or not,
  // its description, owner, etc. Used for the dashboard amongs other things.
  client.appInfo = await client.fetchApplication();
  setInterval(async () => {
    client.appInfo = await client.fetchApplication();
  }, 60000);

  // Check whether the "Default" guild settings are loaded in the enmap.
  // If they're not, write them in. This should only happen on first load.
  if (!client.settings.has("default")) {
    if (!client.config.defaultSettings) throw new Error("defaultSettings not preset in config.js or settings database. Bot cannot load.");
    client.settings.set("default", client.config.defaultSettings);
  }

  // Initializes the dashboard, which must be done on ready otherwise some data
  // may be missing from the dashboard. 
  require("../util/dashboard")(client);

  // Set the game as the default help command + guild count.
  // NOTE: This is also set in the guildCreate and guildDelete events!
  client.user.setPresence({
    activity: {
      name: `@Azooid#8892 help | ${client.guilds.cache.size} Servers`,
      type: 0
    }
  });

  // Log that we're ready to serve, so we know the bot accepts commands.
  client.log("log", `${client.user.tag}, ready to serve ${client.users.cache.size} users in ${client.guilds.cache.size} servers.`, "Ready!");
  
  const dataFile = "./data.json";
  let data = {};
 

  if (fs.existsSync(dataFile)) {
    data = JSON.parse(fs.readFileSync(dataFile));
    cleanupLists();
  } else {
    fs.writeFileSync(dataFile, JSON.stringify({}));
  }
  client.data = data;
  handleSchedules(Math.round(getFromNextDays().getTime() / 1000)); // Initial run
    setInterval(() => handleSchedules(Math.round(getFromNextDays().getTime() / 1000)), 1000 * 60 * 60 * 24); // Schedule future runs every 24 hours
  // init music nodes 
  client.music = new ErelaClient(client, nodes)
    .on("nodeError", console.log)
    .on("nodeConnect", () => console.log("Successfully created a new Node."))
    .on("queueEnd", player => {
      player.textChannel.send("Well nothing left for me to play see you soon !")
      player.setTrackRepeat(false);
      player.setQueueRepeat(false);
      return client.music.players.destroy(player.guild.id)
    })
    .on("trackStart", async ({
      textChannel,
      trackRepeat
    }, {
      title,
      duration,
      thumbnail,
      requester,
      uri
    }) => {

      if (trackRepeat === false) {
        let Embed = new MessageEmbed()
          .setTitle(`:musical_note: Now Playing`)
          .addField(`**Title :** `, `${title} : \`${Utils.formatTime(duration, true)}\``)
          .setThumbnail(thumbnail)
          .addField(`Requested By :`, requester.username)
          .addField(`**Link:**`, `[${title}](${uri})`)
          .setTimestamp()
          .setFooter(`${client.user.username}`);
        textChannel.send(Embed);
      } else {
        return;
      }

    })
    .on("nodeDisconnect", (node, error) => {
      console.log(error)
      client.user.setPresence({
        activity: {
          name: `@Azooid#8892 help | ${client.guilds.cache.size} Servers`,
          type: 0
        },
        status: "online",
      });
    })
    .on("nodeReconnect", (node) => {
      console.log('Node reconnected ')
      client.user.setPresence({
        status: "online",
      });
    })

  client.levels = new Map()
    .set("none", 0.0)
    .set("low", 0.10)
    .set("medium", 0.15)
    .set("high", 0.25);

  dbload();
  refreshDotaData();
  function cleanupLists() {
    Object.values(data).forEach(serverData => {
      Object.entries(serverData).forEach(([channelId, channelData]) => {
        if (!channelData.shows || channelData.shows.length === 0)
          return;
  
        channelData.shows = channelData.shows.filter(e => e !== null);
      });
    });
  
    fs.writeFileSync(dataFile, JSON.stringify(data));
  }
  function handleSchedules(time, page) {
    query(requireText("../query/Schedule.graphql", require), { page: page, watched: getAllWatched(), nextDay: time }).then(res => {
      if (res.errors) {
        console.log(JSON.stringify(res.errors));
        return;
      }
  
      res.data.Page.airingSchedules.forEach(e => {
        const date = new Date(e.airingAt * 1000);
        if (queuedNotifications.includes(e.id))
          return;
  
        console.log(`Scheduling announcement for ${e.media.title.romaji} on ${date}`);
        queuedNotifications.push(e.id);
        setTimeout(() => makeAnnouncement(e, date), e.timeUntilAiring * 1000);
      });
  
      // Gather any other pages
      if (res.data.Page.pageInfo.hasNextPage)
        handleSchedules(time, res.data.Page.pageInfo.currentPage + 1);
    });
  }
  
  function getAllWatched() {
    const watched = [];
    Object.values(data).forEach(server => {
      Object.values(server).filter(c => c.shows).forEach(c => c.shows.forEach(s => watched.push(s)));
    });
    return [...flatten(watched)];
  }
  
  function makeAnnouncement(entry, date, upNext = false) {
    queuedNotifications = queuedNotifications.filter(q => q !== entry.id);
    const embed = getAnnouncementEmbed(entry, date, upNext);
  
    Object.values(data).forEach(serverData => {
      Object.entries(serverData).forEach(([channelId, channelData]) => {
        if (!channelData.shows || channelData.shows.length === 0)
          return;
  
        if (channelData.shows.includes(entry.media.id)) {
          const channel = client.channels.find(v => v.id === channelId);
          if (channel) {
            console.log(`Announcing episode ${entry.media.title.romaji} to ${channel.guild.name}@${channel.id}`);
            channel.send({embed});
          }
        }
      });
    });
  }
  function getFromNextDays (days = 1) {
		return new Date(new Date().getTime() + (24 * 60 * 60 * 1000 * days));
	}

};

function dbload() {
  let query = db.collection('guilds')
  let guilds = {} // plain object, not array   
  let promise = new Promise(async function (resolve) {

    await query.get().then(snapshot => {
      let remaining = snapshot.size; // If firebase, there is this property
      snapshot.forEach(doc => {
        guilds[doc.id] = doc.data();
        remaining--;
        if (!remaining) resolve(guilds);
      });
    })
  });
  promise.then(async function (guilds) {
    // do anything you like with guilds inside this function...
    let temp = {
      guilds
    };
    await fs.writeFileSync("./data/json/serversettings.json", JSON.stringify(temp), function (err) {
      if (err) throw err;

    })
    console.log("done saving serversettings.json")
  });

}


function refreshDotaData() {
  try {
    https.get("https://raw.githubusercontent.com/odota/dotaconstants/master/build/heroes.json", res => {
      res.on('error', function errorHandler(err) {
        console.log(err);
      });
      res.setEncoding("utf8");
      let body = "";
      res.on("data", data => {
        body += data;
      });
      res.on("end", () => {

        // console.log("Hero Data Retrieved");
        //  body = "[" + body.substring(body.indexOf("{") + 1, body.lastIndexOf("}")) + "]";
        fileData("./heroes.json", body);
        // console.log("Hero Data Written");
      });
    });
    https.get("https://raw.githubusercontent.com/odota/dotaconstants/master/build/items.json", res => {
      res.on('error', function errorHandler(err) {
        console.log(err);
      });
      res.setEncoding("utf8");
      let body = "";
      res.on("data", data => {
        body += data;
      });
      res.on("end", () => {

        // console.log("Item Data Retrieved");
        //  body = "[" + body.substring(body.indexOf("{") + 1, body.lastIndexOf("}")) + "]";
        fileData("./items.json", body);
        // console.log("Item Data Written");
      });
    });
    https.get("https://raw.githubusercontent.com/odota/dotaconstants/master/build/abilities.json", res => {
      res.on('error', function errorHandler(err) {
        console.log(err);
      });
      res.setEncoding("utf8");
      let body = "";
      res.on("data", data => {
        body += data;
      });
      res.on("end", () => {
        // console.log("Ability Data Retrieved");
        //  body = "[" + body.substring(body.indexOf("{") + 1, body.lastIndexOf("}")) + "]";
        fileData("./abilities.json", body);
        // console.log("Ability Data Written");
      });
    });
  } catch (err) {
    console.log(err)
  }

}

function fileData(savPath, newData) {

  fs.exists(savPath, function (exists) {
    if (exists) {
      fs.readFile(savPath, 'utf8', function (err, data) {
        if (err) throw err;
        //Do your processing, MD5, send a satellite to the moon, etc.
        //console.log("Data:" + data);
        fs.writeFile(savPath, newData, function (err) {
          if (err) throw err;
          console.log('complete');
        });
      });
    } else {
      fs.writeFile(savPath, {
        flag: 'wx'
      }, function (err, data) {
        fs.readFile(savPath, 'utf8', function (err, data) {
          if (err) throw err;
          //Do your processing, MD5, send a satellite to the moon, etc.
          //console.log("Data:" + data);
          fs.writeFile(savPath, newData, function (err) {
            if (err) throw err;
            console.log('complete');
          });
        });
      })
    }
  });

}


