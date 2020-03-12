module.exports = {
    name: "ping",
    category: "info",
    description: "Returns latency and API ping",
    clientPermissions: ["SEND_MESSAGES"],
	userPermissions:["VIEW_CHANNEL"],
    run: async (client, message, args) => {
        
        const msg = await message.channel.send(`🏓 Pinging....`);
        
        msg.edit(`🏓 Pong!
        Latency is ${Math.floor((msg.editedTimestamp || msg.createdTimestamp) - (message.editedTimestamp || message.createdTimestamp))}ms
        API Latency is ${Math.round(client.ping)}ms`);
    }
    
}
