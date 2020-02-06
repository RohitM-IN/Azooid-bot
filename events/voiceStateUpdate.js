var dateFormat = require('dateformat');
module.exports =  async (client,oldMember, newMember) => {
		//if(oldMember == )

		var log = newMember.guild.channels.find(ch => ch.name.includes('voice-log')) || newMember.guild.channels.find(ch => ch.name.includes('voicelog')) || newMember.guild.channels.find(ch => ch.name.includes('log')) || newMember.guild.channels.find(ch => ch.name.includes('general')) ;
		if(!log) return;

		let username = oldMember.displayName;
		let oldVCID = oldMember.voiceChannelID;
		let newVCID = newMember.voiceChannelID;
		let day=dateFormat(new Date(), "dd-mm-yy hh:MM:ss");
		if(oldVCID == newVCID) return;
		
		

	let oldChannelName = (oldVCID != null && typeof oldVCID != undefined) ? newMember.guild.channels.get(oldVCID).name : null;
	let newChannelName = (newVCID != null && typeof newVCID != undefined) ? newMember.guild.channels.get(newVCID).name : null;

	
	if (oldChannelName === null)
		log.send(`:white_check_mark: [${day}] \`${username}\` joined voice channel \`${newChannelName}\` `);
	else if (newChannelName === null)
		log.send(`:small_red_triangle_down: [${day}] \`${username}\` left voice channel \`${oldChannelName}\``);
	else
		log.send(`:arrow_right: [${day}] \`${username}\` went from \`${oldChannelName}\` to \`${newChannelName}\` `);

  }


