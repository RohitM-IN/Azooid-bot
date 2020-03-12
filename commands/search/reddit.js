
const { RichEmbed } = require('discord.js');
const request = require('node-superfetch');
const moment = require('moment');
const { formatNumber } = require('../../util/Util');

module.exports =  {

	name: 'reddit',
	aliases: ['u/'],
	group: 'search',
	memberName: 'reddit',
	description: 'Responds with information on a Reddit user.',
	clientPermissions: ["EMBED_LINKS","SEND_MESSAGES"],
	userPermissions:["VIEW_CHANNEL"],
	args: [
		{
			key: 'user',
			prompt: 'What user would you like to get information on?',
			type: 'string',
			parse: user => encodeURIComponent(user)
		}
	],
	async run(client ,message ,args) {
		let user = args.join(" ");
		if (!user) return message.channel.send(`What user would you like to get information on?`)

		try {
			const { body } = await request.get(`https://www.reddit.com/user/${user}/about.json`);
			const { data } = body;
			if (data.hide_from_robots) return message.channel.send('This user is hidden from bots.');
			const embed = new RichEmbed()
				.setColor(0xFF4500)
				.setAuthor('Reddit', 'https://i.imgur.com/DSBOK0P.png', 'https://www.reddit.com/')
				.setThumbnail(data.icon_img)
				.setURL(`https://www.reddit.com/user/${user}`)
				.setTitle(`/u/${data.name}`)
				.addField('❯ Username', data.name, true)
				.addField('❯ ID', data.id, true)
				.addField('❯ Karma', formatNumber(data.link_karma + data.comment_karma), true)
				.addField('❯ Creation Date', moment.utc(data.created_utc * 1000).format('MM/DD/YYYY h:mm A'), true)
				.addField('❯ Gold?', data.is_gold ? 'Yes' : 'No', true)
				.addField('❯ Verified?', data.verified ? 'Yes' : 'No', true);
			return message.channel.send(embed);
		} catch (err) {
			if (err.status === 404) return message.channel.send('Could not find any results.');
			return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};
