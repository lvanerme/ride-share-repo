const { Model } = require('objection');

class Driver extends Model {
    static get tableName() {
	return 'Driver';
    }
}

module.exports = { Driver };
