var botconfig = require("./botconfig.json");
var discord = require("discord.js");
var fs = require("fs");
var util = require('util');
var http = require('http');
var winston = require('winston');
var http = require('http');
var fs = require('fs');
var index = fs.readFileSync('./monit.html');
var pjson = require('./package.json');

require('dotenv').config();

// Logging //
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'debug.log'})
        
    ]
});
logger.info("Logging system is running...")

//web server for monitoring
http.createServer(function(req, res) {
    res.write(index);
    res.end();
}).listen(1002);
logger.info("Web Server started... Monitoring is now Working.");
logger.info(process.env.NODE_ENV) // root
var bot = new discord.Client({disableEveryone: false});
bot.commands = new discord.Collection();

fs.readdir("./commands", (err, files) => {
    if(err) logger.debug(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        logger.info("Couldn't find commands.");
        return;
    }
    logger.info("Loading files...");
    jsfile.forEach((f, i) =>{
        let props = require(`./commands/${f}`);
        logger.info(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    })
})

if (process.env.NODE_ENV === 'production') {
    bot.on('ready', () => {
        bot.user.setStatus('')
        bot.user.setPresence({
            game: {
                name: 'Auction House Wall',
                type: "WATCHING",
                url: "https://www.asthriona.com/"
            }
        });
        var channelprod = bot.channels.get(botconfig.channelprod);
        var channeldev = bot.channels.get(botconfig.channeldev);
        let bicon = bot.user.displayAvatarURL;
        let versionembed = new discord.RichEmbed()
        .setColor("#800080")
        .setAuthor('Bot Rrestarted!', 'https://cdn.discordapp.com/emojis/515665388495962112.png', 'https://github.com/Asthriona')
        .addField("Bot Status:", "Ready!")
        .addField("Version:", pjson.version)
        .addField("Version name: ", pjson.codeName)
        .setFooter(`The Wall Discord bot`, `${bicon}`, 'https://TheWall.ovh')
        .setThumbnail(bicon);
        return channelprod.sendMessage(versionembed), channeldev.sendMessage(versionembed);
    });
} else {
    bot.on('ready', () => {
        bot.user.setStatus('')
        bot.user.setPresence({
            game: {
                name: 'Developement mode',
                type: "Streaming",
                url: "https://www.twitch.tv/Asthriona"
            }
        });
        var channeldev = bot.channels.get(botconfig.channeldev);
        let bicon = bot.user.displayAvatarURL;
        let versionembed = new discord.RichEmbed()
        .setColor("#800080")
        .setAuthor('Bot Rrestarted!', 'https://cdn.discordapp.com/emojis/515665388495962112.png', 'https://github.com/Asthriona')
        .addField("Bot Status:", "Ready!")
        .addField("Version:", pjson.version)
        .addField("Version name: ", pjson.codeName)
        .addField("Website:", "https://TheWall.ovh")
        .setFooter(`The Wall Discord bot`, `${bicon}`, 'https://TheWall.ovh')
        .setThumbnail(bicon);
        return channeldev.sendMessage(versionembed);
    });
}
logger.info(`Discord presence set to Auction House Wall, with status type to: Watching`);
bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    
    
    let prefix = botconfig.prefix;
    let emote = botconfig.emote;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    //commands handler
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);
    eval(fs.readFileSync('commands.js')+'');
    //Commands
    //!test = Hello World
    if(cmd === `${prefix}test`){
        logger.info(`${message.author.username} used !test on ${message.guild.name}`)
        return message.channel.send("Hello World!");
    }
    //spam test
    if (cmd === `${prefix}hello`){
        return message.channel.send("!hello");
    }
    //!ping = Pong
    if(cmd === `${prefix}ping`){
        logger.info(`${message.author.username} used !ping on ${message.guild.name}`)
        return message.channel.send("Pong");
    }
    //Praise = praised
    if(cmd === `${prefix}praise`){
        logger.info(`${message.author.username} used !praise on ${message.guild.name}`)
        return message.channel.send("*-You praised The Wall.-* I will protect you!");
    }
    //pray = pray
    if(cmd === `${prefix}pray`){
        logger.info(`${message.author.username} used !pray on ${message.guild.name}`)
        return message.channel.send("*-You pray to The Wall.-* I will protect you!");
    }
    //rez = rez
    if(cmd === `${prefix}rez`){
        logger.info(`${message.author.username} used !rez on ${message.guild.name}`)
        return message.channel.send("*-You ask The Wall to be resurect.-* *The wall cast resurection to you.*");
    }
    //in game help
    if(cmd === `${prefix}help`){
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
        .addField("Version:", pjson.version)
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
        .addField("Server Owner", message.guild.owner)
        .addField("Total members", message.guild.memberCount)
        return message.channel.send(serverembed);
    }

    //emotes
    let eUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    //hug
    if(cmd === `${emote}hug`){
        logger.info(`${message.author.username} used hug on ${eUser} on ${message.guild.name}`)
        return message.channel.send(`${message.author} hug ${eUser}`);
    }
    //boop
    if(cmd === `${emote}boop`){
        logger.info(`${message.author} used boop on ${eUser} on ${message.guild.name}`)
        return message.channel.send(`${message.author} boops ${eUser} nose!`);
    }
    //poke
    if(cmd === `${emote}poke`){
        logger.info(`${message.author} used poke on ${eUser} on ${message.guild.name}`)
        return message.channel.send(`${message.author} poke ${eUser}. Hey!`);
    }
    //flirt
    if(cmd === `${emote}flirt`){
        logger.info(`${message.author} used flirt on ${eUser} on ${message.guild.name}`)
        return message.channel.send(`${message.author} flirt with ${eUser}`);
    }
    //F
    if(cmd === `${emote}F`){
        logger.info(`${message.author.username} used F on ${message.guild.name}`)
        return message.channel.send(`-The Wall pays respect with a dank ***F***  to ${eUser}`);
    }
    //f
    if(cmd === `${emote}f`){
        logger.info(`${message.author.username} used F on ${message.guild.name}`)
        return message.channel.send(`-The Wall pays respect with a dank ***F***  to ${eUser}`);
    }
    //lol
    if(cmd === `${emote}lol`){
        logger.info(`${message.author.username} used lol on ${message.guild.name}`)
        return message.channel.send(`${message.author} laught`);
    }

    //kneel
    if(cmd === `${emote}kneel`){
        logger.info(`${message.author.username} used kneel on ${message.guild.name}`)
        return message.channel.send(`${message.author} Kneel befor The Wall.`);
    }
    //rez
    if(cmd === `${emote}rez`){
        logger.info(`${message.author.username} used rez on ${message.guild.name}`)
        return message.channel.send(`${message.author} *ask The Wall to be resurect.-* *The wall cast resurection to ${eUser}`);
    }
    //violin
    if(cmd === `${emote}violin`){
        logger.info(`${message.author.username} used violin on ${message.guild.name}`)
        return message.channel.send(`The Wall plays the world's smallest violin for ${message.author}`);
    }
    // delete later
    if(cmd === `${prefix}backhand`){
        return message.channel.send("Pong!");
    }
    if(cmd === `${emote}speed`){
        logger.info(`${message.author.username} used speed on ${message.guild.name}`)
        return message.channel.send("***KECHOW!!!!***");
    }
    if(cmd === `${emote}gz`){
        logger.info(`${message.author.username} used gz on ${message.guild.name}`)
        return message.channel.send("GZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ!");
    }
    //!rez = rez
    if(cmd === `${emote}rez`){
        logger.info(`${message.author.username} used !rez on ${message.guild.name}`)
        return message.channel.send(`*-You ask The Wall to resurect  ${eUser}.-* * The wall cast resurection on  ${eUser}.*`);
    }

    if(cmd === `${prefix}ah`){
            bot.user.setStatus('')
            bot.user.setPresence({
                game: {
                    name: 'Auction House Wall',
                    type: "WATCHING",
                    url: "https://www.asthriona.com/"
                }
            });
    }
    if(cmd === `${prefix}wow`){
        bot.user.setStatus('')
        bot.user.setPresence({
            game: {
                name: 'World Of Warcraft',
                type: "PLAYING",
                url: "https://www.asthriona.com/"
            }
        });
}
});
if (process.env.NODE_ENV === 'production'){
    bot.login(botconfig.token) 
}else{
    bot.login(botconfig.devtokken)
};