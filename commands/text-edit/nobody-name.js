
const { shuffle, firstUpperCase } = require('../../util/Util');

module.exports ={

			name: 'nobody-name',
			aliases: ['organization-name', 'org-name', 'organization-xiii-name'],
			group: 'text-edit',
			memberName: 'nobody-name',
			description: 'Converts a name into the Organization XIII style.',

			args: [
				{
					key: 'text',
					prompt: 'What name would you like to convert?',
					type: 'string',
					max: 1950,
					parse: text => text.toLowerCase()
				}
			],


        run(client ,message ,args) {
		let text = args.join(" ")
		if (!text) return message.channel.send(`What name would you like to convert?`)
		
		const letters = text.split('');
		letters.push('x');
		const shuffled = shuffle(letters);
		return message.channel.send(firstUpperCase(shuffled.join('')));
	}
};
