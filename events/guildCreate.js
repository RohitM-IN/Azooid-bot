const Discord = require("discord.js");
const fs = require("fs");
const config1 = require("../config.json");

module.exports =  (client, message,guild) => {

//     let msgs = JSON.parse(fs.readFileSync("./prefixsettings.json", "utf8"));

    // msgs [client.guild.id]= {
    //     prefixes: config1.prefix
    // };
    // await fs.writeFile("./prefixsettings.json", JSON.stringify(msgs), (err) => {
    //     if (err) throw err;
    //     console.log(`done`);
 
    // });

    // Your other stuff like adding to guildArray
    console.log(`Hi, ${client.user.username} is now serving in ${client.guilds.size} servers and serving ${client.guilds.reduce((c, p) => c + p.memberCount, 0)} users!.`);
        

}

