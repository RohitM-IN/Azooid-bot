const request = require('node-superfetch');
const {
    stripIndents
} = require('common-tags');

exports.run = async (client, message, args) => {
    try {
        const {
            text
        } = await request.get('https://www.humblebundle.com/androidapp/v2/service_check');
        const body = JSON.parse(text);
        if (!body.length) return message.channel.send('There is no bundle right now...');
        if (body.length > 1) {
            return message.channel.send(stripIndents `
                There are **${body.length}** bundles on right now!
                ${body.map(bundle => `**${bundle.bundle_name}:** <${bundle.url}>`).join('\n')}
            `);
        }
        const data = body[0];
        return message.channel.send(stripIndents `
            The current bundle is **${data.bundle_name}**!
            ${data.url}
        `);
    } catch (err) {
        return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
    }
}


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['humble'],
    permLevel: "User"
};

exports.help = {
    name: 'humble-bundle',
    description: 'Responds with the current Humble Bundle.',
    usage: "humbler",
    category: "Fun",
};