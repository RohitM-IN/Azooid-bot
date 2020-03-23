exports.run = async (client, message, args) => {
	let text = args.join(" 👏 ");
	if (!text) return message.channel.send(`What👏text👏would👏you👏like👏to👏convert?`);
	if (text.length > 1900) return message.channel.send("Text too long to send");
	return message.channel.send(text);
}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['clapping'],
	permLevel: "User"
};

exports.help = {
	name: 'clap',
	description: 'Sends 👏 text 👏 like 👏 this.',
	category: "text-edit",
	usage: "clap <text>",
};