const {MessageEmbed} = require("discord.js");
const fs = require('fs')

exports.run = async (client, message, args) => {
    // let casedata = JSON.parse(fs.readFileSync("./data/json/caseno.json", "utf8"))
    // let caseno = casedata[message.guild.id]
    // if (!caseno) {
    //     casedata[message.guild.id] = 1;
    //     fs.writeFileSync("./data/json/serversettings.json", JSON.stringify(casedata), function (err) {
    //         if (err) throw err;

    //     })
    // }

    // const usage = new MessageEmbed()
    //     .setColor(0x00A2E8)
    //     .setThumbnail(client.user.avatarURL())
    //     .setTitle("Command: mute")
    //     .addField("Usage", "mute @Someone <minutes> <reason>")
    //     .addField("Example","mute @Someone 5 spamming in general.")
    //     .setDescription("Description: " + "Gives a user the muted role for x minutes");

    // check if the command caller has permission to use the command
if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send("You dont have permission to use this command.");

if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("I don't have permission to add roles!")

//define the reason and mutee
let mutee = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!mutee) return message.channel.send("Please supply a user to be muted!");

let reason = args.slice(1).join(' ') || `Moderator didn't give a reason.`;

let sChannel = message.guild.channels.cache.find(ch => ch.name.includes('report')) || message.guild.channels.cache.find(ch => ch.name.includes('reports'))||message.guild.channels.cache.find(ch => ch.name.includes('member-log')) || message.guild.channels.cache.find(ch => ch.name.includes('log')) || messageDelete.guild.channels.find(ch => ch.name.includes('logs')) ;
//define mute role and if the mute role doesnt exist then create one
let muterole = message.guild.roles.cache.find(r => r.name === "Muted")
if(!muterole) {
    try{
        muterole = await message.guild.roles.create({
            data: {
                name: "Muted",
                color: "#514f48",
                permissions: []
            },
            reason : 'no mute roles'
            
            
        })
        message.guild.channels.cache.forEach(async (channel, id) => {
            await channel.overwritePermissions({
                id: muterole,
                deny:['SEND_MESSAGES','ADD_REACTIONS','SEND_TTS_MESSAGES','ATTACH_FILES','SPEAK'] 
            })
        })
    } catch(e) {
        console.log(e.stack);
    }
}

//add role to the mentioned user and also send the user a dm explaing where and why they were muted
mutee.roles.add(muterole.id).then(() => {
    message.delete()
    mutee.send(`Hello, you have been in ${message.guild.name} for: ${reason}`).catch(err => console.log(err))
    message.channel.send(`${mutee.user.username} was successfully muted.`)
    // casedata[message.guild.id] + 1
    // fs.writeFileSync("./data/json/serversettings.json", JSON.stringify(casedata), function (err) {
    //     if (err) throw err;

    // })
})

//send an embed to the modlogs channel
let embed = new MessageEmbed()
    .setColor('#f94343')
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
    //.setTitle("Case #" + caseno + " | Action: Mute")
    .addField("Moderation:", "mute")
    .addField("Mutee:", mutee.user.username)
    .addField("Moderator:", message.author.username)
    .addField("Reason:", reason)
    .addField("Date:", message.createdAt.toLocaleString())


sChannel.send(embed)

}


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "mute",
    description: "Mutes members in a server",
    category: "Moderation",
    usage: "mute <user>",
};