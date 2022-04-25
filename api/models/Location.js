const { Model } = require('objection');

class Location extends Model {
    static get tableName() {
        return 'Location';
    }   
}

module.exports = { Location };
