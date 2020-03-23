const {
	wordTrans
} = require('custom-translate');
const dictionary = require('../assets/json/pirate');

exports.run = async (client, message, args) => {
	let text = args.join(" ")
	if (!text) return message.channel.send(`What text would you like to convert to pirate?`)
	text = wordTrans(text, dictionary);
	if (text.length > 1900) return message.channel.send("Text too long for me to send")
	return message.channel.send(text);
}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['pirate-speak'],
	permLevel: "User"
};

exports.help = {
	name: 'pirate',
	description: 'Converts text to pirate.',
	category: "text-edit",
	usage: "pirate <text>",
};