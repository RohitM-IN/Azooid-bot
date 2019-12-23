
const { letterTrans } = require('custom-translate');
const dictionary = require('../../assets/json/upside-down');

module.exports = {
	
			name: 'upside-down',
			aliases: ['u-down'],
			group: 'text-edit',
			memberName: 'upside-down',
			description: 'Flips text upside-down.',
			args: [
				{
					key: 'text',
					prompt: 'What text would you like to flip upside-down?',
					type: 'string'
				}
			],


	run(client ,message ,args) {
		let text = args.join(" ")
		if (!text) return message.channel.send(`What text would you like to flip upside-down?`)
		
		return message.channel.send(letterTrans(text, dictionary).split('').reverse().join(''));
	}
};
