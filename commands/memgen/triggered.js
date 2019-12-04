const { getMember } = require("../../functions.js");
const { createCanvas, loadImage } = require('canvas');
const request = require('node-superfetch');
const snekfetch = require('snekfetch');
const path = require('path');
const { drawImageWithTint } = require('../../util/Canvas');

module.exports = {
			name: 'triggered',
			group: 'avatar-edit',
			memberName: 'triggered',
			description: 'Draws a user\'s avatar over the "Triggered" meme.',

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
		
		let image = "https://cdn.discordapp.com/avatars/"+member.user.id+"/"+member.user.avatar+".png?size=512"
		if(member.user.avatar == null) image = "https://cdn.discordapp.com/embed/avatars/0.png"
		
		try {
			const base = await loadImage(path.join(__dirname, '..', '..', 'assets', 'images', 'triggered.png'));
			const { body } = await request.get(image);
			const data = await loadImage(body);
			const canvas = createCanvas(data.width, data.height);
			const ctx = canvas.getContext('2d');
			ctx.drawImage(data, 0, 0);
			const ratio = base.width / base.height;
			const width = data.width / 2;
            const height = Math.round(width / ratio);
			ctx.drawImage(base, (data.width / 4) - (width / 2), data.height - height, data.width, height);
			return message.channel.send({ files: [{ attachment: canvas.toBuffer(), name: 'triggered.png' }] });
		} catch (err) {
			return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};