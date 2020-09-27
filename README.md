# random-loot-bot
This is a self made loot bot that will provide a random piece of loot from multiple lists. This was originally made with Dystopia Rising in mind, but the loot lists can be adapted for any game.


Steps to install.

You will need node installed to run this: https://nodejs.org/en/download/

1. Create an application and ad the bot through Discord developer portal (https://discord.com/developers/applications/)
2. The bot will need permissions to "Read Message History" and "Send Messages"
3. Generate the oAuth URL for the bot.
4. Authorize and add the bot to your server utilizing the OAuth link.
5. Add a .env file to the root directory of your bot.
6. Copy the BOT's token from the Developer Portal, put it into the .env file
``` 
DISCORD_TOKEN=YOUR_BOT_TOKEN
```
7. If you need to change loot lists, do so with the loot_list.json file. If you add a new type of list, you will need to update the switch statement in the bot.js file.
8. Make sure the dependencies are installed and updated
```
npm install --save discord.js dotenv
```
9. Run the bot with node.
```
node bot.js
```
