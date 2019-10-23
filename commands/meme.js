var discord = require("discord.js");
var superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
    //meme
    let {body} = await superagent
    .get(`https://some-random-api.ml/meme`);
    let embed = new discord.RichEmbed()
    .setColor("#800080")
    .setTitle("NEXT :clap: MEME! :clap:")
    .setImage(body.image);

    message.channel.send(embed)
    console.log(`${message.author.username} used !meme`)
}

module.exports.help = {
    name: "meme",
    description: "Random meme image."
}