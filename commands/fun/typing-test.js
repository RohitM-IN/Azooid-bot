
const { stripIndents } = require('common-tags');
const { list } = require('../../util/Util');
const sentences = require('../../assets/json/typing-test');
const difficulties = ['easy', 'medium', 'hard', 'extreme', 'impossible'];
const times = {
	easy: 25000,
	medium: 20000,
	hard: 15000,
	extreme: 10000,
	impossible: 5000
};

module.exports = {

	name: 'typing-test',
	group: 'fun',
	memberName: 'typing-test',
	description: 'See how fast you can type a sentence in a given time limit.',
	//details: `**Difficulties:** ${difficulties.join(', ')}`,
	clientPermissions: ["EMBED_LINKS","SEND_MESSAGES"],
	userPermissions:["VIEW_CHANNEL"],
	args: [
		{
			key: 'difficulty',
			prompt: `What should the difficulty of the game be? Either ${list(difficulties, 'or')}.`,
			type: 'string',
			oneOf: difficulties,
			parse: difficulty => difficulty.toLowerCase()
		}
	],
	async run(client, message, args) {
		let difficulty = args[0]
		if (!args[0]) return message.channel.send(`Enter difficulty: 'easy', 'medium', 'hard', 'extreme', 'impossible' `)
		const sentence = sentences[Math.floor(Math.random() * sentences.length)];
		const time = times[difficulty];
		await message.channel.send(stripIndents`
			**You have ${time / 1000} seconds to type this sentence.**
			${sentence}
		`);
		const now = Date.now();
		const msgs = await message.channel.awaitMessages(res => res.author.id === message.author.id, {
			max: 1,
			time
		});
		
		if (!msgs.size || msgs.first().content !== sentence) return message.channel.send('Sorry! You lose!');
		return message.channel.send(`Nice job! 10/10! You deserve some cake! (Took ${(Date.now() - now) / 1000} seconds)`);
	}
};
