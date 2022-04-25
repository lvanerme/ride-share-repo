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

const { Passenger } = require('/home/CS/users/lvanerme/.linux/cos243/ride-share-repo/api/models/Passenger');

knex
        .select()
        .from('Passenger')
        .where('userId', '1')
        .then(result => console.log(result))
        .then(() => knex.destroy())

