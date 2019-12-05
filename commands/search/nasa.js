
const request = require('node-superfetch');
const { RichEmbed } = require('discord.js');
const { shorten } = require('../../util/Util');

module.exports = {

			name: 'nasa',
			group: 'search',
			memberName: 'nasa',
			description: 'Searches NASA\'s image archive for your query.',
			clientPermissions: ['EMBED_LINKS'],
			args: [
				{
					key: 'query',
					prompt: 'What image would you like to search for?',
					type: 'string'
				}
			],


        async run(client, message, args) {
                let query = args.join(" ");
                
		try {
            function cleanHTML(text) {
                return text
                    .replace(/<\/?b>/g, '**')
                    .replace(/<\/?i>/g, '*')
                    .replace(/<a href="(https?:\/\/[^ ]+)" rel="nofollow">([^<>]+)<\/a>/g, '[$2]($1)');
            }
			const { body } = await request
				.get('https://images-api.nasa.gov/search')
				.query({
					q: query,
					media_type: 'image'
				});
			const images = body.collection.items;
			if (!images.length) return message.channel.send('Could not find any results.');
			const data = images[Math.floor(Math.random() * images.length)];
			const embed = new RichEmbed()
				.setTitle(shorten(data.data[0].title, 256))
				.setDescription(shorten(data.data[0].description).replace(/<\/?b>/g, '**').replace(/<\/?i>/g, '*').replace(/<a href="(https?:\/\/[^ ]+)" rel="nofollow">([^<>]+)<\/a>/g, '[$2]($1)'))
                .setColor(0x2E528E)
				.setAuthor('NASA', 'https://i.imgur.com/Wh8jY9c.png', 'https://www.nasa.gov/multimedia/imagegallery/index.html')
				.setImage(`https://images-assets.nasa.gov/image/${data.data[0].nasa_id}/${data.data[0].nasa_id}~thumb.jpg`)
				.setFooter(`${client.user.username} • Image Credits: ${data.data[0].center || 'Public Domain'}`)
				.setTimestamp(new Date(data.data[0].date_created));
			return message.channel.send(embed);
		} catch (err) {
			return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}

	
};
