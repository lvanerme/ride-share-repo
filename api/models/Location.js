const { Model } = require('objection');

class Location extends Model {
    static get tableName() {
        return 'Location';
    }
    static get relationMappings(){
        return {
            Ride: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/Ride',
                join: {
                    from: 'Location.id',
                    to: 'Ride.fromLocationId',
               }
            }
        }
    }
}

module.exports = { Location };
