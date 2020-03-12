

module.exports =  {

	name: 'latlmes',
	group: 'text-edit',
	memberName: 'latlmes',
	description: 'Creates a Latlmes fake link that redirects to a rickroll.',
	clientPermissions: ["SEND_MESSAGES"],
	userPermissions:["VIEW_CHANNEL"],
	credit: [
		{
			name: 'Latlmes',
			url: 'https://www.latlmes.com/'
		}
	],
	args: [
		{
			key: 'section',
			prompt: 'What section of the news should the link display?',
			type: 'string',
			max: 100,
			parse: query => encodeURIComponent(query.replace(/ /g, '-').toLowerCase())
		},
		{
			key: 'query',
			prompt: 'What would you like the link to display as?',
			type: 'string',
			max: 500,
			parse: query => encodeURIComponent(query.replace(/ /g, '-').toLowerCase())
		}
	],

	run(client ,message ,args) {
        let section = args[0]
		let query = args.slice(1).join(" ")
		if (!query) return message.channel.send(`What would you like the link to display as?`)
		if (!section) return message.channel.send(`What section of the news should the link display?`)
		
		
		return message.channel.send(`http://www.latlmes.com/${section}/${query}-1`);
	}
}
