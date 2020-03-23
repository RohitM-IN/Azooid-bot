var dateFormat = require('dateformat');
const fs = require('fs')

module.exports = async (client, oldState, newState) => {
	//if(oldState == )
	let data = await fs.readFileSync("./data/json/serversettings.json", "utf8", function (err) {
		if (err) throw err;
	})
	data = JSON.parse(data)
	let logging = data['guilds'][oldState.guild.id || newState.guild.id]['log'];
	if (!logging) return;
	var log = newState.guild.channels.cache.find(ch => ch.name.includes('voice-log')) || newState.guild.channels.cache.find(ch => ch.name.includes('voicelog')) || newState.guild.channels.cache.find(ch => ch.name.includes('log')) || newState.guild.channels.cache.find(ch => ch.name.includes('general'));

	if (!log) return;
	let username = client.users.cache.get(oldState.id || newState.id).username;
	let oldVCID = oldState.channelID;
	let newVCID = newState.channelID;
	let day = dateFormat(new Date(), "dd-mm-yy hh:MM:ss");
	if (oldVCID == newVCID) return;

	let oldChannelName = (oldVCID != null && typeof oldVCID != undefined) ? newState.guild.channels.cache.get(oldVCID).name : null;
	let newChannelName = (newVCID != null && typeof newVCID != undefined) ? newState.guild.channels.cache.get(newVCID).name : null;

	if (oldChannelName === null)
		log.send(`:white_check_mark: [${day}] \`${username}\` joined voice channel \`${newChannelName}\` `);
	else if (newChannelName === null)
		log.send(`:small_red_triangle_down: [${day}] \`${username}\` left voice channel \`${oldChannelName}\``);
	else
		log.send(`:arrow_right: [${day}] \`${username}\` went from \`${oldChannelName}\` to \`${newChannelName}\` `);
}