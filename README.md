# TheWall DiscordBot
This bot was created for [TheWall](http://thewall.ovh).  
  
  
# Get started  
You need nodeJS install on the machine and git  
Move the botconfig.json.exemple to botconfig.json  
Add your token in botconfig.json  
start the bot.  

```bash
apt update && apt upgrade -y
apt install git
git clone https://github.com/Asthriona/TheWallDiscordBot.git
cp botconfig.json.exemple botconfig.json
nano botconfig.json
npm install
node index.js
```
# botconfig.json
You can change the prefix by editing prefix & emote.  
The emote are made for my World of Warcraft team. you can remove them or edit them.  
They are specifics to what we need, and what we use, so maybe not accurate for you.  
"channeldev" and "channelprod" are Discord channel ID whenever the bot restart it will send a message in the selected channel  
to get your channel ID right click on the chanel you want and click "copy ID" you need to enable discord dev mode to get the option.    