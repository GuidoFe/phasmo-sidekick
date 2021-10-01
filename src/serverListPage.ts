import RateLimit = require('express-rate-limit');
import {Client, Intents} from 'discord.js';
import express = require('express');
const ICON_SIZE = 64;
export async function runMonitorWebService() {
    const client = new Client({intents: [Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES]});
    client.once('ready', () => {
        const app = express();
        const limiter = RateLimit({
              windowMs: 15*60*1000, // 15 minutes
                max: 100, // limit each IP to 100 requests per windowMs
        });
        app.use(limiter);
        app.get('/serverlist', async (_request, response)=>{
            let content = '';
            client.guilds.cache.forEach((guild, _key, _map) => {
    	        content += '<tr>\n';
                content += `<td><img src="${guild.iconURL({dynamic: true, size: ICON_SIZE})}" height=${ICON_SIZE} width=${ICON_SIZE}></img></td>\n`;
    	        content += `<td>${guild.name}</td>\n`;
                content += `<td>${guild.memberCount}</td>\n`;
    	        content += `<td>${(guild.description == undefined) ? "" : guild.description}</td>\n`;
    	        content += '</tr>\n';
            });
            const page = `<!DOCTYPE html>
    <html>
    <head>
    <meta charset="utf-8"/>
    </head>
    <body style="background-color:#2e3440; color:#d8dee9">
    <p>
    Number of servers: ${client.guilds.cache.size}
    </p>
    <table>
    <tr>
    <th>Icon</th>
    <th>Name</th>
    <th>Member Count</th>
    <th>Description</th>
    </tr>
    ${content}
    </table>
    </body>
    </html>`;
            response.send(page);
            console.log(`\n\nCurrently in ${client.guilds.cache.size} servers.`);
        });
        app.listen(process.env.PORT, () => console.log(`App available on port ${process.env.PORT}`));
    });
    client.login(process.env.TOKEN);
}
