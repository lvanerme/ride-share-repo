const { Model } = require('objection');

class Ride extends Model {
    static get tableName() {
        return 'Ride';
    }   
}

module.exports = { Ride };
