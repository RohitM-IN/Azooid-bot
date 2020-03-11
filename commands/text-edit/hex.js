

module.exports = {

			name: 'hex',
			aliases: ['hexidecimal'],
			group: 'text-edit',
			memberName: 'hex',
			description: 'Converts text to hex.',
			args: [
				{
					key: 'text',
					prompt: 'What text would you like to convert to hex?',
					type: 'string',
					validate: text => {
						if (Buffer.from(text).toString('hex').length < 2000) return true;
						return 'Invalid text, your text is too long.';
					}
				}
			],


	run(client ,message ,args) {
		let text = args.join(" ")
		if (!text) return message.channel.send(`What text would you like to convert to hex?`)
		
		return message.channel.send(Buffer.from(text).toString('hex'));
	}
};
