// const { RichEmbed } = require("discord.js");
// // const backup = require("discord-backup");
// const backup = require("server-cloner.js");
// backup.setStorageFolder(__dirname+"/backups/");

module.exports = {
    name: "create",
    aliases: ["backup-server", "backup"],
    category: "util",
    description: "creates a backup of a server",
    usage: "create",
    run: (client, message, args) => {

        message.channel.send(`command will be added as soon as discord.js version goes to v12\n to check the version type \`.npm discord.js\``);
        // // Check member permissions
        // if(!message.member.hasPermission("ADMINISTRATOR")){
        //     return message.channel.send(":x: | You must be an administrator of this server to request a backup!");
        // }
        // // Create the backup
        // backup.create(message.guild).then((backupID) => {
        //     // And send informations to the backup owner
        //     console.log(backupID);
        //     message.channel.send("The backup has been created! To load it, type this command on the server of your choice: `.load "+backupID+"`!");
        // });
        
    }
}