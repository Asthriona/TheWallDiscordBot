module.exports = {
    name: "rez",
    category: "info",
    description: "Ask to be rezed.",
    run: async (bot, message, args) => {
        message.channel.send("*-You ask The Wall to be resurect.-* *The wall cast resurection to you.*")
    }
}
