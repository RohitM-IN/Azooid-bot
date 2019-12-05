
const request = require('node-superfetch');
const { hash } = require('../../util/Util');

module.exports = {

			name: 'gravatar',
			group: 'search',
			memberName: 'gravatar',
			description: 'Responds with the Gravatar for an email.',
			clientPermissions: ['ATTACH_FILES'],
			credit: [
				{
					name: 'Gravatar',
					url: 'https://en.gravatar.com/'
				}
			],
			args: [
				{
					key: 'email',
					prompt: 'What email do you want to get the Gravatar for?',
					type: 'string',
					parse: email => email.toLowerCase()
				}
			],

	async run(client ,message ,args) {
		let email = args.join(" ")
		const emailHash = hash(email, 'md5');
		try {
			const { body } = await request
				.get(`https://www.gravatar.com/avatar/${emailHash}`)
				.query({
					size: 500,
					default: 404,
					rating: message.channel.nsfw ? 'r' : 'pg'
				});
			return message.channel.send({ files: [{ attachment: body, name: `${emailHash}.jpg` }] });
		} catch (err) {
			if (err.status === 404) return message.channel.send('Could not find any results.');
			return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};
