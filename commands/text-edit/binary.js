

module.exports = {
			name: 'binary',
			group: 'text-edit',
			memberName: 'binary',
			description: 'Converts text to binary.',
			args: [
				{
					key: 'text',
					prompt: 'What text would you like to convert to binary?',
					type: 'string',
					validate: text => {
						if (this.binary(text).length < 2000) return true;
						return 'Invalid text, your text is too long.';
					}
				}
			],

	run(client ,message , args) {
        
		let text = args.join(" ")
		if (!text) return message.channel.send(`What text would you like to convert to binary?`)
		
        
        return message.channel.send(binary(text));
        function binary(text) {
            return text.split('').map(str => {
                const converted = str.charCodeAt(0).toString(2);
                return converted.padStart(8, '0');
            }).join(' ');
    }

	
	}
};
