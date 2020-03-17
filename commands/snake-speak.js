exports.run = async(client ,message ,args) => {
		let text = args.join(" ")
		if (!text) return message.channel.send(`What text would you like to convert to sssssnake ssssspeak?`)
		
		return message.channel.send(text.replace(/s/gi, 'sssss'));
	}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['snek-speak'],
	permLevel: "User"
  };

  exports.help = {
	name: 'snake-speak',
	description: 'Convertsssss text to sssssnake ssssspeak.',
	category: "text-edit",
	usage: "youtube <query>",
  };