const async = require('async')
const { RichEmbed } = require('discord.js');
const request = require('node-superfetch');
const { stripIndents } = require('common-tags');
const { cleanAnilistHTML } = require('../../util/Util');
const searchGraphQL = stripIndents`
	query ($search: String) {
		characters: Page (perPage: 1) {
			results: characters (search: $search) { id }
		}
	}
`;
const resultGraphQL = stripIndents`
	query ($id: Int!) {
		Character (id: $id) {
			id
			name {
				first
				last
			}
			image {
				large
				medium
			}
			description(asHtml: false)
			siteUrl
			media(page: 1, perPage: 10) {
				edges {
					node {
						title {
							english
							userPreferred
						}
						type
						siteUrl
					}
				}
			}
		}
	}
`;
const types = {
	ANIME: 'Anime',
	MANGA: 'Manga'
};


module.exports = {

	name: 'character',
	aliases: ['anilist-character', 'anime-character', 'manga-character', 'manga-char', 'ani-char', 'char'],
	group: 'search',
	memberName: 'character',
	description: 'Searches AniList for your query, getting character results.',
	clientPermissions: ['EMBED_LINKS'],
	args: [
		{
			key: 'query',
			prompt: 'What character would you like to search for?',
			type: 'string'
		}
	],


	async run(client, message, args) {
		message.channel.send("Command in development")
        //         let query = args.join(" ");
		// try {
        //     const { body } = await request
        //                 .post('https://graphql.anilist.co/')
        //                 .send({
        //                     variables: { search: query },
        //                     query: searchGraphQL
        //                 });
        //             if (!body.data.characters.results.length) message.channel.send('Could not find any results.');
        //             const id =  body.data.characters.results[0].id;
			
        //     if (!id) return message.channel.send('Could not find any results.');
        //      let _body  = await request
        //                 .post('https://graphql.anilist.co/')
        //                 .send({
        //                     variables: { id },
        //                     query: resultGraphQL
        //                 });
        //                 const character = _body.data.Character;
			
		// 	const embed = new RichEmbed()
		// 		.setColor(0x02A9FF)
		// 		.setAuthor('AniList', 'https://i.imgur.com/iUIRC7v.png', 'https://anilist.co/')
		// 		.setURL(character.siteUrl)
		// 		.setThumbnail(character.image.large || character.image.medium || null)
		// 		.setTitle(`${character.name.first || ''}${character.name.last ? ` ${character.name.last}` : ''}`)
		// 		.setDescription(character.description ? cleanAnilistHTML(character.description) : 'No description.')
		// 		.addField('❯ Appearances', character.media.edges.map(edge => {
		// 			const title = edge.node.title.english || edge.node.title.userPreferred;
		// 			return `[${title} (${types[edge.node.type]})](${edge.node.siteUrl})`;
		// 		}).join(', '));
        //     return message.channel.send(embed);
            
		// } catch (err) {
		// 	return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
        // }

        
	}


};
