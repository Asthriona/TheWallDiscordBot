module.exports = {
    name: "speed",
    category: "emote",
    description: " ",
    run: async (bot, message, args) => {
        let eUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        message.channel.send("***KECHOW!!!!***");
    }
}
