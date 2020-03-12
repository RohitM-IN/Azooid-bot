

module.exports =  {

	name: 'lmgtfy',
	aliases: ['let-me-google-that-for-you'],
	group: 'text-edit',
	memberName: 'lmgtfy',
	description: 'Creates a LMGTFY link with the query you provide.',
	clientPermissions: ["SEND_MESSAGES"],
	userPermissions:["VIEW_CHANNEL"],
	args: [
		{
			key: 'query',
			prompt: 'What would you like the link to search for?',
			type: 'string',
			validate: query => {
				if (encodeURIComponent(query).length < 1950) return true;
				return 'Invalid query, your query is too long.';
			},
			parse: query => encodeURIComponent(query)
		}
	],
	run(client ,message ,args) {
		let query = args.join("%20")
		if (!query) return message.channel.send(`What would you like the link to search for?`)
		
		return message.channel.send(`http://lmgtfy.com/?iie=1&q=${query}`);
	}
};
