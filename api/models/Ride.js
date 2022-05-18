const { Model } = require('objection');

class Ride extends Model {
    static get tableName() {
        return 'Ride';
    }
    static get relationMappings(){
        return {
            User: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + '/User',
                join: {
                    from: 'Ride.id',
                    through: {
                        from: 'Passenger.rideId',
                        to: 'Passenger.userId'
                    },
                    to: 'User.id'
                }
            },
            Driver: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname + '/Driver',
                join: {
                    from: 'Ride.id',
                    through: {
                        from: 'Drivers.rideId',
                        to: 'Drivers.driverId'
                    },
                    to: 'Driver.id'
                }
            },
            fromRidetoLocation: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/Location',
                join: {
                    from: [
                        'Ride.toLocationId'
                    ],
                    to: [
                        'Location.id'
                    ]

                }
            },
            fromRidefromLocation: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/Location',
                join: {
                    from: [
                        'Ride.fromLocationId'
                    ],
                    to: [
                        'Location.id'
                    ]
                }
            },
            Vehicle: {
                    relation: Model.HasManyRelation,
                    modelClass: __dirname + '/Vehicle',
                    join: {
                        from: 'Ride.vehicleId',
                        to: 'Vehicle.id'
                    }
<<<<<<< HEAD
                },
                to: 'Driver.id'
            },
            Location: {
                relation: Model.BelongsToOneRelation,
                modelClass: __dirname + '/Location',
                join:{
                    from: 'Ride.fromLocationId',
                    join: 'Location.id'
                }
            }
=======
                    },
>>>>>>> 5e0b9337a6e72e5b58b4582dc8df7334a5634312
        };
    }
}

module.exports = { Ride };
