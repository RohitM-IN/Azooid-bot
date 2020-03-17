

exports.run = async(client ,message ,args) => {
		let text = args.join(" ")
	if (!text) return message.channel.send(`What message would you like to unspoiler?`)
		
		return message.channel.send(text.replace(/\|\|([^|]+)\|\|/g, '$1'));
	}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: "User"
  };

  exports.help = {
	name: 'unspoiler',
	description: 'Removes all spoilers from a message.',
	category: "text-edit",
	usage: "unspoiler <message>",
  };