// const { RichEmbed } = require("discord.js");
// // const backup = require("discord-backup");
// const backup = require("server-cloner.js");
// backup.setStorageFolder(__dirname+"/backups/");

module.exports = {
    name: "deletebackup",
    aliases: ["remove-backup", "destroy-backup"],
    category: "util",
    description: "Deletes backup of created server",
    usage: "load <backup name>",
    run: (client, message, args) => {
        message.channel.send(`command will be added soon as discord.js version goes to v12\n to check the version type \`.npm discord.js\``)
        // let backupID = args[0];
        // let Guild = message.guild.id;
        // // Check member permissions
        // if(!message.member.hasPermission("ADMINISTRATOR")){
        //     return message.channel.send(":x: | You must be an administrator of this server to request a backup!");
        // }
        // // delete the backup
        
            
            
        
        // backup.delete(backupID);
        
    }
}