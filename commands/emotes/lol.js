module.exports = {
    name: "lol",
    category: "emote",
    description: " ",
    run: async (bot, message, args) => {
        let eUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!eUser) return message.channel.send(`${message.author} laught`);
        message.channel.send(`${message.author} laugh at ${eUser}.`)
    }
}
