

module.exports = {

			name: 'repeattxt',
			group: 'text-edit',
			memberName: 'repeat',
			description: 'Repeat text over and over and over and over (etc).',
			args: [
				{
					key: 'amount',
					prompt: 'How many times do you want to repeat your text?',
					type: 'integer',
					min: 1,
					max: 2000
				},
				{
					key: 'text',
					prompt: 'What text would you like to repeat over and over and over and over?',
					type: 'string',
					validate: text => {
						if (!text.includes('@everyone') && !text.includes('@here')) return true;
						return 'Invalid text, please do not repeat everyone or here mentions.';
					}
				}
			],


    run(client ,message ,args) {
        let amount = args[0]
		let text = args.slice(1).join(" ")
		if (!text) return message.channel.send(`What text would you like to repeat over and over and over and over?`)
		if (!args[0]) return message.channel.send(`How many times do you want to repeat your text?`)
		
		return message.channel.send(text.repeat(amount).substr(0, 2000));
	}
};
