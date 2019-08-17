var botconfig = require("./botconfig.json");
var discord = require("discord.js");

var bot = new discord.Client({disableEveryone: true})

bot.on("ready", async () => {
    console.log(`Bot is online!`);
    bot.user.setActivity("Developement in progress...")
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    
    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    //!say hello
    if(cmd === `${prefix}test`){
        return message.channel.send("Hello World!");
    }
});

bot.login(botconfig.token)