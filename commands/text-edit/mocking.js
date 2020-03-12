
const { MOCKING_EMOJI_ID, MOCKING_EMOJI_NAME } = process.env;

module.exports = {

			name: 'mocking',
			aliases: ['mock'],
			group: 'text-edit',
			memberName: 'mocking',
			description: 'SenDs TexT lIkE ThiS.',
			clientPermissions: ["SEND_MESSAGES","USE_EXTERNAL_EMOJIS"],
			userPermissions:["VIEW_CHANNEL"],
			args: [
				{
					key: 'text',
					prompt: 'WHaT tEXt WoUlD yOu LiKE to COnvErt?',
					type: 'string',
					max: 1950,
					parse: text => text.toLowerCase()
				}
			],


        run(client ,message ,args) {
			let text = args.join(" ")
			if (!text) return message.channel.send(`WHaT tEXt WoUlD yOu LiKE to COnvErt?`)
			
			const letters = text.split('');
			
		for (let i = 0; i < letters.length; i += Math.floor(Math.random() * 4)) {
			letters[i] = letters[i].toUpperCase();
		}
        return message.channel.send(`${letters.join('')} 😋`);
        
	}

	
};

