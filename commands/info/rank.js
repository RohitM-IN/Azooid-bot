module.exports = {
    name: "rank",
    category: "info",
    description: "Returns your rank in this server",
    aliases: ["xp", "rankinfo","level"],
    clientPermissions: ["SEND_MESSAGES"],
	userPermissions:["VIEW_CHANNEL"],
    run: async (client, message, args) => {
        
        message.channel.send(`this command is in development it will be avalable soon`);
    }
    
}
