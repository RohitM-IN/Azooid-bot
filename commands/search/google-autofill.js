
const request = require('node-superfetch');

module.exports =  {

			name: 'google-autofill',
			aliases: ['google-autocomplete', 'autofill', 'autocomplete'],
			group: 'search',
			memberName: 'google-autofill',
			description: 'Responds with a list of the Google Autofill results for a particular query.',
			args: [
				{
					key: 'query',
					prompt: 'What would you like to search for?',
					type: 'string'
				}
			],


	async run(client ,message ,args) {
        let query = args.join(" ")
		try {
			const { text } = await request
				.get('https://suggestqueries.google.com/complete/search')
				.query({
					client: 'firefox',
					q: query
				});
			const data = JSON.parse(text)[1];
			if (!data.length) return message.channel.send('Could not find any results.');
			return message.channel.send(data.join('\n'));
		} catch (err) {
			return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};
