const { readdirSync } = require("fs");
const fs = require('fs')
const ascii = require("ascii-table");

let table = new ascii("Commands");
table.setHeading("Command", "Load status");
// let table1 = new ascii("events");
// table1.setHeading("Command", "Load status");

module.exports = (client) => {
    var total = 0;
    var errcmd = 0;

    readdirSync("./commands/").forEach(dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));
        
        for (let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);
    
            if (pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(file, '✅');
                total = total +1;
            } else {
                table.addRow(file, `❌  -> missing a help.name, or help.name is not a string.`);
                continue;
                errcmd = errcmd + 1;
            }
    
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }
       
    });
    // readdirSync("./events/").forEach(dir => {

    //     const events = readdirSync(`./events/`).filter(file => file.endsWith(".js"));
    
    //     for (let file of events) {
    //         let _pull = require(`../events/${file}`);
    
    //         if (_pull) {
    //             client.commands.set(pull.name, pull);
    //             table1.addRow(file, '✅');
    //         } else {
    //             table1.addRow(file, `❌  -> missing a help.name, or help.name is not a string.`);
    //             continue;
    //         }
    
    //         if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
    //     }
       
    // });
    
    console.log(table.toString());
    console.log(`Total no of commands ${total} loaded ✅`);
    if(!errcmd == 0){
        console.log(`Total no of commands ${errcmd} failed to load ❌`);
    }
    

}
