
const { list, base64 } = require('../../util/Util');
const modes = ['encode', 'decode'];

module.exports = {

	name: 'base64',
	group: 'text-edit',
	memberName: 'base64',
	description: 'Converts text to/from Base64.',
	details: `**Modes:** ${modes.join(', ')}`,
	clientPermissions: ["SEND_MESSAGES"],
	userPermissions:["VIEW_CHANNEL"],
	args: [
		{
			key: 'mode',
			prompt: `Would you like to ${list(modes, 'or')}?`,
			type: 'string',
			oneOf: modes,
			parse: mode => mode.toLowerCase()
		},
		{
			key: 'text',
			prompt: 'What text would you like to convert to Base64?',
			type: 'string',
			validate: text => {
				if (base64(text).length < 2000) return true;
				return 'Invalid text, your text is too long.';
			}
		}
	],
	run(client ,message ,args) {
		mode = args.join(" ");
		if (!mode) return message.channel.send(`What text would you like to convert to Base64?`)

		let text = args.slice(1).join(" ")
		console.log(text)
		const converted = base64(text, mode);
		if (!converted) return message.channel.send('That is not valid Base64.');
		return message.channel.send(converted);
	}
};
