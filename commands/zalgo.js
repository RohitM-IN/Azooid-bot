const zalgo = require('../assets/json/zalgo');

exports.run = async (client, message, args) => {
	let text = args.join(" ")
	if (!text) return message.channel.send(`What text would you like to convert to zalgo?`)

	let result = '';
	for (let i = 0; i < text.length; i++) {
		result += text[i];
		for (const chars of Object.values(zalgo)) {
			let count = Math.floor(Math.random() * 5);
			while (count--) result += chars[Math.floor(Math.random() * chars.length)];
		}
	}
	return message.channel.send(result);
}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: "User"
};

exports.help = {
	name: 'zalgo',
	description: 'Converts text to zalgo.',
	category: "text-edit",
	usage: "zalgo <text>",
};