import 'module-alias/register';
import {Client, Intents} from 'discord.js';
import dbots = require('dbots');
import utils = require('@utils');
const client = new Client({intents: [Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES]});

client.once('ready', () => {
    console.log('Posting stats...');
    const poster = new dbots.Poster({
        client,
        apiKeys: {
            astrobotlist: '7ae119bc-e91a-4010-8f90-e16b34ca823a',
            bladebotlist: 'e280b2f4e7ca4ee54074bf235eb46b9f843731bc',
            blist: 'zzmHD5wXQNPlgL8dmEai',
            discordbotlist: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0IjoxLCJpZCI6Ijg4NzA4NjcxNzU4NzMyMDg1MiIsImlhdCI6MTYzMzQyMTQ5Mn0.2ROF3g0t-qcBFu5f0Tp5P8AH9x6S-H3m7BXgQQ3HYlE',
            discordextremelist: 'DELAPI_e602e88874b28bab01b3d56f4c074d01-887086717587320852',
            discordlistology: '41bdd206a569e31dd36a51fe8952afe3b5ceb1e974edf476da908cc58c71f56f01260011fdd89f007037e8b62e6ab5c5c84d3b62f3f168b1f585159bb8fb91d745cc67bb4640d78d59ebbdc8a09503a06177b3f6d93522a781685dc8ddac0e371a7a9e8ac7f3821e25b1b1eccf67ba4ff3862c9171491ba4dcfc1ee3fb81efa67b7bacdc8a38bb7188e907b69bec2a9251c11e64aa3a5c05c659e8ef594f5b091baa78773763b7920f21ef867638299ad0c5d1eba1a188e1df9b930c6ecd965b8cf325d59a79a2c75976861b7d38bcf5fb8e54b166413fa8288bad501b17e6fd2e8d09bd09c7932f7f97ca91a45b96ec073cc5a44c4d8b873fbd9119eba9e7a627179347f060a46e0074bd9a69f90c24f90670132c795eb65c7230a33a850b3280d44c132f055ecec819ebc7828fc8105629cbfb55e0b22958f08e42ce7add1392fd71f02874d80a0d42a1973f14d34b6f51d970a88511cd4e98c0fb8db1d020632534768119701b2f059c71e3f4d654f70e344ecc751ed690a3fbc18f63909b461248949c6be302cc7a533698a565d54237861edf57c6568b7cf5f47878b95e0bf6b94298bec81eda27da8034ac4101f566fe195172768619870f9a697006705c0b836d2b09e747',
            discordservices: 'DSPAeGDlmuNIvCNNlQO7tpNU3SlXzk7JhsSNpMF8CtdMmom2bBr7',
            fateslist: 'BktMoXB9cJuTNul8zr0f31zu97EtCuHJE4yhb3kkcCd11jpZ5KgB96e8LnCbaw0j5CpgBGHQbXvCfHWSjB56ZCAa3Uc05yBlfN8ABFEkToXmW7TOLArhBW67ezp5nVJUitFW',
            topgg: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg4NzA4NjcxNzU4NzMyMDg1MiIsImJvdCI6dHJ1ZSwiaWF0IjoxNjMzNDIyOTg1fQ.6w6JMZyfHY5hlFwlWz7lTU4pkaiOYMVdYe4rppAALwM',
        },
        clientLibrary: 'discord.js',
    });
    poster.startInterval();
    poster.addHandler('autopostFail', function(args) {
        console.log(`autopost failed: ${args}`);
        utils.sendLogMessage(`autopost failed: ${args}`);
    })
    poster.addHandler('autopostSuccess', function() {
        console.log(`autopost success`);
    })
});
client.login(process.env.TOKEN);
