
const moment = require('moment');
const { RichEmbed } = require('discord.js');
const request = require('node-superfetch');
const GOOGLE_KEY = require('../../auth.json').api.youtubev3;


module.exports =  {

			name: 'youtube',
			aliases: ['y-tube', 'u-tube', 'yt'],
			group: 'search',
			memberName: 'youtube',
			description: 'Searches YouTube for your query.',
			clientPermissions: ['EMBED_LINKS'],
			credit: [
				{
					name: 'YouTube Data API',
					url: 'https://developers.google.com/youtube/v3/'
				}
			],
			args: [
				{
					key: 'query',
					prompt: 'What video would you like to search for?',
					type: 'string'
				}
			],


	async run(client ,message ,args) {
		let query = args.join(" ")
		try {
			const { body } = await request
				.get('https://www.googleapis.com/youtube/v3/search')
				.query({
					part: 'snippet',
					type: 'video',
					maxResults: 1,
					q: query,
					key: GOOGLE_KEY
				});
			if (!body.items.length) return message.channel.send('Could not find any results.');
			const data = body.items[0];
			const embed = new RichEmbed()
				.setColor(0xDD2825)
				.setTitle(data.snippet.title)
				.setTimestamp()
				.setFooter(client.user.username)
				.setDescription(data.snippet.description)
				.setAuthor('YouTube', 'https://i.imgur.com/kKHJg9Q.png', 'https://www.youtube.com/')
				.setURL(`https://www.youtube.com/watch?v=${data.id.videoId}`)
				.setThumbnail(data.snippet.thumbnails.default ? data.snippet.thumbnails.default.url : null)
				.addField('❯ ID', data.id.videoId, true)
				.addField('❯ Publish Date', moment.utc(data.snippet.publishedAt).format('MM/DD/YYYY h:mm A'), true)
				.addField('❯ Channel', data.snippet.channelTitle, true);
			return message.channel.send(embed);
		} catch (err) {
			return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};
