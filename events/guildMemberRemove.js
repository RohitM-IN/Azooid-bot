const Discord = require("discord.js");
const fs = require("fs");

const Canvas = require("canvas")
const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');

	// Declare a base size of the font
	let fontSize = 70;

	do {
		// Assign the font to the context and decrement it so it can be measured again
		ctx.font = `${fontSize -= 10}px sans-serif`;
		// Compare pixel width of the text to the canvas minus the approximate avatar size
	} while (ctx.measureText(text).width > canvas.width - 300);

	// Return the result to use in the actual canvas
    return ctx.font;
}
module.exports = async (client, member) => {
	let channelID = JSON.parse(fs.readFileSync("./data/json/serversettings.json", "utf8"))
	let channelsend = channelID['guilds'][member.guild.id]['welcomeChannelID'];
	channelsend = channelsend.replace(/[^0-9]/g, '');
    //const channelName = '📜welcome📜';

	const log =  member.guild.channels.find(ch => ch.id == `${channelsend}`)|| member.guild.channels.find(ch => ch.name.includes('welcome')) || member.guild.channels.find(ch => ch.name.includes('general'));

    if (!log) return;
    
   

	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');
	const background = await Canvas.loadImage('./assets/img/wallpaper.jpg');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	// Slightly smaller text placed above the member's display name
	ctx.font = '28px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText('Good Bye! see you once again,', canvas.width / 3, canvas.height / 3.5);

	// Add an exclamation point here and below
	ctx.font = applyText(canvas, `${member.displayName}!`);
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.Attachment(canvas.toBuffer(), 'leave-image.jpg');
	if(channelsend !== 'default' || channelsend != undefined) {
		client.channels.get(channelsend).send(`See you once again, ${member.displayName}!`, attachment);
	} else{
		log.send(`See you once again, ${member.displayName}!`, attachment);
	}
    
}