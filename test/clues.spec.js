require('module-alias/register');
const assert = require('assert');
const Clues = require('@commands/Clues');
const DataManager = require('@modules/DataManager');
let clues;
const MessageStub = require('./lib/messageStub');
let dataManager;
let prefix;
describe('command clues', function() {
    beforeEach(function() {
        dataManager = new DataManager();
        dataManager.constants = require('@constants');
        prefix = dataManager.constants.prefix;
        clues = new Clues(dataManager);
    });
    it('should return all the ghosts', function() {
        const result = clues.filterGhosts([]);
        assert.equal(result.length, dataManager.constants.ghosts.length);
    });
    it('should return no ghosts', function() {
        const result = clues.filterGhosts([5, 3]);
        assert.equal(Object.keys(result).length, 0, result);
    });
    it('should return only banshee', function() {
        const result = clues.filterGhosts([2, 4, 6]);
        assert.equal(Object.keys(result).length, 1, result);
        assert.ok('Banshee' in result, result);
    });
    it('should return three ghosts', function() {
        const result = clues.filterGhosts([0, 1]);
        assert.equal(Object.keys(result).length, 3, result);
        assert.ok('Myling' in result, result);
        assert.ok('Spirit' in result, result);
        assert.ok('Shade' in result, result);
    });
    it('should not accept invalid clues', function() {
        const message = new MessageStub(`${prefix} clues aaaa`);
        const result = clues.execute(message);
        assert.equal(result, Clues.ERR_CLUE_NOT_VALID);
    });
});

