exports.run = async (client, message, args) => {
	let section = args[0]
	let query = args.slice(1).join(" ")
	if (!query) return message.channel.send(`What would you like the link to display as?`)
	if (!section) return message.channel.send(`What section of the news should the link display?`)


	return message.channel.send(`http://www.latlmes.com/${section}/${query}-1`);
}
exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: "User"
};

exports.help = {
	name: 'latlmes',
	description: 'Creates a Latlmes fake News link that redirects to a rickroll.',
	category: "text-edit",
	usage: "latlmes <section> <query>",
};