
const moment = require('moment');
const { RichEmbed } = require('discord.js');
const request = require('node-superfetch');
const { formatNumber } = require('../../util/Util');
const  STACKOVERFLOW_KEY  = require('../../auth.json').api.stackoverflow;

module.exports =  {

			name: 'stack-overflow',
			group: 'search',
			memberName: 'stack-overflow',
			description: 'Searches Stack Overflow for your query.',
			clientPermissions: ['EMBED_LINKS'],
			credit: [
				{
					name: 'Stack Exchange API',
					url: 'https://api.stackexchange.com/docs'
				}
			],
			args: [
				{
					key: 'query',
					prompt: 'What question would you like to search for?',
					type: 'string'
				}
			],


	async run(client ,message, args) {
		let query = args.join(" ")
		if (!query) return message.channel.send(`What question would you like to search for?`)

		try {
			const { body } = await request
				.get('http://api.stackexchange.com/2.2/search/advanced')
				.query({
					page: 1,
					pagesize: 1,
					order: 'asc',
					sort: 'relevance',
					answers: 1,
					q: query,
					site: 'stackoverflow',
					key: STACKOVERFLOW_KEY
				});
			if (!body.items.length) return message.channel.send('Could not find any results.');
			const data = body.items[0];
			const embed = new RichEmbed()
				.setColor(0xF48023)
				.setAuthor('Stack Overflow', 'https://i.imgur.com/P2jAgE3.png', 'https://stackoverflow.com/')
				.setURL(data.link)
				.setTitle(data.title)
				.setTimestamp()
                .setFooter(client.user.username)
				.addField('❯ ID', data.question_id, true)
				.addField('❯ Asker', `[${data.owner.display_name}](${data.owner.link})`, true)
				.addField('❯ Views', formatNumber(data.view_count), true)
				.addField('❯ Score', formatNumber(data.score), true)
				.addField('❯ Creation Date', moment.utc(data.creation_date * 1000).format('MM/DD/YYYY h:mm A'), true)
				.addField('❯ Last Activity',
					moment.utc(data.last_activity_date * 1000).format('MM/DD/YYYY h:mm A'), true);
			return message.channel.send(embed);
		} catch (err) {
			return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};
