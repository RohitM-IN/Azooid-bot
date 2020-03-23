const {
	base64
} = require('../util/Util');
const mode = ['encode', 'decode'];

exports.run = async (client, message, args) => {
	mode = args.join(" ");
	if (!mode) return message.channel.send(`What text would you like to convert to Base64?`);

	let text = args.slice(1).join(" ")
	const converted = base64(text, mode);
	if (!converted) return message.channel.send('That is not valid Base64.');
	if (converted.length > 1900) return message.channel.send("Text too long to send");

	return message.channel.send(converted);
}
exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: "User"
};

exports.help = {
	name: 'base64',
	description: 'Converts text to/from Base64.',
	category: "text-edit",
	usage: "base64 <mode> <text>",
};