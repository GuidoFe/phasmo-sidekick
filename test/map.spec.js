require('module-alias/register');
const assert = require('assert');
const Map = require('@commands/Map');
const DataManager = require('@modules/DataManager');
const constants = require('@constants');
const MessageStub = require('./lib/messageStub');
let map;
let prefix;
describe('command map', function() {
    beforeEach(function() {
        const dataManager = new DataManager();
        dataManager.constants = require('@constants');
        map = new Map(dataManager);
        prefix = dataManager.constants.prefix;
    });
    it('should pick from all the maps', function() {
        const message = new MessageStub(`${prefix} map`);
        assert.equal(map.execute(message), 0);
    });
    it('should pick Tanglewood', function() {
        const result = map.pickMap(['t']);
        assert.equal(result, 'Tanglewood');
    });
    it('should detect invalid map', function() {
        const message = new MessageStub(`${constants.prefix} map t k`);
        const result = map.execute(message);
        assert.equal(result, Map.ERR_MAP_NOT_VALID);
    });
});

