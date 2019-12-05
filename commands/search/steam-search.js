
const { RichEmbed } = require('discord.js');
const request = require('node-superfetch');
const { formatNumber } = require('../../util/Util');

module.exports = {

			name: 'steam-search',
			group: 'search',
			memberName: 'steam',
			description: 'Searches Steam for your query.',
			clientPermissions: ['EMBED_LINKS'],
			credit: [
				{
					name: 'Steam',
					url: 'https://store.steampowered.com/'
				}
			],
			args: [
				{
					key: 'query',
					prompt: 'What game would you like to search for?',
					type: 'string'
				}
			],

	async run(client , message ,args) {
		// let query = args.join(" ")
		// // try {
			
		// 		const { body } = await request
		// 			.get('https://store.steampowered.com/api/storesearch')
		// 			.query({
		// 				cc: 'us',
		// 				l: 'en',
		// 				term: query
		// 			});
		// 		if (!body.items.length) return null;
		// 		const id =  body.items[0].id;
		// 		if (!id) return message.channel.send('Could not find any results.');
			
		// 		console.log(body.items[0])
		
			
		// 		const { Data } = await request
		// 			.get('https://store.steampowered.com/api/appdetails')
		// 			.query({ appids: id });
		// 			const data = Data[id.toString()].data;
			
			
			
		// 	console.log(data)
		// 	const current = data.price_overview ? `$${data.price_overview.final / 100}` : 'Free';
		// 	const original = data.price_overview ? `$${data.price_overview.initial / 100}` : 'Free';
		// 	const price = current === original ? current : `~~${original}~~ ${current}`;
		// 	const platforms = [];
		// 	if (data.platforms) {
		// 		if (data.platforms.windows) platforms.push('Windows');
		// 		if (data.platforms.mac) platforms.push('Mac');
		// 		if (data.platforms.linux) platforms.push('Linux');
		// 	}
		// 	const embed = new RichEmbed()
		// 		.setColor(0x101D2F)
		// 		.setAuthor('Steam', 'https://i.imgur.com/xxr2UBZ.png', 'http://store.steampowered.com/')
		// 		.setTitle(data.name)
		// 		.setURL(`http://store.steampowered.com/app/${data.steam_appid}`)
		// 		.setThumbnail(data.header_image)
		// 		.addField('❯ Price', price, true)
		// 		.addField('❯ Metascore', data.metacritic ? data.metacritic.score : '???', true)
		// 		.addField('❯ Recommendations', data.recommendations ? formatNumber(data.recommendations.total) : '???', true)
		// 		.addField('❯ Platforms', platforms.join(', ') || 'None', true)
		// 		.addField('❯ Release Date', data.release_date ? data.release_date.date : '???', true)
		// 		.addField('❯ DLC Count', data.dlc ? formatNumber(data.dlc.length) : 0, true)
		// 		.addField('❯ Developers', data.developers ? data.developers.join(', ') || '???' : '???')
		// 		.addField('❯ Publishers', data.publishers ? data.publishers.join(', ') || '???' : '???');
		// 	return message.channel.send(embed);
		// // } catch (err) {
		// // 	return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		// // }
	}

	
};
