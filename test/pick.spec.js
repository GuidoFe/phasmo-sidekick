require('module-alias/register');
const assert = require('assert');
const Pick = require('@commands/Pick');
const DataManager = require('@modules/DataManager');
const MessageStub = require('./lib/messageStub');
let pick;
describe('command pick', function() {
    before(function() {
        const dataManager = new DataManager();
        dataManager.constants = {prefix: '!ph'};
        pick = new Pick(dataManager);
    });
    it('should return a valid random item', function() {
        const message = new MessageStub(`!ph pick A B C`);
        const result = pick.execute(message);
        assert.ok(result == 0 && ['A', 'B', 'C'].includes(message.response), message.response);
    });
    it('should return error no args', function() {
        const message = new MessageStub(`!ph pick`);
        const result = pick.execute(message);
        assert.ok(result == Pick.ERR_NO_ARGS);
    });
});

