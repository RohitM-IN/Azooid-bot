const {
    MessageEmbed
} = require("discord.js");
const fs = require('fs')

exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send("You dont have permission to use this command.");

    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("I don't have permission to add roles!")

    //define the reason and unmutee
    let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!mutee) return message.channel.send("Please supply a user to be muted!");

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason given"

    //define mute role and if the mute role doesnt exist then send a message
    let muterole = message.guild.roles.cache.find(r => r.name === "Muted")
    if (!muterole) return message.channel.send("There is no mute role to remove!")

    //remove role to the mentioned user and also send the user a dm explaing where and why they were unmuted
    mutee.roles.remove(muterole.id).then(() => {
        message.delete()
        mutee.send(`Hello, you have been unmuted in ${message.guild.name} for: ${reason}`).catch(err => console.log(err))
        message.channel.send(`${mutee.user.username} was unmuted!`)
    })

    //send an embed to the modlogs channel
    let embed = new MessageEmbed()
        .setColor('#f94343')
        .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
        .addField("Moderation:", "unmute")
        .addField("Mutee:", mutee.user.username)
        .addField("Moderator:", message.author.username)
        .addField("Reason:", reason)
        .addField("Date:", message.createdAt.toLocaleString())

    let sChannel = message.guild.channels.cache.find(ch => ch.name.includes('report')) || message.guild.channels.cache.find(ch => ch.name.includes('reports')) || message.guild.channels.cache.find(ch => ch.name.includes('member-log')) || message.guild.channels.cache.find(ch => ch.name.includes('log')) || messageDelete.guild.channels.find(ch => ch.name.includes('logs'));
    sChannel.send(embed)

}


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "unmute",
    description: "Unmutes members in a server",
    category: "Moderation",
    usage: "unmute <user>",
};