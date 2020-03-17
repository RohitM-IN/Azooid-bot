
const { RichEmbed } = require('discord.js');
const request = require('node-superfetch');
const { shorten } = require('../util/Util');
const  TMDB_KEY  = require('../auth.json').api.movie_key;

exports.run = async (client ,message ,args) => {
		let query = args.join(" ")
		if (!query) return message.channel.send(`What movie would you like to search for?`)
		
		try {
			const search = await request
				.get('http://api.themoviedb.org/3/search/movie')
				.query({
					api_key: TMDB_KEY,
					include_adult: message.channel.nsfw || false,
					query
				});
			if (!search.body.results.length) return message.channel.send('Could not find any results.');
			const find = search.body.results.find(
				m => m.title.toLowerCase() === query.toLowerCase()
			) || search.body.results[0];
			const { body } = await request
				.get(`https://api.themoviedb.org/3/movie/${find.id}`)
				.query({ api_key: TMDB_KEY });
			const embed = new RichEmbed()
				.setColor(0x00D474)
                .setTitle(body.title)
                .setTimestamp()
                .setFooter(client.user.username)
				.setURL(`https://www.themoviedb.org/movie/${body.id}`)
				.setAuthor('TMDB', 'https://i.imgur.com/3K3QMv9.png', 'https://www.themoviedb.org/')
				.setDescription(body.overview ? shorten(body.overview) : 'No description available.')
				.setThumbnail(body.poster_path ? `https://image.tmdb.org/t/p/w500${body.poster_path}` : null)
				.addField('❯ Runtime', body.runtime ? `${body.runtime} mins.` : '???', true)
				.addField('❯ Release Date', body.release_date || '???', true)
				.addField('❯ Genres', body.genres.length ? body.genres.map(genre => genre.name).join(', ') : '???')
				.addField('❯ Production Companies',
                    body.production_companies.length ? body.production_companies.map(c => c.name).join(', ') : '???');
			return message.channel.send(embed);
		} catch (err) {
			return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['tmdb-movie', 'imdb'],
	permLevel: "User"
  };

  exports.help = {
	name: 'movie',
	category: "search",
	description: 'Searches IMDB for your query, getting movie results.',
	usage: "movie <query>",
  };