

module.exports ={

			name: 'spoiler-letter',
			aliases: ['spoiler'],
			group: 'text-edit',
			memberName: 'spoiler-letter',
			description: 'Sends text with each and every character as an individual spoiler.',
			args: [
				{
					key: 'text',
					prompt: 'What text would you like to convert?',
					type: 'string',
					validate: text => {
						if (`||${text.split('').join('||||')}||`.length < 2000) return true;
						return 'Invalid text, your text is too long.';
					}
				}
			],


        run(client ,message ,args) {
			let text = args.join(" ")
		if (!text) return message.channel.send(`What text would you like to convert?`)
			
		return message.channel.send(`||${text.split('').join('||||')}||`);
	}
};
