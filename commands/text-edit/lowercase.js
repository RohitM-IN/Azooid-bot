

module.exports = {
	
			name: 'lowercase',
			aliases: ['to-lowercase'],
			group: 'text-edit',
			memberName: 'lowercase',
			description: 'Converts text to lowercase.',
			args: [
				{
					key: 'text',
					prompt: 'What text would you like to convert to lowercase?',
					type: 'string'
				}
			],

	run(client ,message ,args) {
		let text = args.join(" ")
		if (!text) return message.channel.send(`What text would you like to convert to lowercase?`)
		
		return message.channel.send(text.toLowerCase());
	}
};
