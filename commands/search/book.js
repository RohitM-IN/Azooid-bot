
const { RichEmbed } = require('discord.js');
const request = require('node-superfetch');
const { shorten, formatNumber } = require('../../util/Util');
const  GOOGLE_KEY  = require('../../auth.json').api.google;

module.exports = {

			name: 'book',
			aliases: ['google-book', 'google-books'],
			group: 'search',
			memberName: 'book',
			description: 'Searches Google Books for a book.',
			clientPermissions: ['EMBED_LINKS'],

			args: [
				{
					key: 'query',
					prompt: 'What book would you like to search for?',
					type: 'string'
				}
			],


	async run(client, message, args) {
		let query = args.join(" ");
		if (!query) return message.channel.send(`Enter a book name!!`)
		try {
			const { body } = await request
				.get('https://www.googleapis.com/books/v1/volumes')
				.query({
					apiKey: GOOGLE_KEY,
					q: query,
					maxResults: 1,
					printType: 'books'
				});
			if (!body.items) return message.channel.send('Could not find any results.');
			const data = body.items[0].volumeInfo;
			const embed = new RichEmbed()
				.setColor(0x4285F4)
                .setTitle(data.title)
                .setTimestamp()
                .setFooter(client.user.username)
				.setURL(data.previewLink)
				.setAuthor('Google Books', 'https://i.imgur.com/N3oHABo.png', 'https://books.google.com/')
				.setDescription(data.description ? shorten(data.description) : 'No description available.')
				.setThumbnail(data.imageLinks ? data.imageLinks.thumbnail : null)
				.addField('❯ Authors', data.authors.length ? data.authors.join(', ') : '???')
				.addField('❯ Publish Date', data.publishedDate || '???', true)
				.addField('❯ Page Count', data.pageCount ? formatNumber(data.pageCount) : '???', true);
			return message.channel.send(embed);
		} catch (err) {
			return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};
