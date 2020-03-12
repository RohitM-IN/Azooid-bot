const request = require('node-superfetch');
const { RichEmbed } = require('discord.js');
const { shorten } = require('../../util/Util');
const  GOV_KEY = require('../../auth.json').api.apod;

module.exports = {
			name: 'apod',
			aliases: ['astronomy-picture-of-the-day'],
			group: 'events',
			clientPermissions: ["EMBED_LINKS","SEND_MESSAGES"],
			userPermissions:["VIEW_CHANNEL"],
			description: 'Responds with today\'s Astronomy Picture of the Day.',
            run: async (client, message, args) => {
		try {
			const { body } = await request
				.get('https://api.nasa.gov/planetary/apod')
				.query({ api_key: GOV_KEY });
			const embed = new RichEmbed()
				.setTitle(body.title)
				.setDescription(shorten(body.explanation))
				.setColor(0x2E528E)
				.setAuthor(
					'Astronomy Picture of the Day',
					'https://i.imgur.com/Wh8jY9c.png',
					'https://apod.nasa.gov/apod/astropix.html'
				)
				.setImage(body.media_type === 'image' ? body.url : null)
				.setURL(body.url)
				.setFooter(`Image Credits: ${body.copyright ? body.copyright.replace(/\n/g, '/') : 'Public Domain'}`)
				.setTimestamp();
			return message.channel.send(embed);
		} catch (err) {
			return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};