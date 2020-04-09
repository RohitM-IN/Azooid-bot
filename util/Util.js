const crypto = require('crypto');
const yes = ['yes', 'y', 'ye', 'yeah', 'yup', 'yea', 'ya'];
const no = ['no', 'n', 'nah', 'nope', 'nop'];
const requireText = require("require-text");
const {flatten }= require("array-flatten");
const fs = require('fs');
//const { getAnnouncementEmbed ,query , getAllWatched , makeAnnouncement } = require('./util/Util')

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
const alIdRegex = /anilist\.co\/anime\/(.\d*)/;
const malIdRegex = /myanimelist\.net\/anime\/(.\d*)/;
module.exports = class Util {
	static delay(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	static shuffle(array) {
		const arr = array.slice(0);
		for (let i = arr.length - 1; i >= 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			const temp = arr[i];
			arr[i] = arr[j];
			arr[j] = temp;
		}
		return arr;
	}

	static list(arr, conj = 'and') {
		const len = arr.length;
		return `${arr.slice(0, -1).join(', ')}${len > 1 ? `${len > 2 ? ',' : ''} ${conj} ` : ''}${arr.slice(-1)}`;
	}

	static shorten(text, maxLen = 2000) {
		return text.length > maxLen ? `${text.substr(0, maxLen - 3)}...` : text;
	}

	static randomRange(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	static trimArray(arr, maxLen = 10) {
		if (arr.length > maxLen) {
			const len = arr.length - maxLen;
			arr = arr.slice(0, maxLen);
			arr.push(`${len} more...`);
		}
		return arr;
	}

	static firstUpperCase(text, split = ' ') {
		return text.split(split).map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`).join(' ');
	}

	static formatNumber(number) {
		return Number.parseFloat(number).toLocaleString(undefined, {
			maximumFractionDigits: 2
		});
	}

	static base64(text, mode = 'encode') {
		if (mode === 'encode') return Buffer.from(text).toString('base64');
		if (mode === 'decode') return Buffer.from(text, 'base64').toString('utf8') || null;
		throw new TypeError(`${mode} is not a supported base64 mode.`);
	}

	static hash(text, algorithm) {
		return crypto.createHash(algorithm).update(text).digest('hex');
	}

	static today(timeZone) {
		const now = new Date();
		if (timeZone) now.setUTCHours(timeZone);
		now.setHours(0);
		now.setMinutes(0);
		now.setSeconds(0);
		now.setMilliseconds(0);
		return now;
	}

	static tomorrow(timeZone) {
		const today = Util.today(timeZone);
		today.setDate(today.getDate() + 1);
		return today;
	}

	static async verify(channel, user, time = 30000) {
		const filter = res => {
			const value = res.content.toLowerCase();
			return res.author.id === user.id && (yes.includes(value) || no.includes(value));
		};
		const verify = await channel.awaitMessages(filter, {
			max: 1,
			time
		});
		if (!verify.size) return 0;
		const choice = verify.first().content.toLowerCase();
		if (yes.includes(choice)) return true;
		if (no.includes(choice)) return false;
		return false;
	}

	static cleanAnilistHTML(html) {
		let clean = html
			.replace(/(<br>)+/g, '\n')
			.replace(/&#039;/g, '\'')
			.replace(/&quot;/g, '"')
			.replace(/<\/?i>/g, '*')
			.replace(/~!|!~/g, '||')
			.replace(/&mdash;/g, '—');
		if (clean.length > 2000) clean = `${clean.substr(0, 1995)}...`;
		const spoilers = (clean.match(/\|\|/g) || []).length;
		if (spoilers !== 0 && (spoilers && (spoilers % 2))) clean += '||';
		return clean;
	}
	// static handleSchedules(time, page) {
	// 	query(requireText("./query/Schedule.graphql", require), { page: page, watched: getAllWatched(), nextDay: time }).then(res => {
	// 		if (res.errors) {
	// 		  console.log(JSON.stringify(res.errors));
	// 		  return;
	// 		}
		
	// 		res.data.Page.airingSchedules.forEach(e => {
	// 		  const date = new Date(e.airingAt * 1000);
	// 		  if (queuedNotifications.includes(e.id))
	// 			return;
		
	// 		  console.log(`Scheduling announcement for ${e.media.title.romaji} on ${date}`);
	// 		  queuedNotifications.push(e.id);
	// 		  setTimeout(() => makeAnnouncement(e, date), e.timeUntilAiring * 1000);
	// 		});
		
	// 		// Gather any other pages
	// 		if (res.data.Page.pageInfo.hasNextPage)
	// 		  handleSchedules(time, res.data.Page.pageInfo.currentPage + 1);
	// 	  });
	// }

	// static getAllWatched(){
	// 	const watched = [];
	// 	Object.values(data).forEach(server => {
	// 	  Object.values(server).filter(c => c.shows).forEach(c => c.shows.forEach(s => watched.push(s)));
	// 	});
	// 	return [...flatten(watched)];
	//   }
 
	//   static makeAnnouncement(entry, date, upNext = false) {
	// 	queuedNotifications = queuedNotifications.filter(q => q !== entry.id);
	// 	const embed = getAnnouncementEmbed(entry, date, upNext);
	  
	// 	Object.values(data).forEach(serverData => {
	// 	  Object.entries(serverData).forEach(([channelId, channelData]) => {
	// 		if (!channelData.shows || channelData.shows.length === 0)
	// 		  return;
	  
	// 		if (channelData.shows.includes(entry.media.id)) {
	// 		  const channel = client.channels.find(v => v.id === channelId);
	// 		  if (channel) {
	// 			console.log(`Announcing episode ${entry.media.title.romaji} to ${channel.guild.name}@${channel.id}`);
	// 			channel.send({embed});
	// 		  }
	// 		}
	// 	  });
	// 	});
	// }
	  
	  
	//   static cleanupLists() {
	// 	Object.values(data).forEach(serverData => {
	// 	  Object.entries(serverData).forEach(([channelId, channelData]) => {
	// 		if (!channelData.shows || channelData.shows.length === 0)
	// 		  return;
	  
	// 		channelData.shows = channelData.shows.filter(e => e !== null);
	// 	  });
	// 	});
	  
	// 	fs.writeFileSync(dataFile, JSON.stringify(data));
	//   }
	
};
module.exports = {
	query: async function (query, variables) {
		return fetch("https://graphql.anilist.co", {
		  method: "POST",
		  headers: {
			"Content-Type": "application/json",
			"Accept": "application/json"
		  },
		  body: JSON.stringify({
			query,
			variables
		  })
		}).then(res => res.json());
	  },
	  getFromNextDays: function (days = 1) {
		return new Date(new Date().getTime() + (24 * 60 * 60 * 1000 * days));
	  },
	  getAnnouncementEmbed: function (entry, date, upNext = false) {
		let description = `Episode ${entry.episode} of [${entry.media.title.romaji}](${entry.media.siteUrl})${upNext ? "" : " has just aired."}`;
		if (entry.media.externalLinks && entry.media.externalLinks.length > 0) {
		  let streamLinks = "";
		  let multipleSites = false;
		  entry.media.externalLinks.forEach(site => {
			if (streamingSites.includes(site.site)) {
			  streamLinks += `${multipleSites ? " • " : ""} [${site.site}](${site.url})`;
			  multipleSites = true;
			}
		  });
	
		  description += "\n\n" + (streamLinks.length > 0 ? "Watch: " + streamLinks + "\n\nIt may take some time to appear on the above service(s)" : "No licensed streaming links available");
		}
	
		let format = "";
		if (entry.media.format)
		  format = `Format: ${entry.media.format.includes("_") ? displayify(entry.media.format) : entry.media.format}`;
	
		let duration = "";
		if (entry.media.duration)
		  duration = `Duration: ${parseTime(entry.media.duration * 60)}`;
	
		let studio = "";
		if (entry.media.studios && entry.media.studios.edges.length > 0)
		  studio = `Studio: ${entry.media.studios.edges[0].node.name}`;
	
		return {
		  color: entry.media.coverImage.color ? parseInt(entry.media.coverImage.color.substr(1), 16) : 43775,
		  thumbnail: {
			url: entry.media.coverImage.large
		  },
		  author: {
			name: "AniList",
			url: "https://anilist.co",
			icon_url: "https://anilist.co/img/logo_al.png"
		  },
		  description,
		  timestamp: date,
		  footer: {
			text: `${format} • ${duration} • ${studio}`
		  }
		};
	  },
	
		displayify: function (enumVal) {
		  const words = enumVal.split("_");
		  for (let i = 0; i < words.length; i++)
			  words[i] = words[i].substr(0, 1) + words[i].toLowerCase().substr(1);
	
		  return words.join(" ");
	  },
	
	  parseTime: function (secs) {
		  let seconds = parseInt(secs, 10);
	
		  let hours = Math.floor(seconds / 3600);
		  seconds -= hours * 3600;
		  let minutes = Math.floor(seconds / 60);
	
		  let ret = "";
		  if (hours > 0)
			  ret += hours + "h";
		  if (minutes > 0)
			  ret += (ret.length === 0 ? "" : " ") + minutes + "m";
	
		  return ret;
	  },
	  checkModifyPermission: function (message) {
        switch (process.env.PERMISSION_TYPE) {
          case "CHANNEL_MANAGER":
            return message.channel.permissionsFor(message.author).has("MANAGE_CHANNELS");
          case "SERVER_OWNER":
            return message.author.id === message.guild.ownerID;
          default:
            return true;
        }
	  },
		
	 	getMediaId: async function(input) {
        // First we try directly parsing the input in case it's the standalone ID
        const output = parseInt(input);
        if (output)
          return output;
      
        // If that fails, we try parsing it with regex to pull the ID from an AniList link
        let match = alIdRegex.exec(input);
        // If there's a match, parse it and return that
        if (match)
          return parseInt(match[1]);
      
        // If that fails, we try parsing it with another regex to get an ID from a MAL link
        match = malIdRegex.exec(input);
        // If we can't find a MAL ID in the URL, just return null;
        if (!match)
          return null;
      
        return await query("query($malId: Int){Media(idMal:$malId){id}}", {malId: match[1]}).then(res => {
          if (res.errors) {
            console.log(JSON.stringify(res.errors));
            return;
          }
      
          return res.data.Media.id;
        });
      }
}
async function query (query, variables) {
	return fetch("https://graphql.anilist.co", {
	  method: "POST",
	  headers: {
		"Content-Type": "application/json",
		"Accept": "application/json"
	  },
	  body: JSON.stringify({
		query,
		variables
	  })
	}).then(res => res.json());
  }