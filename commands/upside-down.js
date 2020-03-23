const {
	letterTrans
} = require('custom-translate');
const dictionary = require('../assets/json/upside-down');

exports.run = async (client, message, args) => {
	let text = args.join(" ")
	if (!text) return message.channel.send(`What text would you like to flip upside-down?`)

	return message.channel.send(letterTrans(text, dictionary).split('').reverse().join(''));
}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['u-down'],
	permLevel: "User"
};

exports.help = {
	name: 'upside-down',
	description: 'Flips text upside-down.',
	category: "text-edit",
	usage: "upside-down <text>",
};