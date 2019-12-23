
const moment = require('moment');
const { RichEmbed } = require('discord.js');
const request = require('node-superfetch');

module.exports = {

			name: 'itunes',
			group: 'search',
			memberName: 'itunes',
			description: 'Searches iTunes for your query.',
			details: '**Codes:** <https://en.wikipedia.org/wiki/List_of_ISO_639-2_codes>',
			clientPermissions: ['EMBED_LINKS'],
			usage:"itunes <country> <query>",
			example:"itunes IN thats what i like",

			args: [
				{
					key: 'country',
					prompt: 'What country code should results be obtained for?',
					type: 'string',
					parse: country => country.toLowerCase()
				},
				{
					key: 'query',
					prompt: 'What song would you like to search for?',
					type: 'string'
				}
			],

	async run(client ,message ,args) {
		let country = args[0];
		let query = args.slice(args[0]).join(" ");
		if (!query) return message.channel.send(`What song would you like to search for?`)
		if (!country) return message.channel.send(`usage: itunes <country> <query>`)

		try {
			const { text } = await request
				.get('https://itunes.apple.com/search')
				.query({
					term: query,
					media: 'music',
					entity: 'song',
					limit: 1,
					explicit: message.channel.nsfw ? 'yes' : 'no',
					country
				});
			const body = JSON.parse(text);
			if (!body.results.length) return message.channel.send('Could not find any results.');
			const data = body.results[0];
			const embed = new RichEmbed()
				.setColor(0xFEFEFE)
				.setAuthor('iTunes', 'https://i.imgur.com/PR29ow0.jpg', 'https://www.apple.com/itunes/')
				.setURL(data.trackViewUrl)
				.setThumbnail(data.artworkUrl100)
				.setTitle(data.trackName)
				.addField('❯ Artist', data.artistName, true)
				.addField('❯ Album', data.collectionName, true)
				.addField('❯ Release Date', moment.utc(data.releaseDate).format('MM/DD/YYYY'), true)
				.addField('❯ Genre', data.primaryGenreName, true);
			return message.channel.send(embed);
		} catch (err) {
			if (err.status === 400) {
				return message.channel.send('Invalid country code. Example if you live in India its IN or if you leave in United Nations its UN.\nRefer to <https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2>.');
			}
			return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};
