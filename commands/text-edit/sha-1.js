
const { hash } = require('../../util/Util');

module.exports =  {

	name: 'sha-1',
	group: 'text-edit',
	memberName: 'sha-1',
	description: 'Creates a hash of text with the SHA-1 algorithm.',
	clientPermissions: ["SEND_MESSAGES"],
	userPermissions:["VIEW_CHANNEL"],
	args: [
		{
			key: 'text',
			prompt: 'What text would you like to create an SHA-1 hash of?',
			type: 'string'
		}
	],
    run(client ,message ,args) {
		let text = args.join(" ")
		if (!text) return message.channel.send(`What text would you like to create an SHA-1 hash of?`)
		
		return message.channel.send(hash(text, 'sha1'));
	}
};
