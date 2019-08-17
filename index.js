var botconfig = require("./botconfig.json");
var discord = require("discord.js");
var fs = require("fs");

var bot = new discord.Client({disableEveryone: false});
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
    console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
    bot.user.setActivity("Update...", {type: "WATCHING"});
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    
    
    let prefix = botconfig.prefix;
    let emote = botconfig.emote;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
//Commands
    //!test = Hello World
    if(cmd === `${prefix}test`){
        console.log(`${message.author.username} used !test`)
        return message.channel.send("Hello World!");
    }
    //!ping = Pong
    if(cmd === `${prefix}ping`){
        console.log(`${message.author.username} used !test`)
        return message.channel.send("Pong");
    }
    //Praise = praised
    if(cmd === `${prefix}praise`){
        console.log(`${message.author.username} used !test`)
        return message.channel.send("*-You praised The Wall.-* I will protect you!");
    }
    //pray = pray
    if(cmd === `${prefix}pray`){
        console.log(`${message.author.username} used !test`)
        return message.channel.send("*-You pray to The Wall.-* I will protect you!");
    }
    //rez = rez
    if(cmd === `${prefix}rez`){
        console.log(`${message.author.username} used !test`)
        return message.channel.send("*-You ask The Wall to be resurect.-* *The wall cast resurection to you.*");
    }
    //botinfo
    if(cmd === `${prefix}info`){
        let bicon = bot.user.displayAvatarURL;
        let botembed = new discord.RichEmbed()
        .setDescription("Bot Information")
        .setColor("#800080")
        .addField("Bot Name", bot.user.username)
        .addField("Version:", "1.0.1")
        .addField("Developped by", "Asthriona")
        .addField("Created on", bot.user.createdAt)
        .addField("Git:", "https://github.com/Asthriona/TheWallDiscordBot")
        .addField("Server running this bot:", bot.guilds.size)
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

    //emotes
    let eUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    //let lUser = message.guild.member(message.mentions.users.first() || message.guild.members.username.get(args[0]));
    //hug
    if(cmd === `${emote}hug`){
        console.log(`${message.author.username} used hug on ${eUser}`)
        return message.channel.send(`${message.author} hug ${eUser}`);
    }
    //boop
    if(cmd === `${emote}boop`){
        console.log(`${message.author} used boop on ${eUser}`)
        return message.channel.send(`${message.author} boops ${eUser} nose!`);
    }
    //poke
    if(cmd === `${emote}poke`){
        console.log(`${message.author} used poke on ${eUser}`)
        return message.channel.send(`${message.author} poke ${eUser}. Hey!`);
    }
    //flirt
    if(cmd === `${emote}flirt`){
        console.log(`${message.author} used flirt on ${eUser}`)
        return message.channel.send(`${message.author} flirt with ${eUser}`);
    }
});

bot.login(botconfig.token)