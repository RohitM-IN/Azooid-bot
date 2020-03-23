const request = require('node-superfetch');
const {
	hash
} = require('../util/Util');

exports.run = async (client, message, args) => {
	let email = args.join(" ")
	if (!email) return message.channel.send(`What email do you want to get the Gravatar for?`)

	const emailHash = hash(email, 'md5');
	try {
		const {
			body
		} = await request
			.get(`https://www.gravatar.com/avatar/${emailHash}`)
			.query({
				size: 500,
				default: 404,
				rating: message.channel.nsfw ? 'r' : 'pg'
			});
		return message.channel.send({
			files: [{
				attachment: body,
				name: `${emailHash}.jpg`
			}]
		});
	} catch (err) {
		if (err.status === 404) return message.channel.send('Could not find any results.');
		return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
	}
}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: "User"
};

exports.help = {
	name: 'gravatar',
	category: "search",
	description: 'Responds with the Gravatar for an email.',
	usage: "gravatar <email>",
};