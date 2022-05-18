const { Model } = require('objection');

class Vehicle extends Model {
    static get tableName() {
        return 'Vehicle';
    }
    static get relationMappings() {
        return {
            Driver: {
              relation: Model.ManyToManyRelation,
              modelClass: __dirname + '/Driver',
              join: {
                  from: 'Vehicle.id',
                  through:{
                      from: 'Authorization.vehicleId',
                      to: 'Authorization.driverId'
                  },
                  to: 'Driver.id'
              }
            },
            Ride: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/Ride',
                join: {
                    from: 'Vehicle.id',
                    to: 'Ride.vehicle.id'
                }
            },
            Vehicle: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/Vehicle',
                join: {
                    from: 'Ride.vehicleId',
                    to: 'Vehicle.id'
                }
            },
        };
    }
}  

module.exports = { Vehicle };
