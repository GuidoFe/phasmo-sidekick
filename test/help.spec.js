require('module-alias/register');
const assert = require('assert');
const Help = require('@commands/Help');
const DataManager = require('@modules/DataManager');
const MessageStub = require('./lib/messageStub');
const testUtils = require('./lib/utils');
let help;
describe('command help', function() {
    beforeEach(function() {
        const dataManager = new DataManager();
        dataManager.constants = {prefix: '!ph'};
        help = new Help(dataManager);
        help.init({
            'commandA': {shortDescription: 'Short description A', longDescription: 'Long description A'},
            'commandB': {shortDescription: 'Short description B', longDescription: 'Long description B'},
        });
    });
    it('should have a non-empty command list', function() {
        assert.ok(help.commandList && Object.keys(help.commandList).length == 2, `Command list:\n${Object.keys(help.commandList)}`);
    });
    it('should return the command B help message', function() {
        const message = new MessageStub(`!ph help commandB`);
        const result = help.execute(message);
        assert.equal(result, 0);
        assert.equal(testUtils.getEmbedMessageDescription(message.response), 'Long description B', message.response);
    });
    it('should not accept invalid command name', function() {
        const message = new MessageStub(`!ph help ewfdsaf`);
        const result = help.execute(message);
        assert.equal(result, Help.ERR_COMMAND_NOT_VALID);
    });
    it('should return the complete help message', function() {
        const message = new MessageStub(`!ph help`);
        const result = help.execute(message);
        assert.equal(result, 0, `Returned ${result}`);
        const response = testUtils.getEmbedMessageDescription(message.response);
        assert.ok(response, 'Response is not defined.');
        const nNewLines = (response.match(/\n/g)||[]).length;
        assert.ok(nNewLines > 2, response);
    });
});

