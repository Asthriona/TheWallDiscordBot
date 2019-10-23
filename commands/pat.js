var discord = require("discord.js");
var superagent = require("superagent");

module.exports.run = async (bot, message) => {
    //wink
    let {body} = await superagent
    .get(`https://some-random-api.ml/animu/pat`);
    let winkembed = new discord.RichEmbed()
    .setColor("#800080")
    .setTitle("Pat Pat! :D")
    .setImage(body.link);

    message.channel.send(winkembed)
    console.log(`${message.author.username} used !pat`)
}

module.exports.help = {
    name: "pat",
    description: "Give someone a pat pat!"
}