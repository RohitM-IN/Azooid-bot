exports.run = async (client, message, args) => {
	let text = args.join(" ")
	if (!text) return message.channel.send(`What text would you like to reverse?`)

	return message.channel.send(text.split('').reverse().join(''));
}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: "User"
};

exports.help = {
	name: 'reverse',
	description: 'Reverses text.',
	category: "text-edit",
	usage: "reverse <text>",
};