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

const { User } = require('/home/CS/users/lvanerme/.linux/cos243/ride-share-repo/api/models/User');

knex('User')
	knex.insert([{firstName: 'Nathan', lastName: 'Erickson', email: 'nerickson@ex.com', password: 'ne', phone: '61690060000', isAdmin: false}]).into('User')
	
	.select()
    	.from('User')
	.then(users => console.log(users))
    	.then(() => knex.destroy());

