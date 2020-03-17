/*
The HELP command is used to display every command's name and description
to the user, so that he may see what commands are available. The help
command is also filtered by level, so if a user does not have access to
a command, it is not shown to them. If a command name is given with the
help command, its extended help is shown.
*/
const fs = require("fs");
const {Util} = require('discord.js')
exports.run = (client, message, args, level) => {
  // If no specific command is called, show all filtered commands.
  if (!args[0]) {
    // Load guild settings (for prefixes and eventually per-guild tweaks)
    const settings = message.settings;

    // Filter all commands by which are available for the user's level, using the <Collection>.filter() method.
    const myCommands = message.guild ? client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level) : client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level &&  cmd.conf.guildOnly !== true);

    // Here we have to get the command names only, and we use that array to get the longest name.
    // This make the help commands "aligned" in the output.
    const commandNames = myCommands.keyArray();
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    let data = JSON.parse(fs.readFileSync("./data/json/serversettings.json", "utf8"))
    let prefix = data['guilds'][message.guild.id]['prefix'];

    let currentCategory = "";
    let output = `= Command List =\n\n[Use ${prefix || '.'}help <commandname> for details]\n`;
    let output1 =`` , output2 = ``,output3 =``,output4 =``;
    const sorted = myCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 :  p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 );
    let text = []
    sorted.forEach( c => {
      const cat = c.help.category.toProperCase();
      if (currentCategory !== cat) {
        output += `\n== ${cat} ==\n`;
        currentCategory = cat;
      }
     output += `${prefix}${c.help.name}${" ".repeat(longest - c.help.name.length)} :: ${c.help.description}\n`;
     if(output.length > 1900){
      text.push(Util.splitMessage(output ,1900))
      output = ``
     } 
    });
    
    output = text[0]
    output1 = text[1]
    output2 = text[3]
    if(text[4]) output3 = text[4];
    message.channel.send(output, {code:"asciidoc"});
    if(output1 !== ``) message.channel.send(output1, {code:"asciidoc"});
    if(output2 !== ``) message.channel.send(output2, {code:"asciidoc"});
    if(output3 !== ``) message.channel.send(output3, {code:"asciidoc"});
    if(output4 !== ``) message.channel.send(output4, {code:"asciidoc"});
    message.channel.send(`See the Dashboard on <${client.config.dashboard.callbackURL.split("/").slice(0, -1).join("/")}>`);
  } else {
    // Show individual command's help.
    let command = args[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      if (level < client.levelCache[command.conf.permLevel]) return;
      message.channel.send(`= ${command.help.name} = \n${command.help.description}\nusage::${command.help.usage}`, {code:"asciidoc"});
      message.channel.send(`See the Dashboard on <http://3.6.81.103>`);
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["h", "halp"],
  permLevel: "User"
};

exports.help = {
  name: "help",
  category: "System",
  description: "Displays all the available commands for your permission level.",
  usage: "help [command]"
};
