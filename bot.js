

// Run dotenv
require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
const GUILD_ID = '689958775125442675';

var jsonLoot = require('./lists/item_list.json');
var bizList = require('./lists/biz.json');
var spookList = require('./lists/spook.json');
var roleList = require('./lists/roles.json');

var digLimit = 0;
var digs = 0;
var autoWin = 0;

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
        var i1 = args.length > 2 ? args[2] : null;
        var i2 = args.length > 3 ? args[3] : null;
        let action = "";

        console.log(`Processing command ${cmd}.`);
        switch(cmd) {
            // !ping
            case 'test':
                break;
            case 'dig':
                action = 'dig';
                break;
            case 'random-bp':
                action = "bp";
                break;
            case 'random-herb':
                action = "herb";
                break;
            case 'random-scrap':
                action = "scrap";
                break;
            case 'random-armor':
                action = "armor";
                break;
            case 'random-brew':
                action = "brews";
                break;
            case 'random-shield':
                action = "shield";
                break;
            case 'random-produce':
                action = "produce";
                break;
            case 'grcb':
                action = "herb"
                break;
            case 'grcp':
                action = "grcp"
                break;
            case 'grcm':
                action = "grcm"
                break;
            case 'grc-pfa':
                action = "grcpfa";
                break;
            case 'list-biz':
                action = "list";
                break;
            case 'biz-abbr':
                action = "abbr";
                break;
            case 'invest':
                action = "invest";
                break;
            case 'dual-invest':
                action = "invest2";
                break;
            case 'test-s':
                action = "spook";
                break
            case 'lb-help':
                msg.reply("Pleaes use the following commands:\n" +
                            "!random-bp playerName: Random Blueprint.\n" +
                            "!random-herb playerName: Random Named Herb.\n" +
                            "!random-scrap playerName: Random Named Scrap.\n" +
                            "!random-produce playerName: Random Produce.\n" +
                            "!random-brew playerName: Random Brew.\n" +
                            "!random-armor playerName: Random Armor.\n" +
                            "!random-shield playerName: Random Shield.\n" +
                            "!grcb playerName: Basic level Goat Rough use.\n" +
                            "!grcp playerName: Proficient and below level Goat Rough use.\n" +
                            "!grcm playerName: Master and below level Goat Rough use.\n" +
                            "!grc-pfa playerName: 50% chance Fracture, 50% chance random armor/shield/brew.\n" +
                            "!list-biz List the local businesses accepting investments.\n" +
                            "!biz-abbr List the local businesses abbreviations for investments.\n" +
                            "!invest playerName abbr: Roll a random dice and invest in a business.\n" +
                            "!dual-invest playerName abbr1 abbr2: Roll two random die and invest in two businesses.\n"
                            );
            default:
                break;
            // Just add any case commands if you want to..
         }

         randomList = ["bp", "herb", "scrap", "armor", "brews", "shield", "produce", "grcp", "grcm", "grcpfa"];
         bizList = ["list", "abbr", "invest", "invest2"];
         if (randomList.indexOf(action) > -1 ) {
             itemReply(msg, action, player);
         } else if(bizList.indexOf(action) > -1) {
            if(action == "list") {
                listBiz(msg);
            } else if(action == "abbr") {
                bizAbbr(msg);
            } else if (action == "invest") {
                invest(msg, action, player, i1, i2);
            } else {
                invest(msg, action, player, i1, i2);
            }
         } else if (action == "spook") {
            if(msg.author.username != "Sakusami" || msg.author.discriminator != "8922") {
                console.log("NO PERMISSION");
                msg.channel.send("You do not have sufficient permissions to complete this action.");
            } else {
                uName = msg.author.username + "#" + msg.author.discriminator;
                spookInfo = wantedRole = spookList["users"][uName];

                let userList = getUsers();

                // guildObj.members.fetch().then(members => {
                //         let username = `${members.user.username}#${members.user.discriminator}`;
                //         let uid = `${members.user.id}`;
                //         let name = `${members.user.username}`;
                //         console.log({
                //             "name": name,
                //             "uid": uid,
                //             "un": username
                //         });
                // });

                // msg.guild.members.forEach(r => {
                //     let username = `${r.user.username}#${r.user.discriminator}`;
                //     console.log(username);
                // })
                // .catch(console.error);

                if( msg.member.roles.cache.has(roleList[spookInfo["level"]])) {
                    //msg.channel.send("Has role");
                } else {
                    //msg.channel.send("Does Not Have Role");
                }
            }
         } else if (action == "dig") {
             let channel_id = "839569637758730290";
             let msg_channel_id = msg.channel.id;
             if(channel_id == msg_channel_id) {
                console.log(`${msg}`);
                if(digLimit < 0) {
                    msg.author.send("You dig for a while but don't seem to find anything. Is it the right time?");
                    msg.author.send("Also, I cannot see any replys to this bot. Please message TC(Sakusami#8922) with any questions or feel free to open a ticket on the server.");
                } else if (digs < digLimit) {
                    console.log(`Player ${msg.author.username}#${msg.author.discriminator} has completed the dig.`)
                    msg.reply("You begin to dig where you think the note has directed you. After some time you hear a loud thunk and remove a large metal box from the ground.");
                    msg.author.send("Inside the box you find: (2x Hard Metal, 2x Soft Metal, 2x Alloy Metal, 3x Rare Scrap, 1x Lager(5), 1x IPA(10)");
                    msg.author.send("Please use the Mod loot form to track this. Also, rememebr to share with those who helped you get to this point <3");
                    msg.author.send("Also, I cannot see any replys to this bot. Please message TC(Sakusami#8922) with any questions or feel free to open a ticket on the server.");
                    digs+=1;
                } else {
                    msg.author.send("You notice that the area has been dug recently. After a small amount of time you conclude there is nothing of value left here.");
                    msg.author.send("Also, I cannot see any replys to this bot. Please message TC(Sakusami#8922) with any questions or feel free to open a ticket on the server.");
                }
                msg.delete();
             } else {
                console.log("Incorrect digging channel");
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
    // console.log("Attempting to get item from list: " + list);
    let max_items = jsonLoot.loot_lists[list].length - 1;
    let r_num = between(0, max_items);
    return jsonLoot.loot_lists[list][r_num]
}

function post_results(msg, items, player) {
    msg.delete();
    if(player) {
        msg.channel.send( player + ' recieves: ' + items.join(", "));
    } else {
        msg.channel.send('You recieve: ' + items.join(", "));
    }
}

function itemReply(msg, list, player) {
    let multi = ["grcp", "grcm"];
    items = []
    if(multi.includes(list)) {
        items.push(getItem("herb"));
        items.push(getItem("scrap"));

        if( list == "grcm") {
            items.push(getItem("bp"));
        }
    } else {
        items.push(getItem(list));
    }

    if( list == "grcpfa" && between(1,100) < 30) {
        items[0] = "Fracture!";
    }
    
    post_results(msg, items, player);
}

function randInvest(place) {
    rNum = between(1, 6);
    console.log("RAND: " + rNum);
    invest_modifier = {
        "tb":  2,
        "bm":  1,
        "bee": 2,
        "zoo": 0,
        "rc":  -1,
        "ts":  1
    };

    if(place in invest_modifier) {
        rNum += invest_modifier[place];
    }
    console.log("Updated RNUM: " + rNum);
    if(rNum <= 1) {
        return [0, -4, 1];
    }
    else if(rNum == 2) {
        return [2, -2, 2];
    }
    else if(rNum == 3) {
        return [4, 0, 3];  
    }
    else if(rNum == 4) {
        return [5, 1, 4];
    }
    else if(rNum == 5) {
        return [6, 2, 5];
    }
    else if(rNum >= 6) {
        return [8, 4, 6];
    }
    return [0,0,0]
}

function invest(msg, type, player, i1, i2) {
    business1 = typeof(i1) != "undefined" ? i1 : "";
    business2 = typeof(i2) != "undefined" ? i2 : "";

    amt1 = randInvest(business1);
    amt2 = [0,0,0];
    total = amt1[0];
    resp = "";
    // resp = "[" + amt1[2] + "]";
    end = "(Total change of " + amt1[1] + " total).";
    
    if(type == "invest2") {
        amt2 = randInvest(business2);
        total += amt2[0];
        // resp = "[" + amt1[2] + "," + amt2[2] + "] ";
        end = "(Total change of " + (amt1[1] + amt2[1]) + ").";
    }

    if(player) {
        resp += player + " ";
    }
    resp += " You are handed " + total + " currency " + end;

    msg.channel.send(resp);
}

function listBiz(msg) {
    b = bizList["businesses"].join(", ");
    msg.channel.send("The local businesses are " + b + ".");
}

function bizAbbr(msg) {
    shortcut = {
        "TeaBags and TaTas":  "tb",
        "Betsy's Meat Locker":  "bm",
        "The Beehabilitation Center": "bee",
        "The Zoo": "zoo",
        "Rottie's Corner":  "rc",
        "Train Station":  "ts"
    };

    items = "";
    for (key in shortcut) {
        if (shortcut.hasOwnProperty(key)) {
            items += "" + key + " = \"" + shortcut[key] + "\" | "
        }
      }

      msg.channel.send(items.slice(0, -2));
}

function setSpooky() {

}

function getUsers(){
    let guildObj = client.guilds.cache.get(GUILD_ID);

    var userList = {};
    var count = 0;

    guildObj.members.fetch().then(members => {
        for(var member of members) {
            let user = member[1].user;
            if(!(user.bot)) {
                let username = `${user.username}#${user.discriminator}`;
                let uid = `${user.id}`;
                let nickname = `${user.nickname}`;
                userList[uid] = {
                    "name": nickname,
                    "un": username
                }
                count += 1;
            }
        }
        return userList
    }).catch(console.error);


}