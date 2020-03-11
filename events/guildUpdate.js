const Discord = require('discord.js');
module.exports = async (oldGuild, newGuild) => {

		// var log = newGuild.channels.find(ch => ch.name.includes('member-log')) || newGuild.channels.find(ch => ch.name.includes('log')) // || channel.guild.channels.find(ch => ch.name.includes('logs')) || channel.guild.channels.find(ch => ch.name.includes('general')) ;
		// if(!log) return;
		// // // // if (!messagechannel) return;
		// // // // console.log(oldGuild.name + "\n"+ newGuild.name)
		// if (oldGuild.name !== newGuild.name) {
		// 	db.collection('guilds').doc(newGuild.id).update({
		// 		'guildName': newGuild.name 
		// 	}).then(() => {
		// 		let sEmbed = new Discord.RichEmbed()
		// 		.setColor("e8a515")
		// 		.setTitle("Welcome channel successfully changed")
		// 		.setDescription(`New welcome channel is : " ${newGuild.name} "`);
			
		// 		log.send(sEmbed);
		// 		load();
		// 	})
	
			
	
		
		// // // // 	const embed = new Discord.RichEmbed()
		// // // // 		.setColor('ORANGE')
		// // // // 		.setTimestamp()
		// // // // 		.setAuthor(`:information_source: guild updated`)
		// // // // 		.addField(`📤 Old Name`, oldGuild.name)
		// // // // 		.addField(`📥 New Name`, newGuild.name);
		// // // // 	log.send(embed);
		// }

		// if (oldGuild.afkChannelID !== newGuild.afkChannelID) {
		// 	const embed = new Discord.RichEmbed()
		// 		.setColor('ORANGE')
		// 		.setTimestamp()
		// 		.setAuthor(":information_source: Afk channel updated")
		// 		.addField(`📤 Old Afk channel:`, oldGuild.afkChannel === null ? "There wasn't an AFK channel before" : oldGuild.afkChannel.name)
		// 		.addField(`📥 New Afk channel:`, newGuild.afkChannel === null ? "There isn't an AFK channel anymore" : newGuild.afkChannel.name);
		// 	log.send(embed);
		// }
		
		// // working
		// if (oldGuild.afkTimeout !== newGuild.afkTimeout) {
		// 	const embed = new Discord.RichEmbed()
		// 		.setColor('ORANGE')
		// 		.setTimestamp()
		// 		.setAuthor(":information_source: AFK timeout changed!")
		// 		.addField(`📤 Old AFK timeout:`, `${oldGuild.afkTimeout} seconds`)
		// 		.addField(`📥 New AFK timeout:`, `${newGuild.afkTimeout} seconds`);
		// 		log.send(embed);
		// }

		// if (oldGuild.iconURL() !== newGuild.iconURL()) {
		// 	const embed = new Discord.RichEmbed()
		// 		.setColor('ORANGE')
		// 		.setTimestamp()
		// 		.setAuthor(":information_source: Server icon changed!")
		// 		.addField(`📤 Old server icon:`, oldGuild.iconURL() === null ? "There wasn't a servericon before" : oldGuild.iconURL())
		// 		.addField(`📥 New server icon:`, newGuild.iconURL() === null ? "There isn't a servericon anymore" : newGuild.iconURL());
		// 		log.send(embed);
		// }

		// if (oldGuild.owner.id !== newGuild.owner.id) {
		// 	const embed = new Discord.RichEmbed()
		// 		.setColor('ORANGE')
		// 		.setTimestamp()
		// 		.setAuthor(":information_source: Owner changed!")
		// 		.addField(`📤 Old owner:`, oldGuild.owner.user.tag)
		// 		.addField(`📥 New owner:`, newGuild.owner.user.tag);
		// 		log.send(embed);
		// }
		// function load() {
		// 	let query = db.collection('guilds')
		// 	let guilds = {} // plain object, not array   
		// 	let promise = new Promise(async function(resolve) {
			
		// 	await query.get().then(snapshot => {
		// 	let remaining = snapshot.size; // If firebase, there is this property
		// 		snapshot.forEach(doc => {
		// 			guilds[doc.id] = doc.data();
		// 			remaining--;
		// 			if (!remaining) resolve(guilds);
		// 		});
		// 		})
		// 	});
		// 		promise.then(async function (guilds) {
		// 			// do anything you like with guilds inside this function...
		// 			let temp = { guilds };
		// 			await fs.writeFileSync ("./data/json/serversettings.json", JSON.stringify(temp), function(err) {
		// 				if (err) throw err;
					
		// 			})
		// 	});
	}