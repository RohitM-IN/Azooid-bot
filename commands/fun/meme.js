const got = require('got');
const Discord = require('discord.js');

module.exports = {
    name: "meme",
    category: "fun",
    description: "Sends an epic meme",
	clientPermissions: ["EMBED_LINKS","SEND_MESSAGES"],
	userPermissions:["VIEW_CHANNEL"],
    run: async (client, message, args) => {
        const embed = new Discord.RichEmbed();
        got('https://www.reddit.com/r/dankmemes/random/.json').then(response => {
            let content = JSON.parse(response.body);
            let permalink = content[0].data.children[0].data.permalink;
            let memeUrl = `https://reddit.com${permalink}`;
            let memeImage = content[0].data.children[0].data.url;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeDownvotes = content[0].data.children[0].data.downs;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            embed.addField(`${memeTitle}`, `[View thread](${memeUrl})`);
            embed.setImage(memeImage);
            embed.setFooter(`👍 ${memeUpvotes} 👎 ${memeDownvotes} 💬 ${memeNumComments}`);
            message.channel.send(embed)
                
            
        }).catch(e => message.channel.send(`Looks like i broke try again! :cry:`));
    }
}