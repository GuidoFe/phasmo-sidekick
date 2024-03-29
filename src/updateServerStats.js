import axios from "axios";

const TOKEN_blist = 'zzmHD5wXQNPlgL8dmEai';
const TOKEN_boats = 'CZKw0sPVQOKYMJDHP1YEOKASkCjdQlFmkEiQTTGPNWyPSNySvMYCuCL3NVI5jKu5xJPVIvPcVvQC3n6nunbiQTtwOyXR1VQykT5AFY71GSLWkRiF6Dm0BA8IMqM0BKIVv0i77UPwGLYtyMSbwRM2kjVMhfJ';
const TOKEN_discordBotList = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0IjoxLCJpZCI6Ijg4NzA4NjcxNzU4NzMyMDg1MiIsImlhdCI6MTYzMzQzODAyOX0.80cWNUl7I_7L1lMGn3gZSHB6ZyWhmEJXPMdDUjxBvuE';
const TOKEN_discordBotsgg = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGkiOnRydWUsImlkIjoiMjc5Njc1MDg4MTIxNjI2NjI0IiwiaWF0IjoxNjMzNDM4MjA3fQ.q0kWi3Oxnol6EW1PLw65uTng_Ux8JiE2RGukCoDypbU';
const TOKEN_discordExtremeList = 'DELAPI_e602e88874b28bab01b3d56f4c074d01-887086717587320852';
const TOKEN_discordServices = 'DSPAeGDlmuNIvCNNlQO7tpNU3SlXzk7JhsSNpMF8CtdMmom2bBr7';
const TOKEN_fatesList = 'BktMoXB9cJuTNul8zr0f31zu97EtCuHJE4yhb3kkcCd11jpZ5KgB96e8LnCbaw0j5CpgBGHQbXvCfHWSjB56ZCAa3Uc05yBlfN8ABFEkToXmW7TOLArhBW67ezp5nVJUitFW';
const TOKEN_infinityBotList = 'CZ6BAAklAvNltYmkwdguexeZRhTjy30EXKIU1Pt5weuEbySGEhuphiR4I3NrlXmsFZJztdpC1FnH66wx27QXuT9FaqLeG49oZnFq';
const TOKEN_botgg = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg4NzA4NjcxNzU4NzMyMDg1MiIsImJvdCI6dHJ1ZSwiaWF0IjoxNjMzNDIyOTg1fQ.6w6JMZyfHY5hlFwlWz7lTU4pkaiOYMVdYe4rppAALwM';
const TOKEN_voidBots = 'VOID_phluRBzsieNizfXLhXvz2XMLiC0i7nHHmqCsqVXyzybg80iy';
const TOKEN_discordLabs = 'discordlabs.org-yIzi7ua5QEtcyCRQwOW9';
const TOKEN_discordListology = '41bdd206a569e31dd36a51fe8952afe3b5ceb1e974edf476da908cc58c71f56f01260011fdd89f007037e8b62e6ab5c5c84d3b62f3f168b1f585159bb8fb91d745cc67e54546d3da59eabdc8a39206f36072b1a4823221a281685dcddbf85465197e9d83c4f5821e25b1b1ecce36ba4af3862a9b714841f1dcfd44b4fd82b3f07b7bacd98a3bbc7c88ec04e19be82a9250c51f61ab325c59c75fb7e95b495f581bac79773763b7920f21ef867638299ad0c5d1eba1a188e1df9b930c6ecd965b8cf32682992ef9945974dd4c7e38bcf7fb8e0dbf60433fae2888ae5e1a17e6fd2e8d08bd0994932f7f97ca91a45b96ec073cc5a44c4d8b873fbd9119eba9e7a627179347f060a46e0074bd9a69f90c24f90670132c795eb65c7230a33a850b3280d44c132e525ecec819e8c9828fcc17562ac8f552b5b67658f18c17ce2fdd1393f871f02a25d80e0d18a0963e13d4496e57db22a98911cd4fc7c1a38eb0d721607f34768119701b2f5dc77fb9afd656f70e3416ca771ed390a1a0978f63909b451648979e6de358cc7b506198ff3f864330801bdc03c3068a7bf7a37f74bd5c0bf6b94298bec81eda27da8035f94101f566ff4e5172728119860ccb682502765c0ada632b5ce747'

