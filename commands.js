const constants = require('./constants');

pickRandom = function(items) {
    // Pick a random item from the list items
    // result = Math.floor(Math.random() * constants.items.length);
    return items[Math.floor(Math.random() * items.length)];
};

module.exports = {

    item: function() {
        return pickRandom(constants.items);
    },

    map: function(args) {
        if (args.length > 0) {
            result = args[Math.floor(Math.random() * args.length)];
            let msg = 'Random choice between {';
            const parsedArgs = args.map((x) => {
                return constants.maps[x];
            });
            for (m of parsedArgs) {
                msg += m + ', ';
            }
            msg = msg.slice(0, -2);
            msg += '}:\n**' + constants.maps[result] + '**';
            return msg;
        } else {
            return pickRandom(Object.values(constants.maps));
        }
    },

    challenge: function() {
        return pickRandom(Object.keys(constants.challenges));
    },

    spin: function(challengeCode) {
        const ch = constants.challenges[challengeCode];
        if (ch && ch['hasWheel'] && ch['wheel']) {
            const wheel = ch['wheel'];
            let trait='ERR';
            let description='';
            if (ch['hasDuplicates']) {
                const list = [];
                for (const [traitName, traitObj] of Object.entries(wheel)) {
                    for (i=0; i < traitObj['n']; i++) {
                        list.push(traitName);
                    }
                }
                trait = pickRandom(list);
                description = wheel[trait]['desc'];
            } else {
                trait = pickRandom(Object.keys(wheel));
                description = wheel[trait];
            }
            return {valid: true, message: `**${trait}**: ${description}`};
        } else {
            return {valid: false, message: `Challenge ${challengeCode} not valid. Please contact the developer`};
        }
    },
    clues: function(availableClues) {
        ghostPool = {};
        for (const [ghost, evidence] of Object.entries(constants.ghosts)) {
            ghostPool[ghost] = evidence.slice();
        }
        for (const clue of availableClues) {
            for (const [ghost, evidence] of Object.entries(ghostPool)) {
                if (evidence.includes(clue)) {
                    ghostPool[ghost] = evidence.filter((x) => {
                        return x != clue;
                    });
                } else {
                    delete ghostPool[ghost];
                }
            }
        }
        poolLen=Object.keys(ghostPool).length;
        if (poolLen == 0) {
            return 'No ghost matches those evidence';
        } else if (poolLen == 1) {
            return `The ghost is a **${Object.keys(ghostPool)[0]}**`;
        } else {
            let msg = '';
            for (const [ghost, evidence] of Object.entries(ghostPool)) {
                let line = `**${ghost}**: `;
                for (const i of evidence) {
                    line += ' ' + constants.correctClueNames[i] + ',';
                }
                line = line.slice(0, -1);
                msg += line + '\n';
            }
            return msg.slice(0, -1);
        }
    },
};
