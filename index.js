var botconfig = require("./botconfig.json");
var discord = require("discord.js");
var fs = require("fs");
var util = require('util');
var http = require('http');
var logTimestamp = require("log-timestamp")

//web server here soon

//Logging
var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
var log_stdout = process.stdout;

console.log = function(d) { //
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};

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
    //bot.user.setActivity("Auction House Wall", {type: "WATCHING"});
    bot.user.setActivity("Updating...", {type: "WATCHING"});
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
        console.log(`${message.author.username} used !test on ${message.guild.name}`)
        return message.channel.send("Hello World!");
    }
    //!ping = Pong
    if(cmd === `${prefix}ping`){
        console.log(`${message.author.username} used !ping on ${message.guild.name}`)
        return message.channel.send("Pong");
    }
    //Praise = praised
    if(cmd === `${prefix}praise`){
        console.log(`${message.author.username} used !praise on ${message.guild.name}`)
        return message.channel.send("*-You praised The Wall.-* I will protect you!");
    }
    //pray = pray
    if(cmd === `${prefix}pray`){
        console.log(`${message.author.username} used !pray on ${message.guild.name}`)
        return message.channel.send("*-You pray to The Wall.-* I will protect you!");
    }
    //rez = rez
    if(cmd === `${prefix}rez`){
        console.log(`${message.author.username} used !rez on ${message.guild.name}`)
        return message.channel.send("*-You ask The Wall to be resurect.-* *The wall cast resurection to you.*");
    }
    //help = help links
    if(cmd === `${prefix}help`){
        console.log(`${message.author.username} used !help on ${message.guild.name}`)
        return message.channel.send("https://github.com/Asthriona/TheWallDiscordBot/wiki/Commands");
    }
    //in game help
    if(cmd === `${emote}help`){
        let sicon = message.guild.iconURL;
        let helpembed = new discord.RichEmbed()
        .setDescription("Commands")
        .setColor("#800080")
        .setThumbnail(sicon)
        .addField("!test", "Check if the bot has crash.")
        .addField("!ping", "Pong.")
        .addField("!praise", "PRAISE THE WALL!")
        .addField("!pray", "The Wall listen your prayer.")
        .addField("!rez", "Get resurected!")
        .addField("!clear", "Clear message useage: !clear 10 to remove 10 last messages")
        .addField("!say", "Make the Wall talking!")
        .addField("!help", "Show this...")
        .addField("!modules", "Show active modules")
        .addField("!server", "Show server infos.")
        .addField("!info", "Show bot infos")
        .addField("!backhand","Do a backhand to surprise The Wall!")
        .addField("/hug", "You hug someone! Usage: /hug @user")
        .addField("/boop", "You boop someone! Usage: /boop @user")
        .addField("/poke", "You poke someone! Usage: /poke @user")
        .addField("/flirt", "Sirius & Friend keep flirting all the time. Usage: /flirt @user")
        .addField("/speed", "2 f4st 4 u!")
        .addField("/violin", "The Wall plays the world's smallest violin")
        .addField("/rez", "ask The Wall to be resurect.")
        .addField("/kneel", "kneel befor your lord!")
        .addField("/lol", "You so funny! :')")
        .addField("/f", "a good old danky F to pay respect.")
        return message.channel.send(helpembed);
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
    if(cmd === `${prefix}modules`){
        let icon = bot.user.displayAvatarURL;
        let modulesembed = new discord.RichEmbed()
        .setColor("800080")
        .addField("Active Modules", "say, emotes, commands, clear, report")
        return message.channel.send(modulesembed);
    }
    //commands handler
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);

    //emotes
    let eUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    //let lUser = message.guild.member(message.mentions.users.first() || message.guild.members.username.get(args[0]));
    //hug
    if(cmd === `${emote}hug`){
        console.log(`${message.author.username} used hug on ${eUser} on ${message.guild.name}`)
        return message.channel.send(`${message.author} hug ${eUser}`);
    }
    //boop
    if(cmd === `${emote}boop`){
        console.log(`${message.author} used boop on ${eUser} on ${message.guild.name}`)
        return message.channel.send(`${message.author} boops ${eUser} nose!`);
    }
    //poke
    if(cmd === `${emote}poke`){
        console.log(`${message.author} used poke on ${eUser} on ${message.guild.name}`)
        return message.channel.send(`${message.author} poke ${eUser}. Hey!`);
    }
    //flirt
    if(cmd === `${emote}flirt`){
        console.log(`${message.author} used flirt on ${eUser} on ${message.guild.name}`)
        return message.channel.send(`${message.author} flirt with ${eUser}`);
    }
    //F
    if(cmd === `${emote}F`){
        console.log(`${message.author.username} used F on ${message.guild.name}`)
        return message.channel.send(`-The Wall pays respect with a dank ***F***  to ${eUser}`);
    }
    //f
    if(cmd === `${emote}f`){
        console.log(`${message.author.username} used F on ${message.guild.name}`)
        return message.channel.send(`-The Wall pays respect with a dank ***F***  to ${eUser}`);
    }
    //lol
    if(cmd === `${emote}lol`){
        console.log(`${message.author.username} used lol on ${message.guild.name}`)
        return message.channel.send(`${message.author} laught`);
    }

    //kneel
    if(cmd === `${emote}kneel`){
        console.log(`${message.author.username} used kneel on ${message.guild.name}`)
        return message.channel.send(`${message.author} Kneel befor The Wall.`);
    }
    //rez
    if(cmd === `${emote}rez`){
        console.log(`${message.author.username} used rez on ${message.guild.name}`)
        return message.channel.send(`${message.author} *ask The Wall to be resurect.-* *The wall cast resurection to ${eUser}`);
    }
    //violin
    if(cmd === `${emote}violin`){
        console.log(`${message.author.username} used violin on ${message.guild.name}`)
        return message.channel.send(`The Wall plays the world's smallest violin for ${message.author}`);
    }
    // delete later
    if(cmd === `${prefix}backhand`){
        return message.channel.send("Pong!");
    }
    if(cmd === `${emote}speed`){
        console.log(`${message.author.username} used speed on ${message.guild.name}`)
        return message.channel.send("***KECHOW!!!!***");
    }
});

bot.login(botconfig.token)