const Discord = require("discord.js");
const fs = require("fs");
const Canvas = require("canvas")
const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const config = require('../config.json');
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
module.exports = async (client, message,member) => {
        let welcomes = JSON.parse(fs.readFileSync("./serversettings.json", "utf8"));
        //console.log(member);
        //console.log(msg.user.id)
        const channelName = '📜welcome📜';
        //console.log(channelName.includes('welcome'));
        // const channel = welcomes[member.guild.id].welcomes || member.guild.channels.find(ch => ch.name.includes('welcome')) || member.guild.channels.find(ch => ch.name.includes('general'));
        
        const channel =  message.guild.channels.find(ch => ch.name.includes('welcome')) || message.guild.channels.find(ch => ch.name.includes('general'));
        if (!channel) return;
    
        canvas = Canvas.createCanvas(700, 250);
        const ctx = canvas.getContext('2d');
        const background = await Canvas.loadImage('./assets/img/wallpaper.jpg');
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    
        ctx.strokeStyle = '#74037b';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
    
        // Slightly smaller text placed above the member's display name
        ctx.font = '28px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText('Welcome to the server,', canvas.width / 2.5, canvas.height / 3.5);
    
    
        // Add an exclamation point here and below
        ctx.font = applyText(canvas, `${message.displayName}!`);
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`${message.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);
    
        ctx.beginPath();
        ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
    
        const avatar = await Canvas.loadImage(message.user.displayAvatarURL);
        ctx.drawImage(avatar, 25, 25, 200, 200);
    
        const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.jpg');
    
        channel.send(`Welcome to the server, ${message}!`, attachment);

        // let roles = JSON.parse(fs.readFileSync("./role.json", "utf8"));
        // if (!roles[message.guild.id]) {
        //     roles[message.guild.id] = {
        //         roles: config.role
        //     };
        // }
        // var autorole = roles[message.guild.id].roles;
        // if (autorole === '0') return;
        // member.addRole(autorole)


}

