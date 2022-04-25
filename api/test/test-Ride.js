const knex = require('knex')({
        client: 'pg',
        connection:{
                host: 'pg.cse.taylor.edu',
                user: 'lance_vanermen',
                password: 'futegiro',
                database: 'lance_vanermen'
        }
});

objection = require('objection');
const Model = objection.Model;
Model.knex(knex);

const { Ride } = require('/home/CS/users/lvanerme/.linux/cos243/ride-share-repo/api/models/Ride');
	
knex
	.select()
    	.from('Ride')
	.then(result => console.log(result))
    	.then(() => knex.destroy())

