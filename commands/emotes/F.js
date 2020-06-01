module.exports = {
    name: "f",
    category: "emote",
    description: "Pay respect with a big dank F!",
    run: async (bot, message, args) => {
        let eUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!eUser) return message.channel.send(`- ${message.author} pays respect with a dank ***F***`);
        message.channel.send(`- ${message.author} pays respect with a dank ***F***  to ${eUser}`);
    }
}
