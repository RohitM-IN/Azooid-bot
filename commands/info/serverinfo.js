const { RichEmbed } = require("discord.js")


module.exports = {
        name: "serverinfo",
        description: "Pulls the serverinfo of the guild!",
        usage: "!serverinfo",
        category: "miscellaneous",
        accessableby: "Members",
        aliases: ["si", "serverdesc"],
    run: async (client, message, args) => {
    let sEmbed = new RichEmbed()
        .setColor("RANDOM")
        .setTitle("Server Info")
        .setThumbnail(message.guild.iconURL)
        .setAuthor(`${message.guild.name} Info`, message.guild.iconURL)
        .addField("**Guild Name:**", `${message.guild.name}`, true)
        .addField("**Guild Owner:**", `${message.guild.owner}`, true)
        .addField("**Member Count:**", `${message.guild.memberCount}`, true)
        .addField("**Role Count:**", `${message.guild.roles.size}`, true)
        .setFooter(`${client.user.username} | Footer`, client.user.displayAvatarURL);
    message.channel.send(sEmbed);
    }
}