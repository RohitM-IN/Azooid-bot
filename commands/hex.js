exports.run = async(client ,message ,args) => {
		let text = args.join(" ")
		if (!text) return message.channel.send(`What text would you like to convert to hex?`)
		
		return message.channel.send(Buffer.from(text).toString('hex'));
	}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['hexidecimal'],
	permLevel: "User"
  };

  exports.help = {
	name: 'hex',
	description: 'Converts text to hex.',
	category: "text-edit",
	usage: "hex <text>",
  };