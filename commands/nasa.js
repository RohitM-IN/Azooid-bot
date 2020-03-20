
const request = require('node-superfetch');
const { MessageEmbed } = require('discord.js');
const { shorten } = require('../util/Util');

exports.run = async (client ,message ,args) => {
				let query = args.join(" ");
		if (!query) return message.channel.send(`What image would you like to search for?`)
				
                
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
			const embed = new MessageEmbed()
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

	
exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: "User"
  };

  exports.help = {
	name: 'nasa',
	category: "search",
	description: 'Searches NASA\'s image archive for your query.',
	usage: "nasa <query>",
  };