const { Model } = require('objection');

class User extends Model {
    static get tableName() {
        return 'User';
    }
    static get relationMappings(){
        return{
            Ride: {
                relation: Model.ManyToManyRelation,
                modelClass: __dirname+'/Ride',
                join: {
                    from: 'User.id',
                    through: {
                        from: 'Passenger.userId',
                        to: 'Passenger.rideId'
                    },
                    to: 'Ride.id'
                }
            },
            Driver: {
                relation: Model.HasManyRelation,
                modelClass: __dirname+'/Driver',
                join: {
                    from: 'User.id',
                    to: 'Driver.id'
                }
            }
        };
    }
}

module.exports = { User };

