

module.exports = {

	name: 'unspoiler',
	group: 'text-edit',
	memberName: 'unspoiler',
	description: 'Removes all spoilers from a message.',
	clientPermissions: ["SEND_MESSAGES"],
	userPermissions:["VIEW_CHANNEL"],
	args: [
		{
			key: 'message',
			prompt: 'What message would you like to unspoiler?',
			type: 'message'
		}
	],
	run(client ,message ,args) {
		let text = args.join(" ")
	if (!text) return message.channel.send(`What message would you like to unspoiler?`)
		
		return message.channel.send(text.replace(/\|\|([^|]+)\|\|/g, '$1'));
	}
};
