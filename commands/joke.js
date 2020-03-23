const got = require('got');

exports.run = async (client, message, args) => {
  got('https://www.reddit.com/r/jokes/random/.json').then(response => {
    let content = JSON.parse(response.body);
    var title = content[0].data.children[0].data.title;
    var joke = content[0].data.children[0].data.selftext;
    message.channel.send('**' + title + '**');
    message.channel.send(joke)
  }).catch(e => message.channel.send(`Looks like i broke try again! :cry:`));
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["jokes", "laugh"],
  permLevel: "User"
};

exports.help = {
  name: "joke",
  description: "Sends a Joke to a channel !",
  usage: "joke",
  category: "Fun",
};