

module.exports = {

			name: 'clap',
			aliases: ['clapping'],
			group: 'text-edit',
			memberName: 'clap',
			description: 'Sends 👏 text 👏 like 👏 this.',
			args: [
				{
					key: 'text',
					prompt: 'What 👏 text 👏 would 👏 you 👏 like 👏 to 👏 convert?',
					type: 'string',
					validate: text => {
						if (text.replace(/ /g, ' 👏 ').length < 2000) return true;
						return 'Invalid text, your text is too long.';
					}
				}
			],


	run(client ,message ,args) {
		let text = args.join(" ")
		if (!text) return message.channel.send(`What👏text👏would👏you👏like👏to👏convert?`)
		
		return message.channel.send(text.replace(/ /g, ' 👏 '));
	}
};
