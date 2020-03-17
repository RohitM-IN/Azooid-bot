const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

exports.run = async (client, message, args) => {
        if (message.deletable) message.delete();
        if(!message.member.hasPermission(["BAN_MEMBERS"])) return message.channel.send("You dont have permission to perform this command!")
        if(!message.guild.me.hasPermission(["BAN_MEMBERS"])) return message.channel.send("I don't have permission to perform this command.")

        let rMember = message.mentions.members.first() || message.guild.members.get(args[0]);

        if (!rMember)
            return message.reply("Couldn't find that person?").then(m => m.delete(5000));

        if (rMember.hasPermission("BAN_MEMBERS") || rMember.user.bot)
            return message.channel.send("Can't report that member").then(m => m.delete(5000));

        if (!args[1])
            return message.channel.send("Please provide a reason for the report").then(m => m.delete(5000));
        
        const channel = message.guild.channels.find(c => c.name === "report") || message.guild.channels.find(c => c.name === "log")
            
        if (!channel)
            return message.channel.send("Couldn't find a `#reports` or `#log` channel").then(m => m.delete(5000));

        const embed = new RichEmbed()
            .setColor("#ff0000")
            .setTimestamp()
            .setFooter(message.guild.name, message.guild.iconURL)
            .setAuthor("Reported member", rMember.user.displayAvatarURL)
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