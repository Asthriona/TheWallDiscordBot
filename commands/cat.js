var discord = require("discord.js");
var superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
    //cats
    let {body} = await superagent
    .get(`http://aws.random.cat/meow`);
    let catembed = new discord.RichEmbed()
    .setColor("#800080")
    .setTitle("Cute Kitty!")
    .setImage(body.file);

    message.channel.send(catembed)
    console.log(`${message.author.username} used !kitty on ${message.guild.name}`)
}

module.exports.help = {
    name: "kitty",
    description: "Send cute Kitty pict!"
}