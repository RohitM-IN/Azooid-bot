
const { letterTrans } = require('custom-translate');
const dictionary = require('../../assets/json/emojify');

module.exports = {

			name: 'emojify',
			aliases: ['regional-indicator'],
			group: 'text-edit',
			memberName: 'emojify',
			description: 'Converts text to emoji form.',
			args: [
				{
					key: 'text',
					prompt: 'What text would you like to convert to emoji?',
					type: 'string',
					validate: text => {
						if (letterTrans(text.toLowerCase(), dictionary, ' ').length < 2000) return true;
						return 'Invalid text, your text is too long.';
					},
					parse: text => text.toLowerCase()
				}
			],


	run(client ,message ,args) {
		let text = args.join(" ")
	if (!text) return message.channel.send(`What text would you like to convert to emoji?`)
		
		return message.channel.send(letterTrans(text, dictionary, ' '));
	}
};
