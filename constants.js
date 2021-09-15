const fs = require('fs');
const path = require('path');
const challengesFolder = 'challenges';
const challengeList = {};
const PREFIX = '!ph';
const challengesWithWheel = [];
try {
    // Get the files as an array
    const files = fs.readdirSync(challengesFolder);
    // Loop them all with the new for...of
    for (const file of files) {
        // Get the full paths
        const filePath = path.join(challengesFolder, file);
        // Stat the file to see if we have a file or dir
        const stat = fs.statSync(filePath);
        if (stat.isFile() && filePath.endsWith('.json')) {
            console.log( 'Loading %s as challenge...', filePath );
            try {
                jsonString = fs.readFileSync(filePath, 'utf8');
                try {
                    jsonObject = JSON.parse(jsonString);
                    challengeList[jsonObject.code] = jsonObject;
                    if (jsonObject['hasWheel']) {
                        challengesWithWheel.push(jsonObject.code);
                    }
                } catch (jsonErr) {
                    console.log('Error parsing challenge %s: %s', filePath, jsonErr);
                }
            } catch (err) {
                console.log('Error reading %s: %s', filePath, err);
            }
        }
    }
    console.log('Ended parsing challenges');
} catch ( e ) {
    console.error( 'Error: %s', e );
}
module.exports = Object.freeze({
    prefix: PREFIX,
    items: ['Spirit box', 'Book', 'Photo Camera', 'EMF', 'Video Camera', 'UV Flashlight', 'D.O.T.S.', 'Candle', 'Crucifix', 'Glow Stick', 'Head Mounted Camera', 'Motion Sensor', 'Lighter', 'Parabolic Mic', 'Salt', 'Pills', 'Smudge Stick', 'Sound Sensor', 'Strong Flashlight', 'Thermometer', 'Tripod'],

    maps: {
        't': 'Tanglewood',
        'e': 'Edgefield',
        'w': 'Willow',
        'r': 'Ridgeview',
        'g': 'Grafton',
        'b': 'Bleasdale',
        'h': 'Highschool',
        'p': 'Prison',
        'a': 'Asylum',
    },

    commonClueNames: {
        'emf': 0, 'emf5': 0,
        'book': 1, 'writing': 1, 'ghostwriting': 1,
        'fingerprints': 2, 'fingers': 2,
        'spirit': 3, 'spiritbox': 3,
        'orbs': 4, 'orb': 4, 'ghostorbs': 4,
        'freezing': 5, 'temps': 5,
        'dots': 6, 'DOTS': 6, 'D.O.T.S.': 6,
    },

    correctClueNames: ['EMF 5', 'Ghost Writing', 'Fingerprints', 'Spiritbox', 'Ghost orbs', 'Freezing', 'D.O.T.S.'],
    ghosts: {
        'Myling': [0, 1, 2],
        'Spirit': [0, 1, 3],
        'Shade': [0, 1, 5],
        'Jinn': [0, 2, 5],
        'Goryo': [0, 2, 6],
        'Wraith': [0, 3, 6],
        'Oni': [0, 5, 6],
        'Poltergeist': [1, 2, 4],
        'Demon': [1, 2, 5],
        'Mare': [1, 3, 4],
        'Revenant': [1, 4, 5],
        'Phantom': [2, 3, 6],
        'Hantu': [2, 4, 5],
        'Banshee': [2, 4, 6],
        'Yokai': [3, 4, 6],
        'Yurei': [4, 5, 6],
    },
    challenges: challengeList,
    spinnableChallenges: challengesWithWheel,
    help: {
        'item': `🔦 \`${PREFIX} item\`: pick a random item`,
        'map': `🗺️  \`${PREFIX} map LIST\`: choose a random map between those indicated. If List is empty, it will consider every map. List is a sequence of these letters separated by spaces:\n    - t: Tanglewood\n    - e: Edgefield\n    - w: Willow\n    - r: Ridgeview\n    - g: Grafton\n    - b: Bleasdale\n    - h: Brownstone Highscool\n    - p: Prison\n    - a: Asylu`,
        'spin': `🌀\`${PREFIX} spin CHALLENGE_NAME\`: spin the wheel of the challenge CHALLENGE_NAME, if it has one.`,
        'challenge': `⚔️ \`${PREFIX} challenge\`: pick a random challenge. List all possible challenges with \`${PREFIX} challenge list\`. Get a challenge description with \`${PREFIX} challenge CHALLENGE_NAME\``,
        'clues': `🔎\`${PREFIX} clues CLUES\`: Show which ghosts are possible with those clues and which evidence is lacking. Clues:\n    - \`emf\` or \`emf5\`\n    - \`book\` or \`writing\` or \`ghostwriting\`\n    - \`fingerprints\` or \`fingers\`\n    - \`spirit\` or \`spiritbox\`\n    - \`orbs\` or \`ghostorbs\`\n    - \`freezing\` or \`temps\`\n    - \`dots\``,
    },
});
