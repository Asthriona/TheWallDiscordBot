module.exports = {
    name: "kneel",
    category: "emote",
    description: "Kneel befor the wall!",
    run: async (bot, message, args) => {
        let eUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!args[0]) return message.channel.send(`${message.author} Kneel befor The Wall.`);
        message.channel.send(`${messahe.author} kneel befor ${eUser}`)
    }
}
