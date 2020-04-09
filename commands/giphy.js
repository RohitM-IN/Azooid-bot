const request = require('node-superfetch');
const GIPHY_KEY = require('../auth.json').api.giphy_key;

exports.run = async (client, message, args) => {
	let query = args.join(" ")
	if (!query) return message.channel.send(`What GIF would you like to search for?`)
	if (!message.channel.nsfw) return message.reply("🔞 Cannot display NSFW content in a SFW channel.");
	try {
		const {
			body
		} = await request
			.get('http://api.giphy.com/v1/gifs/search')
			.query({
				q: query,
				api_key: GIPHY_KEY,
				rating: message.channel.nsfw ? 'r' : 'pg'
			});
		if (!body.data.length) return message.channel.send('Could not find any results.');
		return message.channel.send(body.data[Math.floor(Math.random() * body.data.length)].images.original.url);
	} catch (err) {
		return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
	}
}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['gif'],
	permLevel: "User"
};

exports.help = {
	name: 'giphy',
	category: "search",
	description: 'Searches Giphy for your query.',
	usage: "giphy <query>",
};