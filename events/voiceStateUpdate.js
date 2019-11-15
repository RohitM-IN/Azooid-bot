const Discord = require("discord.js");
const client = new Discord.Client();
module.exports = async (oldMember,newMember,message) => {
    
    if(newMember.user.bot) return;
    let newUserChannel = newMember.voiceChannel
    let oldUserChannel = oldMember.voiceChannel

    let newdate = new Date(newMember.joinedTimestamp)

    var log =  message.guild.channels.find(ch => ch.name.includes('voice-log')) || message.guild.channels.find(ch => ch.name.includes('member-log')) || message.guild.channels.find(ch => ch.name.includes('log')) || message.guild.channels.find(ch => ch.name.includes('logs')) || message.guild.channels.find(ch => ch.name.includes('general'));
  
    if(oldUserChannel === undefined && newUserChannel !== undefined) {
        log.send(`:small_red_triangle_down: <@${newMember.user.id}> Left a voice channel at ${newdate}`); 
    } else if(newUserChannel === undefined){
        log.send(`:white_check_mark: <@${newMember.user.id}> Joined a voice channel at ${newdate}`);
    }else if(oldUserChannel !== newUserChannel){
        log.send(`:arrow_right: <@${newMember.user.id}> moved from voice channel at ${newdate}`);
    }
              
    }


