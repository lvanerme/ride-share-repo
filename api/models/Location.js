const { Model } = require('objection');

class Location extends Model {
    static get tableName() {
        return 'Location';
    }
    static get relationMappings(){
        return {
            toRideLocation: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/Ride',
                join: {
<<<<<<< HEAD
                    from: 'Location.id',
                    to: 'Ride.fromLocationId',
               }
=======
                    from: [
                        'Location.id'
                    ],
                    to: [
                        'Ride.toLocationId'
                        ]

                }
            },
            fromRideLocation: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/Ride',
                join: {
                    from: [
                        'Location.id'
                    ],
                    to: [
                        'Ride.fromLocationId'
                    ]

                }
>>>>>>> 5e0b9337a6e72e5b58b4582dc8df7334a5634312
            }
        }
    }
}

module.exports = { Location };
