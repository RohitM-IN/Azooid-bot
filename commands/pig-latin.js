exports.run = async (client, message, args) => {
	let text = args.join(" ")
	if (!text) return message.channel.send(`What text would you like to convert to pig latin?`)

	return message.channel.send(pigLatin(text));

	function pigLatin(text) {
		return text.replace(/\w+/g, pigLatinWord).toLowerCase();
	}

	function pigLatinWord(word) {
		return `${word.slice(1)}${word.charAt(0)}ay`;
	}
}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: "User"
};

exports.help = {
	name: 'pig-latin',
	description: 'Converts text to pig latin.',
	category: "text-edit",
	usage: "pig-latin <text>",
};