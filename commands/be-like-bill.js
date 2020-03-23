const {
	createCanvas,
	loadImage,
	registerFont
} = require('canvas');
const {
	stripIndents
} = require('common-tags');
const path = require('path');
const {
	wrapText
} = require('../util/Canvas');
const texts = require('../assets/json/be-like-bill');
registerFont(path.join(__dirname, '..', 'assets', 'fonts', 'Noto-Regular.ttf'), {
	family: 'Noto'
});
registerFont(path.join(__dirname, '..', 'assets', 'fonts', 'Noto-CJK.otf'), {
	family: 'Noto'
});
registerFont(path.join(__dirname, '..', 'assets', 'fonts', 'Noto-Emoji.ttf'), {
	family: 'Noto'
});
const {
	getMember
} = require("../util/function.js");

exports.run = async (client, message, args) => {
	const member = getMember(message, args.join(" "));
	let name = args[0];
	if (!args[0]) name = member.user.username || 'Bill';
	const base = await loadImage(path.join(__dirname, '..', 'assets', 'images', 'be-like-bill.png'));
	const canvas = createCanvas(base.width, base.height);
	const ctx = canvas.getContext('2d');
	ctx.drawImage(base, 0, 0);
	ctx.font = '23px Noto';
	const text = await wrapText(ctx, texts[Math.floor(Math.random() * texts.length)].replace(/{{name}}/gi, name), 569);
	ctx.fillText(stripIndents `
		This is ${name}.

		${text.join('\n')}

		${name} is smart.
		Be like ${name}.
	`, 31, 80);
	return message.channel.send({
		files: [{
			attachment: canvas.toBuffer(),
			name: 'be-like-bill.png'
		}]
	});
}
exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ['belike'],
	permLevel: "User"
};

exports.help = {
	name: 'be-like-bill',
	description: 'Sends a "Be Like Bill" meme with the name of your choice.',
	usage: "belike <name>",
	category: "meme-gen",
};