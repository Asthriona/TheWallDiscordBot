module.exports = {
    name: "praise",
    category: "info",
    description: "Praised be the wall!",
    run: async (bot, message, args) => {
        message.channel.send("*-You praised The Wall.-* I will protect you!");
    }
}
