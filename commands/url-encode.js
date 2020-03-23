exports.run = async (client, message, args) => {
	let text = args.join(" ")
	if (!text) return message.channel.send(`What text would you like to encode?`)

	return message.channel.send(encodeURIComponent(text));
}
exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['encode-url', 'encode-uri', 'uri-encode', 'encode-uri-component'],
	permLevel: "User"
};

exports.help = {
	name: 'url-encode',
	description: 'Encodes text to URL-friendly characters.',
	category: "text-edit",
	usage: "url-encode <text>",
};