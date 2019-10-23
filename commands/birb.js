var discord = require("discord.js");
var superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
    //birb
    let {body} = await superagent
    .get(`https://some-random-api.ml/img/birb`);
    let embed = new discord.RichEmbed()
    .setColor("#800080")
    .setTitle("cute lil birb °w°")
    .setImage(body.link);

    message.channel.send(embed)
    console.log(body.link)
    console.log(`${message.author.username} used !birb`)
}

module.exports.help = {
    name: "birb",
    description: "Send cute bird pict!"
}