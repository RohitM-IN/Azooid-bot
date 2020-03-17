
const rules = require('../assets/json/rule');

module.exports.run = async(client ,message ,args) => {
		let rule = args.join(" ")
		if (!rule) return message.channel.send(`Which rule would you like to view?`)

		if(rule > rules.length) return message.channel.send(`There are only ${rules.length} rules!!`);
		return message.channel.send(`**Rule #${rule}:** ${rules[rule - 1]}`);
	}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['rule-of-the-internet'],
	permLevel: "User"
  };

  exports.help = {
	name: 'rule',
	description: 'Responds with a rule of the internet.',
	category: "search",
	usage: "rule <number 1-47>",
  };