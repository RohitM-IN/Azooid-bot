const {MessageEmbed} = require('discord.js');
const request = require('node-superfetch');
const {shorten,formatNumber} = require('../util/Util');
const GOOGLE_KEY = require('../auth.json').api.google;

exports.run = async (client, message, args) => {
		let query = args.join(" ");
		if (!query) return message.channel.send(`Enter a book name!!`)
		try {
			const {
				body
			} = await request
				.get('https://www.googleapis.com/books/v1/volumes')
				.query({
					apiKey: GOOGLE_KEY,
					q: query,
					maxResults: 1,
					printType: 'books'
				});
			if (!body.items) return message.channel.send('Could not find any results.');
			const data = body.items[0].volumeInfo;
			const embed = new MessageEmbed()
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


exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['google-book', 'google-books'],
	permLevel: "User"
  };

  exports.help = {
	name: 'book',
	category: "search",
	description: 'Searches Google Books for a book.',
	usage: "book <query>",
  };
