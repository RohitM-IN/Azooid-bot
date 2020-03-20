
const moment = require('moment');
const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');
const { formatNumber } = require('../util/Util');
const  STACKOVERFLOW_KEY  = require('../auth.json').api.stackoverflow;

exports.run = async (client ,message, args) => {
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
			const embed = new MessageEmbed()
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
exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: "User"
  };

  exports.help = {
	name: 'stack-overflow',
	description: 'Searches Stack Overflow for your query.',
	category: "search",
	usage: "giphy <query>",
  };