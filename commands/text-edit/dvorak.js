
const { letterTrans } = require('custom-translate');
const dictionary = require('../../assets/json/dvorak');

module.exports =  {

			name: 'dvorak',
			group: 'text-edit',
			memberName: 'dvorak',
			description: 'Converts text to Dvorak encoding.',
			args: [
				{
					key: 'text',
					prompt: 'What text would you like to convert to Dvorak encoding?',
					type: 'string',
					validate: text => {
						if (letterTrans(text, dictionary).length < 2000) return true;
						return 'Invalid text, your text is too long.';
					}
				}
			],

	run(client ,message ,args) {
		let text = args.join(" ")
		if (!text) return message.channel.send(`What text would you like to convert to Dvorak encoding?`)
		
		return message.channel.send(letterTrans(text, dictionary));
	}
};
