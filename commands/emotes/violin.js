module.exports = {
    name: "violin",
    category: "emote",
    description: " ",
    run: async (bot, message, args) => {
        let eUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!eUser) return message.channel.send(`${message.author} begin to play the world's smallest violin.`)
        message.channel.send(`${message.author} plays the world's smallest violin for ${eUser}`);
    }
}
