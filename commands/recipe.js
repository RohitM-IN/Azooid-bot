
const { RichEmbed } = require('discord.js');
const request = require('node-superfetch');

exports.run = async (client ,message ,args) => {
		let query = args.join(" ")
		if (!query) return message.channel.send(`What recipe would you like to search for?`)

		try {
			const { text } = await request
				.get('http://www.recipepuppy.com/api/')
				.query({ q: query });
			const body = JSON.parse(text);
			if (!body.results.length) return message.channel.send('Could not find any results.');
			const recipe = body.results[Math.floor(Math.random() * body.results.length)];
			const embed = new RichEmbed()
				.setAuthor('Recipe Puppy', 'https://i.imgur.com/lT94snh.png', 'http://www.recipepuppy.com/')
				.setColor(0xC20000)
				.setURL(recipe.href)
				.setTitle(recipe.title)
				.setDescription(`**Ingredients:** ${recipe.ingredients}`)
				.setThumbnail(recipe.thumbnail);
			return message.channel.send(embed);
		} catch (err) {
			if (err.status === 500) return message.channel.send('Could not find any results.');
			return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['recipe-puppy'],
	permLevel: "User"
  };

  exports.help = {
	name: 'recipe',
	description: 'Searches for recipes based on your query.',
	category: "search",
	usage: "recipe <query>",
  };