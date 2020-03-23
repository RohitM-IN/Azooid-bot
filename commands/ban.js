const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { promptMessage } = require("../util/function.js");

exports.run = async (client, message, args) => {

        if (message.deletable) message.delete();
    let reason = args.slice(1).join(" ")
        // No args
        if (!args[0]) {
            return message.reply("Please provide a person to ban.")
                .then(m =>m.delete({ timeout: 5000 }));
        }

        // No reason
        if (!args[1]) {
           reason = 'No reason given'
                
        }

        // No author permissions
        if (!message.member.hasPermission("BAN_MEMBERS")) {
            return message.reply("❌ You do not have permissions to ban members. Please contact a staff member")
                .then(m =>m.delete({ timeout: 5000 }));
        
        }
        // No bot permissions
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
            return message.reply("❌ I do not have permissions to ban members. Please contact a staff member")
                .then(m =>m.delete({ timeout: 5000 }));
        }

        const toBan = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        // No member found
        if (!toBan) {
            return message.reply("Couldn't find that member, try again")
                .then(m =>m.delete({ timeout: 5000 }));
        }

        // Can't ban urself
        if (toBan.id === message.author.id) {
            return message.reply("You can't ban yourself...")
                .then(m =>m.delete({ timeout: 5000 }));
        }

        // Check if the user's banable
        if (!toBan.bannable) {
            return message.reply("I can't ban that person due to role hierarchy, I suppose.")
                .then(m =>m.delete({ timeout: 5000 }));
        }
        
        const embed = new MessageEmbed()
            .setColor("#ff0000")
            .setThumbnail(toBan.user.displayAvatarURL())
            .setFooter(message.member.displayName, message.author.displayAvatarURL())
            .setTimestamp()
            .setDescription(stripIndents`**> baned member:** ${toBan} (${toBan.id})
            **> baned by:** ${message.member} (${message.member.id})
            **> Reason:** ${reason}`);

        const promptEmbed = new MessageEmbed()
            .setColor("GREEN")
            .setAuthor(`This verification becomes invalid after 30s.`)
            .setDescription(`Do you want to ban ${toBan}?`)

        // Send the message
        await message.channel.send(promptEmbed).then(async msg => {
            // Await the reactions and the reactioncollector
            const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

            // Verification stuffs
            if (emoji === "✅") {
                msg.delete();

                toBan.ban(args.slice(1).join(" "))
                    .catch(err => {
                        if (err) return message.channel.send(`Well.... the ban didn't work out. Here's the error ${err}`)
                    });

                    let sChannel = message.guild.channels.cache.find(ch => ch.name.includes('report')) || message.guild.channels.cache.find(ch => ch.name.includes('reports'))||message.guild.channels.cache.find(ch => ch.name.includes('member-log')) || message.guild.channels.cache.find(ch => ch.name.includes('log')) || messageDelete.guild.channels.find(ch => ch.name.includes('logs')) ;
                    sChannel.send(embed)
            } else if (emoji === "❌") {
                msg.delete();

                message.reply(`ban canceled.`)
                    .then(m => m.delete(10000));
            }
        });
    }


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
  };
  
  exports.help = {
    name: "ban",
    description: "Bans the member",
    category: "Moderation",
    usage: "ban <@user> <reason in text>",
  };
