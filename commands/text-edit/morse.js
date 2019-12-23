
const { letterTrans } = require('custom-translate');
const dictionary = require('../../assets/json/morse');

module.exports ={

			name: 'morse',
			aliases: ['morse-code'],
			group: 'text-edit',
			memberName: 'morse',
			description: 'Converts text to morse code.',
			args: [
				{
					key: 'text',
					prompt: 'What text would you like to convert to morse?',
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
			if (!text) return message.channel.send(`What text would you like to convert to morse?`)
				
		return message.channel.send(letterTrans(text, dictionary, ' '));
	}
};
