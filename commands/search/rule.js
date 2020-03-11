
const rules = require('../../assets/json/rule');

module.exports = {

			name: 'rule',
			aliases: ['rule-of-the-internet'],
			group: 'search',
			memberName: 'rule',
			description: 'Responds with a rule of the internet.',
			args: [
				{
					key: 'rule',
					prompt: 'Which rule would you like to view?',
					type: 'integer',
					min: 1,
					max: rules.length
				}
			],

	run(client ,message ,args) {
		let rule = args.join(" ")
		if (!rule) return message.channel.send(`Which rule would you like to view?`)

		if(rule > rules.length) return message.channel.send(`There are only ${rules.length} rules!!`);
		return message.channel.send(`**Rule #${rule}:** ${rules[rule - 1]}`);
	}
};
