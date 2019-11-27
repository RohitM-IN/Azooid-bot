module.exports = async (client) => {
    

    console.log(`Websocket resumed successfully`);
    

    client.user.setPresence({
        status: "online",
        game: {
            name: "@mention help",
            type: "PLAYING"
        }
    });

}