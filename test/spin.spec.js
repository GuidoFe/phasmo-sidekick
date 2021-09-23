require('module-alias/register');
const assert = require('assert');
const Spin = require('@commands/Spin');
const DataManager = require('@modules/DataManager');
const MessageStub = require('./lib/messageStub');
let spin;
describe('command spin', function() {
    beforeEach(function() {
        const dataManager = new DataManager();
        dataManager.challengesList = {
            'challenge-a': {'name': 'Challenge A', 'code': 'challenge-a', 'desc': 'Desc A', 'hasWheel': true, 'hasDuplicates': false,
                'wheel': {
                    'Element A.1': 'Desc A.1',
                    'Element A.2': 'Desc A.2',
                },
                'pool': ['Element A.1', 'Element A.2']},
            'challenge-b': {'name': 'Challenge B', 'code': 'challenge-a', 'desc': 'Desc B', 'hasWheel': true, 'hasDuplicates': true,
                'wheel': {
                    'Element B.1': {'n': 2, 'desc': 'Desc B.1'},
                    'Element B.2': {'n': 3, 'desc': 'Desc B.2'},
                },
                'pool': ['Element B.1', 'Element B.1', 'Element B.2', 'Element B.2', 'Element B.2'],
            },
            'challenge-c': {'name': 'Challenge C', 'code': 'challenge-C', 'desc': 'Desc C', 'hasWheel': false},
        };
        dataManager.constants = {prefix: '!ph'};
        dataManager.spinnableChallenges = ['challenge-a', 'challenge-b'];
        spin = new Spin(dataManager);
    });
    it('should return a valid wheel element', function() {
        const message = new MessageStub(`!ph spin challenge-a`);
        const result = spin.execute(message);
        assert.ok(result == 0, `Returned ${result}`);
    });
    it('should give error at invalid challenge name', function() {
        const message = new MessageStub('!ph spin challenge-c');
        const result = spin.execute(message);
        assert.ok(result == Spin.ERR_CHALLENGE_NOT_VALID);
    });
});

