
const { letterTrans } = require('custom-translate');
const dictionary = require('../assets/json/emojify');

exports.run = async(client ,message ,args) => {
		let text = args.join(" ")
	if (!text) return message.channel.send(`What text would you like to convert to emoji?`)
		
		return message.channel.send(letterTrans(text, dictionary, ' '));
	}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['regional-indicator'],
	permLevel: "User"
  };

  exports.help = {
	name: 'emojify',
	description: 'Converts text to emoji form.',
	category: "text-edit",
	usage: "emojify <text>",
  };