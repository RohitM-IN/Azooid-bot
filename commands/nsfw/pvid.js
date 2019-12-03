const Discord = require('discord.js');

module.exports = {
    name: 'pvid',
    group: 'nsfw',
    description: 'Searches for sex videos',
    format: 'pvid {query}',
    aliases: [],
    examples: ['pvid ass', 'pvid tits'],
    clientpermissions: ['SEND_MESSAGES'],
    userpermissions: [],
    shortDescription: 'Videos',
    run: async (client, message) => {

        const args = message.content.split(' ').slice(1);
    
        if (!message.channel.nsfw) return message.channel.send("The channel has to be NSFW!");
        if (args.length === 0) return message.channel.send("You have to decide what type of pornography you want to see");
        const Pornsearch = require('pornsearch');
    
        try {
          /* eslint no-undef: 0 */
          const Searcher = await Pornsearch.search(args.join(' ')).videos();
    
          const result = Math.floor(Math.random() * Searcher.length);
    
          const { url } = Searcher[result - 1];
          const thumbnail = Searcher[result - 1].thumb;
          const { title } = Searcher[result - 1];
          const { duration } = Searcher[result - 1];
    
          const embed = new Discord.MessageEmbed()
            .setImage(thumbnail)
            .setURL(url)
            .setDescription(`Duration: ${duration} minutes`)
            .setColor('#ff0000')
            .setFooter(url)
            .setURL(url)
            .setAuthor(title);
    
          return message.channel.send(embed);
        }
        catch (error) {
            return message.reply("Could not find any videos to your request");
        }

        // const args = message.content.split(' ').slice(1);
    
        // if (!message.channel.nsfw) return message.channel.send("The channel has to be NSFW!");
        // if (args.length === 0) return message.channel.send("You have to decide what type of pornography you want to see");
        // const Pornsearch = require('pornsearch');
    
        // try {
        //   /* eslint no-undef: 0 */
        //   const Searcher = new Pornsearch(args.join(' '), 'sex');
        //   const videos = await Searcher.videos();
    
        //   const result = Math.floor(Math.random() * videos.length);
    
        //   const { url } = videos[result - 1];
        //   const thumbnail = videos[result - 1].thumb;
        //   const { title } = videos[result - 1];
        //   const { duration } = videos[result - 1];
    
        //   const embed = new Discord.MessageEmbed()
        //     .setImage(thumbnail)
        //     .setURL(url)
        //     .setDescription(`Duration: ${duration} minutes`)
        //     .setColor('#ff0000')
        //     .setFooter(url)
        //     .setURL(url)
        //     .setAuthor(title);
    
        //   return message.channel.send(embed);
        // }
        // catch (error) {
        //   return message.reply("Could not find any videos to your request");
        // }
    
  
  }
  
}
