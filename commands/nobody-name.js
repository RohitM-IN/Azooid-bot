const {
	shuffle,
	firstUpperCase
} = require('../util/Util');

exports.run = async (client, message, args) => {
	let text = args.join(" ")
	if (!text) return message.channel.send(`What name would you like to convert?`)

	const letters = text.split('');
	letters.push('x');
	const shuffled = shuffle(letters);
	return message.channel.send(firstUpperCase(shuffled.join('')));
}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['organization-name', 'org-name', 'organization-xiii-name'],
	permLevel: "User"
};

exports.help = {
	name: 'nobody-name',
	description: 'Converts a name into the Organization XIII style.',
	category: "text-edit",
	usage: "nobody-name <text>",
};