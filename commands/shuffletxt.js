
const { shuffle } = require('../util/Util');

exports.run = async(client ,message ,args) => {
		let text = args.join(" ")
		if (!text) return message.channel.send(`What text would you like to shuffle?`)
		
		return message.channel.send(shuffle(text.split('')).join(''));
	}
exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: "User"
  };

  exports.help = {
	name: 'shuffletxt',
	description: 'Shuffles text.',
	category: "text-edit",
	usage: "youtube <query>",
  };