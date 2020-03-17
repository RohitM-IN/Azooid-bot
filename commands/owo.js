
const faces = ['(・`ω´・)', ';;w;;', 'owo', 'UwU', '>w<', '^w^'];

exports.run = async(client ,message ,args) => {
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
exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['furry-speak', 'fur-speak'],
	permLevel: "User"
  };

  exports.help = {
	name: 'owo',
	description: 'OwO.',
	category: "text-edit",
	usage: "youtube <query>",
  };