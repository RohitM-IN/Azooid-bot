const {Client,Collection,Permissions} = require("discord.js");
const Discord = require("discord.js");
const {config} = require("dotenv");
const fs = require("fs");
const config1 = require("./config.json");
const xp = require("./data/xp.json");
const Canvas = require("canvas")
const {promisify,inspect} = require('util');
const readdir = promisify(fs.readdir);
const ascii = require("ascii-table");
let table = new ascii("Events");
const https = require("https");
table.setHeading("Event", "Load status");

const client = new Client({
    disableEveryone: true
});

client.commands = new Collection();
client.aliases = new Collection();

client.categories = fs.readdirSync("./commands/");

//init database
const firebase = require('firebase/app');
const FieldValue = require('firebase-admin').firestore.FieldValue;
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://azooid-discordbot.firebaseio.com"
})

let db = admin.firestore();
var ref = admin.database().ref();
var usersRef = ref.child('guilds');

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
    let prefix
    await db.collection('guilds').doc(message.guild.id).get().then((q) => {
        if (q.exists) {
            prefix = q.data().prefix || config1.prefix_mention;
        } else {
            prefix = "." || config1.prefix_mention;
        }
    })

    //if (!message.member) message.member = await message.guild.fetchMember(message);
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
    if (!prefixRegex.test(message.content)) return;

    const [, matchedPrefix] = message.content.match(prefixRegex);
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/g);


    // const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (!message.channel.permissionsFor(client.user).has("SEND_MESSAGES")) return message.author.send(`I cannot send message in ${message.channel.name} in ${message.guild.name} Contact server admin for this issue !`);

    if(command.clientPermissions.length > 0) {
        let clientChannelPermissions = message.channel.permissionsFor(client.user);
        let ChannelPermissions = new Permissions(clientChannelPermissions.bitfield);
        if(!ChannelPermissions.has(command.clientPermissions)) {
            let missingPermissions = command.clientPermissions.filter(perm => ChannelPermissions.has(perm) === false).join(', ')
            return message.reply(`I can't execute this command, missing permissions for ${missingPermissions}`)
        }
    }
    
    if(command.userPermissions.length > 0) {
        let memberChannelPermissions = message.channel.permissionsFor(message.member);
        memberChannelPermissions = new Permissions(memberChannelPermissions.bitfield);
        if(!memberChannelPermissions.has(command.clientPermissions)) {
            let missingPermissions = command.clientPermissions.filter(perm => memberChannelPermissions.has(perm) === false).join(', ')
            return message.reply(`I can't execute this command, you are missing these permissions: ${missingPermissions}`)
        }
    }
    if (command)
        command.run(client, message, args, db);
})

const load = async () => {
    const evtFiles = await readdir("./events");
    var total = 0;

    evtFiles.forEach(file => {
        if (file.split(".").slice(-1)[0] !== "js") return;
        const evtName = file.split(".")[0];
        const event = require(`./events/${file}`);
        table.addRow(file, '✅');
        client.on(evtName, event.bind(null, client));
        delete require.cache[require.resolve(`./events/${file}`)];
        total = total + 1;

    })
    console.log(table.toString());
    console.log(`Total no of events ${total} loaded ✅`);
}

client.on('guildCreate', async gData => {
    db.collection('guilds').doc(gData.id).set({
        'guildID': gData.id,
        'guildName': gData.name,
        'guildOwner': gData.owner.user.username,
        'guildOwnerID': gData.owner.id,
        'guildMemberCount': gData.memberCount,
        'prefix': '.',
        'welcomeChannelID': "default",
        'logchannel': 'default',
        'voicelogchannel': 'default',
        'guildautorole': 'default',
        'defaultchannelID': "default",
        'playervolume': 100
    })
    client.fetchUser(gData.owner.id, false).then(user => {
        user.send("Thanks for Inviting me to " + gData.name + " plz use welcome and log command to set the channel \nEX: <prefix>welcome #<channel name> \nEX: <prefix>log -h", )
    })
})
client.on('guildDelete', async gData => {
    db.collection('guilds').doc(gData.id).delete()
})


process.on('unhandledRejection', (error,origin) => console.log(`Uncaught Promise Rejection ${error}\nOrigin: ${toString(origin)}`));

client.login(process.env.TOKEN);
// client.login(config1.token);
load();