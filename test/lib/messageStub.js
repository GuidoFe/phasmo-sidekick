/** Mocking discord message**/
class MessageStub {
    /**
     * Building a fake discord message
     * @constructor
     * @param {string} content - the content of the message
     * */
    constructor(content) {
        this.content = content;
    }
    /**
     * Function used to reply to the message
     * @param {object} bundle - Bundle of the reply
     */
    reply(bundle) {
        this.response = bundle;
    }
}
module.exports = MessageStub;
