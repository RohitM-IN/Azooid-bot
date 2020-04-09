const {MessageEmbed}= require('discord.js')
  
  exports.run = async (client, message, args ,serverData) => {

   

      let embed = new MessageEmbed()
            .setColor(4044018)
            .setAuthor("Anilist Anime Notification",message.client.user.avatarURL())
            .setTitle("Anime Commands")
            .setURL("https://anilist.co")
            .setFooter("For more information, go to my web dashboard")
            .addField("watch","Adds a new anime to watch for new episodes of. Whatever channel this is used in is the channel the announcements will be made in.\nYou may provide an AniList entry link, a direct AniList media ID, or a MyAnimeList link.",true)
            .addField("unwatch","Removes an anime from the list. Whatever channel this is used in is the channel the announcements will be made in.\nYou may provide an AniList entry link, a direct AniList media ID, or a MyAnimeList link.",true)
            .addField("upcoming","Displays the next anime to air (in the next 7 days) that the current channel is watching.")
            .addField("watching","Prints a list of all anime names being watched that are still currently airing.",true)
            .addField("cleanani","Purges any completed shows from this channel's watch list.",true)
            .setFooter("IF I recated with 👍:Successfull 👎:Unsuccessfull")
            .setTimestamp();

            message.channel.send(embed);
    }
  
    


  

  
  exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
  };
  
  exports.help = {
    name: "anime",
    description: "Anime Help command on how to use anime commands",
    usage: "anime",
    category: "Anime",
  };