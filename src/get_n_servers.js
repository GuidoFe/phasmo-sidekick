require('module-alias/register');
const fs = require('fs');
const {Client, Intents} = require('discord.js');
require('dotenv').config({path: '../.env'});
const ICON_SIZE = 64;
const client = new Client({intents: [Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES]});
client.once('ready', () => {
    setInterval(()=>{
    let content = '';
    client.guilds.cache.forEach((guild, key, map) => {
	content += '<tr>\n';
        content += `<td><img src="${guild.iconURL({dynamic: true, size: ICON_SIZE})}" height=${ICON_SIZE} width=${ICON_SIZE}></img></td>\n`;
	content += `<td>${guild.name}</td>\n`;
        content += `<td>${guild.memberCount}</td>\n`;
	content += `<td>${(guild.description == undefined) ? "" : guild.description}</td>\n`;
	content += '</tr>\n';
    });
    fs.writeFile('/data/www/index.html', `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
</head>
<body>
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
</html>`, function(err) {
	    if(err) {
	        return console.log(err);
	    };
	    console.log('Saved server list');
	}); 
    console.log(`\n\nCurrently in ${client.guilds.cache.size} servers.`);
    }, 300000);
});
client.login(process.env.TOKEN);
