
const { shuffle } = require('../../util/Util');

module.exports =  {

	name: 'shuffletxt',
	group: 'text-edit',
	memberName: 'shuffle',
	description: 'Shuffles text.',
	clientPermissions: ["SEND_MESSAGES"],
	userPermissions:["VIEW_CHANNEL"],
    run(client ,message ,args) {
		let text = args.join(" ")
		if (!text) return message.channel.send(`What text would you like to shuffle?`)
		
		return message.channel.send(shuffle(text.split('')).join(''));
	}
};
