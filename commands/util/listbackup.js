// const { RichEmbed } = require("discord.js");
// // const backup = require("discord-backup");
// const backup = require("server-cloner.js");
// backup.setStorageFolder(__dirname+"/backups/");

module.exports = {
    name: "listbackup",
    aliases: ["l-backup"],
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
        // backup.list().then((backups) => {
        //     console.log(backups);
        // });

        //example

        // // // let backupID = args[0];
        // // // if(!backupID){
        // // //     return message.channel.send(":x: | You must specify a valid backup ID!");
        // // // }
        // // // // Fetch the backup
        // // // backup.fetch(backupID).then((backupInfos) => {
        // // //     const date = new Date(backupInfos.createdTimestamp);
        // // //     const yyyy = date.getFullYear().toString(), mm = (date.getMonth()+1).toString(), dd = date.getDate().toString();
        // // //     const formatedDate = `${yyyy}/${(mm[1]?mm:"0"+mm[0])}-${(dd[1]?dd:"0"+dd[0])}`;
        // // //     let embed = new Discord.MessageEmbed()
        // // //         .setAuthor("Backup Informations")
        // // //         // Display the backup ID
        // // //         .addField("ID", backupInfos.ID, true)
        // // //         // Displays the server from which this backup comes
        // // //         .addField("Server", backupInfos.guildID, true)
        // // //         // Display the size (in mb) of the backup
        // // //         .addField("Size", backupInfos.size, true)
        // // //         // Display when the backup was created
        // // //         .addField("Created at", formatedDate, true)
        // // //         .setColor("#FF0000");
        // // //     message.channel.send(embed);
        // // // }).catch((err) => {
        // // //     // if the backup wasn't found
        // // //     return message.channel.send(":x: | No backup found for `"+backupID+"`!");
        // // // });
        
    }
}