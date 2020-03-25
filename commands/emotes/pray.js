module.exports = {
    name: "pray",
    category: "info",
    description: "Pray the wall to be protected.",
    run: async (bot, message, args) => {
        let eUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        message.channel.send("*-You pray to The Wall.-* I will protect you!");
        message.channel.send(`${message.author} say a prayer for ${eUser}. \n The wall heard you ${message.author}.`)
    }
}
