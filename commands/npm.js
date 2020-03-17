
const moment = require('moment');
const { RichEmbed } = require('discord.js');
const request = require('node-superfetch');
const { trimArray } = require('../util/Util');

exports.run = async (client ,message ,args) => {
		let pkg = args.join(" ");
		if (!pkg) return message.channel.send(`What package would you like to get information on?`)
		
		try {
			const { body } = await request.get(`https://registry.npmjs.com/${pkg}`);
			if (body.time.unpublished) return msg.say('This package no longer exists.');
			const version = body.versions[body['dist-tags'].latest];
			const maintainers = trimArray(body.maintainers.map(user => user.name));
			const dependencies = version.dependencies ? trimArray(Object.keys(version.dependencies)) : null;
			const embed = new RichEmbed()
				.setColor(0xCB0000)
				.setAuthor('NPM', 'https://i.imgur.com/ErKf5Y0.png', 'https://www.npmjs.com/')
                .setTitle(body.name)
                .setTimestamp()
                .setFooter(client.user.username)
				.setURL(`https://www.npmjs.com/package/${pkg}`)
				.setDescription(body.description || 'No description.')
				.addField('❯ Version', body['dist-tags'].latest, true)
				.addField('❯ License', body.license || 'None', true)
				.addField('❯ Author', body.author ? body.author.name : '???', true)
				.addField('❯ Creation Date', moment.utc(body.time.created).format('MM/DD/YYYY h:mm A'), true)
				.addField('❯ Modification Date', moment.utc(body.time.modified).format('MM/DD/YYYY h:mm A'), true)
				.addField('❯ Main File', version.main || 'index.js', true)
				.addField('❯ Dependencies', dependencies && dependencies.length ? dependencies.join(', ') : 'None')
				.addField('❯ Maintainers', maintainers.join(', '));
			return message.channel.send(embed);
		} catch (err) {
			if (err.status === 404) return message.channel.send('Could not find any results.');
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
	name: 'npm',
	category: "search",
	description: 'Responds with information on an NPM package.',
	usage: "npm <pkg name>",
  };