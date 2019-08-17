var discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    //reload
//    if(message.author.id != "186195458182479874") return message.channel.send()
//    if(!args[0]) return message.channel.send("Please Provide a commands to reload!")
//
//    try{
//        delete require.cache[require.resolve(`./${commandName}.js`)]
//        bot.commands.delete(commandName)
//        var pull = require(`./${commandName}.js`)
//        bot.commands.set(commandName, pull)
//    } catch(e) {
//        return message.channel.send(`Could not reload: \`${args[0]}\``)
//    }
//    message.channel.send(`The command \`${args[0].toUpperCase()} has been reloaded`)
}

module.exports.help = {
    name: "reload"
}