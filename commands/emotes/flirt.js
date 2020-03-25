module.exports = {
    name: "flirt",
    category: "emote",
    description: "Flirt with someone",
    run: async (bot, message, args) => {
        let eUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        message.channel.send(`${message.author} flirt with ${eUser}`);
}
}
