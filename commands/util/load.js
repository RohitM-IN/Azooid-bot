// const { RichEmbed } = require("discord.js");
// // const backup = require("discord-backup");
// const backup = require("server-cloner.js");
// backup.setStorageFolder(__dirname+"/backups/");

module.exports = {
    name: "load",
    aliases: ["restore-server", "restore"],
    category: "util",
    description: "creates a backup of a server",
    usage: "load <backup name>",
    run: (client, message, args) => {
        message.channel.send(`command will be added soon as discord.js version goes to v12\n to check the version type \`.npm discord.js\``)
        // let backupID = args[0];
        // let Guild = message.guild.id;
        // // Check member permissions
        // if(!message.member.hasPermission("ADMINISTRATOR")){
        //     return message.channel.send(":x: | You must be an administrator of this server to request a backup!");
        // }
        // // load the backup
        
            
            
        
        // backup.load(backupID, Guild).then(() => {
        //     backup.delete(backupID);
        //     message.channel.send('restored!!')
        // });


        // Example 

        // // // // Check member permissions
        // // // if(!message.member.hasPermission("ADMINISTRATOR")){
        // // //     return message.channel.send(":x: | You must be an administrator of this server to load a backup!");
        // // // }
        // // // let backupID = args[0];
        // // // if(!backupID){
        // // //     return message.channel.send(":x: | You must specify a valid backup ID!");
        // // // }
        // // // // Fetching the backup to know if it exists
        // // // backup.fetch(backupID).then(async () => {
        // // //     // If the backup exists, request for confirmation
        // // //     message.channel.send(":warning: | When the backup is loaded, all the channels, roles, etc. will be replaced! Type `-confirm` to confirm!");
        // // //         await message.channel.awaitMessages(m => (m.author.id === message.author.id) && (m.content === "-confirm"), {
        // // //             max: 1,
        // // //             time: 20000,
        // // //             errors: ["time"]
        // // //         }).catch((err) => {
        // // //             // if the author of the commands does not confirm the backup loading
        // // //             return message.channel.send(":x: | Time's up! Cancelled backup loading!");
        // // //         });
        // // //         // When the author of the command has confirmed that he wants to load the backup on his server
        // // //         message.author.send(":white_check_mark: | Start loading the backup!");
        // // //         // Load the backup
        // // //         backup.load(backupID, message.guild).then(() => {
        // // //             // When the backup is loaded, delete them from the server
        // // //             backup.delete(backupID);
        // // //         }).catch((err) => {
        // // //             // If an error occurenced
        // // //             return message.author.send(":x: | Sorry, an error occurenced... Please check that I have administrator permissions!");
        // // //         });
        // // // }).catch((err) => {
        // // //     // if the backup wasn't found
        // // //     return message.channel.send(":x: | No backup found for `"+backupID+"`!");
        // // // });
        
    }
}