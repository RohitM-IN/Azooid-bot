// const { RichEmbed } = require("discord.js");
// // const backup = require("discord-backup");
// const backup = require("server-cloner.js");
// backup.setStorageFolder(__dirname+"/backups/");

module.exports = {
    name: "backupinfo",
    aliases: ["b-info", "getbackup"],
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
        // // fetch the backup
        
            
            
        
        // backup.fetch(backupID).then((backupInfos) => {
        //     console.log(backupInfos);
        // });
        
    }
}