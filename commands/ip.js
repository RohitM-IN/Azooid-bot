
const { MessageEmbed } = require('discord.js');
const request = require('node-superfetch');


exports.run = async (client ,message ,args) => {
		let user = args.join(" ")
		if (!user) return message.channel.send(`What user would you like to get information on?`)
		let url = `https://ipapi.co/${user}`
		try {
			const { body } = await request
                .get(`https://ipapi.co/${user}/json`)
                
            return message.channel.send(`\`\`\`json\n${JSON.stringify(body , undefined , 4)}\n\`\`\`\nto get more info visit ${url}`,{split:"\n"});
            
			
		} catch (err) {
			return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['iplookup','geoip'],
	permLevel: "User"
  };

  exports.help = {
	name: 'ip',
	category: "search",
	description: 'Responds with information on given ip adderss.',
	usage: "ip <valid ip adders>",
  };