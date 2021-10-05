const axios = require("axios").default;

const BOT_ID = '887086717587320852';
const TOKEN_blist = 'zzmHD5wXQNPlgL8dmEai';
const TOKEN_boats = 'CZKw0sPVQOKYMJDHP1YEOKASkCjdQlFmkEiQTTGPNWyPSNySvMYCuCL3NVI5jKu5xJPVIvPcVvQC3n6nunbiQTtwOyXR1VQykT5AFY71GSLWkRiF6Dm0BA8IMqM0BKIVv0i77UPwGLYtyMSbwRM2kjVMhfJ';
const TOKEN_discordBotList = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0IjoxLCJpZCI6Ijg4NzA4NjcxNzU4NzMyMDg1MiIsImlhdCI6MTYzMzQzODAyOX0.80cWNUl7I_7L1lMGn3gZSHB6ZyWhmEJXPMdDUjxBvuE';
const TOKEN_discordBotsgg = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGkiOnRydWUsImlkIjoiMjc5Njc1MDg4MTIxNjI2NjI0IiwiaWF0IjoxNjMzNDM4MjA3fQ.q0kWi3Oxnol6EW1PLw65uTng_Ux8JiE2RGukCoDypbU';
const TOKEN_discordExtremeList = 'DELAPI_e602e88874b28bab01b3d56f4c074d01-887086717587320852';
const TOKEN_discordServices = 'DSPAeGDlmuNIvCNNlQO7tpNU3SlXzk7JhsSNpMF8CtdMmom2bBr7';
const TOKEN_fatesList = 'BktMoXB9cJuTNul8zr0f31zu97EtCuHJE4yhb3kkcCd11jpZ5KgB96e8LnCbaw0j5CpgBGHQbXvCfHWSjB56ZCAa3Uc05yBlfN8ABFEkToXmW7TOLArhBW67ezp5nVJUitFW';
const TOKEN_infinityBotList = '6sVzMLrXlR3rdHOPMZEgd7grkZBHpL3CLKuHo5SnqzcBo3SPIDLY8fJSEXkfcbIm5DA04KEkipehd6UtWF8G2GcDfOPfOxF54bbG';
const TOKEN_botgg = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg4NzA4NjcxNzU4NzMyMDg1MiIsImJvdCI6dHJ1ZSwiaWF0IjoxNjMzNDIyOTg1fQ.6w6JMZyfHY5hlFwlWz7lTU4pkaiOYMVdYe4rppAALwM';
// const TOKEN_discordListology = '';

function uploadStatsWithId(url, apiEndpoint, type, countName, serverCount, shardName, shards, idName, id, token) {
    console.log(`Updating ${url}...`);
    const body = {};
    let f = null;
    if (type == 'POST') {
        f = axios.post;
    } else if (type == 'PATCH') {
        f = axios.patch;
    } else {
        console.error(`ERROR: http method ${type} not valid in ${url} upload.`);
        return -1;
    }
    body[countName] = serverCount; 
    if (shardName && shards) {
        body[shardName] = shards;
    }
    if (idName && id) {
        body[idName] = id;
    }
    f(apiEndpoint, body, {
        headers: {
            Authorization: token,
        }
    }).then((data) => {
        // Success
        console.log(`${url}: ${data.status} ${data.statusText}`, data.data);
        return data;
    }).catch((data) => {
        // Failure
        console.log(`${url}: ${data.response.status} ${data.response.statusText}`, data.response.data);
        return data;
    });
}

function uploadStats(url, apiEndpoint, type, countName, serverCount, shardName, shards, token) {
    return uploadStatsWithId(url, apiEndpoint, type, countName, serverCount, shardName, shards, null, null, token);
}

module.exports = function updateServerStats(client) {
    const serverCount = client.guilds.cache.size;
    const shards = client.shard ? client.shard.count : 1;

    // TODO: bladelist.gg
    uploadStats('blist.xyz', `https://blist.xyz/api/v2/bot/${BOT_ID}/stats`, 'PATCH', 'server_count', serverCount, 'shard_count', shards, TOKEN_blist);
    // TODO: discords.com (aka Bots For Discord)
    uploadStats('discord.boats', `https://discord.boats/api/bot/${BOT_ID}`, 'POST', 'server_count', serverCount, null, null, TOKEN_boats);
    uploadStats('discordBotList.com', `https://discordbotlist.com/api/v1/bots/${BOT_ID}/stats`, 'POST', 'guilds', serverCount, null, null, TOKEN_discordBotList);
    uploadStats('discord.bots.gg', `https://discord.bots.gg/api/v1/bots/${BOT_ID}/stats`, 'POST', 'guildCount', serverCount, 'shardCount', shards, TOKEN_discordBotsgg);
    uploadStats('discordExtremeList.xyz', `https://api.discordextremelist.xyz/v2/bot/${BOT_ID}/stats`, 'POST', 'guildCount', serverCount, 'shardCount', shards, TOKEN_discordExtremeList);
    // TODO: waiting verification uploadStats('bots.discordlabs.com...', `https://bots.discordlabs.org/v2/bot/${BOT_ID}/stats`, 'POST', 'server_count', serverCount, 'shard_count', shards, TOKEN_discordLabs);
    // TODO; key is not generating. uploadStats('discordlistology.com', `https://discordlistology.com/api/v1/bots/${BOT_ID}/stats`, 'POST', 'servers', serverCount, 'shards', shards, TOKEN_discordListology);
    // TODO: waiting for approval. uploadStats('discordServices.net', `https://api.discordservices.net/bot/${BOT_ID}/stats`, 'POST', 'servers', serverCount, 'shards', shards, TOKEN_discordServices);
    // TODO: waiting verification from disforge.com
    uploadStats('fatesList.xyz', `https://fateslist.xyz/api/bots/${BOT_ID}/stats`, 'POST', 'guild_count', serverCount, 'shard_count', shards, TOKEN_fatesList);
    // TODO: must be approved first. uploadStatsWithId('infinityBotList.com', `https://api.infinitybotlist.com/bots/${BOT_ID}/stats`, 'POST', 'servers', serverCount, 'shards', shards, 'botid', BOT_ID, TOKEN_infinityBotList);
    uploadStats('top.gg', `https://top.gg/api/bots/${BOT_ID}/stats`, 'POST', 'server_count', serverCount, null, null, TOKEN_botgg);
    // TODO: voidBots.net servers not responding
    // TODO: wonderBotList.com: where API?
    // TODO: yabl.xyz: ?????
};
