const { Model } = require('objection');

class VehicleType extends Model {
    static get tableName() {
        return 'VehicleType';
    }
    static get relationMappings(){
        return {
            Vehicle: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/Vehicle',
                join: {
                    from: 'VehicleType.id',
                    to: 'Vehicle.vehicleTypeId'
                }
            }
        };
    }
}

module.exports = { VehicleType };
