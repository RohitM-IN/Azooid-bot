exports.run = async (client, message, args) => {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("off..You dont have permission to use this command");
    if (!args[0]) return message.channel.send("enter amount of message max 100");
    // if(args[0] == String) return message.channel.send('enter amount!'); 
    if (args[0] == "all") args[0] = 100;
    if (args[0] == "up") args[0] = 100;

    if (args[0] > 100) {
        message.channel.send("please enter amount less than 100").then(msg => msg.delete({
            timeout: 5000
        }));
    } else {
        message.channel.bulkDelete(args[0], true).then(() => {
            message.channel.send(`Cleared ${args[0]} messages.`).then(msg => msg.delete({
                timeout: 5000
            })).catch(err => message.channel.send('There are no messages younger than two weeks that can be deleted.').then(m => m.delete({
                timeout: 5000
            })));
        })
    }

}


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['proune', 'cleanup', 'delete'],
    permLevel: "User"
};

exports.help = {
    name: "clean",
    description: "Bulk cleans the messages",
    category: "Moderation",
    usage: "clean <number of messages 1-100>",
};