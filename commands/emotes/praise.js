module.exports = {
    name: "praise",
    category: "info",
    description: "Praised be the wall!",
    run: async (bot, message, args) => {
        let eUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!eUser) return message.channel.send("*-You praised The Wall.-* I will protect you!");
        message.channel.send(`${message.author} lavish praise upon ${eUser}`)
    }
}
