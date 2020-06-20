

// Run dotenv
require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();

var jsonLoot = require('./item_list.json');
var digList = {};

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.DISCORD_TOKEN);

client.on('message', msg => {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (msg.content.substring(0, 1) == '!' || msg.content.substring(0, 1) == '@') {
        var args = msg.content.substring(1).split(' ');
        var cmd = args[0];
        var player = args.length > 1 ? args[1] : null;
       
        args = args.splice(1);
        let loot_type = "";
        switch(cmd) {
            // !ping
            case 'test':
                break;
            case 'jones-loot':
                loot_type = "jones";
                break;
            case 'dig':
                var ONE_HOUR = 60 * 60 * 1000; /* ms */
                var today = new Date().getTime();
                var timeLimit = new Date();
                timeLimit.setTime(today + ONE_HOUR);
            
                if (player) {
                    if ( digList[player] &&  today < new Date(digList[player]).getTime()) {
                        msg.reply("You can only dig once per hour.");
                    } else {
                        loot_type = "jones";
                        digList[player] = timeLimit;
                    }
                } else {
                    loot_type = "jones";
                }
                console.log(digList);
                break;
            case 'random-bp':
                loot_type = "bp";
                break;
            case 'random-herb':
                loot_type = "herb";
                break;
            case 'random-scrap':
                loot_type = "scrap";
                break;
            case 'random-produce':
                loot_type = "produce";
                break;
            case 'lb-help':
                msg.reply("Pleaes use the following commands:\n" +
                            "!jones-loot playerName: Random loot item for the jones run.\n" +
                            "@dig playerName: Random loot item for the jones run, usable once per hour.\n" +
                            "!random-bp playerName: Random Blueprint.\n" +
                            "!random-herb playerName: Random Named Herb.\n" +
                            "!random-scrap playerName: Random Named Scrap.\n" +
                            "!random-produce playerName: Random Produce.\n"
                            );
            default:
                break;
            // Just add any case commands if you want to..
         }
         if(loot_type) {
             itemReply(msg, loot_type, player);
         }
     }
});

// Helper functions
/**
 * Returns a random number between min (inclusive) and max (inclusive)
 */
function between(min, max) {  
    let r = Math.floor(
      Math.random() * max
    )

    if( r > max ) {
        r = max;
    }

    return r
  }

function getItem(list) {
    let max_items = jsonLoot.loot_lists[list].length;
    let r_num = between(0, max_items);
    return jsonLoot.loot_lists[list][r_num]
}

function itemReply(msg, list, player) {
    let item = getItem(list);
    if(player) {
        msg.reply( player + ' recieves: ' + item);
    } else {
        msg.reply('You recieve: ' + item);
    }
}