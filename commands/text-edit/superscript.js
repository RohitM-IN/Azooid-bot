
const { letterTrans } = require('custom-translate');
const dictionary = require('../../assets/json/superscript');

module.exports =  {

			name: 'superscript',
			aliases: ['tiny-text', 'small-text'],
			group: 'text-edit',
			memberName: 'superscript',
			description: 'Converts text to tiny text.',
			args: [
				{
					key: 'text',
					prompt: 'What text would you like to convert to tiny text?',
					type: 'string'
				}
			],
	

	run(client ,message ,args) {
		let text = args.join(" ")
		if (!text) return message.channel.send(`What text would you like to convert to tiny text?`)
		
		return message.channel.send(letterTrans(text, dictionary));
	}
};
