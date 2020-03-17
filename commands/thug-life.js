
const { createCanvas, loadImage } = require('canvas');
const request = require('node-superfetch');
const path = require('path');
const { greyscale } = require('../util/Canvas');
const { getMember } = require("../util/function.js");


exports.run = async (client, message, args) => {
		const member = getMember(message, args.join(" "));
		
		let image = "https://cdn.discordapp.com/avatars/"+member.user.id+"/"+member.user.avatar+".png?size=2048"
		if(member.user.avatar == null) image = "https://cdn.discordapp.com/embed/avatars/0.png"
		
		try {
			const base = await loadImage(path.join(__dirname, '..', 'assets', 'images', 'thug-life.png'));
			const { body } = await request.get(image);
			const data = await loadImage(body);
			const canvas = createCanvas(data.width, data.height);
			const ctx = canvas.getContext('2d');
			ctx.drawImage(data, 0, 0);
			greyscale(ctx, 0, 0, data.width, data.height);
			const ratio = base.width / base.height;
			const width = data.width / 2;
			const height = Math.round(width / ratio);
			ctx.drawImage(base, (data.width / 2) - (width / 2), data.height - height, width, height);
			const attachment = canvas.toBuffer();
			if (Buffer.byteLength(attachment) > 8e+6) return msg.reply('Resulting image was above 8 MB.');
			return message.channel.send({ files: [{ attachment, name: 'thug-life.png' }] });
		} catch (err) {
			return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}
	}
exports.conf = {
    enabled: true,
    guildOnly: true,
	aliases: [],
    permLevel: "User"
  };

  exports.help = {
	name: 'thug-life',
	description: 'Draws "Thug Life" over an image or a user\'s avatar.',
    usage: "thug-life <@user>",
    category: "meme-gen",
  };