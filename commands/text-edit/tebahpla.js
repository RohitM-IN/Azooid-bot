
const { letterTrans } = require('custom-translate');
const dictionary = require('../../assets/json/tebahpla');

module.exports =  {

	name: 'tebahpla',
	aliases: ['reverse-alphabet', 'alphabet-reverse'],
	group: 'text-edit',
	memberName: 'tebahpla',
	description: 'Reverses the alphabet of text.',
	clientPermissions: ["SEND_MESSAGES"],
	userPermissions:["VIEW_CHANNEL"],
	args: [
		{
			key: 'text',
			prompt: 'What text would you like to reverse the alphabet of?',
			type: 'string'
		}
	],

	run(client ,message ,args) {
		let text = args.join(" ")
		if (!text) return message.channel.send(`What text would you like to reverse the alphabet of?`)
		
		return message.channel.send(letterTrans(text, dictionary));
	}
};
