const { Model } = require('objection');

class Drivers extends Model {
    static get tableName() {
        return 'Driveris';
    }   
}

module.exports = { Drivers};
