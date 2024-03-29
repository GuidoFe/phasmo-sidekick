import {EmbedBuilder, Message} from 'discord.js';
import {exec} from 'child_process';
import {Challenge} from './modules/index.js';
import {default as axios} from 'axios';
type ColorType = `#$(string)`;

function hslToHex(h:number, s:number, l:number) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = (n:number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export function formatArrayAsList(array:string[]):string {
    let msg = '';
    for (const element of array) {
        msg += '- ' + element + '\n';
    }
    return msg.slice(0, -1);
};

export function reinviteBotMessage(message: Message): string {
    const link = `https://discord.com/api/oauth2/authorize?client_id=${process.env.CLIENT_ID}&permissions=0&scope=bot%20applications.commands&guild_id=${message.guildId}`
    return `⚠️ Warning: If you are an admin, please reinvite this bot by clicking [this link](${link}) in order to grant permissions to the new Discord slash commands. I'm forced by Discord to deprecate the !ph commands early next year. \`!ph help\` for more info.\nIf it has been already reinvited, type \`/\` for the new commands.`
}

export function reinviteEmbed(original: string, message: Message) {
    return { embeds: [new EmbedBuilder().setDescription(`${original}\n\n${reinviteBotMessage(message)}`)]};
}

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
    return hslToHex(h, 100, 70) as ColorType;
}

export function formatMapAsList(map:Map<string, any>):string {
    let msg = '';
    for (const e of Array.from(map.keys())) {
        msg += '- ' + e + '\n';
    }
    return msg.slice(0, -1);
}

export function errorMessageBuilder(msg:string) {
    return {embeds: [new EmbedBuilder()
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
    //message = message.toString().replace('\"', '\'\'');
    axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`, {
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: `*Phasmo Helper*\n${message}`,
        parse_mode: 'Markdown'})
        .catch(function(error: Error) {
            console.log(error);
        });
}

export function msToTime(duration: number): String {
    const milliseconds = Math.floor((duration % 1000) / 100);
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    const hoursStr = (hours < 10) ? "0" + hours : hours.toString();
    const minutesStr = (minutes < 10) ? "0" + minutes : minutes.toString();
    const secondsStr = (seconds < 10) ? "0" + seconds : seconds.toString();
    return hoursStr + ":" + minutesStr + ":" + secondsStr + "." + milliseconds;
}

export function delay(seconds: number){
    return new Promise(function(resolve){
        setTimeout(resolve,seconds*1000);
    });
}

export function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}
