const { get } = require("snekfetch");
const { RichEmbed } = require('discord.js');
var dateFormat = require('dateformat');

module.exports = {
    name: "anime",
    category: "search",
    description: "Gives info on anime",
    run: async (client, message, args) => {
        
        if(!args[0]) return message.channel.send("enter name of anime")

        let name = args.join("%20");
        
        const sim = await get(`https://api.simkl.com/search/anime?q=${name}&client_id=9bfc33cb3e820c2d7687b0d61d0b7db6d3560ca0c9534dc830f353c35c04b4e5`);
        poster = sim.body[0].poster;
        
        let simkl_id = sim.body[0].ids.simkl_id
        const res = await get(`https://api.simkl.com/anime/${simkl_id}?client_id=9bfc33cb3e820c2d7687b0d61d0b7db6d3560ca0c9534dc830f353c35c04b4e5&extended=full`);
        let data = res.body
        let time = dateFormat(data.first_aired, "GMT:dd-mmmm-yyyy, h:MM:ss TT");
        //console.log(time)
        let embed = new RichEmbed()
        .setTitle(data.title)
        .setColor("GREEN")
        .setDescription(`\`\`\`${data.overview}\`\`\``)
        .setThumbnail(`https://simkl.in/posters/${poster}_m.jpg`)
        .addField(`Toatal ep`,`${data.total_episodes}`)
        .addField(`Rating :`,data.ratings.mal.rating + "/ 10")
        .addField(`Status:`,data.status,true)
        .addField(`Type:`,data.anime_type,true)
        .addField("Geners",(data.genres).toString())
        .addField(`First Aired:`,`${time} GMT`,)
        //console.log(data.overview)
        message.channel.send("still in development!!!",embed)
        

        
      
    }
    
}
