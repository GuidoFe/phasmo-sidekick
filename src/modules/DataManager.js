const fs = require('fs');
const path = require('path');

class DataManager {
    spinnableChallenges = [];
    constants = {};
    challengesList = {};
    initializeSingleChallenge(challengeObject) {
        if (challengeObject['hasWheel']) {
            this.spinnableChallenges.push(challengeObject.code);
            challengeObject.pool = [];
            for (const [name, value] of Object.entries(challengeObject.wheel)) {
                for (let i = 0; i < value['n']; i++) {
                    challengeObject.pool.push(name);
                };
            };
        }
    };

    init(constants, challengesFolder) {
        this.spinnableChallenges = [];
        this.challengesList = {};
        this.constants = constants;
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
                        const jsonString = fs.readFileSync(filePath, 'utf8');
                        try {
                            const jsonObject = JSON.parse(jsonString);
                            this.initializeSingleChallenge(jsonObject);
                            this.challengesList[jsonObject.code] = jsonObject;
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
    };
}

module.exports = DataManager;
