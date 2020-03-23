exports.run = async (client, message, args) => {
	let text = args.join(" ")
	if (!text) return message.channel.send(`What text would you like to convert?`)

	return message.channel.send(`||${text.split('').join('||||')}||`);
}
exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['spoiler'],
	permLevel: "User"
};

exports.help = {
	name: 'spoiler-letter',
	description: 'Sends text with each and every character as an individual spoiler.',
	category: "text-edit",
	usage: "spoiler <text>",
};