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

const { VehicleType } = require('/home/CS/users/lvanerme/.linux/cos243/ride-share-repo/api/models/VehicleType');


//test to update data

knex('VehicleType')
	
	.where('type', 'Sedan')
	.del()
	.then(result => console.log(result))
    	.catch(error => console.log(error))
	.then(() => knex.destroy())





knex('VehicleType')
	.where('id','=',1)
	.update({ type: 'Coupe'}, ['id','type'])
	.then(result => console.log(result))
	.catch(err => console.log(err))
	.then(()=>knex.destroy())

