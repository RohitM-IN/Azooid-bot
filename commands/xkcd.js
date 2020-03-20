const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch"); //npm i node-fetch

exports.run = async (client, message, args) => {
if(!message.channel.nsfw) return message.channel.send("Please run this command in a `NSFW` channel.");
if((args[1] && isNaN(args[1])) || !["search", "latest"].includes(args[0])) return message.channel.send("`-xkcd <search|latest> (id)");

let search = args[1] ? `http://xkcd.com/${args[1]}/info.0.json` : "http://xkcd.com/info.0.json";
    try {
        message.channel.send("checking and sending.......").then(msg => {
            fetch(search).then(res => res.json()).then(res => {
                if(!res) return msg.edit("No results found for this comic, sorry!");
                let { safe_title, img, day, month, year, num, alt} = res;

                let embed = new MessageEmbed()
                    .setColor("RANDOM")
                    .setDescription(alt ? alt : "*crickets* - No Description")
                    .setAuthor(`XKCD | ${safe_title} [${num}]`)
                    .setImage(img)
                    .setFooter(`Published ${day}/${month}/${year}`)

                    msg.edit(embed);
        })
        
        })
    } catch(e) {
        console.log(e)
        return message.channel.send("looks like ive broken! Try again.");
    }
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
  };

  exports.help = {
    name: "xkcd",
    description: "xkcd comics, get the latest or certain comic",
    usage: "xkcd <search|latest> (id)",
    category: "Fun",
  };
