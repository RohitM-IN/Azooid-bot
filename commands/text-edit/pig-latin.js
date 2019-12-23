

module.exports = {

			name: 'pig-latin',
			group: 'text-edit',
			memberName: 'pig-latin',
			description: 'Converts text to pig latin.',
			args: [
				{
					key: 'text',
					prompt: 'What text would you like to convert to pig latin?',
					type: 'string',
					validate: text => {
						if (this.pigLatin(text).length < 2000) return true;
						return 'Invalid text, your text is too long.';
					}
				}
			],

        run(client ,message ,args) {
			let text = args.join(" ")
		if (!text) return message.channel.send(`What text would you like to convert to pig latin?`)
			
        return message.channel.send(pigLatin(text));
        function pigLatin(text) {
            return text.replace(/\w+/g, pigLatinWord).toLowerCase();
        }
    
        function pigLatinWord(word) {
            return `${word.slice(1)}${word.charAt(0)}ay`;
        }
	}


};
