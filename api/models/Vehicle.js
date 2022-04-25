const { Model } = require('objection');

class Vehicle extends Model {
    static get tableName() {
        return 'Vehicle';
    }   
}  

module.exports = { Vehicle };
