const {
	MessageEmbed
} = require('discord.js');
const request = require('node-superfetch');
const {
	formatNumber
} = require('../util/Util');
const OSU_KEY = require('../auth.json').api.osu_key

exports.run = async (client, message, args) => {
	let user = args.join(" ")
	if (!user) return message.channel.send(`What user would you like to get information on?`)

	try {
		const {
			body
		} = await request
			.get('https://osu.ppy.sh/api/get_user')
			.query({
				k: OSU_KEY,
				u: user,
				type: 'string'
			});
		if (!body.length) return message.channel.send('Could not find any results.');
		const data = body[0];
		const embed = new MessageEmbed()
			.setColor(0xFF66AA)
			.setAuthor('osu!', 'https://i.imgur.com/hWrw2Sv.png', 'https://osu.ppy.sh/')
			.setTimestamp()
			.setFooter(client.user.username)
			.addField('❯ Username', data.username, true)
			.addField('❯ ID', data.user_id, true)
			.addField('❯ Level', data.level || '???', true)
			.addField('❯ Accuracy', data.accuracy ? `${Math.round(data.accuracy)}%` : '???', true)
			.addField('❯ Rank', data.pp_rank ? formatNumber(data.pp_rank) : '???', true)
			.addField('❯ Play Count', data.playcount ? formatNumber(data.playcount) : '???', true)
			.addField('❯ Country', data.country || '???', true)
			.addField('❯ Ranked Score', data.ranked_score ? formatNumber(data.ranked_score) : '???', true)
			.addField('❯ Total Score', data.total_score ? formatNumber(data.total_score) : '???', true)
			.addField('❯ SS', data.count_rank_ss ? formatNumber(data.count_rank_ss) : '???', true)
			.addField('❯ S', data.count_rank_s ? formatNumber(data.count_rank_s) : '???', true)
			.addField('❯ A', data.count_rank_a ? formatNumber(data.count_rank_a) : '???', true);
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
	name: 'osu',
	category: "search",
	description: 'Responds with information on an osu! user.',
	usage: "osu <user>",
};