module.exports = {
    name: "rez",
    category: "info",
    description: "Ask to be rezed.",
    run: async (bot, message, args) => {
        let eUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!eUser) {
        message.channel.send("*-You ask The Wall to be resurect.-*")
        message.channel.send("*-The wall cast resurection to you.-*")

    }else{
        message.Channel.send(`${message.author} cast resurection on ${eUser}`)
    }
    }
}
