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
            'commandA': {shortDescription: 'Short description A', longDescription: 'Long description A', commandUsage: '!ph A'},
            'commandB': {shortDescription: 'Short description B', longDescription: 'Long description B', commandUsage: '!ph B'},
        });
    });
    it('should have a non-empty command list', function() {
        assert.ok(help.commandList && Object.keys(help.commandList).length == 3, `Command list:\n${Object.keys(help.commandList)}`);
    });
    it('should return the command B help message', function() {
        const message = new MessageStub(`!ph help commandB`);
        const result = help.execute(message);
        assert.equal(result, 0);
        assert.equal(message.response.embeds[0].fields[0].value, 'Long description B');
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
        const nCommands = message.response.embeds[0].fields.length;
        assert.equal(nCommands, Object.keys(help.commandList).length);
    });
});

