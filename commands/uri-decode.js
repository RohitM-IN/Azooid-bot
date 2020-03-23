exports.run = async (client, message, args) => {
	let text = args.join(" ")
	if (!text) return message.channel.send(`What text would you like to decode?`)

	return message.channel.send(decodeURIComponent(text));
}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['decode-url', 'decode-uri', 'uri-decode', 'decode-uri-component'],
	permLevel: "User"
};

exports.help = {
	name: 'url-decode',
	description: 'Decodes URL characters to regular characters.',
	category: "text-edit",
	usage: "url-decode <text>",
};