
const request = require('node-superfetch');
const  GIPHY_KEY  = require('../../auth.json').api.giphy_key;

module.exports ={

			name: 'giphy',
			aliases: ['gif'],
			group: 'search',
			memberName: 'giphy',
			description: 'Searches Giphy for your query.',
			args: [
				{
					key: 'query',
					prompt: 'What GIF would you like to search for?',
					type: 'string'
				}
			],

	async run(client ,message ,args) {
        let query = args.join(" ")
		try {
			const { body } = await request
				.get('http://api.giphy.com/v1/gifs/search')
				.query({
					q: query,
					api_key: GIPHY_KEY,
					rating: message.channel.nsfw ? 'r' : 'pg'
				});
			if (!body.data.length) return message.channel.send('Could not find any results.');
			return message.channel.send(body.data[Math.floor(Math.random() * body.data.length)].images.original.url);
		} catch (err) {
			return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};
