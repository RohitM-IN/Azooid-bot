
const { wordTrans } = require('custom-translate');
const dictionary = require('../../assets/json/brony-speak');

module.exports =  {

	name: 'brony-speak',
	aliases: ['pony-speak'],
	group: 'text-edit',
	memberName: 'brony-speak',
	clientPermissions: ["SEND_MESSAGES"],
	userPermissions:["VIEW_CHANNEL"],
	description: 'Converts text to brony speak.',

	args: [
		{
			key: 'text',
			prompt: 'What text would you like to convert to brony speak?',
			type: 'string',
			validate: text => {
				if (wordTrans(text, dictionary).length < 2000) return true;
				return 'Invalid text, your text is too long.';
			}
		}
	],

	run(client ,message ,args) {
		let text = args.join(" ")
		if (!text) return message.channel.send(`What text would you like to convert to brony speak?`)
		
		return message.channel.send(wordTrans(text, dictionary));
	}
};
