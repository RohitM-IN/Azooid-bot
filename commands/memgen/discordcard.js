const { createCanvas, loadImage, registerFont } = require('canvas');
const snekfetch = require('snekfetch');
const path = require('path');
registerFont(path.join(__dirname, '..', '..', 'assets', 'fonts', 'Noto.ttf'), { family: 'Noto' });
registerFont(path.join(__dirname, '..', '..', 'assets', 'fonts', 'Noto-CJK.otf'), { family: 'Noto' });
registerFont(path.join(__dirname, '..', '..', 'assets', 'fonts', 'Noto-Emoji.ttf'), { family: 'Noto' });
const { getMember } = require("../../functions.js");

module.exports =  {

	name: 'discord-card',
	aliases: ['dcard'],
	group: 'memgen',
	description: 'Draws a user\'s avatar on a Discord\'s Trading Card.',
	clientPermissions: ["ATTACH_FILES","EMBED_LINKS","SEND_MESSAGES"],
	userPermissions:["VIEW_CHANNEL"],
	args: [
		{
			key: 'user',
			prompt: 'Which user would you like to edit the avatar of?',
			type: 'user'
		}
	],
	async run(client, message, args) {
        const member = getMember(message, args.join(" "));
		
		let avatarURL = "https://cdn.discordapp.com/avatars/"+member.user.id+"/"+member.user.avatar+".png?size=256"
		if(member.user.avatar == null) avatarURL = "https://cdn.discordapp.com/embed/avatars/0.png"
		
		try {
			const base = await loadImage(path.join(__dirname, '..', '..', 'assets', 'images', 'discord-card.png'));
			const { body } = await snekfetch.get(avatarURL);
			const avatar = await loadImage(body);
			const canvas = createCanvas(base.width, base.height);
			const ctx = canvas.getContext('2d');
			ctx.fillStyle = 'white';
			ctx.fillRect(0, 0, base.width, base.height);
			ctx.drawImage(avatar, 12, 19, 205, 205);
			ctx.drawImage(base, 0, 0);
            ctx.font = '14px Noto';
			ctx.fillStyle = 'black';
			ctx.fillText(member.user.username, 16, 25);
			ctx.fillStyle = 'white';
			ctx.fillText(member.user.username, 15, 24);
			return message.channel.send({ files: [{ attachment: canvas.toBuffer(), name: 'discord-card.png' }] });
		} catch (err) {
			return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
};