exports.run = async (client, message, args) => {
	let amount = args[0]
	let text = args.slice(1).join(" ").repeat(amount).substr(0, 2000);
	if (!text) return message.channel.send(`What text would you like to repeat over and over and over and over?`)
	if (!args[0]) return message.channel.send(`How many times do you want to repeat your text?`)
	if (text.length > 1900) return message.channel.send("Text Too long for me to send")
	return message.channel.send(text);
}
exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: "User"
};

exports.help = {
	name: 'repeattxt',
	description: 'Repeat text over and over and over and over (etc).',
	category: "text-edit",
	usage: "repeattxt <amount> <text>",
};