var discord = require("discord.js");
var superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
    //Uptime
    let totalSeconds = (bot.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60; seconds.toFixed(0);
    let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;

    message.channel.send(uptime)
    console.log(`${message.author.username} used uptime ${uptime}`)
}

module.exports.help = {
    name: "uptime"
}
