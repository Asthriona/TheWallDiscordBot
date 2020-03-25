module.exports = {
    name: "boop",
    category: "emote",
    description: "You booped someone!",
    run: async (bot, message, args) => {
        let eUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!eUser) return message.channel.send(`${message.author} boop it own nose. Boop!`)
         message.channel.send(`${message.author} boops ${eUser} nose!`);
    }
}
