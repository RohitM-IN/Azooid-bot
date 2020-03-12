

module.exports = {
	
	name: 'lowercase',
	aliases: ['to-lowercase'],
	group: 'text-edit',
	memberName: 'lowercase',
	description: 'Converts text to lowercase.',
	clientPermissions: ["SEND_MESSAGES"],
	userPermissions:["VIEW_CHANNEL"],
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
