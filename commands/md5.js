
const { hash } = require('../util/Util');

exports.run = async(client ,message ,args) => {
		let text = args.join(" ")
		if (!text) return message.channel.send(`What text would you like to create an MD5 hash of?`)
		
		return message.channel.send(hash(text, 'md5'));
	}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: "User"
  };

  exports.help = {
	name: 'md5',
	description: 'Creates a hash of text with the MD5 algorithm.',
	category: "text-edit",
	usage: "md5 <text>",
  };