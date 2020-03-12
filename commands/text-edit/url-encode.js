

module.exports =  {

	name: 'url-encode',
	aliases: ['encode-url', 'encode-uri', 'uri-encode', 'encode-uri-component'],
	group: 'text-edit',
	memberName: 'url-encode',
	clientPermissions: ["SEND_MESSAGES"],
	userPermissions:["VIEW_CHANNEL"],
	description: 'Encodes text to URL-friendly characters.',
	args: [
		{
			key: 'text',
			prompt: 'What text would you like to encode?',
			type: 'string',
			validate: text => {
				if (encodeURIComponent(text).length < 2000) return true;
				return 'Invalid text, your text is too long.';
			}
		}
	],
	run(client ,message ,args) {
		let text = args.join(" ")
		if (!text) return message.channel.send(`What text would you like to encode?`)
				
		return message.channel.send(encodeURIComponent(text));
	}
};
