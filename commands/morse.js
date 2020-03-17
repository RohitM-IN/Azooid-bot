
const { letterTrans } = require('custom-translate');
const dictionary = require('../assets/json/morse');

exports.run = async(client ,message ,args) => {
		let text = args.join(" ")
		if (!text) return message.channel.send(`What text would you like to convert to morse?`)
				
		return message.channel.send(letterTrans(text, dictionary, ' '));
	}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['morse-code'],
	permLevel: "User"
  };

  exports.help = {
	name: 'morse',
	description: 'Converts text to morse code.',
	category: "text-edit",
	usage: "youtube <query>",
  };