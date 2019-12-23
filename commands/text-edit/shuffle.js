
const { shuffle } = require('../../util/Util');

module.exports =  {

			name: 'shuffle',
			group: 'text-edit',
			memberName: 'shuffle',
			description: 'Shuffles text.',
			args: [
				{
					key: 'text',
					prompt: 'What text would you like to shuffle?',
					type: 'string'
				}
			],


    run(client ,message ,args) {
		let text = args.join(" ")
		if (!text) return message.channel.send(`What text would you like to shuffle?`)
		
		return message.channel.send(shuffle(text.split('')).join(''));
	}
};
