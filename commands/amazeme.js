const got = require('got');

exports.run = async (client, message, args) => {
        got('https://www.reddit.com/r/interestingasfuck/random.json').then(response => {
            let content = JSON.parse(response.body);
            var title = content[0].data.children[0].data.title;
            var amazeme = content[0].data.children[0].data.url;
            message.channel.send('**' + title + '**');
            message.channel.send(amazeme)
        }).catch(e => message.channel.send(`Looks like i broke try again! :cry:`));
    }


exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["amaze"],
    permLevel: "User"
  };

  exports.help = {
    name: "amazeme",
    description: "Sends a message to amaze you !",
    usage: "amazeme ",
    category: "Fun",
  };