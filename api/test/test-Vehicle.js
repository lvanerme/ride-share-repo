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



const { Vehicle } = require('/home/CS/users/lvanerme/.linux/cos243/ride-share-repo/api/models/Vehicle');

knex
	.select('id', 'make')
	.from('Vehicle')

	.then(result => console.log(result))
    	.then(()=>knex.destroy());

