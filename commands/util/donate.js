const { stripIndents } = require('common-tags');

module.exports = {

		name: 'donate',
		aliases: ['paypal'],
		group: 'util',
		memberName: 'donate',
		clientPermissions: ["SEND_MESSAGES"],
		userPermissions:["VIEW_CHANNEL"],
		description: 'Responds with the bot\'s donation links.',
		guarded: true,
	    run(client,message) {
		return message.channel.send(stripIndents`
		Contribute to development!
		<https://www.paypal.me/ethicalhacker58>
		`);
	}
};
