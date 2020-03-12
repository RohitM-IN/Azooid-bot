
const { wordTrans } = require('custom-translate');
const dictionary = require('../../assets/json/pirate');

module.exports = {

	name: 'pirate',
	aliases: ['pirate-speak'],
	group: 'text-edit',
	memberName: 'pirate',
	description: 'Converts text to pirate.',
	clientPermissions: ["SEND_MESSAGES"],
	userPermissions:["VIEW_CHANNEL"],
	args: [
		{
			key: 'text',
			prompt: 'What text would you like to convert to pirate?',
			type: 'string',
			validate: text => {
				if (wordTrans(text, dictionary).length < 2000) return true;
				return 'Invalid text, your text is too long.';
			}
		}
	],
	run(client ,message ,args) {
		let text = args.join(" ")
		if (!text) return message.channel.send(`What text would you like to convert to pirate?`)
		
		return message.channel.send(wordTrans(text, dictionary));
	}
};
