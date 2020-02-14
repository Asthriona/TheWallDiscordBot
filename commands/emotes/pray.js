module.exports = {
    name: "pray",
    category: "info",
    description: "Pray the wall to be protected.",
    run: async (bot, message, args) => {
        message.channel.send("*-You pray to The Wall.-* I will protect you!");
    }
}
