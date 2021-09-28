import Color = require('color');
import {MessageEmbed} from 'discord.js';
import {exec} from 'child_process';
import Challenge = require('@modules/Challenge');
export function formatArrayAsList(array:string[]) {
    let msg = '';
    for (const element of array) {
        msg += '- ' + element + '\n';
    }
    return msg.slice(0, -1);
};
export function buildChallengeList(challengeCodes:string[], challenges:Map<string, Challenge>) {
    const rowsToPrint = [];
    for (code of challengeCodes) {
        challenge = challenges[code];
        rowsToPrint.push(`**${challenge.name}** (code \`${challenge.code}\`)`);
    }
    return this.formatArrayAsList(rowsToPrint);
},
getMessageArguments: function(message) {
    return message.content.split(' ').filter((value, _index, _arr) => {
        return value != '';
    });
},
randomVibrantColor: function() {
    const h = Math.floor(Math.random() * 36) * 10;
    return Color.hsl(h, 100, 70).hex();
},
formatObjectAsList: function(ob) {
    let msg = '';
    for (e of Object.keys(ob)) {
        msg += '- ' + e + '\n';
    }
    return msg.slice(0, -1);
},
errorMessageBuilder: function(msg) {
    return {embeds: [new MessageEmbed()
        .setColor('#FA5610')
        .setDescription(msg)
        .setTitle('Error')]};
},
pickRandom: function(items) {
    // Pick a random item from the list items
    // result = Math.floor(Math.random() * constants.items.length);
    return items[Math.floor(Math.random() * items.length)];
},
sh: async function(cmd) {
    return new Promise(function(resolve, reject) {
        exec(cmd, (err, stdout, stderr) => {
            if (err) {
                reject(err);
            } else {
                resolve({stdout, stderr});
            };
        });
    });
},
async sendLogMessage(message) {
    this.sh(`telegram-send -g --format markdown '*Phasmo Helper*\n\n${message}'`)
        .catch((_err) => {
            console.error(message);
        });
},

