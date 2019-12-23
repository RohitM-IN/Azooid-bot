
const { hash } = require('../../util/Util');

module.exports =  {

			name: 'sha-256',
			group: 'text-edit',
			memberName: 'sha-256',
			description: 'Creates a hash of text with the SHA-256 algorithm.',
			args: [
				{
					key: 'text',
					prompt: 'What text would you like to create an SHA-256 hash of?',
					type: 'string'
				}
			],

        run(client ,message ,args) {
		let text = args.join(" ")
		if (!text) return message.channel.send(`What text would you like to create an SHA-256 hash of?`)
		
		return message.channel.send(hash(text, 'sha256'));
	}
};
