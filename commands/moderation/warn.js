var mongoose = require("mongoose");
var botConfig = require("../../botconfig.json");
var { RichEmbed } = require("discord.js");
var ms = require("ms");

mongoose.connect(botConfig.dbLink, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var Users = require("../../model/xp")

module.exports = {
    name: "warn",
    category: "moderation",
    description: "Warn ppl whro break the law!",
    usage: "!warn <mention | id> [Raison]",
    run: async (bot, message, args) =>{
        if(!message.member.hasPermission("BAN_MEMBERS")){
            message.reply("Wow! You can't warn ppl! :O")
        }
        let wUser = message.mentions.members.first() || message.guild.members.get(args[0]);
        if(!wUser) return message.reply(`I can't find ${args[0]}`)
        if(wUser.hasPermission("BAN_MEMBERS")) return message.reply(`You can't warn ${wUser} he/she is waaaay too cool for that!`)
        if(!args[1]) return message.reply("Please provide a reason!")
        Users.findOne({
            userID: wUser.id,
            serverID: message.guild.id
        }, async (err, users) => {
            if(err) console.log(err);
            users.warn = users.warn +1
            users.save()

            //Auto mute
            let MuteRole = message.guild.roles.find('name', 'Muted');
            if(users.warn = 2){
                let muteTime = "10m"
                await(wUser.addRole(MuteRole.id));
                message.channel.send(`${wUser} has been muted for ${muteTime} (Second Warn.)`)
                setTimeout(function(){
                    wUser.removeRole(muteRole.id);
                    message.channel.send(`${wUser} has been un-muted`);
                },ms(muteTime))
            }else if(users.warn = 5){
                let muteTime = "1h"
                await(wUser.addRole(MuteRole.id));
                message.channel.send(`${wUser} has been muted for ${muteTime} (5 Warn.)`)
                setTimeout(function(){
                    wUser.removeRole(muteRole.id);
                    message.channel.send(`${wUser} has been un-muted`);
                },ms(muteTime))
            }
            
            //Warn
            let logChannel = message.guild.channels.find(c => c.name === "incident")
            var embed = new RichEmbed()
            .setAuthor(`~Warn~ ${wUser.username}`, wUser.user.displayAvatarURL)
            .setColor("PURPLE")
            .setTimestamp()
            .setFooter(bot.user.username, bot.user.displayAvatarURL)
            .setDescription(`=> **User warned: ** ${wUser} (${wUser.id})
            => **Warned by:** ${message.author} (${message.author.id})
            => **Total warn:** ${users.warn}
            => **Reason:** ${args.slice(1).join(" ")}`)
            logChannel.send(embed)
            message.channel.send(`${wUser} has been warned for: ${args.slice(1).join(" ")}`)
        })
    }
}