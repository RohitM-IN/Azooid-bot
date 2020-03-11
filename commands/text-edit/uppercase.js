

module.exports =  {

			name: 'uppercase',
			aliases: ['to-uppercase', 'all-caps', 'caps'],
			group: 'text-edit',
			memberName: 'uppercase',
			description: 'Converts text to uppercase.',
			args: [
				{
					key: 'text',
					prompt: 'What text would you like to convert to uppercase?',
					type: 'string'
				}
			],


    run(client ,message ,args) {
		let text = args.join(" ")
		if (!text) return message.channel.send(`What text would you like to convert to uppercase?`)

		return message.channel.send(text.toUpperCase());
	}
};
