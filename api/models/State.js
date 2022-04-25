const { Model } = require('objection');

class State extends Model {
    static get tableName() {
        return 'State';
    }   
}

module.exports = { State };
