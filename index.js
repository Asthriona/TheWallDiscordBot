var botconfig = require("./botconfig.json");
var discord = require("discord.js");
var fs = require("fs");

var bot = new discord.Client({disableEveryone: true});
bot.commands = new discord.Collection();

fs.readdir("./commands", (err, files) => {
    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Couldn't find commands.");
        return;
    }
    console.log("Loading files...");
    jsfile.forEach((f, i) =>{
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    })
})

bot.on("ready", async () => {
    console.log(`Bot is online!`);
    bot.user.setActivity("Update...", {type: "WATCHING"});
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    
    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
//Commands
    //!test = Hello World
    if(cmd === `${prefix}test`){
        return message.channel.send("Hello World!");
    }
    //!ping = Pong
    if(cmd === `${prefix}ping`){
        return message.channel.send("Pong");
    }
    //Praise = praised
    if(cmd === `${prefix}praise`){
        return message.channel.send("You praised The Wall. I will protect you!");
    }
    //botinfo
    if(cmd === `${prefix}info`){
        let bicon = bot.user.displayAvatarURL;
        let botembed = new discord.RichEmbed()
        .setDescription("Bot Information")
        .setColor("#800080")
        .addField("Bot Name", bot.user.username)
        .addField("Version:", "1.0.0")
        .addField("Developped by", "Asthriona")
        .addField("Created on", bot.user.createdAt)
        .setThumbnail(bicon);
        return message.channel.send(botembed)
    }
    //server infos
    if(cmd === `${prefix}server`){
        let sicon = message.guild.iconURL;
        let serverembed = new discord.RichEmbed()
        .setDescription("Server Information")
        .setColor("#800080")
        .setThumbnail(sicon)
        .addField("Server Name", message.guild.name)
        .addField("Created on", message.guild.createdAt)
        .addField("You joined", message.member.joinedAt)
        .addField("Total members", message.guild.memberCount)
        return message.channel.send(serverembed);
    }
    //report. (unused on prod)
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);
});

bot.login(botconfig.token)