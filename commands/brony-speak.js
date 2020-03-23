const {
	wordTrans
} = require('custom-translate');
const dictionary = require('../assets/json/brony-speak');

exports.run = async (client, message, args) => {
	let text = wordTrans(args.join(" "), dictionary);
	if (!text) return message.channel.send(`What text would you like to convert to brony speak?`);
	if (text.length > 1900) return message.channel.send("Text too long to send");
	return message.channel.send(wordTrans(text));
}
exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['pony-speak'],
	permLevel: "User"
};

exports.help = {
	name: 'brony-speak',
	description: 'Converts text to brony speak.',
	category: "text-edit",
	usage: "brony-speak <text>",
};