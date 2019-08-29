var discord = require("discord.js");
var superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
    //wink
 
    try {
        let {body} = await superagent
            .get(`https://www.reddit.com/r/${args}.json?sort=top&t=week`)
            .query({ limit: 800 });
        const allowed = message.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
        if (!allowed.length) return message.channel.send('It seems we are out of fresh memes!, Try again later.');
        const randomnumber = Math.floor(Math.random() * allowed.length)
        const embed = new discord.RichEmbed()
        .setColor("#800080")
        .setTitle(allowed[randomnumber].data.title)
        .setDescription("Posted by: " + allowed[randomnumber].data.author)
        .setImage(allowed[randomnumber].data.url)
        .addField("Other info:", "Up votes: " + allowed[randomnumber].data.ups + " / Comments: " + allowed[randomnumber].data.num_comments)
        .setFooter(`Memes provided by r/${args}`)
        message.channel.send(embed)
    } catch (err) {
        return console.log(err);
    }
    console.log(`${message.author.username} used !reddit ${args}`)
}
module.exports.help = {
    name: "reddit"
}