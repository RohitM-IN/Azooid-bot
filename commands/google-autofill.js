const request = require('node-superfetch');

exports.run = async (client, message, args) => {
	let query = args.join(" ")
	if (!query) return message.channel.send(`What would you like to search for?`)

	try {
		const {
			text
		} = await request
			.get('https://suggestqueries.google.com/complete/search')
			.query({
				client: 'firefox',
				q: query
			});
		const data = JSON.parse(text)[1];
		if (!data.length) return message.channel.send('Could not find any results.');
		return message.channel.send(data.join('\n'));
	} catch (err) {
		return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
	}
}
exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['google-autocomplete', 'autofill', 'autocomplete'],
	permLevel: "User"
};

exports.help = {
	name: 'google-autofill',
	category: "search",
	description: 'Responds with a list of the Google Autofill results for a particular query.',
	usage: "autofill <query>",
};