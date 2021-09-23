require('module-alias/register');
const assert = require('assert');
const Item = require('@commands/Item');
const MessageStub = require('./lib/messageStub');
const DataManager = require('@modules/DataManager');
let item;
let dataManager;
describe('command item', function() {
    beforeEach(function() {
        dataManager = new DataManager();
        dataManager.constants = require('@constants');
        dataManager.constants.prefix = '!ph';
        item = new Item(dataManager);
    });
    it('should return a valid item', function() {
        const message = new MessageStub(`!ph item`);
        const result = item.execute(message);
        assert.equal(result, 0);
        assert.ok(dataManager.constants.items.includes(message.response), `Response: ${message.response}`);
    });
    it(`should not throw error with additional arguments`, function() {
        const message = new MessageStub(`!ph item d w e e w`);
        assert.doesNotThrow(() => {
            item.execute(message);
        }, 'The help command failed with the insertion of additional arguments');
    });
});

