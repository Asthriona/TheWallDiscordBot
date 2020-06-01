module.exports = {
    name: "hug",
    category: "emote",
    description: "Hug someone! OwO",
    run: async (bot, message, args) => {
        let eUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!eUser) return message.channel.send(`${message.author} need a hug.`)
        message.channel.send(`${message.author} hug ${eUser}`);
    }
}
