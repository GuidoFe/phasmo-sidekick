var fs = require('fs');
var path = require('path');
var DataManager = /** @class */ (function () {
    function DataManager() {
        this.spinnableChallenges = [];
        this.constants = {};
        this.challengesList = {};
    }
    DataManager.prototype.initializeSingleChallenge = function (challengeObject) {
        if (challengeObject['hasWheel']) {
            this.spinnableChallenges.push(challengeObject.code);
            challengeObject.pool = [];
            for (var _i = 0, _a = Object.entries(challengeObject.wheel); _i < _a.length; _i++) {
                var _b = _a[_i], name_1 = _b[0], value = _b[1];
                for (var i = 0; i < value['n']; i++) {
                    challengeObject.pool.push(name_1);
                }
                ;
            }
            ;
        }
    };
    ;
    DataManager.prototype.init = function (constants, challengesFolder) {
        this.spinnableChallenges = [];
        this.challengesList = {};
        this.constants = constants;
        try {
            // Get the files as an array
            var files = fs.readdirSync(challengesFolder);
            // Loop them all with the new for...of
            for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
                var file = files_1[_i];
                // Get the full paths
                var filePath = path.join(challengesFolder, file);
                // Stat the file to see if we have a file or dir
                var stat = fs.statSync(filePath);
                if (stat.isFile() && filePath.endsWith('.json')) {
                    console.log('Loading %s as challenge...', filePath);
                    try {
                        var jsonString = fs.readFileSync(filePath, 'utf8');
                        try {
                            var jsonObject = JSON.parse(jsonString);
                            this.initializeSingleChallenge(jsonObject);
                            this.challengesList[jsonObject.code] = jsonObject;
                        }
                        catch (jsonErr) {
                            console.log('Error parsing challenge %s: %s', filePath, jsonErr);
                        }
                    }
                    catch (err) {
                        console.log('Error reading %s: %s', filePath, err);
                    }
                }
            }
            console.log('Ended parsing challenges');
        }
        catch (e) {
            console.error('Error: %s', e);
        }
    };
    ;
    return DataManager;
}());
module.exports = DataManager;
