
const zalgo = require('../../assets/json/zalgo');

module.exports =  {

			name: 'zalgo',
			group: 'text-edit',
			memberName: 'zalgo',
			description: 'Converts text to zalgo.',
			args: [
				{
					key: 'text',
					prompt: 'What text would you like to convert to zalgo?',
					type: 'string',
					max: 200
				}
			],  

	run(client ,message ,args) {
		let text = args.join(" ")
		if (!text) return message.channel.send(`What text would you like to convert to zalgo?`)
		
		let result = '';
		for (let i = 0; i < text.length; i++) {
			result += text[i];
			for (const chars of Object.values(zalgo)) {
				let count = Math.floor(Math.random() * 5);
				while (count--) result += chars[Math.floor(Math.random() * chars.length)];
			}
		}
		return message.channel.send(result);
	}
};
