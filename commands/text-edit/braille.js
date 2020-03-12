
const { letterTrans } = require('custom-translate');
const dictionary = require('../../assets/json/braille');

module.exports =  {

	name: 'braille',
	group: 'text-edit',
	memberName: 'braille',
	description: 'Converts text to braille.',
	clientPermissions: ["SEND_MESSAGES"],
	userPermissions:["VIEW_CHANNEL"],
	args: [
		{
			key: 'text',
			prompt: 'What text would you like to convert to braille?',
			type: 'string',
			validate: text => {
				if (letterTrans(text, dictionary).length < 2000) return true;
				return 'Invalid text, your text is too long.';
			}
		}
	],
	run(client ,message ,args) {
		let text = args.join(" ")
		if (!text) return message.channel.send(`What text would you like to convert to braille?`)
		
		return message.channel.send(letterTrans(text, dictionary));
	}
};
