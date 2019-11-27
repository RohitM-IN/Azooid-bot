

module.exports = async (client) => {
    

        console.log(`Hi, ${client.user.username} is now online and ready to server in ${client.guilds.size} servers and serving ${client.guilds.reduce((c, p) => c + p.memberCount, 0)} users!.`);
        
    
        client.user.setPresence({
            status: "online",
            game: {
                name: "@mention help",
                type: "PLAYING"
            }
        });
    
}