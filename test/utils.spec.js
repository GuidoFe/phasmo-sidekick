require('module-alias/register');
const assert = require('assert');
const utils = require('@utils');
describe('formatArrayAsList method', function() {
    it('should create an itemized list', function() {
        const input = ['A', 'B', 'C'];
        const result = utils.formatArrayAsList(input);
        assert.equal(result, '- A\n- B\n- C');
    });
    it('should return an empty list', function() {
        assert.equal(utils.formatArrayAsList([]), '');
    });
});

describe('buildChallengeList method', function() {
    let challenges = {};
    beforeEach(function() {
        challenges = {
            'codeA': {'name': 'A', 'code': 'codeA'},
            'codeB': {'name': 'B', 'code': 'codeB'},
            'codeC': {'name': 'C', 'code': 'codeC'}};
    });
    it('should return a valid challenge list', function() {
        assert.equal(utils.buildChallengeList(['codeA', 'codeB'], challenges), '- **A** (code \`codeA\`)\n- **B** (code \`codeB\`)');
    });
    it('should return an empty list', function() {
        assert.equal(utils.buildChallengeList([], challenges), '');
    });
});

describe('getMessageArgument method', function() {
    it('should return three arguments', function() {
        assert.equal(utils.getMessageArguments({content: 'A B C'}).length, 3);
    });
    it('should discard extra spaces', function() {
        const result = utils.getMessageArguments({content: '  A    B '});
        assert.ok(result.length == 2 && result[0] == 'A' && result[1] == 'B', result);
    });
});

describe('randomVibrantColor method', function() {
    it('should return an hex color', function() {
        assert.match(utils.randomVibrantColor(), /^#([a-fA-F0-9]{6})/);
    });
});

describe('formatObjectAsList method', function() {
    let object = {};
    beforeEach(function() {
        object = {'A': 242, 'B': 'ewfw', 'C': -3.4};
    });
    it('should return a valid list', function() {
        assert.equal(utils.formatObjectAsList(object), '- A\n- B\n- C');
    });
    it('should return an empty string', function() {
        assert.equal(utils.formatObjectAsList({}), '');
    });
});

describe('pickRandom method', function() {
    it('should return the only input element passed', function() {
        assert.equal(utils.pickRandom(['A']), 'A');
    });
});
