
const faces = ['(・`ω´・)', ';;w;;', 'owo', 'UwU', '>w<', '^w^'];

module.exports = {

	name: 'owo',
	aliases: ['furry-speak', 'fur-speak'],
	group: 'text-edit',
	memberName: 'owo',
	description: 'OwO.',
	clientPermissions: ["SEND_MESSAGES"],
	userPermissions:["VIEW_CHANNEL"],
	args: [
		{
			key: 'text',
			prompt: 'What text would you like to OwO?',
			type: 'string',
			validate: text => {
				if (owo(text).length < 2000) return true;
				return 'Invalid text, your text is too long.';
			}
		}
	],
    run(client ,message ,args) {
		let text = args.join(" ")
		if (!text) return message.channel.send(`What text would you like to OwO?`)
		
        return message.channel.send(owo(text));
        function owo(text) {
            return text
                .replace(/(?:r|l)/g, 'w')
                .replace(/(?:R|L)/g, 'W')
                .replace(/n([aeiou])/g, 'ny$1')
                .replace(/N([aeiou])/g, 'Ny$1')
                .replace(/N([AEIOU])/g, 'NY$1')
                .replace(/ove/g, 'uv')
                .replace(/!+/g, ` ${faces[Math.floor(Math.random() * faces.length)]} `)
                .trim();
        }
	}

	
};
