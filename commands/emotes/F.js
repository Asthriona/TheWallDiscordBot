module.exports = {
    name: "f",
    category: "emote",
    description: " ",
    run: async (bot, message, args) => {
        let eUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        message.channel.send(`-The Wall pays respect with a dank ***F***  to ${eUser}`);
    }
}
