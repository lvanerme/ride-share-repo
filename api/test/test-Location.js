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



const { Location } = require('/home/CS/users/lvanerme/.linux/cos243/ride-share-repo/api/models/Location');

//test to delete data


//knex
//	knex.insert([{id:'3',name: 'place',address:'1234 Lane', city:'X',state:'CO',zipCode:'60563'}]).into('Location')
//	.then(()=>knex.destroy())

knex
    .select()
    .from('Location')
    .then(result => console.log(result))
    .then(()=>knex.destroy())

