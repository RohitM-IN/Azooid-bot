
const { letterTrans } = require('custom-translate');
const dictionary = require('../assets/json/superscript');

exports.run = async(client ,message ,args) => {
		let text = args.join(" ")
		if (!text) return message.channel.send(`What text would you like to convert to tiny text?`)
		
		return message.channel.send(letterTrans(text, dictionary));
	}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['tiny-text', 'small-text'],
	permLevel: "User"
  };

  exports.help = {
	name: 'superscript',
	description: 'Converts text to tiny text.',
	category: "text-edit",
	usage: "superscript <text>",
  };