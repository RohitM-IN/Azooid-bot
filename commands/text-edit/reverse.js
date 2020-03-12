

module.exports =  {

	name: 'reverse',
	group: 'text-edit',
	memberName: 'reverse',
	description: 'Reverses text.',
	clientPermissions: ["SEND_MESSAGES"],
	userPermissions:["VIEW_CHANNEL"],
	args: [
		{
			key: 'text',
			prompt: 'What text would you like to reverse?',
			type: 'string'
		}
	],


    run(client ,message ,args) {
		let text = args.join(" ")
		if (!text) return message.channel.send(`What text would you like to reverse?`)
		
		return message.channel.send(text.split('').reverse().join(''));
	}
};
