exports.run = async (client, message, args) => {
	let text = args.join(" ")
	if (!text) return message.channel.send(`WHaT tEXt WoUlD yOu LiKE to COnvErt?`)

	const letters = text.split('');

	for (let i = 0; i < letters.length; i += Math.floor(Math.random() * 4)) {
		letters[i] = letters[i].toUpperCase();
	}
	return message.channel.send(`${letters.join('')} 😋`);

}




exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['mock'],
	permLevel: "User"
};

exports.help = {
	name: 'mocking',
	description: 'SenDs TexT lIkE ThiS.',
	category: "text-edit",
	usage: "mock <text>",
};