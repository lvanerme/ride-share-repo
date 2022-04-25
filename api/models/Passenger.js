const { Model } = require('objection');

class Passenger extends Model {
    static get tableName() {
	return 'Passenger';
	}
}

module.exports = { Passenger };
