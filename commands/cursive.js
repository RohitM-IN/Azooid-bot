const {
	letterTrans
} = require('custom-translate');
const dictionary = require('../assets/json/cursive');

exports.run = async (client, message, args) => {
	let text = args.join(" ")
	if (!text) return message.channel.send(`What text would you like to convert to cursive?`)

	return message.channel.send(letterTrans(text, dictionary));
}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: "User"
};

exports.help = {
	name: 'cursive',
	description: 'Converts text to cursive.',
	category: "text-edit",
	usage: "youtube <query>",
};