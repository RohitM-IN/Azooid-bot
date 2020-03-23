const {
	letterTrans
} = require('custom-translate');
const dictionary = require('../assets/json/braille');

exports.run = async (client, message, args) => {
	let text = letterTrans(args.join(" "), dictionary)
	if (!text) return message.channel.send(`What text would you like to convert to braille?`);
	if (text.length > 1900) return message.channel.send("Text too long to send");
	return message.channel.send(text);
}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: "User"
};

exports.help = {
	name: 'braille',
	description: 'Converts text to braille.',
	category: "text-edit",
	usage: "braille <text>",
};