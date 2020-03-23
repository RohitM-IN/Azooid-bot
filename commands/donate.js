const {
	stripIndents
} = require('common-tags');

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
	return message.channel.send(stripIndents `
	Contribute to development!
	<https://www.paypal.me/ethicalhacker58>
	`);
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['paypal'],
	permLevel: "User"
};

exports.help = {
	name: 'donate',
	category: "Miscellaneous",
	description: 'Responds with the bot\'s donation links.',
	usage: "donate"
};