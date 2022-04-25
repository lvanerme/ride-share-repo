const { Model } = require('objection');

class Authorization extends Model {
    static get tableName() {
        return 'Authorization';
    }   
}

module.exports = { Authorization };
