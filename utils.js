const Color = require('color');
const {MessageEmbed} = require('discord.js');
module.exports = {
    randomVibrantColor: function() {
        const h = Math.floor(Math.random() * 36) * 10;
        return Color.hsl(h, 100, 70).hex();
    },
    formatArrayAsList: function(arr) {
        let msg = '';
        for (e of arr) {
            msg += '    - ' + e + '\n';
        }
        return msg.slice(0, -1);
    },
    formatObjectAsList: function(ob) {
        let msg = '';
        for (e of Object.keys(ob)) {
            msg += '    - ' + e + '\n';
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
};
