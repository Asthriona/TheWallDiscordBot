    var discord = require("discord.js");

    module.exports.run = async (bot, message, args) => {
        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!rUser) return message.channel.send("couldn't find user. :'(");
        let reason = args.join(" ").slice(22);

        let reportEmbed = new discord.RichEmbed()
        .setDescription("Reports")
        .setColor("#800080")
        .addField("reported User", `${rUser} with ID: ${rUser.id}`)
        .addField("reported by", `${message.author} with ID: ${message.author.id}`)
        .addField("Channel:", message.channel)
        .addField("Time:", message.createdAt)
        .addField("Reason:", reason);
        let reportschannel = message.guild.channels.find(`name`, "report");
        if(!reportschannel) return message.channel.send("Couldn't find report channel.");

        message.delete().catch(O_o=>{});
        reportschannel.send(reportEmbed);
    }

    module.exports.help = {
        name: "report"
    }