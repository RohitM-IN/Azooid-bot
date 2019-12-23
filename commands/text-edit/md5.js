
const { hash } = require('../../util/Util');

module.exports ={
	
			name: 'md5',
			group: 'text-edit',
			memberName: 'md5',
			description: 'Creates a hash of text with the MD5 algorithm.',
			args: [
				{
					key: 'text',
					prompt: 'What text would you like to create an MD5 hash of?',
					type: 'string'
				}
			],


	run(client ,message ,args) {
		let text = args.join(" ")
		if (!text) return message.channel.send(`What text would you like to create an MD5 hash of?`)
		
		return message.channel.send(hash(text, 'md5'));
	}
};
