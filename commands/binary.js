exports.run = async (client, message, args) => {

	let text = args.join(" ")
	if (!text) return message.channel.send(`What text would you like to convert to binary?`)
	text = binary(text)
	if (text.length > 1900) return message.channel.send("Text too long to send")
	return message.channel.send(text);

	function binary(text) {
		return text.split('').map(str => {
			const converted = str.charCodeAt(0).toString(2);
			return converted.padStart(8, '0');
		}).join(' ');
	}


}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: "User"
};

exports.help = {
	name: 'binary',
	description: 'Converts text to binary.',
	category: "text-edit",
	usage: "binary <text>",
};