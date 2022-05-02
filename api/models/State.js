const { Model } = require('objection');

class State extends Model {
    static get tableName() {
        return 'State';
    }
    static get relationMappings(){
        return {
            State: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/Driver',
                join:{
                    from: 'State.abbreviation',
                    to: 'Driver.licenseState'
                }
            },
            Location: {
                relation: Model.HasManyRelation,
                modelClass: __dirname + '/Location',
                join:{
                    from: 'State.abbreviation',
                    to: 'Location.state'
                }
            }
        }
    }
}

module.exports = { State };
