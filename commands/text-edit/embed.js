
const { RichEmbed } = require('discord.js');

module.exports =  {
	
			name: 'embed',
			group: 'text-edit',
			memberName: 'embed',
			description: 'Sends text in an embed.',
			clientPermissions: ['EMBED_LINKS'],
			args: [
				{
					key: 'text',
					prompt: 'What text would you like to embed?',
					type: 'string'
				}
			],


run(client ,message ,args) {
	let text = args.join(" ")
	if (!text) return message.channel.send(`What text would you like to embed?`)
	
    let embed = new RichEmbed()
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(client.user.username)
    .setDescription(text)
		return message.channel.send(embed);
	}
}
