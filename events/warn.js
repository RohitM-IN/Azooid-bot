module.exports =  (client,info) => {
    
    console.log(`warn: ${info}`);
    client.fetchUser("348832732647784460",false).then(user => {
        user.send(`warn: ${info}`) 
})

}