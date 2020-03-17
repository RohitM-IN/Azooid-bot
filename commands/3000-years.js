const { createCanvas, loadImage } = require('canvas');
const request = require('node-superfetch');
const path = require('path');
const { getMember } = require("../util/function.js");

exports.run = async (client, message, args) => {

        // unable to get avatar url 
		const member = getMember(message, args.join(" "));
		
		let avatar_ = "https://cdn.discordapp.com/avatars/"+member.user.id+"/"+member.user.avatar+".png?size=256"
		if(member.user.avatar == null) avatar_ = "https://cdn.discordapp.com/embed/avatars/0.png"
        
		// const avatarURL = user.displayAvatarURL({ format: 'png', size: 256 });
		try {
			const base = await loadImage(path.join(__dirname, '..', 'assets', 'images', '3000-years.png'));
			const { body } = await request.get(avatar_);
			const avatar = await loadImage(body);
			const canvas = createCanvas(base.width, base.height);
			const ctx = canvas.getContext('2d');
			ctx.drawImage(base, 0, 0);
			ctx.drawImage(avatar, 461, 127, 200, 200);
			return message.channel.send({ files: [{ attachment: canvas.toBuffer(), name: '3000-years.png' }] });
		} catch (err) {
			return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['3ky', '3k-years'],
	permLevel: "User"
  };

  exports.help = {
	name: '3000-years',
	memberName: '3000-years',
	description: 'Draws a user\'s avatar over Pokémon\'s "It\'s been 3000 years" meme.',
	usage: `3ky`,
	category: "meme-gen",
  };