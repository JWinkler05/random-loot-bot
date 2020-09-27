

// Run dotenv
require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();

var jsonLoot = require('./item_list.json');
var digList = {};

var bizList = require('./biz.json');

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
        let biz = "";
        switch(cmd) {
            // !ping
            case 'test':
                break;
            // case 'jones-loot':
            //     loot_type = "jones";
            //     break;
            // case 'dig':
            //     var ONE_HOUR = 60 * 60 * 1000; /* ms */
            //     var today = new Date().getTime();
            //     var timeLimit = new Date();
            //     timeLimit.setTime(today + ONE_HOUR);
            
            //     if (player) {
            //         if ( digList[player] &&  today < new Date(digList[player]).getTime()) {
            //             msg.reply("You can only dig once per hour.");
            //         } else {
            //             loot_type = "jones";
            //             digList[player] = timeLimit;
            //         }
            //     } else {
            //         loot_type = "jones";
            //     }
            //     console.log(digList);
            //     break;
            case 'random-bp':
                loot_type = "bp";
                break;
            case 'random-herb':
                loot_type = "herb";
                break;
            case 'random-scrap':
                loot_type = "scrap";
                break;
            case 'random-armor':
                loot_type = "armor";
                break;
            case 'random-brew':
                loot_type = "brews";
                break;
            case 'random-shield':
                loot_type = "shield";
                break;
            case 'random-produce':
                loot_type = "produce";
                break;
            case 'grc-pfa':
                loot_type = "grcpfa";
                break;
            case 'list-biz':
                loot_type = "";
                biz = "list";
                break;
            case 'invest':
                loot_type = "";
                biz = "invest";
                break;
            case 'dual-invest':
                loot_type = "";
                biz = "invest2";
                break;
            case 'lb-help':
                msg.reply("Pleaes use the following commands:\n" +
                            // "!jones-loot playerName: Random loot item for the jones run.\n" +
                            // "@dig playerName: Random loot item for the jones run, usable once per hour.\n" +
                            "!random-bp playerName: Random Blueprint.\n" +
                            "!random-herb playerName: Random Named Herb.\n" +
                            "!random-scrap playerName: Random Named Scrap.\n" +
                            "!random-produce playerName: Random Produce.\n" +
                            "!random-brew playerName: Random Brew.\n" +
                            "!random-armor playerName: Random Armor.\n" +
                            "!random-shield playerName: Random Shield.\n" +
                            "!grc-pfa playerName: 50% chance Fracture, 50% chance random armor/shield/brew.\n" +
                            "!list-biz List the local businesses accepting investments.\n" +
                            "!invest playerName: Roll a random dice and invest in a business.\n" +
                            "!dual-invest playerName: Roll two random die and invest in two businesses.\n"
                            );
            default:
                break;
            // Just add any case commands if you want to..
         }
         if(loot_type) {
             itemReply(msg, loot_type, player);
         } else if(biz) {
            if(biz == "list") {
                listBiz(msg);
            } else if (biz == "invest") {
                invest(msg, biz, player);
            } else {
                invest(msg, biz, player);
            }
         }
     }
});

// Helper functions
/**
 * Returns a random number between min (inclusive) and max (inclusive)
 */
function between(min, max) {  

    let r = Math.floor(
        Math.random() * (max - min + 1) + min
    );

    if( r > max ) {
        r = max;
    }

    if( r < min ) {
        r = min;
    }

    return r
  }

function getItem(list) {
    let max_items = jsonLoot.loot_lists[list].length - 1;
    let r_num = between(0, max_items);
    return jsonLoot.loot_lists[list][r_num]
}

function itemReply(msg, list, player) {
    item = getItem(list);

    if( list == "grcpfa" && between(1,100) < 51) {
        item = "Fracture!";
    }
    
    if(player) {
        msg.reply( player + ' recieves: ' + item);
    } else {
        msg.reply('You recieve: ' + item);
    }
}

function randInvest() {
    rNum = between(1, 6);
    switch(rNum) {
        case 1:
            return [0, -4, 1];
            break;
        case 2:
            return [2, -2, 2];
            break;
        case 3:
            return [4, 0, 3];
            break;
        case 4:
            return [5, 1, 4];
            break;
        case 5:
            return [6, 2, 5];
            break;
        case 6:
            return [8, 4, 6];
            break;
        default:
            return [0, 0, 0];
            break;
    }
}

function invest(msg, type, player) {
    amt1 = randInvest();
    amt2 = [0,0,0];
    total = amt1[0];
    resp = "[" + amt1[2] + "]";
    end = "(Total change of " + amt1[1] + " total).";
    
    if(type == "invest2") {
        amt2 = randInvest();
        total += amt2[0];
        resp = "[" + amt1[2] + "," + amt2[2] + "] ";
        end = "(Total change of " + (amt1[1] + amt2[1]) + ").";
    }

    if(player) {
        resp += player + " ";
    }
    resp += " You are handed " + total + " currency " + end;

    msg.reply(resp);
}

function listBiz(msg) {
    b = bizList["businesses"].join(", ");
    msg.reply("The local businesses are " + b + ".");
}