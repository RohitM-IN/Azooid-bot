
exports.run = async(client ,message ,args) => {
		let query = args.join("%20")
		if (!query) return message.channel.send(`What would you like the link to search for?`)
		
		return message.channel.send(`http://lmgtfy.com/?iie=1&q=${query}`);
	}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['let-me-google-that-for-you','go-google','lmgtfy'],
	permLevel: "User"
  };

  exports.help = {
	name: 'googleit',
	description: 'Creates a LMGTFY link with the query you provide.',
	category: "text-edit",
	usage: "googleit <query>",
  };