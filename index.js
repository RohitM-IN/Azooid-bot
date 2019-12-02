const { Client, Collection } = require("discord.js");
const Discord = require("discord.js");
const { config } = require("dotenv");
const fs = require("fs");
const config1 = require("./config.json");
const xp = require("./data/xp.json");
const Canvas = require("canvas")
const { promisify, inspect } = require('util');
const readdir = promisify(fs.readdir);
const ownerid = "348832732647784460";
const ascii = require("ascii-table");
let table = new ascii("Events");
table.setHeading("Event", "Load status");
let prefix = "." || config1.prefix_mention ;

const client = new Client({
    disableEveryone: true
});

client.commands = new Collection();
client.aliases = new Collection();

client.categories = fs.readdirSync("./commands/");

config({
    path: __dirname + "/.env"
});

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});
const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
 client.on('message', async (message) => {

    
    if (message.author.bot) return;
    if (!message.guild) return;

    
  //  || prefixes[message.guild.id].prefixes;

    if (!message.member) message.member = await message.guild.fetchMember(message);
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
    if (!prefixRegex.test(message.content)) return;
 

	const  matchedPrefix = message.content.match(prefixRegex);
	const args = message.content.slice(matchedPrefix.length).trim().split(/ +/g);


    // const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command)
        command.run(client, message, args);
 })

const load = async () => {
    const evtFiles = await readdir("./events");
    var total = 0;

    evtFiles.forEach(file => {
        if (file.split(".").slice(-1)[0] !== "js") return;
        const evtName = file.split(".")[0];
        const event = require(`./events/${file}`);
        // table.addRow(file, '✅');
        client.on(evtName, event.bind(null, client));
        delete require.cache[require.resolve(`./events/${file}`)];
        total = total +1;

    })
    // console.log(table.toString());
    // console.log(`Total no of events ${total} loaded ✅`);
}
process.on('uncaughtException', (err) => {
  const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, 'g'), './');
  console.dir(errorMsg);
});


process.on('unhandledRejection', error => console.log('Uncaught Promise Rejection', error));

// client.login(process.env.TOKEN);
client.login(config1.token);
  load();
  