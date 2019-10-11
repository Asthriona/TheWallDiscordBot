var discord = require("discord.js");
var superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
    //wink
    let {body} = await superagent
    .get(`https://some-random-api.ml/animu/hug`);
    let winkembed = new discord.RichEmbed()
    .setColor("#800080")
    .setTitle("Hug! <3")
    .setImage(body.link);

    message.channel.send(winkembed)
    console.log(`${message.author.username} used !wink`)
}

module.exports.help = {
    name: "hug"
}
