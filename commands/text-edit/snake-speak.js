

module.exports = {

	name: 'snake-speak',
	aliases: ['snek-speak'],
	group: 'text-edit',
	memberName: 'snake-speak',
	description: 'Convertsssss text to sssssnake ssssspeak.',
	clientPermissions: ["SEND_MESSAGES"],
	userPermissions:["VIEW_CHANNEL"],
	args: [
		{
			key: 'text',
			prompt: 'What text would you like to convert to sssssnake ssssspeak?',
			type: 'string',
			validate: text => {
				if (text.replace(/s/gi, 'sssss').length < 2000) return true;
				return 'Invalid text, your text is too long.';
			}
		}
	],
    run(client ,message ,args) {
		let text = args.join(" ")
		if (!text) return message.channel.send(`What text would you like to convert to sssssnake ssssspeak?`)
		
		return message.channel.send(text.replace(/s/gi, 'sssss'));
	}
};
