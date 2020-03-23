const {
    MessageEmbed
} = require("discord.js");
const {
    stripIndents
} = require("common-tags");
const {
    promptMessage
} = require("../util/function.js");

exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You dont have permission to perform this command!")


    if (isNaN(args[0])) return message.channel.send("You need to provide an ID.")
    let bannedMember = await client.users.fetch(args[0])
    if (!bannedMember) return message.channel.send("Please provide a user id to unban someone!")

    let reason = args.slice(1).join(" ")
    if (!reason) reason = "No reason given!"

    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("I dont have permission to perform this command!") |
        message.delete()
    try {
        message.guild.members.unban(bannedMember, reason)
        message.channel.send(`${bannedMember.tag} has been unbanned from the guild!`)
    } catch (e) {
        console.log(e.message)
    }

    let embed = new MessageEmbed()
        .setColor('#f94343')
        .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
        .addField("Moderation:", "unban")
        .addField("Moderated on:", `${bannedMember.username} (${bannedMember.id})`)
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
    name: "unban",
    description: "Bans the member",
    category: "Moderation",
    usage: "ban <@user> <reason in text>",
};