const Discord = require('discord.js')
const {
	createCanvas,
	loadImage,
	registerFont
} = require('canvas');
const request = require('node-superfetch');
const path = require('path');
const {
	getMember
} = require("../util/function.js");
const {
	shortenText
} = require('../util/Canvas');
registerFont(path.join(__dirname, '..', 'assets', 'fonts', 'Noto-Regular.ttf'), {
	family: 'Noto'
});
registerFont(path.join(__dirname, '..', 'assets', 'fonts', 'Noto-CJK.otf'), {
	family: 'Noto'
});
registerFont(path.join(__dirname, '..', 'assets', 'fonts', 'Noto-Emoji.ttf'), {
	family: 'Noto'
});

exports.run = async (client, message, args) => {
	const member = getMember(message, args[1]);

	let avatar_ = "https://cdn.discordapp.com/avatars/" + member.user.id + "/" + member.user.avatar + ".png?size=256"
	if (member.user.avatar == null) avatar_ = "https://cdn.discordapp.com/embed/avatars/0.png"
	let title = args[0];
	let text = args[2];

	try {
		const {
			body
		} = await request.get(avatar_);
		const data = await loadImage(body);
		const canvas = createCanvas(750, 600);
		const ctx = canvas.getContext('2d');
		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		let {
			width,
			height
		} = data;
		const maxWidth = 602;
		if (width > maxWidth) {
			const ratio = maxWidth / width;
			width = maxWidth;
			height *= ratio;
		}
		const maxHeight = 402;
		if (height > maxHeight) {
			const ratio = maxHeight / height;
			height = maxHeight;
			width *= ratio;
		}
		const x = (canvas.width / 2) - (width / 2);
		const y = 44 + ((402 / 2) - (height / 2));
		ctx.fillStyle = 'white';
		ctx.fillRect(x - 4, y - 4, width + 8, height + 8);
		ctx.fillStyle = 'black';
		ctx.fillRect(x - 2, y - 2, width + 4, height + 4);
		ctx.fillStyle = 'white';
		ctx.fillRect(x, y, width, height);
		ctx.drawImage(data, x, y, width, height);
		ctx.textAlign = 'center';
		ctx.font = '60px Noto';
		ctx.fillStyle = 'aquamarine';
		ctx.fillText(shortenText(ctx, title, 610), 375, 518);
		ctx.font = '27px Noto';
		ctx.fillStyle = 'white';
		ctx.fillText(shortenText(ctx, text, 610), 375, 565);
		return message.channel.send({
			files: [{
				attachment: canvas.toBuffer(),
				name: 'demotivational-poster.png'
			}]
		});
	} catch (err) {
		return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
	}
}
exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['demotivational-poster'],
	permLevel: "User"
};

exports.help = {
	name: 'demotivational',
	description: 'Draws an image or a user\'s avatar and the text you specify as a demotivational poster.',
	usage: "demotivational <title> <@user> <text>",
	category: "meme-gen",
};