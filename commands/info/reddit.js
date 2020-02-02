var superagent = require("superagent");
var { RichEmbed } = require("discord.js");

module.exports = {
    name: "reddit",
    category: "info",
    description: "Envoie une image d'un sub reddit",
    usage: "$reddit [sub-reddit]",
    run: async (bot, message, args) => {
        let {body} = await superagent
        .get(`https://www.reddit.com/r/${args}.json?sort=top&t=week`)
        .query({limit: 800});

        var allowed = message.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
        if(!allowed.length) return message.reply("Aparament nous sommes a cours de meme pour le moment. 😂😂😂")
        var randomNumber = Math.floor(Math.random() * allowed.length)
        var embed = new RichEmbed()
        .setColor("PURPLE")
        .setTitle(allowed[randomNumber].data.title)
        .setDescription(allowed[randomNumber].data.author)
        .setImage(allowed[randomNumber].data.url)
        .addField('Autre Information', "Up vote:" + allowed[randomNumber].data.ups + " / Commentaire: " + allowed[randomNumber].data.num_comments)
        .setTimestamp()
        .setFooter(bot.user.username, bot.user.displayAvatarURL);
        return message.channel.send(embed)
    }
}