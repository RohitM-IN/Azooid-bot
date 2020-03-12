
const { wordTrans } = require('custom-translate');
const dictionary = require('../../assets/json/temmie');

module.exports ={

	name: 'temmie',
	aliases: ['temmie-speak'],
	group: 'text-edit',
	memberName: 'temmie',
	description: 'Converts text to Temmie speak.',
	clientPermissions: ["SEND_MESSAGES"],
	userPermissions:["VIEW_CHANNEL"],
	args: [
		{
			key: 'text',
			prompt: 'What text would you like to convert to Temmie speak?',
			type: 'string',
			validate: text => {
				if (this.temmize(text).length < 2000) return true;
				return 'Invalid text, your text is too long.';
			}
		}
	],
    run(client ,message ,args) {
		let text = args.join(" ")
	if (!text) return message.channel.send(`What text would you like to convert to Temmie speak?`)
		
        return message.channel.send(temmize(text));
        function temmize(text) {
            return wordTrans(text, dictionary)
                .replace(/ing/gi, 'in')
                .replace(/!/g, '!!!!111!1!')
                .replace(/'/g, '');
        }
	}

	
};
