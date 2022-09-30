import {statSync, readFileSync, readdirSync} from 'fs';
import {join} from 'path';
import {Challenge, WheelElement} from './Challenge';
import {Constants} from './Constants';

export class DataManager {
    spinnableChallenges: string[];
    constants: Constants;
    challengesList: Map<string, Challenge> = new Map();
    parseChallengeFile(filePath: string): Challenge{
        const stat = statSync(filePath);
        if (stat.isFile() && filePath.endsWith('.json')) {
            console.log( 'Loading %s as challenge...', filePath );
            try {
                const jsonString = readFileSync(filePath, 'utf8');
                try {
                    const challengeObject = <Challenge>JSON.parse(jsonString);
                    if (challengeObject.hasWheel) {
                        this.spinnableChallenges.push(challengeObject.code);
                        challengeObject.wheel = new Map<string, WheelElement>(Object.entries(challengeObject.wheel));
                        challengeObject.pool = [];
                        challengeObject.wheel.forEach((value, name) => {
                            if (value.n == null) {
                                value.n = 1;
                            };
                            for (let i = 0; i < value.n; i++) {
                                challengeObject.pool.push(name);
                            };
                        });
                    }
                    return challengeObject;
                } catch (jsonErr) {
                    console.log('Error parsing challenge %s: %s', filePath, jsonErr);
                }
            } catch (err) {
                console.log('Error reading %s: %s', filePath, err);
            }
        }
        throw `Can't parse challenge file ${filePath}`;
    };

    init(constants: Constants, challengesFolder:string) {
        this.spinnableChallenges = [];
        this.constants = constants;
        try {
            // Get the files as an array
            const files = readdirSync(challengesFolder);
            // Loop them all with the new for...of
            for (const file of files) {
                // Get the full paths
                const filePath = join(challengesFolder, file);
                // Stat the file to see if we have a file or dir
                const challengeObject = this.parseChallengeFile(filePath);
                this.challengesList.set(challengeObject.code, challengeObject);
            }
            console.log('Ended parsing challenges');
        } catch ( e ) {
            console.error( 'Error: %s', e );
        }
    };
}
