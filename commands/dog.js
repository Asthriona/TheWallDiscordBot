var discord = require("discord.js");
var superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
    //cats
    let {body} = await superagent
    .get(`https://random.dog/woof.json`);
    let catembed = new discord.RichEmbed()
    .setColor("#800080")
    .setTitle("DoGGO! :dog:")
    .setImage(body.url);

    message.channel.send(catembed)
    console.log(`${message.author.username} used !doggo on ${message.guild.name}`)
}

module.exports.help = {
    name: "doggo"
}