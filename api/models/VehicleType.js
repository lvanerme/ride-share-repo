const { Model } = require('objection');

class VehicleType extends Model {
    static get tableName() {
        return 'VehicleType';
    }   
}

module.exports = { VehicleType };
