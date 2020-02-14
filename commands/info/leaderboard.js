module.exports = {
    name: "leaderboard",
    aliases: ["levels", "lb"],
    category: "info",
    description: " ",
    run: async (bot, message, args) => {
        //message.channel.send(` Voici le liens du Leaderboard \n http://yukiko.nishikino.me/lb?id=${message.guild.id}`)
        message.channel.send("Command disabled for this server. \n please ask <@186195458182479874> to set up the website for it.")
    }
}