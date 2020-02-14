var { RichEmbed } = require("discord.js");
var beautify = require("beautify")
var pjson = require('../../package.json');
var botConfig = require("../../botconfig.json")
module.exports = {
    name: "eval",
    category: "dev",
    description: "Run some code directly in discord! (developper only!)",
    run: async (bot, message, args) => {
        if(message.author.id === "186195458182479874"){
        if(!args[0]) return message.channel.send("Please gimme some good code!")

        try {
            if(args.join(" ").toLowerCase().includes("token")){
                return message.channel.send("No, you'r not gonna get my token! Nice Try though!")
            }
            var toEval = args.join(" ")
            var evaluated = eval(toEval);

            let embed = new RichEmbed()
            .setColor("PURPLE")
            .setTimestamp()
            .setFooter(bot.user.username, bot.user.displayAvatarURL)
            .setTitle("Code:")
            .addField("To Evaluate:", `\`\`\`js\n${beautify(args.join(" "), {format: "js"})}\n\`\`\``)
            .addField("Evaluated:", evaluated)
            .addField("Type of:", typeof(evaluated))

            message.channel.send(embed)
        } catch (e) {
            message.channel.send("ERROR! \n ```" + e + "```")
        }
    }else{
        return message.reply("You are not a developper! you can't run code on me just like that!")
}
    }
}
