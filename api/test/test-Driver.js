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

const { Driver } = require('/home/CS/users/lvanerme/.linux/cos243/ride-share-repo/api/models/Driver');

knex('Driver')
	.select()
    	.from('Driver')
	.where('liscenseState', 'MI')
	.then(result => console.log(result))
    	.then(() => knex.destroy())

