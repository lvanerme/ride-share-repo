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

const { State } = require('/home/CS/users/lvanerme/.linux/cos243/ride-share-repo/api/models/State');
//test to insert data
knex

	.select()
        .from('State')
	.then(result => console.log(result))

	knex.insert([{abbreviation: 'AL',name:'Alabama'}]).into('State')


    	.then(() => knex.destroy());
    	

