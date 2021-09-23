const Color = require('color');
const {MessageEmbed} = require('discord.js');
const { exec } = require('child_process');
module.exports = {
    formatArrayAsList: function(array) {
        let msg = '';
        for (element of array) {
            msg += '- ' + element + '\n';
        }
        return msg.slice(0, -1);
    },
    buildChallengeList: function(challengeCodes, challenges) {
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
        this.sh(`telegram-send -g 'Phasmo Helper:\n${message}'`)
            .catch((_err) => {
                console.error(message);
            });
    },
};
