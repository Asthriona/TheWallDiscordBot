var discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    //say
    logger.info(`${message.author.username} used !say`)
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("No.");
    let botmessage = args.join(" ");
    message.delete().catch();
    logger.info(`${message.author.username} -> ${botmessage}`)
    message.channel.send(botmessage);
}

module.exports.help = {
    name: "say",
    description: "THE WALL SAID SOMETHING! YOU BETTER LISTEN!"
}