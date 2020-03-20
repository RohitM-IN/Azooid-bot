module.exports = async (client , shardID) => {
    

    console.log(`Websocket resumed successfully`);
    

    client.user.setPresence({
        status: "online",
        game: {
            name: "@mention help",
            type: "PLAYING"
        }
    });

}