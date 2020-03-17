exports.run = async(client ,message ,args) => {
		let text = args.join(" ")
		if (!text) return message.channel.send(`What text would you like to convert to lowercase?`)
		if (text.length > 1900) return message.channel.send('Texxt too long for me to send')
		return message.channel.send(text.toLowerCase());
	}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['to-lowercase'],
	permLevel: "User"
  };

  exports.help = {
	name: 'lowercase',
	description: 'Converts text to lowercase.',
	category: "text-edit",
	usage: "lowercase <text>",
  };