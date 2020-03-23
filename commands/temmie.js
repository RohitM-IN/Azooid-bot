const {
	wordTrans
} = require('custom-translate');
const dictionary = require('../assets/json/temmie');

exports.run = async (client, message, args) => {
	let text = args.join(" ")
	if (!text) return message.channel.send(`What text would you like to convert to Temmie speak?`)

	return message.channel.send(temmize(text));

	function temmize(text) {
		return wordTrans(text, dictionary)
			.replace(/ing/gi, 'in')
			.replace(/!/g, '!!!!111!1!')
			.replace(/'/g, '');
	}
}


exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['temmie-speak'],
	permLevel: "User"
};

exports.help = {
	name: 'temmie',
	description: 'Converts text to Temmie speak.',
	category: "text-edit",
	usage: "temmie <text>",
};