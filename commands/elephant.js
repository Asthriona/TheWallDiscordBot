
var discord = require("discord.js");
var superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
    //cats
    let {body} = await superagent
    .get(`https://random.dog/woof.json`);
    let elephembed = new discord.RichEmbed()
    .setColor("#800080")
    .setTitle("Cute Kitty")
    .setImage("https://images.unsplash.com/photo-1505148230895-d9a785a555fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80");

    message.channel.send(elephembed)
    console.log(`${message.author.username} used !elephant... It's super effective!!! on ${message.guild.name}`)
}

module.exports.help = {
    name: "elephant",
    description: "ELEPHANT! :broken:"
}