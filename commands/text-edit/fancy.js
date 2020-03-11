
const { letterTrans } = require('custom-translate');
const dictionary = require('../../assets/json/fancy');

module.exports = {

			name: 'fancy',
			group: 'text-edit',
			memberName: 'fancy',
			description: 'Converts text to fancy letters.',
			args: [
				{
					key: 'text',
					prompt: 'What text would you like to convert to fancy letters?',
					type: 'string',
					validate: text => {
						if (letterTrans(text, dictionary).length < 2000) return true;
						return 'Invalid text, your text is too long.';
					}
				}
			],


	run(client ,message ,args) {
		let text = args.join(" ")
	if (!text) return message.channel.send(`What text would you like to convert to fancy letters?`)
		
		return message.channel.send(letterTrans(text, dictionary));
	}
};
