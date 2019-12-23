
const { createCanvas, loadImage } = require('canvas');
const request = require('node-superfetch');
const path = require('path');
const { getMember } = require("../../functions.js");

module.exports =  {

			name: 'beautiful',
			aliases: ['this-is-beautiful', 'grunkle-stan'],
			group: 'meme-gen',
			memberName: 'beautiful',
			description: 'Draws a user\'s avatar over Gravity Falls\' "Oh, this? This is beautiful." meme.',
			throttling: {
				usages: 1,
				duration: 10
			},
			clientPermissions: ['ATTACH_FILES'],
			args: [
				{
					key: 'user',
					prompt: 'Which user would you like to edit the avatar of?',
					type: 'user',
					default: msg => msg.author
				}
			],


	async run(client,message,args) {
		const member = getMember(message, args.join(" "));
		
		let avatar_ = "https://cdn.discordapp.com/avatars/"+member.user.id+"/"+member.user.avatar+".png?size=256"
		if(member.user.avatar == null) avatar_ = "https://cdn.discordapp.com/embed/avatars/0.png"
		
		try {
			const base = await loadImage(path.join(__dirname, '..', '..', 'assets', 'images', 'beautiful.png'));
			const { body } = await request.get(avatar_);
			const avatar = await loadImage(body);
			const canvas = createCanvas(base.width, base.height);
			const ctx = canvas.getContext('2d');
			ctx.fillStyle = 'white';
			ctx.fillRect(0, 0, base.width, base.height);
			ctx.drawImage(avatar, 249, 24, 105, 105);
			ctx.drawImage(avatar, 249, 223, 105, 105);
			ctx.drawImage(base, 0, 0);
			return message.channel.send({ files: [{ attachment: canvas.toBuffer(), name: 'beautiful.png' }] });
		} catch (err) {
			return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};
