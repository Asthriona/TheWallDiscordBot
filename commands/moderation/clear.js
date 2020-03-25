module.exports = {
    name: "clear",
    category: "Moderation",
    description: "Bulk delete some messages.",
    run: async (bot, message, args, RichEmbed) => {
        if(cmd === 'clear'){
            if(message.deletable){
                message.delete();
            }
            if (!message.member.hasPermission("MANAGE_MESSAGES")){
                return message.reply("you dont have the permissions to delete those message!")
            }
            if (isNaN(args[0]) || parseInt(args[0]) <= 0){
                return message.reply("Oh my... Is this even a number?! Please use a number between 0 and 100 in numeric value.")
            }
            if(!message.guild.me.hasPermission("MANAGE_MESSAGES")){
                return message.reply("I dont have the permissions to do that. Please add 'MANAGE_MESSAGES' to my permissions.")
            }
            let deleteAmount;
            if(parseInt(args[0]) > 100){
                deleteAmount = 100;
            }else{
                deleteAmount = parseInt(args[0]);
            }
            message.channel.bulkDelete(deleteAmount, true)
                .then(deleted => message.channel.send(`I deleted ${deleted.size} messages.`))
                .catch(err => message.reply("Woops! An error sucessfully happened! " + err))
        }
    }
}
