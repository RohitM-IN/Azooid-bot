const {
	hash
} = require('../util/Util');

exports.run = async (client, message, args) => {
	let text = args.join(" ")
	if (!text) return message.channel.send(`What text would you like to create an SHA-256 hash of?`)

	return message.channel.send(hash(text, 'sha256'));
}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: "User"
};

exports.help = {
	name: 'sha-256',
	description: 'Creates a hash of text with the SHA-256 algorithm.',
	category: "text-edit",
	usage: "sha-256 <text>",
};