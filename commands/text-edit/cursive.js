
const { letterTrans } = require('custom-translate');
const dictionary = require('../../assets/json/cursive');

module.exports =  {

			name: 'cursive',
			group: 'text-edit',
			memberName: 'cursive',
			description: 'Converts text to cursive.',
			args: [
				{
					key: 'text',
					prompt: 'What text would you like to convert to cursive?',
					type: 'string',
					validate: text => {
						if (letterTrans(text, dictionary).length < 2000) return true;
						return 'Invalid text, your text is too long.';
					}
				}
			],


	run(client ,message ,args) {
		let text = args.join(" ")
		if (!text) return message.channel.send(`What text would you like to convert to cursive?`)
		
		return message.channel.send(letterTrans(text, dictionary));
	}
};
