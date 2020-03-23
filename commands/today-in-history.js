const {
    MessageEmbed
} = require('discord.js');
const request = require('node-superfetch');

exports.run = async (client, message, args) => {
    let month, day, d;
    d = new Date();
    if (!args[0]) {
        month = (d.getMonth() + 1);
        day = d.getDate()
    } else {
        if (args[0] < 13 && args[1] < 32 || args[1] < 32) {
            month = args[0];
            day = args[1];
        } else {
            message.channel.send("Usage: <prefix>today 2 14 \n OR <prefix>today")
        }
    }

    const date = month && day ? `/${month}/${day}` : '';
    try {
        const {
            text
        } = await request.get(`http://history.muffinlabs.com/date${date}`);
        const body = JSON.parse(text);
        const events = body.data.Events;
        const event = events[Math.floor(Math.random() * events.length)];
        const embed = new MessageEmbed()
            .setColor(0x9797FF)
            .setURL(body.url)
            .setTitle(`On this day (${body.date})...`)
            .setTimestamp()
            .setDescription(`${event.year}: ${event.text}`)
            .addField('❯ See More',
                event.links.map(link => `[${link.title}](${link.link.replace(/\)/g, '%29')})`).join('\n'))
            .setFooter(`${client.user.username}`);
        return message.channel.send(embed);
    } catch (err) {
        if (err.status === 404 || err.status === 500) return message.channel.send('Invalid date.');
        return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
    }
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['today', 'history'],
    permLevel: "User"
};

exports.help = {
    name: 'today-in-history',
    description: 'Responds with an event that occurred today in history.',
    usage: "today <month> <day>",
    category: "Fun",
};