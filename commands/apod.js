const request = require('node-superfetch');
const {
	MessageEmbed
} = require('discord.js');
const {
	shorten
} = require('../util/Util');
const GOV_KEY = require('../auth.json').api.apod;

exports.run = async (client, message, args) => {
	try {
		const {
			body
		} = await request
			.get('https://api.nasa.gov/planetary/apod')
			.query({
				api_key: GOV_KEY
			});
		const embed = new MessageEmbed()
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

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['astronomy-picture-of-the-day'],
	permLevel: "User"
};

exports.help = {
	name: 'apod',
	description: 'Responds with today\'s Astronomy Picture of the Day.',
	usage: "xkcd <search|latest> (id)",
	category: "Fun",
};