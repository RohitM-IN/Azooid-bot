const {
	letterTrans
} = require('custom-translate');
const dictionary = require('../assets/json/fancy');

exports.run = async (client, message, args) => {
	let text = args.join(" ")
	if (!text) return message.channel.send(`What text would you like to convert to fancy letters?`)

	return message.channel.send(letterTrans(text, dictionary));
}
exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: "User"
};

exports.help = {
	name: 'fancy',
	description: 'Converts text to fancy letters.',
	category: "text-edit",
	usage: "fancy <text>",
};