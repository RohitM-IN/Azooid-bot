const {
	letterTrans
} = require('custom-translate');
const dictionary = require('../assets/json/tebahpla');

exports.run = async (client, message, args) => {
	let text = args.join(" ")
	if (!text) return message.channel.send(`What text would you like to reverse the alphabet of?`)

	return message.channel.send(letterTrans(text, dictionary));
}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['reverse-alphabet', 'alphabet-reverse'],
	permLevel: "User"
};

exports.help = {
	name: 'tebahpla',
	description: 'Reverses the alphabet of text.',
	category: "text-edit",
	usage: "youtube <text>",
};