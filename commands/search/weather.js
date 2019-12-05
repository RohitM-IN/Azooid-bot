
const { RichEmbed } = require('discord.js');
const request = require('node-superfetch');
const  OPENWEATHERMAP_KEY  = require('../../auth.json').api.weather;

module.exports =  {
			name: 'weather',
			aliases: ['open-weather-map', 'owm'],
			group: 'search',
			memberName: 'weather',
			description: 'Responds with weather information for a specific location.',
			clientPermissions: ['EMBED_LINKS'],
			args: [
				{
					key: 'location',
					prompt: 'What location would you like to get the weather of?',
					type: 'string',
					parse: location => {
						if (/^[0-9]+$/.test(location)) return { type: 'zip', data: location };
						return { type: 'q', data: location };
					}
				}
			],

	async run(client, message, args) {
        let location = args[0];
        let city = args[0];
        let zipcode = args[1];
        if(!args[0] ) return message.channel.send("usage: weather <city> <optional:zip code>")

		try {
			const { body } = await request
				.get('https://api.openweathermap.org/data/2.5/weather')
				.query({
					q: location.type === 'q' ? location.data : city,
					zip: location.type === 'zip' ? location.data : zipcode,
					units: 'Metric',
					appid: OPENWEATHERMAP_KEY
				});
			const embed = new RichEmbed()
				.setColor(0xFF7A09)
				.setAuthor(
					`${body.name}, ${body.sys.country}`,
					'https://i.imgur.com/NjMbE9o.png',
					'https://openweathermap.org/city'
				)
				.setURL(`https://openweathermap.org/city/${body.id}`)
				.setTimestamp()
				.addField('❯ Condition', body.weather.map(data => `${data.main} (${data.description})`).join('\n'))
				.addField('❯ Temperature', `${body.main.temp}°C`, true)
				.addField('❯ Humidity', `${body.main.humidity}%`, true)
				.addField('❯ Wind Speed', `${body.wind.speed} mph`, true);
			return message.channel.send(embed);
		} catch (err) {
			if (err.status === 404) return message.channel.send('Could not find any results.');
			return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};
