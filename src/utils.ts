import Color = require('color');
import {MessageEmbed, Message} from 'discord.js';
import {exec} from 'child_process';
import {Challenge} from '@modules';
type ColorType = `#$(string)`;
export function formatArrayAsList(array:string[]):string {
    let msg = '';
    for (const element of array) {
        msg += '- ' + element + '\n';
    }
    return msg.slice(0, -1);
};

export function buildChallengeList(challengeCodes:string[], challenges:Map<string, Challenge>):string {
    const rowsToPrint:string[] = [];
    for (const code of challengeCodes) {
        const challenge = challenges.get(code);
        if (challenge) {
        rowsToPrint.push(`**${challenge.name}** (code \`${challenge.code}\`)`);
        } else {
            console.error(`challenge ${code} doesn't exist`);
        };
    }
    return formatArrayAsList(rowsToPrint);
}

export function getMessageArguments(message:Message):string[] {
    return message.content.split(' ').filter((value, _index, _arr) => {
        return value != '';
    });
}

export function randomVibrantColor():ColorType {
    const h = Math.floor(Math.random() * 36) * 10;
    return Color.hsl(h, 100, 70).hex() as ColorType;
}

export function formatMapAsList(map:Map<string, any>):string {
    let msg = '';
    for (const e of Array.from(map.keys())) {
        msg += '- ' + e + '\n';
    }
    return msg.slice(0, -1);
}

export function errorMessageBuilder(msg:string) {
    return {embeds: [new MessageEmbed()
        .setColor('#FA5610')
        .setDescription(msg)
        .setTitle('Error')]};
}
export function pickRandom<T>(items:Array<T>):T {
    return items[Math.floor(Math.random() * items.length)];
}

export async function sh(cmd:string) {
    return new Promise(function(resolve, reject) {
        exec(cmd, (err, stdout, stderr) => {
            if (err) {
                reject(err);
            } else {
                resolve({stdout, stderr});
            };
        });
    });
}

export async function sendLogMessage(message: string) {
    // WARNING: ' is replaced with a different unicode char
    message = message.toString().replace('\'', 'ʹ');
    sh(`telegram-send -g --format markdown '*Phasmo Helper*\n\n${message}'`)
        .catch((_err) => {
            console.error(message);
        });
}
