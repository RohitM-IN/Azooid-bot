const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { getMember, formatDate } = require("../util/function.js");

exports.run = (client, message, args) => {
        const member = getMember(message, args.join(" "));

        // Member variables
        const joined = formatDate(member.joinedAt);
        const roles = member.roles
            .filter(r => r.id !== message.guild.id)
            .map(r => r).join(", ") || 'none';

        // User variables
        const created = formatDate(member.user.createdAt);

        const embed = new MessageEmbed()
            .setFooter(member.displayName, member.user.displayAvatarURL())
            .setThumbnail(member.user.displayAvatarURL())
            .setColor(member.displayHexColor === '#000000' ? '#ffffff' : member.displayHexColor)

            .addField('Member information:', stripIndents`**> Display name:** ${member.displayName}
            **> Joined at:** ${joined}
            **> Roles:** ${roles}`, true)

            .addField('User information:', stripIndents`**> ID:** ${member.user.id}
            **> Username**: ${member.user.username}
            **> Tag**: ${member.user.tag}
            **> Created at**: ${created}`)
            
            .setTimestamp()

        if (member.user.presence.activities) 
            embed.addField('Currently playing', stripIndents`**> Name:** ${member.user.presence.activities.name}`);

        message.channel.send(embed);
    }

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["who", "user"],
    permLevel: "User"
  };
  
  exports.help = {
    name: "whois",
    category: "Miscellaneous",
    description: "Returns user information",
    usage: "[username | id | mention]",
  };