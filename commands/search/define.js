
const request = require('node-superfetch');
const { stripIndents } = require('common-tags');
const  WEBSTER_KEY = require('../../auth.json').api.WEBSTER_KEY;

module.exports = {

			name: 'define',
			aliases: ['dictionary', 'webster'],
			group: 'search',
			memberName: 'define',
			description: 'Defines a word.',

			args: [
				{
					key: 'word',
					prompt: 'What word would you like to look up?',
					type: 'string',
					parse: word => encodeURIComponent(word)
				}
			],


	async run(client, message, args) {
    //     if(!args[0]) message.channel.send("enter a word you want to search");
    //     let word = args[0] 

	// 	try {
	// 		const { body } = await request
	// 			.get(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}`)
	// 			.query({ key: WEBSTER_KEY });
	// 		if (!body.length) return msg.say('Could not find any results.');
	// 		const data = body[0];
	// 		if (typeof data === 'string') return msg.say(`Could not find any results. Did you mean **${data}**?`);
	// 		return message.channel.send(stripIndents`
	// 			**${data.meta.stems[0]}** (${data.fl})
	// 			${data.shortdef.map((definition, i) => `(${i + 1}) ${definition}`).join('\n')}
	// 		`);
	// 	} catch (err) {
	// 		return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
	// 	}
	}
};
