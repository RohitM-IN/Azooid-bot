const { RichEmbed } = require("discord.js");
const { getMember } = require("../util/function.js");

exports.run = async (client, message, args) => {
        // Get a member from mention, id, or username
        let person = getMember(message, args[0]);

        if (!person || message.author.id === person.id) {
            person = message.guild.members
                .filter(m => m.id !== message.author.id)
                .random();
        }

        const love = Math.random() * 100;
        const loveIndex = Math.floor(love / 10);
        const loveLevel = "💖".repeat(loveIndex) + "💔".repeat(10 - loveIndex);

        const embed = new RichEmbed()
            .setColor("#ffb6c1")
            .addField(`☁ **${person.displayName}** loves **${message.member.displayName}** this much:`,
            `💟 ${Math.floor(love)}%\n\n${loveLevel}`);

        message.channel.send(embed);
    }

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["affinity"],
    permLevel: "User"
  };

  exports.help = {
    name: "love",
    description: "Calculates the love affinity you have for another person.",
    usage: "love [mention | id | username]",
    category: "Fun",
  };