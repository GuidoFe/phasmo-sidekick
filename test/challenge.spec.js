require('module-alias/register');
const assert = require('assert');
const Challenge = require('@commands/Challenge');
const DataManager = require('@modules/DataManager');
const MessageStub = require('./lib/messageStub');
let challenge;
describe('command challenge', function() {
    beforeEach(function() {
        const dataManager = new DataManager();
        dataManager.challengesList = {
            'challenge-a': {'name': 'Challenge A', 'code': 'challenge-A', 'desc': 'Desc A'},
            'challenge-b': {'name': 'Challenge B', 'code': 'challenge-B', 'desc': 'Desc B'},
        };
        dataManager.constants = {prefix: '!ph'};
        challenge = new Challenge(dataManager);
    });
    it('should return a valid random challenge', function() {
        const message = new MessageStub(`!ph challenge`);
        const result = challenge.execute(message);
        assert.ok(result == 0, message.response);
    });
    it('should return challenge description', function() {
        const message = new MessageStub(`!ph challenge challenge-a`);
        const result = challenge.execute(message);
        assert.ok(result == 0, `Didn't returned 0, but ${result}. Response: ${message.response}`);
        assert.equal(message.response, `**Challenge A**: Desc A`, message.response);
    });
    it('should not accept invalid challenge', function() {
        const message = new MessageStub(`!ph challenge fwfwf`);
        const result = challenge.execute(message);
        assert.equal(result, Challenge.ERR_CHALLENGE_NOT_VALID);
    });
});

