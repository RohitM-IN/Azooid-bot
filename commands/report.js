const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

exports.run = async (client, message, args) => {
        if (message.deletable) message.delete();
        if(!message.member.hasPermission(["BAN_MEMBERS"])) return message.channel.send("You dont have permission to perform this command!")
        if(!message.guild.me.hasPermission(["BAN_MEMBERS"])) return message.channel.send("I don't have permission to perform this command.")

        let rMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!rMember)
            return message.reply("Couldn't find that person?").then(m =>m.delete({ timeout: 5000 }));

        if (rMember.hasPermission("BAN_MEMBERS"))
            return message.channel.send("Can't report that member").then(m =>m.delete({ timeout: 5000 }));

        if (!args[1])
            return message.channel.send("Please provide a reason for the report").then(m =>m.delete({ timeout: 5000 }));
        
        const channel = message.guild.channels.cache.find(ch => ch.name.includes('report')) || message.guild.channels.cache.find(ch => ch.name.includes('reports'))||message.guild.channels.cache.find(ch => ch.name.includes('member-log')) || message.guild.channels.cache.find(ch => ch.name.includes('log')) || messageDelete.guild.channels.find(ch => ch.name.includes('logs')) ;
            
        if (!channel)
            return message.channel.send("Couldn't find a `#reports` or `#log` channel").then(m =>m.delete({ timeout: 5000 }));

        const embed = new MessageEmbed()
            .setColor("#ff0000")
            .setTimestamp()
            .setFooter(message.guild.name, message.guild.iconURL())
            .setAuthor("Reported member", rMember.user.displayAvatarURL())
            .setDescription(stripIndents`**> Member:** ${rMember} (${rMember.user.id})
            **> Reported by:** ${message.member}
            **> Reported in:** ${message.channel}
            **> Reason:** ${args.slice(1).join(" ")}`);

        return channel.send(embed);
    }
    exports.conf = {
        enabled: true,
        guildOnly: true,
        aliases: [],
        permLevel: "User"
      };
      
      exports.help = {
        name: "report",
        description: "Reports a member",
        category: "Moderation",
        usage: "report <mention | id>",
      };