exports.run = async(client ,message ,args) => {
		let text = args.join(" ")
		if (!text) return message.channel.send(`What text would you like to convert to uppercase?`)

		return message.channel.send(text.toUpperCase());
	}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['to-uppercase', 'all-caps', 'caps'],
	permLevel: "User"
  };

  exports.help = {
	name: 'uppercase',
	description: 'Converts text to uppercase.',
	category: "text-edit",
	usage: "youtube <query>",
  };