function uploadStatsWithId(url, apiEndpoint, type, countName, serverCount, shardName, shards, idName, id, token) {
    const body = {};
    let f = null;
    if (type == 'POST') {
        f = axios.post;
    } else if (type == 'PATCH') {
        f = axios.patch;
    } else {
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
        return data;
    }).catch((data) => {
        // Failure
        return data;
    });
}

function uploadStats(url, apiEndpoint, type, countName, serverCount, shardName, shards, token) {
    return uploadStatsWithId(url, apiEndpoint, type, countName, serverCount, shardName, shards, null, null, token);
}

export function updateServerStats(client) {
    const serverCount = client.guilds.cache.size;
    const shards = client.shard ? client.shard.count : 1;
    const BOT_ID = client.application.id;
    // TODO: bladelist.gg
    uploadStats('blist.xyz', `https://blist.xyz/api/v2/bot/${BOT_ID}/stats`, 'PATCH', 'server_count', serverCount, 'shard_count', shards, TOKEN_blist);
    // TODO: discords.com (aka Bots For Discord)
    uploadStats('discord.boats', `https://discord.boats/api/bot/${BOT_ID}`, 'POST', 'server_count', serverCount, null, null, TOKEN_boats);
    uploadStats('discordBotList.com', `https://discordbotlist.com/api/v1/bots/${BOT_ID}/stats`, 'POST', 'guilds', serverCount, null, null, TOKEN_discordBotList);
    uploadStats('discord.bots.gg', `https://discord.bots.gg/api/v1/bots/${BOT_ID}/stats`, 'POST', 'guildCount', serverCount, 'shardCount', shards, TOKEN_discordBotsgg);
    uploadStats('discordExtremeList.xyz', `https://api.discordextremelist.xyz/v2/bot/${BOT_ID}/stats`, 'POST', 'guildCount', serverCount, 'shardCount', shards, TOKEN_discordExtremeList);
    uploadStats('bots.discordlabs.com...', `https://bots.discordlabs.org/v2/bot/${BOT_ID}/stats`, 'POST', 'server_count', serverCount, 'shard_count', shards, TOKEN_discordLabs);
    uploadStats('discordlistology.com', `https://discordlistology.com/api/v1/bots/${BOT_ID}/stats`, 'POST', 'servers', serverCount, 'shards', shards, TOKEN_discordListology);
    uploadStats('discordServices.net', `https://api.discordservices.net/bot/${BOT_ID}/stats`, 'POST', 'servers', serverCount, 'shards', shards, TOKEN_discordServices);
    // TODO: waiting verification from disforge.com
    uploadStats('fatesList.xyz', `https://fateslist.xyz/api/bots/${BOT_ID}/stats`, 'POST', 'guild_count', serverCount, 'shard_count', shards, TOKEN_fatesList);
    uploadStats('infinityBotList.com', `https://api.infinitybots.com/bot/${BOT_ID}`, 'POST', 'servers', serverCount, null, null, TOKEN_infinityBotList);
    uploadStats('top.gg', `https://top.gg/api/bots/${BOT_ID}/stats`, 'POST', 'server_count', serverCount, null, null, TOKEN_botgg);
    uploadStats('voidBots.net', `https://api.voidbots.net/bot/stats/${BOT_ID}`, 'POST', 'server_count', serverCount, 'shard_count', shards, TOKEN_voidBots);
    // TODO: doesn't work uploadStats('botLists.com', `https://api.botlists.com/bot/${BOT_ID}`, 'POST', 'guilds', serverCount, 'shards', shards, TOKEN_botLists);
    // TODO: wonderBotList.com: where API?
    // TODO: yabl.xyz: ?????
};
