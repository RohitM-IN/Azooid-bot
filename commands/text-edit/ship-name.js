
module.exports = {

	name: 'ship-name',
	group: 'text-edit',
	memberName: 'ship-name',
	description: 'Creates a ship name from two names.',
	clientPermissions: ["SEND_MESSAGES"],
	userPermissions:["VIEW_CHANNEL"],
	args: [
		{
			key: 'start',
			label: 'start name',
			prompt: 'What name should be at the start of the ship name?',
			type: 'string',
			max: 500,
			parse: start => start.toLowerCase()
		},
		{
			key: 'end',
			label: 'end name',
			prompt: 'What name should be at the end of the ship name?',
			type: 'string',
			max: 500,
			parse: end => end.toLowerCase()
		}
	],


	run(client ,message ,args) {
        let start = args[0]
		let end = args[1]
		if (!args[0] || !args[1]) return message.channel.send(`What name should be at the start name and end name of the ship?`)
		
        if(args[3]) return message.channel.send("please enter a 2 word name");
		return message.channel.send(`${start.slice(0, Math.floor(start.length / 2))}${end.slice(Math.floor(end.length / 2))}`);
	}
};
